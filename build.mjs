/* =========================================================================
   build.mjs — data/*.js 를 읽어 dist/ 에 완전한 정적 HTML 을 생성한다.
   외부 의존성 없음.  실행:  npm run build

   배포 주소는 data/site.js 의 SITE_URL 하나로 관리한다.
     SITE_URL=https://내도메인.com npm run build
   ========================================================================= */

import { readFile, writeFile, mkdir, rm, readdir, copyFile, stat } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { movements } from './data/movements.js';
import { poses } from './data/poses.js';
import { muscles, levels } from './data/muscles.js';
import { termGroups, termIndex } from './data/terms.js';
import { classFlow, firstTimeTips } from './data/basics.js';
import { wods, movementIdsOf, wodsByMovement, guideWod } from './data/wods.js';
import {
  readingSteps,
  formats,
  notationGroups,
  loadPicking,
  recordFormats,
} from './data/wod-grammar.js';
import { site, abs } from './data/site.js';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

/* ------------------------------------------------- 브라우저 렌더러 재사용 */
// public/skeleton.js · muscles.js 는 브라우저용 클래식 스크립트지만, window 를
// 인자로 넘겨 Node 에서 그대로 실행한다 (렌더링 코드 중복 방지).
const skelSrc = await readFile(join(ROOT, 'public/skeleton.js'), 'utf8');
const fakeWindow = {};
new Function('window', skelSrc)(fakeWindow);
const Skeleton = fakeWindow.Skeleton;

const muscleSrc = await readFile(join(ROOT, 'public/muscles.js'), 'utf8');
const fakeWindow2 = {};
new Function('window', 'document', muscleSrc)(fakeWindow2, undefined);
const MuscleMap = fakeWindow2.MuscleMap;

/* ------------------------------------------------------------- 유틸 */

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** JSON-LD 는 </script> 만 막으면 된다 */
const ld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj, null, 0).replace(/</g, '\\u003c')}</script>`;

/** canonical 은 index.html 을 디렉터리 루트로 정규화한다 */
const canonicalFor = (path) => (path === 'index.html' ? site.url + '/' : abs(path));

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

const hasOgImage = await exists(join(ROOT, 'public', site.ogImage.replace(/^\//, '')));
if (!hasOgImage) {
  console.warn(`⚠ public${site.ogImage} 가 없어 og:image 를 넣지 않습니다.`);
}

const NAV = [
  { href: 'index.html', label: '홈' },
  { href: 'basics.html', label: '처음 오셨나요' },
  { href: 'wod.html', label: '와드 읽는 법' },
  { href: 'wods.html', label: '와드 아카이브' },
  { href: 'terms.html', label: '용어 사전' },
  { href: 'movements.html', label: '동작 라이브러리' },
];

/* -------------------------------------------------- 공통 JSON-LD 조각 */

const PUBLISHER = {
  '@type': 'Organization',
  '@id': site.url + '/#organization',
  name: site.name,
  url: site.url + '/',
  description: site.tagline,
  ...(hasOgImage ? { logo: { '@type': 'ImageObject', url: abs(site.ogImage) } } : {}),
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': site.url + '/#website',
  name: site.name,
  url: site.url + '/',
  description: site.description,
  inLanguage: site.lang,
  publisher: { '@id': site.url + '/#organization' },
};

/** author 는 site.author 가 채워졌을 때만 Person, 아니면 발행 조직 */
const AUTHOR_NODE = site.author
  ? {
      '@type': 'Person',
      name: site.author.name,
      ...(site.author.url ? { url: site.author.url } : {}),
      ...(site.author.sameAs ? { sameAs: site.author.sameAs } : {}),
    }
  : { '@id': site.url + '/#organization' };

function breadcrumbLd(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalFor(c.path),
    })),
  };
}

/** 문서형 페이지 공통 Article 노드 */
function articleLd({ path, headline, description, section }) {
  return {
    '@type': 'Article',
    '@id': canonicalFor(path) + '#article',
    headline,
    description,
    inLanguage: site.lang,
    datePublished: site.datePublished,
    dateModified: site.dateModified,
    author: AUTHOR_NODE,
    publisher: { '@id': site.url + '/#organization' },
    isPartOf: { '@id': site.url + '/#website' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalFor(path) },
    ...(section ? { articleSection: section } : {}),
    ...(hasOgImage ? { image: [abs(site.ogImage)] } : {}),
  };
}

/* ------------------------------------------------------------ 레이아웃 */

function layout({
  title,          // 브랜드 접미사가 붙는 짧은 제목
  fullTitle,      // 접미사 없이 통째로 쓰고 싶을 때
  desc,
  active,
  base = '',
  path,
  body,
  bodyEnd = '',
  jsonld = [],
  breadcrumbs = null,   // [{name, path}] — 홈은 자동으로 앞에 붙음
}) {
  const pageTitle = fullTitle || `${title} | ${site.name}`;
  const canonical = canonicalFor(path);

  const graph = [PUBLISHER, WEBSITE, ...jsonld];
  if (breadcrumbs) graph.push(breadcrumbLd([{ name: '홈', path: 'index.html' }, ...breadcrumbs]));

  const crumbHtml = breadcrumbs
    ? `<nav class="crumbs" aria-label="현재 위치">
    <a href="${base}index.html">홈</a>
    ${breadcrumbs
      .map((c, i) =>
        i === breadcrumbs.length - 1
          ? `<span aria-current="page">${esc(c.name)}</span>`
          : `<a href="${base}${c.path}">${esc(c.name)}</a>`
      )
      .join('\n    ')}
  </nav>`
    : '';

  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(canonical)}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta name="theme-color" content="${site.themeColor}">
<meta property="og:type" content="${path === 'index.html' ? 'website' : 'article'}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(canonical)}">
${hasOgImage ? `<meta property="og:image" content="${esc(abs(site.ogImage))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)} — ${esc(site.tagline)}">` : ''}
<meta name="twitter:card" content="${hasOgImage ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${esc(pageTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
${hasOgImage ? `<meta name="twitter:image" content="${esc(abs(site.ogImage))}">` : ''}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23d7ff3e'/%3E%3Ctext x='16' y='23' font-size='19' font-weight='900' text-anchor='middle' font-family='sans-serif' fill='%2310140a'%3EC%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="${base}styles.css">
${ld({ '@context': 'https://schema.org', '@graph': graph })}
</head>
<body>
<a class="skip-link" href="#main">본문 바로가기</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="${base}index.html"><span class="mark">C</span>${esc(site.name)}</a>
    <nav class="nav" aria-label="주요 메뉴">
      ${NAV.map(
        (n) =>
          `<a href="${base}${n.href}"${n.href === active ? ' class="active" aria-current="page"' : ''}>${esc(n.label)}</a>`
      ).join('\n      ')}
    </nav>
  </div>
</header>
<main id="main">
${crumbHtml ? `<div class="wrap">${crumbHtml}</div>` : ''}
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <p class="disclaimer">이 사이트는 크로스핏 입문자를 위한 참고 자료입니다. 실제 동작은 반드시 자격을 갖춘 코치의 지도 아래 배우세요.
    통증이 있거나 기존 부상이 있다면 전문가와 상담 후 운동하세요.</p>
    <p>© ${new Date(site.dateModified).getFullYear()} ${esc(site.name)}</p>
  </div>
</footer>
${bodyEnd}
</body>
</html>`;
}

/* --------------------------------------------------------- 컴포넌트 */

function thumbSvg(mv) {
  const idx = mv.thumb ?? Math.min(mv.phases.length - 1, Math.floor(mv.phases.length / 2));
  return Skeleton.render(mv.phases[idx].pose, { ground: false });
}

function movementCard(mv, base = '') {
  const searchKey = [mv.ko, mv.en, mv.abbr, mv.category, mv.tagline].join(' ').toLowerCase();
  return `<a class="card mv-card" href="${base}movements/${mv.id}.html"
   data-mv data-cat-val="${esc(mv.category)}" data-search="${esc(searchKey)}">
  <div class="thumb" role="img" aria-label="${esc(mv.ko)} 스켈레톤 자세 미리보기">${thumbSvg(mv)}</div>
  <div>
    <span class="abbr">${esc(mv.abbr)}</span>
    <h3>${esc(mv.ko)}</h3>
    <span class="en">${esc(mv.en)}</span>
    <p>${esc(mv.tagline)}</p>
    <div class="mv-meta">
      <span class="tag">${esc(mv.category)}</span>
      <span class="tag">${esc(mv.level)}</span>
      <span class="tag">${esc(mv.phases.length)}단계</span>
      ${
        (wodsByMovement[mv.id] || []).length
          ? `<span class="tag accent">와드 ${wodsByMovement[mv.id].length}개</span>`
          : ''
      }
    </div>
  </div>
</a>`;
}

