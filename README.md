# 크로스핏 가이드

크로스핏 입문자를 위한 정적 사이트. 용어·수업 운영 방식·동작 설명·실제 와드 해석을 담고 있고,
동작은 **단계별 스켈레톤 애니메이션**과 **근육 활성화 지도**로 보여준다.

콘텐츠는 두 축으로 묶여 있다 — **동작별**(`data/movements.js`)과 **와드별**(`data/wods.js`).
와드의 각 줄에 동작 id 를 달아 두면 빌드가 양방향 링크를 자동으로 만든다.
같은 동작이 여러 와드에 나오면 동작 페이지 하나로 모인다.

빌드 도구·프레임워크·런타임 의존성이 하나도 없다. Node 만 있으면 된다.

## 실행

```bash
npm run build   # data/*.js → dist/ 로 정적 HTML 생성
npm run dev     # 빌드 후 http://localhost:4173 에서 서빙
```

`dist/` 전체를 그대로 어디든 올리면 된다 (GitHub Pages, Netlify, S3 …).

> ⚠️ **배포 전에 반드시** `data/site.js` 의 `DEFAULT_URL` 을 실제 주소로 고칠 것.
> canonical · og:url · sitemap.xml · llms.txt · JSON-LD 가 전부 이 값을 기준으로 생성된다.
> 한 번만 다르게 빌드하려면 `SITE_URL=https://내도메인.com npm run build`.

## 구조

```
data/            ← 여기만 고치면 된다
  site.js          사이트 URL·발행 정보·수정일 (SEO 단일 출처)
  poses.js         스켈레톤 포즈 라이브러리 (관절 좌표)
  movements.js     동작 데이터 (단계·큐·실수·스케일링·근육·SEO 문구)
  muscles.js       근육 그룹 사전
  terms.js         용어 사전
  wods.js          와드 아카이브 (화이트보드 원문 + 줄별 해석 + 스케일링)
  wod-grammar.js   와드 "문법" — 읽는 순서 · 형식 사전 · 표기 사전 · 무게 기준
  basics.js        수업 흐름 / 첫 방문 팁
public/          ← 그대로 dist/ 로 복사됨
  styles.css
  skeleton.js      스켈레톤 렌더러 + 플레이어 (의존성 없음)
  muscles.js       앞/뒤 인체 근육 지도 SVG
  app.js           페이지 부트스트랩 (검색/필터/플레이어 연결)
  og-default.png   OG 대표 이미지 1200×630
tools/
  make-og-template.mjs   OG 이미지 템플릿 생성기
build.mjs        정적 HTML 생성기
dist/            생성물 (커밋 안 함)
```

`build.mjs` 는 `public/skeleton.js` 와 `public/muscles.js` 를 Node 에서 그대로 실행해
목록 썸네일과 근육 지도를 빌드 타임에 뽑는다. 렌더링 코드는 한 벌만 존재한다.

## 동작 추가하기

### 1. 포즈 만들기 — `data/poses.js`

측면 뷰, 오른쪽을 바라보는 좌표계다. `viewBox 0 0 260 330`, 바닥선 `y = 300`.

```js
myPose: pose({
  head: [119, 68],
  neck: [117, 86],
  shoulder: [117, 94],
  elbowF: [122, 145],   // F = 카메라에 가까운 쪽 (진하게 그려짐)
  wristF: [126, 196],
  hip:  [117, 162],
  kneeF: [120, 226],
  ankleF: [118, 292],
  toeF: [140, 297],
  heelF: [104, 297],
  bar: [126, 196],      // 도구. 없으면 생략 (아래 표 참고)
  ropeAngle: 135,       // 줄넘기 줄 각도(도, 누적값). 없으면 생략
}),
```

포즈에 실을 수 있는 도구(prop). 전부 `[x, y]` 라서 구간 사이 보간이 그대로 먹는다:

