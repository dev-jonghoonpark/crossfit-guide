/* =========================================================================
   check-sitemap.mjs — 빌드된 dist/sitemap.xml 을 배포 전에 검증한다.

     node tools/check-sitemap.mjs          (SITE_URL 은 빌드할 때와 같은 값으로)

   구글 서치 콘솔이 "사이트맵을 읽을 수 없음" 을 띄우는 원인 중
   저장소 안에서 막을 수 있는 것들을 여기서 전부 걸러낸다.
   오류가 하나라도 있으면 종료 코드 1 — CI 가 배포를 멈춘다.
   ========================================================================= */

import { readFile, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../data/site.js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');
const SITEMAP = join(DIST, 'sitemap.xml');

/** 사이트맵 프로토콜 상한 */
const MAX_URLS = 50_000;
const MAX_BYTES = 50 * 1024 * 1024;

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const exists = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

/* ------------------------------------------------------------ 원문 읽기 */

if (!(await exists(SITEMAP))) {
  console.error('✖ dist/sitemap.xml 이 없습니다. 먼저 `npm run build` 를 실행하세요.');
  process.exit(1);
}

const raw = await readFile(SITEMAP);
const xml = raw.toString('utf8');

// BOM·선행 공백이 있으면 크롤러가 XML 로 인식하지 못한다.
if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) err('파일 맨 앞에 BOM 이 있습니다.');
if (/^\s/.test(xml)) err('XML 선언 앞에 공백/줄바꿈이 있습니다.');
if (!xml.startsWith('<?xml')) err('`<?xml` 선언으로 시작하지 않습니다.');
if (raw.length > MAX_BYTES) err(`압축 전 ${MAX_BYTES} 바이트를 넘었습니다 (${raw.length}). 사이트맵을 분할하세요.`);

if (!/<urlset[^>]*xmlns\s*=\s*"http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(xml)) {
  err('urlset 에 sitemaps.org 0.9 네임스페이스가 없습니다.');
}

/* ------------------------------------------------ 태그 짝 · 개수 맞추기 */

const count = (re) => (xml.match(re) || []).length;
const nUrlOpen = count(/<url>/g);
const nUrlClose = count(/<\/url>/g);
const nLoc = count(/<loc>/g);

if (nUrlOpen !== nUrlClose) err(`<url> ${nUrlOpen}개 / </url> ${nUrlClose}개 — 태그 짝이 맞지 않습니다.`);
if (nLoc !== nUrlOpen) err(`<url> ${nUrlOpen}개인데 <loc> 은 ${nLoc}개입니다.`);
if (nLoc === 0) err('URL 이 하나도 없습니다.');
if (nLoc > MAX_URLS) err(`URL 이 ${nLoc}개로 상한(${MAX_URLS})을 넘었습니다. 사이트맵을 분할하세요.`);

/* ------------------------------------------------------------ 각 URL 검사 */

const prefix = site.url + '/';
const today = new Date().toISOString().slice(0, 10);
const seen = new Set();

for (const m of xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)) {
  const loc = m[1];

  if (loc !== loc.trim()) err(`<loc> 안에 공백이 섞였습니다: ${JSON.stringify(loc)}`);
  // XML 이스케이프가 끝난 뒤에도 남아 있으면 안 되는 문자
  if (/[<>"]|&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(loc)) err(`<loc> 에 이스케이프되지 않은 문자가 있습니다: ${loc}`);
  // 퍼센트 인코딩 안 된 비ASCII 는 크롤러마다 해석이 갈린다.
  if (/[^\x21-\x7e]/.test(loc)) err(`<loc> 에 퍼센트 인코딩되지 않은 문자가 있습니다: ${loc}`);

  if (!loc.startsWith('https://')) err(`https 가 아닙니다: ${loc}`);
  // 사이트맵은 자기가 놓인 경로 이하의 URL 만 다룰 수 있다 (구글 규칙).
  if (!loc.startsWith(prefix)) err(`사이트맵 위치(${prefix}) 밖의 URL 입니다: ${loc}`);

  if (seen.has(loc)) err(`URL 이 중복됐습니다: ${loc}`);
  seen.add(loc);

  // 실제로 배포되는 파일인지 — 404 가 섞이면 "발견된 페이지" 가 깎인다.
  if (loc.startsWith(prefix)) {
    const rel = loc.slice(prefix.length) || 'index.html';
    const file = rel.endsWith('/') ? join(rel, 'index.html') : rel;
    if (!(await exists(join(DIST, file)))) err(`dist 에 해당 파일이 없습니다: ${loc} → dist/${file}`);
  }
}

for (const m of xml.matchAll(/<lastmod>([\s\S]*?)<\/lastmod>/g)) {
  const v = m[1].trim();
  if (!/^\d{4}-\d{2}-\d{2}(T[\d:.+\-Z]+)?$/.test(v)) err(`lastmod 가 W3C Datetime 형식이 아닙니다: ${v}`);
  else if (v.slice(0, 10) > today) err(`lastmod 가 미래 날짜입니다 (data/site.js 의 dateModified 확인): ${v}`);
}

/* ------------------------------------- robots.txt 와 사이트맵 주소 맞추기 */

const robotsPath = join(DIST, 'robots.txt');
if (!(await exists(robotsPath))) {
  err('dist/robots.txt 가 없습니다.');
} else {
  const robots = await readFile(robotsPath, 'utf8');
  const declared = (robots.match(/^\s*Sitemap:\s*(\S+)\s*$/im) || [])[1];
  const expected = prefix + 'sitemap.xml';
  if (!declared) err('robots.txt 에 Sitemap: 줄이 없습니다.');
  else if (declared !== expected) err(`robots.txt 의 Sitemap 주소가 다릅니다.\n    선언: ${declared}\n    기대: ${expected}`);
}

// github.io 프로젝트 사이트에서는 robots.txt 가 하위 경로에 있어 크롤러가 읽지 않는다.
// (크롤러는 호스트 루트의 /robots.txt 만 본다)
const { pathname } = new URL(site.url);
if (pathname !== '/' && pathname !== '') {
  const origin = new URL(site.url).origin;
  warn(
    `배포 주소가 하위 경로(${pathname})라 ${origin}/robots.txt 만 크롤러가 읽습니다.\n` +
      `    → 여기서 만드는 dist/robots.txt 는 구글이 보지 않습니다.\n` +
      `      크롤링 규칙과 Sitemap: 선언은 사용자 사이트 저장소\n` +
      `      (github.com/dev-jonghoonpark/dev-jonghoonpark.github.io) 의 robots.txt 에서 관리합니다.\n` +
      `      서치 콘솔 속성은 ${prefix} 로 잡아야 합니다 (호스트 루트로 잡으면 사이트맵이 범위 밖).`
  );
}

/* ------------------------------------------------------------------ 결과 */

for (const w of warnings) console.warn(`△ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);

if (errors.length) {
  console.error(`\n사이트맵 검사 실패 — 오류 ${errors.length}건`);
  process.exit(1);
}
console.log(`✔ sitemap.xml 검사 통과 — URL ${nLoc}개 · ${raw.length} 바이트 · 기준 ${prefix}`);