function playerMarkup(mv) {
  return `<div class="player" id="player" tabindex="0" role="group" aria-label="${esc(mv.ko)} 동작 단계 애니메이션">
  <div class="stage-col">
    <div class="stage" data-stage role="img" aria-label="${esc(mv.ko)} 동작을 옆에서 본 스켈레톤 애니메이션. 단계별 설명은 아래 표에 있습니다."><span class="stage-badge">Side View</span></div>
    <div class="controls">
      <div class="controls-row">
        <button class="icon-btn primary" data-play aria-label="재생"></button>
        <button class="icon-btn" data-prev aria-label="이전 단계"></button>
        <button class="icon-btn" data-next aria-label="다음 단계"></button>
        <input class="scrub" type="range" min="0" max="1000" value="0" data-scrub aria-label="단계 이동">
        <button class="icon-btn speed-btn" data-speed aria-label="재생 속도">1×</button>
      </div>
      <div class="phase-chips">
        ${mv.phases.map((p, i) => `<button class="chip" data-chip aria-pressed="${i === 0}">${i + 1}. ${esc(p.name)}</button>`).join('\n        ')}
      </div>
      ${
        mv.phases.some((p) => p.pose.bar)
          ? `<div class="toggle-row"><label><input type="checkbox" data-toggle-path> 바 이동 경로 보기</label></div>`
          : ''
      }
    </div>
  </div>
  <div class="side">
    <div>
      <div class="phase-num" data-phase-num>01 / 01</div>
      <div class="phase-title" data-phase-title></div>
    </div>
    <p class="phase-desc" data-phase-desc></p>
    <ul class="cue-list" data-phase-cues></ul>
  </div>
</div>`;
}

function muscleSection(mv) {
  const order = { primary: 0, secondary: 1, stabilizer: 2 };
  const list = [...mv.muscles].sort((a, b) => order[a.level] - order[b.level]);
  return `<div class="grid c2">
  <div class="panel">
    ${MuscleMap.render(mv.muscles)}
    <p style="font-size:13px;color:var(--text-mute);margin:12px 0 0">
      재생 중에는 지금 구간에서 특히 크게 일하는 근육이 흰 테두리로 강조됩니다.
    </p>
  </div>
  <div>
    <ul class="muscle-list">
      ${list
        .map(
          (m) => `<li data-muscle-item="${esc(m.key)}">
        <i class="dot ${esc(m.level)}"></i>
        <strong>${esc(muscles[m.key].ko)}</strong>
        <span class="tag">${esc(levels[m.level].ko)}</span>
        <span class="en">${esc(muscles[m.key].en)}</span>
      </li>`
        )
        .join('\n      ')}
    </ul>
  </div>
</div>`;
}

/* --------------------------------------------------------- 페이지들 */

function pageHome() {
  const termCount = Object.keys(termIndex).length;

  const body = `
<div class="wrap">
  <section class="hero">
    <p class="eyebrow">CrossFit for Beginners</p>
    <h1>크로스핏 화이트보드와 동작,<br><em>읽고 따라 할 수 있게</em></h1>
    <p class="lead">
      크로스핏은 용어와 약어부터 벽처럼 느껴집니다. 이 사이트는 그 벽을 세 부분으로 나눠 놓았습니다 —
      <strong>수업이 어떻게 돌아가는지</strong>, <strong>와드 표기를 어떻게 읽는지</strong>,
      그리고 <strong>각 동작을 어떻게 움직이고 어느 근육이 쓰이는지</strong>.
    </p>
    <dl class="stats">
      <div><dt>동작</dt><dd>${movements.length}개</dd></div>
      <div><dt>해석한 와드</dt><dd>${wods.length}장</dd></div>
      <div><dt>용어</dt><dd>${termCount}개</dd></div>
    </dl>
    <div class="hero-actions">
      <a class="btn primary" href="basics.html">처음이라면 여기부터</a>
      <a class="btn" href="movements.html">동작 라이브러리 보기</a>
    </div>
  </section>

  <section class="section">
    <h2>크로스핏이 뭔가요</h2>
    <div class="answer-block">
      <p>
        크로스핏(CrossFit)은 역도·체조·유산소를 매일 다르게 조합해 짧고 강하게 수행하는 운동 프로그램입니다.
        모든 회원이 같은 날 같은 운동(<strong>WOD</strong>, Workout of the Day)을 하되, 무게와 동작 난이도만 각자 수준에 맞게
        조정합니다. 이 조정을 <strong>스케일링(Scaling)</strong>이라 부르고, 적힌 그대로 하는 것을 <strong>Rx</strong>라고 합니다.
        수업은 보통 60분이며 브리핑 → 웜업 → 스킬·스트렝스 → 와드 → 정리 순서로 진행됩니다.
        일반 헬스장과 달리 코치가 전 과정을 지도하고, 기록을 남겨 성장을 추적합니다.
      </p>
    </div>
  </section>

  <section class="section">
    <h2>처음이라면 이 순서로 보세요</h2>
    <p class="lead">아래 세 문서를 순서대로 읽으면 첫 수업에서 당황할 일이 거의 없습니다.</p>
    <div class="grid c3">
      <a class="card" href="basics.html">
        <span class="kicker">01 · Basics</span>
        <h3>수업은 이렇게 굴러갑니다</h3>
        <p>브리핑 → 웜업 → 스킬/스트렝스 → 와드 → 정리. 60분 동안 무슨 일이 벌어지는지 시간대별로.</p>
      </a>
      <a class="card" href="wod.html">
        <span class="kicker">02 · Read the WOD</span>
        <h3>화이트보드 읽는 법</h3>
        <p>형식 사전과 표기 사전. <code>AMRAP 20</code>, <code>(135/85)</code>, <code>Time Cap</code> 이 무슨 뜻인지.</p>
      </a>
      <a class="card" href="terms.html">
        <span class="kicker">03 · Glossary</span>
        <h3>용어 사전</h3>
        <p>EMOM, AMRAP, Rx, 스케일링, 프론트 랙, 노렙… ${termCount}개를 검색해서 바로 찾아보세요.</p>
      </a>
    </div>
  </section>

  <section class="section">
    <h2>실제 와드는 어떻게 생겼나요</h2>
    <p class="lead">
      박스 화이트보드 ${wods.length}장을 그대로 옮겨 한 줄씩 해석했습니다.
      와드별로도, 동작별로도 찾아볼 수 있습니다.
    </p>
    <div class="grid c2">
      ${wods.slice(0, 3).map((w) => wodCard(w)).join('\n      ')}
    </div>
    <p style="margin-top:16px"><a class="btn" href="wods.html">와드 아카이브 전체 보기</a></p>
  </section>

  <section class="section">
    <h2>동작은 어떻게 배우나요</h2>
    <p class="lead">
      ${movements.length}개 동작마다 단계별 스켈레톤 애니메이션으로 움직임을 보고, 구간마다 어느 근육이 일하는지
      확인할 수 있습니다. 코치가 실제로 쓰는 큐와 흔한 실수 교정법, 스케일링 옵션도 함께 정리했습니다.
    </p>
    <div class="panel mv-index">
      ${[...new Set(movements.map((m) => m.category))]
        // 데이터 배열 순서 그대로면 2개짜리 분류가 위로 올라와 산만하다 — 많은 순으로
        .map((c) => ({ c, list: movements.filter((m) => m.category === c) }))
        .sort((a, b) => b.list.length - a.list.length || a.c.localeCompare(b.c, 'ko'))
        .map(
          ({ c, list }) => `<div class="mv-index-row">
        <span class="mv-index-cat">${esc(c)} <span class="mv-index-n">${list.length}</span></span>
        <div class="mv-index-list">${list
          .map((m) => `<a class="chipish" href="movements/${esc(m.id)}.html">${esc(m.ko)}</a>`)
          .join('')}</div>
      </div>`
        )
        .join('\n      ')}
    </div>
    <p style="margin-top:16px"><a class="btn" href="movements.html">동작 라이브러리 전체 보기</a></p>
  </section>

  <section class="section">
    <div class="callout">
      <strong>먼저 알아두면 좋은 것 하나.</strong> 와드에 적힌 무게(Rx)는 목표지 출발선이 아닙니다.
      초보자가 무게를 낮추거나 쉬운 동작으로 바꾸는 것(Scaling)은 크로스핏의 정상적인 사용법입니다.
    </div>
    <div class="hero-actions" style="margin-top:20px">
      <a class="btn primary" href="basics.html">첫 수업 준비하기</a>
      <a class="btn" href="wod.html">와드 읽는 법 보기</a>
    </div>
  </section>
</div>`;

  return layout({
    fullTitle: '크로스핏 입문 가이드 — 용어, 와드 읽는 법, 동작 배우기',
    // 개수는 데이터에서 뽑는다 — 동작·와드를 추가해도 설명이 낡지 않게
    desc:
      `크로스핏 입문자를 위한 한국어 가이드. EMOM·AMRAP·Rx 등 화이트보드 용어 ${termCount}개, ` +
      `실제 와드 ${wods.length}장 해석, 동작 ${movements.length}개의 단계별 애니메이션과 사용 근육을 정리했습니다.`,
    active: 'index.html',
    path: 'index.html',
    body,
    jsonld: [
      {
        '@type': 'WebPage',
        '@id': canonicalFor('index.html') + '#webpage',
        url: canonicalFor('index.html'),
        name: '크로스핏 입문 가이드',
        description: site.description,
        inLanguage: site.lang,
        isPartOf: { '@id': site.url + '/#website' },
        dateModified: site.dateModified,
      },
    ],
  });
}