| 키 | 그리는 것 |
|---|---|
| `bar` | 바벨 (측면이라 원판이 원으로 보임) |
| `dbF` / `dbB` | 덤벨 — 가까운 손 / 먼 손 |
| `ball` | 메디신볼 · 월볼 |
| `rig` | 철봉 |
| `ringF` / `ringB` | 링 (천장에서 스트랩이 내려온다) |
| `box` | 플라이오 박스 `[중심x, 윗면y]` |
| `bench` | 벤치 `[중심x, 패드 윗면y]` |
| `riserF` / `riserB` | 손 받침 (원판·매트) |
| `wall` / `target` | 벽 / 월볼 타깃 |
| `rower` | 로잉 머신 시트 — 레일·플라이휠·체인은 자동 |
| `ropeAngle` | 줄넘기 (숫자, 누적 각도) |

- 적지 않은 관절은 서 있는 기본 자세(`BASE`)에서 가져온다.
- `~B`(먼 쪽 팔·다리)를 적지 않으면 `~F` 에서 x축 -8 만큼 옮겨 자동 생성된다.
  스플릿 저크처럼 좌우가 다른 자세만 `~B` 를 직접 적으면 된다.
- 기존 포즈(`extension`, `pullUnder`, `squatCatch` …)는 여러 동작에서 재사용한다.
- 월볼(`wb*`)과 바 뮤스클업(`bmu*`)만 사람을 작게 그린다. 화면(260×330)에 사람을
  같은 크기로 그리면 월볼 타깃(바닥에서 사람 키의 1.6배)이나 서포트 락아웃이
  화면 밖으로 나가 버려서, 그 계열만 0.6~0.7배로 줄이고 `pose(over, dx)` 의
  두 번째 인자로 먼 쪽 팔·다리 간격도 같이 줄였다.

### 2. 동작 등록 — `data/movements.js`

```js
{
  id: 'thruster',            // URL 이 movements/thruster.html 이 된다
  thumb: 2,                  // 목록 썸네일로 쓸 단계 index (선택)
  ko: '스러스터', en: 'Thruster', abbr: 'TH',
  category: '역도',          // 목록 필터 칩이 자동 생성됨
  level: '초중급',
  equipment: ['바벨'],
  tagline: '한 줄 요약',
  intro: '문단 설명',
  phases: [
    {
      name: '단계 이름',
      pose: 'myPose',                    // poses.js 의 키
      desc: '이 구간에서 무엇을 하는지',
      cues: ['코치 큐 1', '코치 큐 2'],
      emphasis: ['quads', 'glutes'],     // 이 구간에 강조될 근육
    },
  ],
  muscles: [                             // level: primary | secondary | stabilizer
    { key: 'quads', level: 'primary' },
  ],
  faults:  [{ problem: '흔한 실수', fix: '교정법' }],
  scaling: ['스케일링 옵션'],
  related: ['squat-clean'],              // 다른 동작 id
  terms:   ['front-rack'],               // terms.js 의 용어 id

  // SEO — 빌드가 존재를 강제한다
  seoTitle: '스러스터 동작 방법과 사용 근육',   // 한국어 25~30자 (뒤에 " | 크로스핏 가이드" 가 붙음)
  seoDesc:  '스러스터는 …입니다. …를 정리했습니다.',  // 한국어 75~90자
}
```

### 3. 빌드

```bash
npm run build
```

빌드가 포즈 이름·근육 키·활성도 단계·연관 동작 id·용어 id 를 전부 검증한다.
오타가 있으면 어느 동작의 어느 단계인지 알려주고 빌드가 멈춘다.

## SEO / GEO

빌드가 자동으로 만들어 주는 것:

| 항목 | 위치 |
|---|---|
| canonical · og:* · twitter:* · robots meta | 각 페이지 `<head>` |
| JSON-LD `@graph` | Organization + WebSite + 페이지별 노드 |
| BreadcrumbList | 홈 제외 전 페이지 (화면 표시 + 스키마) |
| `sitemap.xml` | 절대 URL · lastmod · priority |
| `robots.txt` | GPTBot·ClaudeBot·PerplexityBot 등 AI 크롤러 명시 허용 |
| `llms.txt` | AI 검색용 문서 지도 + 핵심 사실 목록 |
| `.nojekyll` | GitHub Pages 용 |

페이지별 스키마 타입:

| 페이지 | 타입 |
|---|---|
| 홈 | `WebPage` |
| 처음 오셨나요 / 와드 읽는 법 / 와드 상세 / 동작 상세 | `Article` (+ 동작은 `about`, `keywords`) |
| 동작 라이브러리 / 와드 아카이브 | `CollectionPage` + `ItemList` |
| 용어 사전 | `DefinedTermSet` + `DefinedTerm` × 전체 용어 |

`HowTo` 스키마는 2023년 9월 리치 결과에서 제거되어 쓰지 않는다.
`FAQPage` 도 2023년 8월부터 정부·의료 사이트로 제한되어 넣지 않았다 —
대신 각 페이지 상단에 **자문자답형 요약 블록**(`.answer-block`)을 두어
AI 검색이 그대로 인용할 수 있는 130~170자 자립 문단을 만들어 두었다.

콘텐츠를 크게 고쳤으면 `data/site.js` 의 `dateModified` 를 갱신할 것.

### OG 이미지 다시 만들기

```bash
npm run og                       # dist/og-template.html 생성
npm run dev                      # 서버 띄우고
# 브라우저 1200×630 뷰포트로 /og-template.html 캡처 → public/og-default.png 로 저장
```

## 용어 추가하기

`data/terms.js` 의 `termGroups` 중 맞는 그룹에 항목을 넣는다.
`movement: '<동작 id>'` 를 넣으면 동작 상세로 가는 링크가 자동으로 붙는다.

## 와드 추가하기

`data/wods.js` 배열에 항목 하나를 추가한다. 화이트보드 사진을 그대로 옮겨 적는 게 전부다.

> **순서 규칙**: 배열 순서가 곧 화면 표시 순서다. **새 와드는 배열 맨 앞에 넣는다**(최신순).
> 날짜 필드는 일부러 두지 않았다 — 화이트보드 사진에 날짜가 적혀 있지 않아서,
> 추측한 날짜를 넣으면 사실이 아닌 정보가 페이지에 남는다.

```js
{
  id: 'emom-32-pistol-wallball',   // URL 이 wods/<id>.html 이 된다
  box: 'RNL CrossFit',
  title: 'EMOM 32 — 머신 · 피스톨 · 머신 · 월볼',
  focus: '32분 롱 EMOM',            // 카드에 크게 표시
  tags: ['EMOM', '롱 메트콘'],       // 목록 필터 칩이 자동 생성됨
  summary: '이 와드가 뭘 노리는지 2~3문장',
  parts: [
    {
      label: '2',
      kind: 'metcon',               // warmup | strength | metcon
      subtitle: '메인 WOD',
      lines: [
        {
          raw: '16 Pistol Squats alt.',   // 화이트보드에 적힌 그대로
          read: '피스톨 스쿼트 16회, 좌우 번갈아',
          explain: '왜 그런지 · 무엇을 조심할지',
          movement: 'pistol-squat',       // ← 이 한 줄이 양방향 링크를 만든다
          term: 'alt',                    // terms.js 의 용어 id (선택)
        },
      ],
      summary: '이 파트 전체 요약',
    },
  ],
  tiers: [                          // 화이트보드 구석의 a/b/c 스케일링 (선택)
    { tier: 'a', raw: '1Scaled', text: '무슨 뜻인지' },
  ],
  strategy: ['페이스 배분 팁'],
  record: '기록을 어떻게 남기는지',
  seoTitle: '…',
  seoDesc: '…',
}
```