function pageBasics() {
  const body = `
<div class="wrap">
  <p class="eyebrow">01 · Basics</p>
  <h1>크로스핏 처음 가는 날, 수업은 어떻게 진행되나요</h1>
  <div class="answer-block">
    <p>
      크로스핏 수업 한 타임은 보통 <strong>60분</strong>이고, 순서는 거의 모든 박스에서 같습니다.
      코치가 화이트보드 앞에서 오늘의 운동을 설명하는 <strong>브리핑</strong>으로 시작해,
      전신을 데우는 <strong>웜업</strong>, 기술이나 근력을 다루는 <strong>스킬·스트렝스</strong>,
      메인 고강도 운동인 <strong>WOD</strong>, 마지막으로 정리와 기록 순으로 끝납니다.
      처음 온 사람이 따로 준비할 것은 없고, 실내용 운동화와 물만 있으면 됩니다.
      무게와 동작은 코치가 개인 수준에 맞게 조정해 주므로 미리 연습해 갈 필요도 없습니다.
    </p>
  </div>

  <section class="section">
    <h2>수업 60분은 어떤 순서로 진행되나요</h2>
    <div class="flow panel" style="padding:6px 22px">
      ${classFlow
        .map(
          (f) => `<div class="flow-item">
        <div class="flow-time">${esc(f.time)}</div>
        <div>
          <h3>${esc(f.title)}</h3>
          <p>${esc(f.desc)}</p>
          <div class="tip">${esc(f.tip)}</div>
        </div>
      </div>`
        )
        .join('\n      ')}
    </div>
  </section>

  <section class="section">
    <h2>첫날 알아두면 좋은 것들</h2>
    <div class="grid c2">
      ${firstTimeTips
        .map(
          (t) => `<div class="card">
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.desc)}</p>
      </div>`
        )
        .join('\n      ')}
    </div>
  </section>

  <section class="section">
    <h2>다음은 무엇을 보면 되나요</h2>
    <div class="grid c2">
      <a class="card" href="wod.html"><span class="kicker">Next</span><h3>화이트보드 읽는 법</h3><p>실제 와드 하나를 한 줄씩 해석해 봅니다.</p></a>
      <a class="card" href="movements.html"><span class="kicker">Next</span><h3>동작 라이브러리</h3><p>오늘 나올 동작을 미리 눈으로 익혀두기.</p></a>
    </div>
  </section>
</div>`;

  return layout({
    fullTitle: '크로스핏 처음 가는 날 — 수업 60분 흐름과 준비물',
    desc:
      '크로스핏 수업은 브리핑·웜업·스킬·와드·정리 순서로 60분간 진행됩니다. 첫 방문자가 알아둘 스케일링, ' +
      '무게 선택, 준비물까지 정리했습니다.',
    active: 'basics.html',
    path: 'basics.html',
    breadcrumbs: [{ name: '처음 오셨나요', path: 'basics.html' }],
    body,
    jsonld: [
      articleLd({
        path: 'basics.html',
        headline: '크로스핏 처음 가는 날, 수업은 어떻게 진행되나요',
        description: '크로스핏 수업 60분의 진행 순서와 첫 방문자가 알아두면 좋은 것들.',
        section: '입문',
      }),
    ],
  });
}

/** 와드 한 줄에 붙는 동작 / 용어 링크 */
function wodLineLinks(line, base = '') {
  const out = [];
  if (line.movement) {
    const mv = movements.find((m) => m.id === line.movement);
    if (mv) out.push(`<a class="tag accent" href="${base}movements/${mv.id}.html">${esc(mv.ko)} 동작 보기 →</a>`);
  }
  if (line.term && termIndex[line.term]) {
    out.push(`<a class="tag" href="${base}terms.html#${esc(line.term)}">${esc(termIndex[line.term].term)} 용어 →</a>`);
  }
  return out.length ? `<div class="links">${out.join('')}</div>` : '';
}

/** 와드 한 파트(번호 · 줄 목록 · 요약)를 렌더링 */
function wodPartHtml(part, base = '') {
  const KIND = { warmup: '웜업', strength: '스트렝스 · 스킬', metcon: '메트콘' };
  return `<div class="wod-part">
      <div class="wod-part-head">
        <span class="num">${esc(part.label)}</span>
        <div><strong>${esc(part.subtitle)}</strong></div>
        ${part.kind ? `<span class="tag">${esc(KIND[part.kind] || part.kind)}</span>` : ''}
      </div>
      ${part.lines
        .map(
          (l) => `<div class="wod-line">
        <div class="wod-raw">${esc(l.raw)}</div>
        <div class="wod-mean">
          <div class="read">${esc(l.read)}</div>
          <p class="explain">${esc(l.explain)}</p>
          ${wodLineLinks(l, base)}
        </div>
      </div>`
        )
        .join('\n      ')}
      <div class="wod-summary">${esc(part.summary)}</div>
    </div>`;
}

/** 형식 사전의 한 행이 실제로 쓰인 와드를 최대 2개까지 링크한다 */
function formatExamples(fmt) {
  if (!fmt.tag) return '<span class="muted">아카이브 예시 없음</span>';
  const hits = wods.filter((w) => w.tags.includes(fmt.tag)).slice(0, 2);
  if (!hits.length) return '<span class="muted">아카이브 예시 없음</span>';
  return hits.map((w) => `<a class="ex-link" href="wods/${esc(w.id)}.html">${esc(w.focus)}</a>`).join('');
}

/** 표기 사전 한 줄 */
function notationRow(r) {
  const link = r.term && termIndex[r.term]
    ? ` <a class="tag" href="terms.html#${esc(r.term)}">${esc(termIndex[r.term].term)} →</a>`
    : '';
  return `<tr>
          <th scope="row"><code class="wrote">${esc(r.wrote)}</code></th>
          <td>${esc(r.read)}</td>
          <td>${esc(r.note)}${link}</td>
        </tr>`;
}

function pageWod() {
  // 총량 계산 예시 — 가이드 와드의 메트콘 파트에서 숫자를 직접 뽑아 쓴다
  const metcon = guideWod.parts.find((p) => p.kind === 'metcon') || guideWod.parts.at(-1);

  const body = `
<div class="wrap">
  <p class="eyebrow">02 · Read the WOD</p>
  <h1>크로스핏 와드(WOD) 읽는 법</h1>
  <div class="answer-block">
    <p>
      크로스핏 화이트보드는 어느 박스에 가도 문법이 같습니다.
      <strong>① 형식 줄</strong>(<code>AMRAP 20</code>, <code>EMOM 32</code>, <code>10 Rounds For Time</code>)이 먼저 오고,
      그 아래 <strong>② 동작 줄</strong>이 <code>개수 + 동작 + (무게)</code> 순서로 붙습니다.
      숫자는 항상 동작 앞에, 무게는 항상 괄호 안 <code>남/여</code> 순서입니다.
      <code>*</code>로 시작하는 줄은 본문이 아니라 <strong>③ 조건</strong>(제한 시간, 특별 규칙)이고,
      구석의 <code>a: b: c:</code>는 <strong>④ 하향 옵션</strong>입니다.
      이 네 덩어리만 구분하면 처음 보는 와드도 읽을 수 있습니다.
    </p>
  </div>

  <section class="section">
    <h2>와드는 이렇게 생겼습니다</h2>
    <p class="lead">
      실제 와드 한 장이 아니라 <strong>골격</strong>입니다. 표기는 전부 아카이브에 실제로 등장한 것들이고,
      어느 자리에 무엇이 오는지만 보여줍니다.
    </p>
    <div class="anatomy">
      <div class="anatomy-row"><code>2</code><span class="role role-part">파트 번호</span><span class="role-desc">한 수업에 웜업·스트렝스·메트콘 여러 파트가 있을 때</span></div>
      <div class="anatomy-row"><code>AMRAP 20</code><span class="role role-fmt">형식</span><span class="role-desc">시간·라운드 수가 여기 있다. 이 줄을 못 찾으면 아무것도 못 읽는다</span></div>
      <div class="anatomy-row indent"><code>12 Dumbbell Snatch alt. (22.5/15kg)</code><span class="role role-mv">개수 · 동작 · (무게)</span><span class="role-desc">한 라운드의 내용. 들여쓰기되어 있다</span></div>
      <div class="anatomy-row indent"><code>15/12 Cal Row</code><span class="role role-mv">개수 · 동작</span><span class="role-desc">머신은 횟수 대신 칼로리(남/여)</span></div>
      <div class="anatomy-row"><code>*Time Cap 15min</code><span class="role role-cond">조건</span><span class="role-desc">별표로 시작하면 본문이 아니라 규칙</span></div>
      <div class="anatomy-row"><code>a: 1Scaled</code><span class="role role-scale">하향 옵션</span><span class="role-desc">코치가 미리 준비해 둔 스케일 사다리</span></div>
    </div>
  </section>

  <section class="section">
    <h2>네 단계로 읽습니다</h2>
    <ol class="steps">
      ${readingSteps
        .map(
          (s) => `<li>
        <div class="step-n">${s.n}</div>
        <div class="step-body">
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.desc)}</p>
          <div class="step-look">${s.look.map((x) => `<code class="wrote">${esc(x)}</code>`).join('')}</div>
        </div>
      </li>`
        )
        .join('\n      ')}
    </ol>
  </section>

  <section class="section">
    <h2>첫 줄이 무슨 뜻인가요 — 형식 사전</h2>
    <p class="lead">형식이 정해지면 시계를 어떻게 보는지, 무엇을 기록하는지가 전부 따라옵니다.</p>
    <div class="tbl-scroll">
      <table class="tbl fmt-tbl">
        <caption class="sr-only">와드 형식별 표기·의미·시계 읽는 법·기록 방법</caption>
        <thead><tr>
          <th scope="col">형식</th><th scope="col">이렇게 적힌다</th><th scope="col">뜻</th>
          <th scope="col">시계</th><th scope="col">기록</th><th scope="col">실제 와드</th>
        </tr></thead>
        <tbody>
          ${formats
            .map(
              (f) => `<tr>
            <th scope="row">${
              f.term && termIndex[f.term]
                ? `<a href="terms.html#${esc(f.term)}">${esc(f.name)}</a>`
                : esc(f.name)
            }</th>
            <td>${f.wrote.length ? f.wrote.map((w) => `<code class="wrote">${esc(w)}</code>`).join('') : '<span class="muted">—</span>'}</td>
            <td>${esc(f.means)}</td>
            <td>${esc(f.clock)}</td>
            <td>${esc(f.score)}</td>
            <td>${formatExamples(f)}</td>
          </tr>`
            )
            .join('\n          ')}
        </tbody>
      </table>
    </div>
  </section>

  <section class="section">
    <h2>괄호·기호·약어는 무슨 뜻인가요 — 표기 사전</h2>
    <p class="lead">
      아래 표기는 전부 이 사이트 아카이브의 실제 화이트보드에서 그대로 뽑은 것입니다.
    </p>
    ${notationGroups
      .map(
        (g) => `<h3 class="sub-h3" id="notation-${esc(g.id)}">${esc(g.title)}</h3>
    <div class="tbl-scroll">
      <table class="tbl">
        <caption class="sr-only">${esc(g.title)} 표기와 의미</caption>
        <thead><tr><th scope="col">이렇게 적힌다</th><th scope="col">이렇게 읽는다</th><th scope="col">알아둘 것</th></tr></thead>
        <tbody>
        ${g.rows.map(notationRow).join('\n        ')}
        </tbody>
      </table>
    </div>`
      )
      .join('\n    ')}
  </section>

  <section class="section">
    <h2>총량을 곱해 봅니다</h2>
    <p class="lead">
      초보자가 무게를 잘못 고르는 이유는 거의 항상 <strong>라운드당 개수만 보고 총량을 안 세서</strong>입니다.
    </p>
    <div class="grid c2">
      <div class="panel">
        <h3>라운드 반복형</h3>
        <p class="calc"><code>${esc(metcon.lines[0].raw)}</code></p>
        <p>라운드 수 × 라운드당 개수 = 총량. 이 와드는 라운드당 ${esc(
          metcon.lines
            .slice(1)
            .filter((l) => /^\d/.test(l.raw))
            .map((l) => l.raw.match(/^\d+/)[0])
            .join(' + ')
        )}회를 10번 반복합니다.</p>
        <p class="muted">3×10 = 30, 2×10 = 20, 30×10 = 300 — 줄넘기만 300회입니다.</p>
      </div>
      <div class="panel">
        <h3>시간 간격형 (EMOM · E2MOM)</h3>
        <p class="calc"><code>EMOM 32</code> · 스테이션 4개</p>
        <p>총 시간 ÷ 스테이션 수 = 스테이션당 횟수. 32분 ÷ 4 = 각 동작을 8번씩 합니다.</p>
        <p class="muted">E2MOM 20 은 2분 간격이라 10라운드, 스테이션이 2개면 각 5번입니다.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <h2>무게는 어떻게 고르나요</h2>
    <p class="lead">총량을 센 다음, 라운드당 반복 수를 기준으로 고릅니다.</p>
    <div class="tbl-scroll">
      <table class="tbl">
        <caption class="sr-only">라운드당 반복 수에 따른 무게 선택 기준</caption>
        <thead><tr><th scope="col">라운드당 반복</th><th scope="col">목표 강도</th><th scope="col">확인하는 법</th></tr></thead>
        <tbody>
          ${loadPicking
            .map(
              (l) => `<tr><th scope="row">${esc(l.reps)}</th><td>${esc(l.aim)}</td><td>${esc(l.check)}</td></tr>`
            )
            .join('\n          ')}
        </tbody>
      </table>
    </div>
    <div class="callout" style="margin-top:18px">
      <strong>그래도 못 정하겠다면.</strong> 첫 라운드가 힘들면 마지막 라운드는 불가능합니다.
      "이 정도면 너무 가벼운데?" 싶은 무게가 대부분 정답입니다. 브리핑 때 코치에게
      <em>"이 와드 목표 시간이 몇 분인가요?"</em> 하나만 물어봐도 무게가 정해집니다.
    </div>
  </section>

  <section class="section">
    <h2>기록은 어떻게 남기나요</h2>
    <div class="tbl-scroll">
      <table class="tbl">
        <caption class="sr-only">와드 형식별로 기록해야 하는 값과 예시</caption>
        <thead><tr><th scope="col">형식</th><th scope="col">기록하는 것</th><th scope="col">예시</th></tr></thead>
        <tbody>
          ${recordFormats
            .map(
              (r) => `<tr><th scope="row">${esc(r.format)}</th><td>${esc(r.what)}</td><td><code class="wrote">${esc(r.example)}</code></td></tr>`
            )
            .join('\n          ')}
        </tbody>
      </table>
    </div>
  </section>

  <section class="section">
    <h2>예제로 확인해 봅니다</h2>
    <p class="lead">
      위 규칙을 실제 화이트보드 한 장에 그대로 적용해 봅니다. 왼쪽이 적힌 그대로, 오른쪽이 해석입니다.
    </p>
    ${guideWod.parts.map((part) => wodPartHtml(part)).join('\n    ')}
  </section>

  <section class="section">
    <h2>같은 방식으로 해석한 와드 더 보기</h2>
    <p class="lead">
      와드 아카이브에 ${wods.length}개 와드를 같은 방식으로 한 줄씩 풀어 두었습니다.
      와드별로 볼 수도 있고, 동작별로 "이 동작이 어느 와드에 나왔는지" 거꾸로 찾아볼 수도 있습니다.
    </p>
    <div class="grid c2">
      <a class="card" href="wods.html"><span class="kicker">Archive</span><h3>와드 아카이브</h3><p>실제 화이트보드 ${wods.length}장을 파트·줄 단위로 해석하고 스케일링까지 정리했습니다.</p></a>
      <a class="card" href="terms.html"><span class="kicker">Glossary</span><h3>용어 사전</h3><p>표기 사전에서 못 찾은 약어는 여기서 검색해 보세요.</p></a>
    </div>
  </section>
</div>`;

  return layout({
    fullTitle: '크로스핏 와드(WOD) 읽는 법 — 형식·표기 사전',
    desc:
      'AMRAP·EMOM·For Time 형식 사전과 (135/85)·@70-80%·alt.·Unbroken 표기 사전. ' +
      '처음 보는 화이트보드도 네 단계로 읽고 무게까지 정하는 법.',
    active: 'wod.html',
    path: 'wod.html',
    breadcrumbs: [{ name: '와드 읽는 법', path: 'wod.html' }],
    body,
    jsonld: [
      articleLd({
        path: 'wod.html',
        headline: '크로스핏 와드(WOD) 읽는 법',
        description:
          '크로스핏 화이트보드의 형식 줄·동작 줄·조건 줄·스케일 줄을 구분하는 법과, ' +
          '형식 사전·표기 사전·무게 고르는 기준.',
        section: '입문',
      }),
    ],
  });
}