- `movement` 에 적은 id 가 **이미 있는 동작이면 그냥 연결된다**. 새 동작이면
  `data/movements.js` 에 먼저 추가해야 빌드가 통과한다.
- 빌드가 만들어 주는 것: 와드 상세 페이지, 목록의 동작 칩,
  동작 페이지의 "이 동작이 나온 와드" 섹션, `wods.html` 의 **동작별로 보기** 표.
- `guide: true` 는 "와드 읽는 법" 튜토리얼 맨 아래 예제로 쓰는 와드다. 한 개만 둘 수 있다.
  그 페이지의 "총량을 곱해 봅니다" 계산도 이 와드의 메트콘 파트에서 숫자를 뽑아 쓰므로,
  `kind: 'metcon'` 파트가 하나는 있어야 한다.

## 와드 표기 추가하기 — `data/wod-grammar.js`

"와드 읽는 법" 페이지는 특정 와드가 아니라 **모든 와드에 통하는 규칙**을 다룬다.
새 형식이나 처음 보는 표기를 아카이브에 추가했다면 여기에도 한 줄 넣는다.

```js
// formats — 첫 줄(형식) 사전
{
  id: 'amrap',
  name: 'AMRAP',
  wrote: ['AMRAP 20', 'AMRAP 23'],   // 화이트보드에 적힌 그대로
  means: '뒤의 숫자가 분(分)이다…',
  clock: '시계를 어떻게 보는지',
  score: '무엇을 기록하는지',
  term: 'amrap',      // terms.js 의 용어 id → 용어 사전 링크
  tag: 'AMRAP',       // wods.js 의 tags → "실제 와드" 예시가 자동으로 붙는다
}

// notationGroups — 괄호·기호·약어 사전
{ wrote: '(135/85)', read: '남 135lb / 여 85lb', note: '…', term: 'lbs-notation' }
```

원칙 하나: **`wrote` 에는 아카이브에 실제로 등장한 표기만 넣는다.**
지어낸 예시는 넣지 않는다. 아직 아카이브에 없는 형식은 `wrote: []`, `tag: null` 로 두면
"아카이브 예시 없음"으로 표시된다.

빌드가 `term` 과 `tag` 를 검증한다. 태그 오타는 조용히 "예시 없음"이 되어 버리므로
빌드에서 멈추게 해 두었다.
- 화이트보드에서 읽을 수 없는 값(날짜·작성자 등)은 **추측해서 채우지 않는다.**
  적혀 있는 것만 `raw` 로 옮기고, 해석은 `read` / `explain` 에 쓴다.

## 현재 수록된 내용

RNL CrossFit 화이트보드 9장에서 뽑았다.

| 분류 | 동작 |
|---|---|
| 역도 | 스쿼트 클린 · 행 스쿼트 클린 · 행 파워 클린 · 스플릿 저크 · 푸시 저크 · 클린 앤 저크 · 데드리프트 · SDHP · 벤치 프레스 · 파워 스내치 · 행 파워 스내치 · 스쿼트 스내치 |
| 체조 | 풀업 · 체스트 투 바 · 바 뮤스클업 · 토투바 · 링 딥 · HSPU · 푸시업 · 디피싯 푸시업 · 에어 스쿼트 · 피스톨 스쿼트 |
| 덤벨 | 덤벨 스내치 · 덤벨 데드리프트 · 덤벨 파워 클린 · 덤벨 행 파워 클린 · 덤벨 프론트 스쿼트 · 덤벨 파머스 캐리 · 덤벨 S2OH |
| 기타 기구 | 월볼 · 박스 점프 |
| 모노스트럭처 | 더블 언더 · 로잉 |

와드 9장은 `wods.html` 에서 형식·태그별로 필터링해 볼 수 있다.

## 주의

의학적·전문 코칭 자료가 아니다. 실제 동작은 자격을 갖춘 코치에게 배우자.