/* --------------------------------------------------------- 와드 아카이브 */

const mvById = Object.fromEntries(movements.map((m) => [m.id, m]));

function wodCard(w, base = '') {
  const ids = movementIdsOf(w);
  const searchKey = [w.title, w.focus, w.box, ...w.tags, ...ids.map((id) => mvById[id]?.ko || ''), ...ids]
    .join(' ')
    .toLowerCase();
  return `<a class="card wod-card" href="${base}wods/${w.id}.html"
   data-mv data-cat-val="${esc(w.tags.join('|'))}" data-search="${esc(searchKey)}">
  <span class="kicker">${esc(w.box)}</span>
  <h3>${esc(w.title)}</h3>
  <p>${esc(w.summary)}</p>
  <div class="mv-meta">
    <span class="tag accent">${esc(w.focus)}</span>
    ${w.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
  </div>
  <div class="wod-mv-chips">
    ${ids.map((id) => `<span class="chipish">${esc(mvById[id].ko)}</span>`).join('')}
  </div>
</a>`;
}

function pageWods() {
  const tags = [...new Set(wods.flatMap((w) => w.tags))];

  // 동작별 그루핑 — 같은 동작이 여러 와드에 나오면 한 줄로 모인다
  const grouped = movements
    .map((m) => ({ mv: m, list: wodsByMovement[m.id] || [] }))
    .filter((g) => g.list.length)
    .sort((a, b) => b.list.length - a.list.length || a.mv.ko.localeCompare(b.mv.ko, 'ko'));

  const unused = movements.filter((m) => !(wodsByMovement[m.id] || []).length);

  const body = `
<div class="wrap">
  <p class="eyebrow">05 · WOD Archive</p>
  <h1>와드 아카이브</h1>
  <div class="answer-block">
    <p>
      실제 박스 화이트보드 <strong>${wods.length}장</strong>을 파트 단위로 나누고, 한 줄씩 "적힌 그대로 → 무슨 뜻인지"로
      풀어 놓은 아카이브입니다. 줄마다 해당 동작과 용어로 바로 넘어갈 수 있고,
      아래 <a href="#by-movement">동작별로 보기</a>에서는 반대로
      "이 동작이 어느 와드에 나왔는지"를 찾을 수 있습니다.
      같은 동작이 여러 와드에 나오면 자동으로 한 줄에 모입니다.
    </p>
  </div>

  <div class="mv-toolbar" style="margin-top:26px">
    <label class="sr-only" for="mv-search">와드 검색</label>
    <input class="mv-search" id="mv-search" type="search" placeholder="와드 검색 (예: 타바타, 덤벨, 스내치)" autocomplete="off">
    <div class="chipbar" role="group" aria-label="형식 필터">
      <button class="chip" data-cat="all" aria-pressed="true">전체</button>
      ${tags.map((t) => `<button class="chip" data-cat="${esc(t)}" aria-pressed="false">${esc(t)}</button>`).join('\n      ')}
    </div>
  </div>

  <div class="grid c2">
    ${wods.map((w) => wodCard(w)).join('\n    ')}
  </div>
  <p id="mv-empty" style="display:none;color:var(--text-mute);padding:30px 0">검색 결과가 없습니다.</p>

  <section class="section" id="by-movement">
    <h2>동작별로 보기</h2>
    <p class="lead">
      아카이브에 등장한 동작 ${grouped.length}개입니다. 여러 와드에 나온 동작이 위로 올라옵니다 —
      자주 나오는 동작부터 익히면 됩니다.
    </p>
    <div class="tbl-scroll">
    <table class="tbl">
      <caption class="sr-only">동작별로 어느 와드에 등장했는지</caption>
      <thead><tr><th scope="col">동작</th><th scope="col">등장</th><th scope="col">나온 와드</th></tr></thead>
      <tbody>
        ${grouped
          .map(
            (g) => `<tr>
          <th scope="row"><a href="movements/${esc(g.mv.id)}.html">${esc(g.mv.ko)}</a> <span class="en">${esc(g.mv.abbr)}</span></th>
          <td>${g.list.length}회</td>
          <td>${g.list.map((w) => `<a class="tag" href="wods/${esc(w.id)}.html">${esc(w.title)}</a>`).join(' ')}</td>
        </tr>`
          )
          .join('\n        ')}
      </tbody>
    </table>
    </div>
    ${
      unused.length
        ? `<p style="margin-top:16px;font-size:14px;color:var(--text-mute)">
      아직 아카이브에 안 나온 동작: ${unused.map((m) => `<a href="movements/${esc(m.id)}.html">${esc(m.ko)}</a>`).join(', ')}
    </p>`
        : ''
    }
  </section>

  <section class="section">
    <div class="callout">
      <strong>와드를 읽는 순서.</strong> 첫 줄의 형식(EMOM · AMRAP · For Time)을 먼저 보고,
      그다음 동작과 무게, 마지막으로 별표(*)로 시작하는 조건을 봅니다.
      표기 자체가 낯설다면 <a href="wod.html">와드 읽는 법</a>을 먼저 보세요.
    </div>
  </section>
</div>`;

  return layout({
    fullTitle: `크로스핏 와드 아카이브 — 실제 화이트보드 ${wods.length}장 해석`,
    desc:
      `실제 박스 와드 ${wods.length}장을 한 줄씩 해석하고 a/b/c 스케일링과 페이스 전략까지 정리했습니다. ` +
      '동작별로 어느 와드에 나왔는지도 찾아볼 수 있습니다.',
    active: 'wods.html',
    path: 'wods.html',
    breadcrumbs: [{ name: '와드 아카이브', path: 'wods.html' }],
    body,
    bodyEnd: `<script src="app.js" defer></script>`,
    jsonld: [
      {
        '@type': 'CollectionPage',
        '@id': canonicalFor('wods.html') + '#webpage',
        url: canonicalFor('wods.html'),
        name: '크로스핏 와드 아카이브',
        description: '실제 박스 화이트보드 와드를 한 줄씩 해석한 모음',
        inLanguage: site.lang,
        isPartOf: { '@id': site.url + '/#website' },
        dateModified: site.dateModified,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: wods.length,
          itemListElement: wods.map((w, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: w.title,
            url: canonicalFor(`wods/${w.id}.html`),
          })),
        },
      },
    ],
  });
}

function pageWodDetail(w, prev, next) {
  const base = '../';
  const path = `wods/${w.id}.html`;
  const ids = movementIdsOf(w);
  const totalLines = w.parts.reduce((n, p) => n + p.lines.length, 0);

  const body = `
<div class="wrap">
<article>
  <div class="mv-head">
    <span class="tag accent">${esc(w.focus)}</span>
    ${w.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}
    <span class="tag">${esc(w.box)}</span>
  </div>
  <h1>${esc(w.title)}</h1>

  <div class="answer-block">
    <p>${esc(w.summary)}</p>
    <table class="tbl facts">
      <caption class="sr-only">${esc(w.title)} 요약</caption>
      <tbody>
        <tr><th scope="row">출처</th><td>${esc(w.box)} 화이트보드</td></tr>
        <tr><th scope="row">구성</th><td>${w.parts.map((p) => esc(p.subtitle)).join(' → ')}</td></tr>
        <tr><th scope="row">등장 동작</th><td>${ids.map((id) => `<a href="${base}movements/${esc(id)}.html">${esc(mvById[id].ko)}</a>`).join(', ')}</td></tr>
        <tr><th scope="row">기록 방법</th><td>${esc(w.record)}</td></tr>
      </tbody>
    </table>
  </div>

  <section class="section">
    <h2>한 줄씩 해석하기</h2>
    <p class="lead">왼쪽이 화이트보드에 적힌 그대로, 오른쪽이 해석입니다. 총 ${totalLines}줄.</p>
    ${w.parts.map((part) => wodPartHtml(part, base)).join('\n    ')}
  </section>

  ${
    w.tiers
      ? `<section class="section">
    <h2>스케일링 사다리 (a / b / c)</h2>
    <p class="lead">
      화이트보드 구석에 작게 적힌 줄입니다. Rx 가 맨 위이고 아래로 갈수록 쉬워집니다.
      어느 줄로 갈지는 브리핑 때 코치가 정해 줍니다. — <a href="${base}terms.html#tier">표기 설명 보기</a>
    </p>
    <table class="tbl">
      <caption class="sr-only">${esc(w.title)} 스케일링 단계</caption>
      <thead><tr><th scope="col">단계</th><th scope="col">적힌 그대로</th><th scope="col">무슨 뜻인가</th></tr></thead>
      <tbody>
        ${w.tiers
          .map(
            (t) => `<tr>
          <th scope="row">${esc(t.tier)}</th>
          <td class="mono-cell">${esc(t.raw)}</td>
          <td>${esc(t.text)}</td>
        </tr>`
          )
          .join('\n        ')}
      </tbody>
    </table>
  </section>`
      : ''
  }

  <section class="section">
    <h2>어떻게 배분할까요</h2>
    <ul class="plain-list">
      ${w.strategy.map((s) => `<li>${esc(s)}</li>`).join('\n      ')}
    </ul>
  </section>

  <section class="section">
    <h2>이 와드에 나오는 동작</h2>
    <p class="lead">동작 이름을 누르면 단계별 애니메이션과 흔한 실수 교정법을 볼 수 있습니다.</p>
    <div class="grid c2">
      ${ids.map((id) => movementCard(mvById[id], base)).join('\n      ')}
    </div>
  </section>

  <nav class="pager" aria-label="다른 와드">
    ${prev ? `<a class="card" href="${esc(prev.id)}.html"><span class="kicker">← 이전 와드</span><h3>${esc(prev.title)}</h3></a>` : '<span></span>'}
    ${next ? `<a class="card" href="${esc(next.id)}.html"><span class="kicker">다음 와드 →</span><h3>${esc(next.title)}</h3></a>` : '<span></span>'}
  </nav>
</article>
</div>`;

  return layout({
    title: w.seoTitle,
    desc: w.seoDesc,
    active: 'wods.html',
    base,
    path,
    breadcrumbs: [
      { name: '와드 아카이브', path: 'wods.html' },
      { name: w.title, path },
    ],
    body,
    jsonld: [
      {
        ...articleLd({
          path,
          headline: `${w.title} — 와드 해석`,
          description: w.seoDesc,
          section: '와드',
        }),
        keywords: [...w.tags, '크로스핏', 'WOD', ...ids.map((id) => mvById[id].ko)].join(', '),
      },
    ],
  });
}

function pageTerms() {
  const allTerms = termGroups.flatMap((g) => g.terms);

  const body = `
<div class="wrap">
  <p class="eyebrow">03 · Glossary</p>
  <h1>크로스핏 용어 사전</h1>
  <div class="answer-block">
    <p>
      크로스핏 화이트보드에서 가장 자주 만나는 약어는 다섯 개입니다.
      <strong>WOD</strong>는 오늘의 운동, <strong>EMOM</strong>은 매 분 시작마다 정해진 렙 수행,
      <strong>AMRAP</strong>은 제한 시간 내 최대 라운드, <strong>Rx</strong>는 적힌 무게 그대로 수행,
      <strong>Scaled</strong>는 내 수준에 맞게 낮춰 수행을 뜻합니다.
      아래에 형식·무게 표기·자세·동작 약어·박스 문화 다섯 갈래로 ${allTerms.length}개 용어를 정리했습니다.
      한글·영문·약어 어느 쪽으로 검색해도 찾을 수 있습니다.
    </p>
  </div>

  <div class="mv-toolbar" style="margin-top:24px">
    <label class="sr-only" for="term-search">용어 검색</label>
    <input class="mv-search" id="term-search" type="search" placeholder="용어 검색 (예: emom, 스케일링, rx)" autocomplete="off">
  </div>

  ${termGroups
    .map(
      (g) => `<section class="section" data-term-group id="${esc(g.id)}">
    <h2>${esc(g.title)}</h2>
    <p class="lead">${esc(g.desc)}</p>
    <div class="grid c2">
      ${g.terms
        .map((t) => {
          const key = [t.term, t.full, t.ko, t.desc].join(' ').toLowerCase();
          const mvLink = t.movement
            ? `<a class="tag accent" href="movements/${esc(t.movement)}.html" style="margin-top:10px">동작 보기 →</a>`
            : '';
          return `<div class="term" id="${esc(t.id)}" data-term-search="${esc(key)}">
        <div class="head">
          <h3 class="t">${esc(t.term)}</h3>
          <span class="ko">${esc(t.ko)}</span>
          <span class="full">${esc(t.full)}</span>
        </div>
        <p>${esc(t.desc)}</p>
        ${t.example ? `<div class="ex">${esc(t.example)}</div>` : ''}
        ${mvLink}
      </div>`;
        })
        .join('\n      ')}
    </div>
  </section>`
    )
    .join('\n  ')}
</div>`;

  return layout({
    fullTitle: `크로스핏 용어 사전 — 약어 ${allTerms.length}개 한글 정리`,
    desc:
      'WOD, EMOM, AMRAP, Rx, 스케일링, 프론트 랙, 노렙 등 크로스핏 초보자가 자주 만나는 용어와 ' +
      '동작 약어를 한글·영문으로 검색할 수 있습니다.',
    active: 'terms.html',
    path: 'terms.html',
    breadcrumbs: [{ name: '용어 사전', path: 'terms.html' }],
    body,
    bodyEnd: `<script src="app.js" defer></script>`,
    jsonld: [
      {
        '@type': 'DefinedTermSet',
        '@id': canonicalFor('terms.html') + '#glossary',
        name: '크로스핏 용어 사전',
        description: '크로스핏 입문자가 자주 만나는 용어와 동작 약어 모음',
        url: canonicalFor('terms.html'),
        inLanguage: site.lang,
        publisher: { '@id': site.url + '/#organization' },
        hasDefinedTerm: allTerms.map((t) => ({
          '@type': 'DefinedTerm',
          '@id': canonicalFor('terms.html') + '#' + t.id,
          name: t.term,
          alternateName: t.ko,
          description: t.desc,
          inDefinedTermSet: canonicalFor('terms.html') + '#glossary',
          url: canonicalFor('terms.html') + '#' + t.id,
        })),
      },
    ],
  });
}

function pageMovements() {
  const cats = [...new Set(movements.map((m) => m.category))];
  const body = `
<div class="wrap">
  <p class="eyebrow">04 · Movement Library</p>
  <h1>크로스핏 동작 라이브러리</h1>
  <div class="answer-block">
    <p>
      동작마다 단계별 스켈레톤 애니메이션, 코치가 실제로 쓰는 큐, 흔한 실수와 교정법,
      그리고 어느 근육이 얼마나 일하는지를 정리했습니다. 현재 ${movements.length}개 동작이 등록되어 있고
      계속 추가됩니다. 카드를 눌러 상세로 들어가면 구간별로 멈춰 보거나 느리게 재생할 수 있습니다.
    </p>
  </div>

  <div class="mv-toolbar" style="margin-top:26px">
    <label class="sr-only" for="mv-search">동작 검색</label>
    <input class="mv-search" id="mv-search" type="search" placeholder="동작 검색 (예: 클린, jerk, DU)" autocomplete="off">
    <div class="chipbar" role="group" aria-label="분류 필터">
      <button class="chip" data-cat="all" aria-pressed="true">전체</button>
      ${cats.map((c) => `<button class="chip" data-cat="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join('\n      ')}
    </div>
  </div>

  <div class="grid c2">
    ${movements.map((m) => movementCard(m)).join('\n    ')}
  </div>
  <p id="mv-empty" style="display:none;color:var(--text-mute);padding:30px 0">검색 결과가 없습니다.</p>
</div>`;

  return layout({
    fullTitle: '크로스핏 동작 라이브러리 — 단계별 애니메이션과 사용 근육',
    desc:
      '크로스핏 주요 동작을 단계별 스켈레톤 애니메이션으로 보고 어느 근육이 일하는지 확인하세요. ' +
      '코치 큐와 흔한 실수 교정법도 함께 정리했습니다.',
    active: 'movements.html',
    path: 'movements.html',
    breadcrumbs: [{ name: '동작 라이브러리', path: 'movements.html' }],
    body,
    bodyEnd: `<script src="app.js" defer></script>`,
    jsonld: [
      {
        '@type': 'CollectionPage',
        '@id': canonicalFor('movements.html') + '#webpage',
        url: canonicalFor('movements.html'),
        name: '크로스핏 동작 라이브러리',
        description: '크로스핏 주요 동작의 단계별 설명과 사용 근육 모음',
        inLanguage: site.lang,
        isPartOf: { '@id': site.url + '/#website' },
        dateModified: site.dateModified,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: movements.length,
          itemListElement: movements.map((m, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${m.ko} (${m.en})`,
            url: canonicalFor(`movements/${m.id}.html`),
          })),
        },
      },
    ],
  });
}

function pageMovement(mv) {
  const base = '../';
  const path = `movements/${mv.id}.html`;
  const playerData = {
    id: mv.id,
    phases: mv.phases.map((p) => ({
      name: p.name,
      desc: p.desc,
      cues: p.cues || [],
      emphasis: p.emphasis || [],
      pose: p.pose,
    })),
  };

  const primary = mv.muscles.filter((m) => m.level === 'primary').map((m) => muscles[m.key].ko);
  const appearsIn = wodsByMovement[mv.id] || [];

  const related = mv.related
    .map((id) => movements.find((m) => m.id === id))
    .filter(Boolean)
    .map((m) => `<a class="tag accent" href="${m.id}.html">${esc(m.ko)} →</a>`)
    .join('');

  const termLinks = (mv.terms || [])
    .map((id) => termIndex[id])
    .filter(Boolean)
    .map((t) => `<a class="tag" href="${base}terms.html#${esc(t.id)}">${esc(t.term)} · ${esc(t.ko)}</a>`)
    .join('');

  const body = `
<div class="wrap">
<article>
  <div class="mv-head">
    <span class="tag accent">${esc(mv.abbr)}</span>
    <span class="tag">${esc(mv.category)}</span>
    <span class="tag">${esc(mv.level)}</span>
    ${mv.equipment.map((e) => `<span class="tag">${esc(e)}</span>`).join('')}
  </div>
  <h1>${esc(mv.ko)} <span class="h1-en">${esc(mv.en)}</span></h1>

  <div class="answer-block">
    <p>${esc(mv.intro)}</p>
    <table class="tbl facts">
      <caption class="sr-only">${esc(mv.ko)} 요약 정보</caption>
      <tbody>
        <tr><th scope="row">영문 명칭</th><td>${esc(mv.en)} (${esc(mv.abbr)})</td></tr>
        <tr><th scope="row">분류 · 난이도</th><td>${esc(mv.category)} · ${esc(mv.level)}</td></tr>
        <tr><th scope="row">필요 장비</th><td>${mv.equipment.map(esc).join(', ')}</td></tr>
        <tr><th scope="row">동작 단계</th><td>${mv.phases.length}단계 — ${mv.phases.map((p) => esc(p.name)).join(' → ')}</td></tr>
        <tr><th scope="row">주동근</th><td>${primary.map(esc).join(', ')}</td></tr>
        <tr><th scope="row">등장 와드</th><td>${
          appearsIn.length
            ? appearsIn.map((w) => `<a href="${base}wods/${esc(w.id)}.html">${esc(w.title)}</a>`).join(', ')
            : '아직 아카이브에 없음'
        }</td></tr>
      </tbody>
    </table>
  </div>

  <section class="section" style="margin-top:30px">
    <h2>어떻게 움직이나요</h2>
    <p class="lead">${esc(mv.tagline)}</p>
    ${playerMarkup(mv)}
    <p style="font-size:13px;color:var(--text-mute);margin-top:10px">
      단계 버튼을 누르거나 슬라이더를 끌어 원하는 구간을 볼 수 있습니다. 플레이어를 클릭한 뒤 ← → 키로 단계 이동, 스페이스로 재생/정지.
    </p>
  </section>

  <section class="section">
    <h2>어느 근육이 일하나요</h2>
    <p class="lead">${esc(mv.ko)}의 주동근은 ${primary.map(esc).join(', ')}입니다. 색이 진할수록 그 동작에서 큰 역할을 합니다.</p>
    ${muscleSection(mv)}
  </section>

  <section class="section">
    <h2>단계별로 무엇을 하나요</h2>
    <table class="tbl">
      <caption class="sr-only">${esc(mv.ko)} 단계별 동작과 코치 큐</caption>
      <thead><tr><th scope="col">단계</th><th scope="col">무엇을 하나</th><th scope="col">핵심 큐</th></tr></thead>
      <tbody>
        ${mv.phases
          .map(
            (p, i) => `<tr>
          <th scope="row">${i + 1}. ${esc(p.name)}</th>
          <td>${esc(p.desc)}</td>
          <td>${(p.cues || []).map((c) => esc(c)).join('<br>')}</td>
        </tr>`
          )
          .join('\n        ')}
      </tbody>
    </table>
  </section>

  <section class="section">
    <h2>왜 자꾸 안 될까요 — 흔한 실수와 교정</h2>
    <div class="grid c2">
      ${mv.faults
        .map(
          (f) => `<div class="fault">
        <h3 class="p">${esc(f.problem)}</h3>
        <p class="f">${esc(f.fix)}</p>
      </div>`
        )
        .join('\n      ')}
    </div>
  </section>

  <section class="section">
    <h2>아직 어렵다면 — 스케일링 옵션</h2>
    <p class="lead">무엇을 고를지는 코치와 상의하는 게 가장 빠릅니다.</p>
    <ul class="plain-list">
      ${mv.scaling.map((s) => `<li>${esc(s)}</li>`).join('\n      ')}
    </ul>
  </section>

  ${
    appearsIn.length
      ? `<section class="section">
    <h2>이 동작이 나온 와드</h2>
    <p class="lead">아카이브에 있는 실제 화이트보드입니다. 이 동작이 어떤 형식·무게로 나왔는지 그대로 볼 수 있습니다.</p>
    <div class="grid c2">
      ${appearsIn
        .map((w) => {
          const line = w.parts
            .flatMap((p) => p.lines)
            .find((l) => l.movement === mv.id);
          return `<a class="card" href="${base}wods/${esc(w.id)}.html">
        <span class="kicker">${esc(w.box)}</span>
        <h3>${esc(w.title)}</h3>
        ${line ? `<p class="wod-quote">${esc(line.raw)}</p>` : ''}
        <p>${esc(w.focus)}</p>
      </a>`;
        })
        .join('\n      ')}
    </div>
  </section>`
      : ''
  }

  ${
    related || termLinks
      ? `<section class="section">
    <h2>함께 보기</h2>
    <div class="related">${related}${termLinks}</div>
  </section>`
      : ''
  }
</article>
</div>

<script type="application/json" id="movement-data">${JSON.stringify(playerData).replace(/</g, '\\u003c')}</script>`;

  return layout({
    title: mv.seoTitle,
    desc: mv.seoDesc,
    active: 'movements.html',
    base,
    path,
    breadcrumbs: [
      { name: '동작 라이브러리', path: 'movements.html' },
      { name: mv.ko, path },
    ],
    body,
    bodyEnd: `<script src="${base}skeleton.js" defer></script>
<script src="${base}muscles.js" defer></script>
<script src="${base}app.js" defer></script>`,
    jsonld: [
      {
        ...articleLd({
          path,
          headline: `${mv.ko}(${mv.en}) 동작 방법과 사용 근육`,
          description: mv.seoDesc,
          section: mv.category,
        }),
        about: {
          '@type': 'Thing',
          name: mv.ko,
          alternateName: [mv.en, mv.abbr],
          description: mv.tagline,
        },
        keywords: [mv.ko, mv.en, mv.abbr, '크로스핏', mv.category, ...primary].join(', '),
      },
    ],
  });
}

/* -------------------------------------------------- robots / sitemap / llms */

function robotsTxt() {
  const aiCrawlers = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];
  return `# ${site.name}
User-agent: *
Allow: /

# AI 검색 크롤러 — 인용 노출을 위해 명시적으로 허용
${aiCrawlers.map((c) => `User-agent: ${c}\nAllow: /`).join('\n\n')}

Sitemap: ${abs('sitemap.xml')}
`;
}

function sitemapXml(pages) {
  const priority = (p) =>
    p === 'index.html' ? '1.0' : p.startsWith('movements/') || p.startsWith('wods/') ? '0.8' : '0.9';
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${canonicalFor(p)}</loc>
    <lastmod>${site.dateModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(p)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
}

function llmsTxt() {
  return `# ${site.name}

> ${site.description}

한국어(ko) 콘텐츠입니다. 모든 본문은 서버 렌더링된 정적 HTML 이며 JavaScript 없이도 전부 읽을 수 있습니다.

## 핵심 문서
- [크로스핏 처음 가는 날 — 수업 60분 흐름](${canonicalFor('basics.html')}): 브리핑·웜업·스킬/스트렝스·WOD·정리로 이어지는 수업 진행 순서와 첫 방문자 안내
- [크로스핏 와드(WOD) 읽는 법](${canonicalFor('wod.html')}): Every 1:00 x 8, Rounds For Time, (135/85), @70-80%, Time Cap 등 화이트보드 표기 해석과 기록 방법
- [크로스핏 용어 사전](${canonicalFor('terms.html')}): WOD·EMOM·AMRAP·Rx·스케일링 등 형식/무게/자세/약어/문화 5개 분류 용어집
- [동작 라이브러리](${canonicalFor('movements.html')}): 동작별 단계 분해, 코치 큐, 흔한 실수 교정, 사용 근육
- [와드 아카이브](${canonicalFor('wods.html')}): 실제 박스 화이트보드 ${wods.length}장을 파트·줄 단위로 해석. 동작별 역방향 색인 포함

## 와드 문서
${wods
  .map(
    (w) =>
      `- [${w.title}](${canonicalFor(`wods/${w.id}.html`)}): ${w.focus} — ${movementIdsOf(w)
        .map((id) => movements.find((m) => m.id === id).ko)
        .join(', ')}`
  )
  .join('\n')}

## 동작 문서
${movements
  .map((m) => `- [${m.ko} (${m.en})](${canonicalFor(`movements/${m.id}.html`)}): ${m.tagline}`)
  .join('\n')}

## 핵심 사실
- WOD(Workout of the Day)는 그날 모든 회원이 공통으로 하는 메인 운동이다.
- EMOM은 "Every Minute On the Minute"의 약자로, 매 분 시작마다 정해진 렙을 수행하고 남은 시간은 쉰다.
- AMRAP은 정해진 시간 동안 가능한 많은 라운드를 반복하는 형식이다.
- Rx는 와드에 적힌 무게·동작·가동범위를 그대로 수행하는 것이고, 낮춰서 수행하면 Scaled다.
- 와드의 (135/85) 표기는 앞이 남성, 뒤가 여성 권장 무게이며 단위는 파운드다.
- @70-80% 표기는 해당 리프트의 1RM(1회 최대 중량) 대비 비율을 뜻한다.
- Time Cap에 걸리면 그 시점까지 완료한 렙 수가 기록이 되며, 미완주는 실패가 아니다.
- 크로스핏 수업 한 타임은 보통 60분이다.

## 편집 방침
${site.editorialNote}
발행: ${site.name} / 최종 수정: ${site.dateModified}
`;
}

/* ------------------------------------------------------------- 검증 */

for (const mv of movements) {
  for (const ph of mv.phases) {
    const p = poses[ph.pose];
    if (!p) throw new Error(`[${mv.id}] 알 수 없는 포즈: "${ph.pose}"`);
    ph.pose = p;
    for (const key of ph.emphasis || []) {
      if (!muscles[key]) throw new Error(`[${mv.id}/${ph.name}] 알 수 없는 근육: "${key}"`);
    }
  }
  for (const m of mv.muscles) {
    if (!muscles[m.key]) throw new Error(`[${mv.id}] 알 수 없는 근육: "${m.key}"`);
    if (!levels[m.level]) throw new Error(`[${mv.id}] 알 수 없는 활성도: "${m.level}"`);
  }
  for (const id of mv.related) {
    if (!movements.some((x) => x.id === id)) throw new Error(`[${mv.id}] 알 수 없는 연관 동작: "${id}"`);
  }
  for (const id of mv.terms || []) {
    if (!termIndex[id]) throw new Error(`[${mv.id}] 알 수 없는 용어: "${id}"`);
  }
  if (!mv.seoTitle || !mv.seoDesc) throw new Error(`[${mv.id}] seoTitle / seoDesc 가 필요합니다`);
  if (!mv.muscles.some((m) => m.level === 'primary')) throw new Error(`[${mv.id}] 주동근이 하나도 없습니다`);
}

// 와드 — 줄에 달린 movement / term id 가 실제로 존재하는지 검사한다
{
  const seen = new Set();
  for (const w of wods) {
    if (seen.has(w.id)) throw new Error(`와드 id 가 중복입니다: "${w.id}"`);
    seen.add(w.id);
    if (!w.seoTitle || !w.seoDesc) throw new Error(`[wod:${w.id}] seoTitle / seoDesc 가 필요합니다`);
    if (!w.parts?.length) throw new Error(`[wod:${w.id}] parts 가 비어 있습니다`);
    for (const part of w.parts) {
      for (const line of part.lines) {
        if (!line.raw || !line.read || !line.explain) {
          throw new Error(`[wod:${w.id}/${part.label}] raw · read · explain 이 모두 필요합니다: "${line.raw}"`);
        }
        if (line.movement && !movements.some((m) => m.id === line.movement)) {
          throw new Error(`[wod:${w.id}] 알 수 없는 동작: "${line.movement}" (${line.raw})`);
        }
        if (line.term && !termIndex[line.term]) {
          throw new Error(`[wod:${w.id}] 알 수 없는 용어: "${line.term}" (${line.raw})`);
        }
      }
    }
  }
  if (wods.filter((w) => w.guide).length > 1) throw new Error('guide:true 와드는 한 개만 둘 수 있습니다');
}

// 와드 문법 — 용어 id 와 태그가 실제로 존재하는지 검사한다.
// 태그가 오타면 "아카이브 예시 없음" 으로 조용히 사라지므로 빌드에서 잡는다.
{
  const allTags = new Set(wods.flatMap((w) => w.tags));
  for (const f of formats) {
    if (f.term && !termIndex[f.term]) throw new Error(`[grammar:${f.id}] 알 수 없는 용어: "${f.term}"`);
    if (f.tag && !allTags.has(f.tag)) {
      throw new Error(`[grammar:${f.id}] 아카이브에 없는 태그: "${f.tag}" — data/wods.js 의 tags 와 맞추세요`);
    }
  }
  for (const g of notationGroups) {
    for (const r of g.rows) {
      if (r.term && !termIndex[r.term]) {
        throw new Error(`[grammar:${g.id}] 알 수 없는 용어: "${r.term}" (${r.wrote})`);
      }
    }
  }
  // 가이드 와드에서 총량 계산 예시를 뽑으므로 메트콘 파트가 있어야 한다
  const gm = guideWod.parts.find((p) => p.kind === 'metcon') || guideWod.parts.at(-1);
  if (!gm?.lines?.length) throw new Error(`[grammar] guide 와드(${guideWod.id})에서 총량 예시를 뽑을 수 없습니다`);
}

if (!/^https?:\/\/[^/]+/.test(site.url)) {
  throw new Error(`data/site.js 의 SITE_URL 이 절대 URL 이 아닙니다: "${site.url}"`);
}

/* ------------------------------------------------------------- 실행 */

await rm(DIST, { recursive: true, force: true });
await mkdir(join(DIST, 'movements'), { recursive: true });
await mkdir(join(DIST, 'wods'), { recursive: true });

const pages = [
  ['index.html', pageHome()],
  ['basics.html', pageBasics()],
  ['wod.html', pageWod()],
  ['wods.html', pageWods()],
  ['terms.html', pageTerms()],
  ['movements.html', pageMovements()],
  ...wods.map((w, i) => [`wods/${w.id}.html`, pageWodDetail(w, wods[i - 1], wods[i + 1])]),
  ...movements.map((m) => [`movements/${m.id}.html`, pageMovement(m)]),
];

for (const [file, html] of pages) {
  await writeFile(join(DIST, file), html, 'utf8');
}

// public/ 재귀 복사
async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    const dst = join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await copyFile(src, dst);
  }
}
await copyDir(join(ROOT, 'public'), DIST);

const urls = pages.map(([f]) => f);
await writeFile(join(DIST, 'sitemap.xml'), sitemapXml(urls), 'utf8');
await writeFile(join(DIST, 'robots.txt'), robotsTxt(urls), 'utf8');
await writeFile(join(DIST, 'llms.txt'), llmsTxt(), 'utf8');
await writeFile(join(DIST, '.nojekyll'), '', 'utf8'); // GitHub Pages: Jekyll 처리 끄기

console.log(`✔ ${pages.length}개 페이지 + sitemap.xml / robots.txt / llms.txt 생성 → dist/`);
console.log(`  기준 URL: ${site.url}`);
if (site.url.includes('jonghoonpark.github.io')) {
  console.log('  ↑ 기본값입니다. 실제 주소가 다르면 data/site.js 의 DEFAULT_URL 을 고치거나');
  console.log('     SITE_URL=https://... npm run build 로 빌드하세요.');
}
