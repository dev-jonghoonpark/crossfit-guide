/**
 * 와드 "문법" 데이터 — 특정 와드가 아니라 **모든 와드에 공통으로 적용되는 규칙**.
 *
 * 여기 실린 표기(wrote)는 전부 data/wods.js 의 실제 화이트보드 원문에서 뽑았다.
 * 지어낸 예시를 넣지 않는다 — 새 표기를 추가할 땐 아카이브에 실제로 등장한 뒤에 넣는다.
 *
 * 필드
 *   tag   data/wods.js 의 tags 값. 붙어 있으면 "이 형식이 실제로 쓰인 와드" 링크가 자동 생성된다.
 *   term  data/terms.js 의 용어 id. 붙어 있으면 용어 사전으로 링크된다.
 */

/* ------------------------------------------------------------ 읽는 순서 */

export const readingSteps = [
  {
    n: 1,
    title: '형식 줄을 먼저 찾는다',
    desc:
      '각 파트의 첫 줄이 거의 항상 형식이다. ' +
      '"몇 분 동안" 또는 "몇 라운드"가 적혀 있으면 그 줄이다. 형식을 모르면 나머지 숫자는 아무 의미가 없다.',
    look: ['AMRAP 20', 'EMOM 32', '10 Rounds For Time', 'Every 2:00 x 5', 'TABATA'],
  },
  {
    n: 2,
    title: '한 라운드에 뭘 몇 개 하는지 센다',
    desc:
      '형식 줄 아래 들여쓰기된 줄들이 한 라운드의 내용이다. ' +
      '동작 앞의 숫자가 반복 횟수다. 번호(①②③)가 붙어 있으면 라운드마다 도는 스테이션이라는 뜻이다.',
    look: ['3 Hang Squat clean', '30 Double Unders', '2.16 Pistol Squats alt.'],
  },
  {
    n: 3,
    title: '총량을 곱해 본다',
    desc:
      '라운드당 개수 × 라운드 수 = 오늘 실제로 할 개수다. ' +
      '이 숫자를 보기 전에 무게를 정하면 거의 항상 너무 무겁게 고른다.',
    look: ['10 Rounds × 3 = 30회', 'EMOM 32 ÷ 4스테이션 = 각 8회'],
  },
  {
    n: 4,
    title: '무게와 스케일을 정한다',
    desc:
      '괄호 안 숫자가 Rx 무게다. 총량을 기준으로 "마지막 라운드까지 폼이 남을 무게"를 고른다. ' +
      '화이트보드 구석의 a / b / c 는 코치가 미리 준비해 둔 하향 옵션이다.',
    look: ['(135/85)', '@Clean & Jerk 70-80%', '1Scaled', 'Broken ok'],
  },
];

/* ------------------------------------------------------------- 형식 사전 */

export const formats = [
  {
    id: 'for-time',
    name: 'For Time / Rounds For Time',
    wrote: ['10 Rounds For Time', '3 Rounds For Time'],
    means: '정해진 양을 최대한 빨리 끝낸다. 앞의 숫자가 반복할 라운드 수다.',
    clock: '시계는 0부터 올라간다. 다 끝낸 순간의 시간이 기록.',
    score: '완료 시간 (짧을수록 좋음)',
    term: 'rft',
    tag: 'For Time',
  },
  {
    id: 'amrap',
    name: 'AMRAP',
    wrote: ['AMRAP 20', 'AMRAP 23'],
    means: '뒤의 숫자가 분(分)이다. 그 시간 동안 아래 라운드를 계속 돈다.',
    clock: '시계가 0에서 정해진 시간까지 올라가고 거기서 끝난다.',
    score: '완료 라운드 + 다음 라운드에서 넘긴 렙',
    term: 'amrap',
    tag: 'AMRAP',
  },
  {
    id: 'emom',
    name: 'EMOM',
    wrote: ['EMOM 32', 'Every 1:00 x 8', 'Every 01:00 x 8'],
    means:
      '매 분이 시작될 때 정해진 양을 하고 남은 시간은 쉰다. ' +
      '동작이 여러 개면 분마다 하나씩 번갈아 간다.',
    clock: '1분 간격으로 알림이 울린다. 빨리 끝낼수록 오래 쉰다.',
    score: '사용한 무게 / 개수를 다 채웠는지 여부',
    term: 'emom',
    tag: 'EMOM',
  },
  {
    id: 'exmom',
    name: 'E2MOM · Every X:00',
    wrote: ['E2MOM 20', 'Every 2:00 x 5', 'Every 70seconds x 12sets'],
    means:
      'EMOM의 간격이 1분이 아닌 버전. E2MOM 20 은 2분 간격으로 20분(=10라운드), ' +
      'Every 2:00 x 5 는 2분 간격으로 5라운드(=10분)라는 뜻이다. ' +
      '간격이 초로 적히기도 한다 — Every 70seconds x 12sets 는 70초 간격 12세트(=14분)다.',
    clock: '간격 × 라운드 = 총 시간. 둘 중 어느 쪽이 적혔는지 확인한다.',
    score: '사용한 무게 / 라운드별 성공 여부',
    term: 'e2mom',
    tag: 'E2MOM',
  },
  {
    id: 'interval',
    name: 'Interval (On / Off)',
    wrote: ['5set 30Seconds On 60Seconds Off'],
    means:
      '앞이 운동 시간, 뒤가 휴식 시간이다. 정해진 세트만큼 반복한다. ' +
      '휴식이 운동보다 길면 매 세트를 전력으로 하라는 뜻이다.',
    clock: '(운동 + 휴식) × 세트 = 총 시간. 30/60 × 5세트면 7분 30초.',
    score: '세트별 결과(칼로리·개수)를 각각 적는다',
    term: 'on-off',
    tag: '인터벌',
  },
  {
    id: 'tabata',
    name: 'Tabata',
    wrote: ['TABATA', '20sec on 10sec off x 8sets'],
    means: '20초 운동 + 10초 휴식을 8세트. 한 동작당 4분이 걸린다.',
    clock: '20/10 이 8번 반복되고 끝난다.',
    score: '가장 적게 한 세트의 개수 (또는 총합)',
    term: 'tabata',
    tag: '타바타',
  },
  {
    id: 'rep-scheme',
    name: '렙 스킴 (숫자-숫자-숫자)',
    wrote: ['5-5-3-3-2'],
    means:
      '라운드마다 개수가 바뀐다. 5-5-3-3-2 는 5회 → 5회 → 3회 → 3회 → 2회 다섯 세트라는 뜻. ' +
      '스트렝스 파트에서는 개수가 줄어드는 만큼 무게를 올린다.',
    clock: '보통 시간 제한 없이 세트 사이에 충분히 쉰다.',
    score: '세트별 무게',
    term: null,
    tag: '스트렝스',
  },
  {
    id: 'odd-even',
    name: 'Odd / Even Round',
    wrote: ['Odd Round :', 'Even Round :'],
    means: '홀수 라운드와 짝수 라운드에 다른 동작을 한다. 두 줄을 한 세트로 읽어야 한다.',
    clock: '형식(EMOM·E2MOM 등)은 위 줄을 따른다.',
    score: '형식을 따른다',
    term: 'odd-even',
    tag: 'E2MOM',
  },
  {
    id: 'team',
    name: '팀 와드',
    wrote: ['[Team of 2]', '* 1:1 Rest With partner', '*Share The Reps Anyway'],
    means:
      '둘이 한 조로 한다. "1:1 Rest" 는 한 명이 하는 동안 다른 한 명은 쉬며 번갈아 가는 방식, ' +
      '"Share The Reps" 는 나누는 방법이 자유롭다는 뜻이다.',
    clock: '시계는 하나. 팀 전체가 같은 시계를 본다.',
    score: '팀 합산 기록',
    term: 'team-of-2',
    tag: '팀 와드',
  },
  {
    id: 'chipper',
    name: 'Chipper',
    wrote: [],
    means: '여러 동작을 각각 많은 개수로 한 번씩만, 위에서부터 순서대로 깎아 내려간다. 라운드 반복이 없다.',
    clock: 'For Time 과 같다.',
    score: '완료 시간',
    term: 'chipper',
    tag: null,
  },
  {
    id: 'death-by',
    name: 'Death By …',
    wrote: [],
    means: '1분에 1회 → 2분에 2회 → 3분에 3회… 개수를 못 채우는 순간 끝난다.',
    clock: 'EMOM 과 같은 1분 간격.',
    score: '버틴 분 수 (= 마지막으로 성공한 개수)',
    term: 'emom-death',
    tag: null,
  },
  {
    id: 'buyin',
    name: 'Buy-in / Cash-out',
    wrote: [],
    means: '메인 와드 앞(Buy-in) 또는 뒤(Cash-out)에 한 번만 붙는 추가 과제.',
    clock: '메인 와드와 같은 시계 안에 들어간다.',
    score: '메인 와드의 기록에 포함',
    term: 'buyin',
    tag: null,
  },
];

/* ------------------------------------------------------------- 표기 사전 */

export const notationGroups = [
  {
    id: 'reps',
    title: '개수 · 반복 표기',
    rows: [
      { wrote: '3 Hang Squat clean', read: '행 스쿼트 클린 3회', note: '숫자가 항상 동작 앞에 온다.' },
      { wrote: '5-5-3-3-2', read: '5회·5회·3회·3회·2회 다섯 세트', note: '개수가 줄면 무게를 올린다는 신호.' },
      { wrote: '12 Dumbbell Snatch alt.', read: '덤벨 스내치 12회, 좌우 번갈아', note: 'alt. = alternating. 좌우 합쳐서 12회다.' },
      { wrote: '1. / 2. / 3. / 4.', read: '① ② ③ ④ 스테이션 번호', note: 'EMOM에서 분마다 하나씩 돌아가며 하는 순서.', term: 'emom' },
      { wrote: '7 Unbroken Power Snatch', read: '파워 스내치 7회를 쉬지 않고', note: '바를 내려놓거나 손을 놓으면 처음부터.', term: 'unbroken' },
      { wrote: '15/12 Cal Row', read: '로우 — 남 15칼로리 / 여 12칼로리', note: '머신은 횟수 대신 칼로리로 센다.' },
      { wrote: "10m DB Farmer's Carry", read: '덤벨을 들고 10m 걷기', note: '동작 앞의 숫자가 개수가 아니라 거리(m)인 경우.', term: 'fc' },
      { wrote: 'Max Unbroken Hang Power Clean', read: '끊기지 않고 할 수 있는 최대 개수', note: '개수가 정해져 있지 않다. 바를 놓는 순간이 그 세트의 끝.', term: 'unbroken' },
      { wrote: '(Above knee) / (Below Knee)', read: '무릎 위 / 무릎 아래에서 시작', note: '같은 동작이라도 시작 높이를 지정한다.', term: 'hang' },
    ],
  },
  {
    id: 'load',
    title: '무게 · 높이 표기',
    rows: [
      { wrote: '(135/85)', read: '남 135lb / 여 85lb', note: '단위가 없으면 파운드다. 135lb ≈ 61kg, 85lb ≈ 38.5kg.', term: 'lbs-notation' },
      { wrote: '(75/55lb) · (20/14 lb)', read: '단위를 명시한 같은 표기', note: 'lb 가 붙어도 의미는 같다.' },
      { wrote: '22.5/15kg', read: '남 22.5kg / 여 15kg', note: '국내 박스는 kg 로 적는 경우가 많다.' },
      { wrote: '20-15/12.5-10kg', read: '남 20~15kg / 여 12.5~10kg', note: '범위는 "이 사이에서 고르라"는 뜻.' },
      { wrote: 'All Dual 22.5/15kg', read: '덤벨을 양손에 하나씩', note: 'Dual = 양손. 무게는 한 개 기준이다.' },
      { wrote: 'Dumbbell(x2) ... (22.5/15)', read: '덤벨 두 개, 한 개당 22.5/15kg', note: '(x2) 도 Dual 과 같은 뜻. 실제로 드는 총 무게는 두 배다.', term: 'dual-db' },
      { wrote: '(24"/20")', read: '남 24인치 / 여 20인치 높이', note: '박스 점프·디피싯의 높이. 큰따옴표는 인치.' },
      { wrote: '@Clean & Jerk 70-80%', read: '클린 앤 저크 1RM의 70~80%', note: '@ 뒤는 기준값. 1RM을 모르면 반복 가능한 무게로.', term: 'percentage' },
      { wrote: '60% Build to heavy', read: '60%에서 시작해 점점 올리기', note: '고정 무게가 아니라 세트마다 올린다.' },
      { wrote: '-/- · -', read: '무게 표기 없음', note: '맨몸이거나 기구 자체 무게로 한다는 뜻.' },
    ],
  },
  {
    id: 'limits',
    title: '조건 · 제한 표기',
    rows: [
      { wrote: '*', read: '별표 = 조건·주석', note: '와드 본문이 아니라 "이렇게 하라"는 단서다.' },
      { wrote: '*Time Cap 15min', read: '15분 제한', note: '캡에 걸리면 그때까지 완료한 렙 수가 기록.', term: 'time-cap' },
      { wrote: 'x 8 · x 8sets', read: '8라운드 · 8세트', note: 'x 뒤 숫자가 반복 횟수.' },
      { wrote: 'or', read: '둘 중 아무거나', note: 'Ski or Assault Bike 처럼 기구를 골라도 된다는 뜻.' },
      { wrote: '@Damper 10', read: '기구 설정값', note: '@ 는 무게 말고 설정에도 쓴다.' },
      { wrote: 'Same weight across', read: '전 세트 같은 무게', note: '올리지 말고 끝까지 유지하라는 뜻.' },
      { wrote: 'Score:Complete sets + HPC reps', read: '기록 방법을 코치가 직접 적어 둔 줄', note: '무엇으로 점수를 매기는지 = 이 와드의 목표가 뭔지.', term: 'score-line' },
      { wrote: '*Rxd+ : 2-3RMU', read: 'Rx 위 단계 옵션', note: 'Rx 가 쉬운 사람을 위해 더 어려운 동작으로 바꿔 두는 줄.', term: 'rx-plus' },
    ],
  },
  {
    id: 'scaling',
    title: '스케일링 표기',
    rows: [
      { wrote: 'a: / b: / c:', read: '하향 단계', note: '화이트보드 구석에 코치가 미리 적어 둔 대안 사다리.', term: 'tier' },
      { wrote: '1Scaled / 2Scaled', read: '한 단계 / 두 단계 낮춘 버전', note: '숫자가 클수록 더 쉬운 쪽.', term: 'nscaled' },
      { wrote: '1mat / 2mat', read: 'HSPU 밑에 앱매트 1장 / 2장', note: '가동 범위를 줄여 주는 스케일.', term: 'abmat' },
      { wrote: 'HSH', read: '핸드스탠드 홀드', note: 'HSPU 를 못 하면 버티기로 대체.', term: 'hsh' },
      { wrote: 'K2C', read: '니 투 체스트', note: '토투바를 못 하면 무릎을 가슴까지.', term: 'k2c' },
      { wrote: 'BB / GB', read: '블랙 밴드 / 그린 밴드', note: '풀업·딥 보조에 쓰는 밴드 색.', term: 'band-scale' },
      { wrote: '(1BMU=2C2B=3PU)', read: '뮤스클업 1개 = C2B 2개 = 풀업 3개', note: '못 하는 동작을 개수를 늘려 바꾸는 환산표.', term: 'rep-conversion' },
      { wrote: 'Broken ok', read: '끊어서 해도 됨', note: 'Unbroken 조건을 푸는 표기.', term: 'broken-ok' },
    ],
  },
];

/* --------------------------------------------------------- 무게 고르는 법 */

export const loadPicking = [
  {
    reps: '1~3회 (역도)',
    aim: '1RM의 65~80%',
    check: '매 렙 바를 내려놓고 셋업을 다시 할 수 있는 무게. 기술을 연습하는 구간이라 실패하면 의미가 없다.',
  },
  {
    reps: '5~8회',
    aim: '1RM의 50~60%',
    check: '쉬지 않고 한 세트로 끝낼 수 있어야 한다. Unbroken 이 적혀 있으면 더 낮춘다.',
  },
  {
    reps: '10회 이상 · 여러 라운드',
    aim: '가볍다고 느껴지는 무게',
    check: '첫 라운드를 쉬지 않고 할 수 있는 무게에서 한 단계 더 내린다. 첫 라운드가 힘들면 마지막 라운드는 불가능하다.',
  },
  {
    reps: '체조 · 맨몸',
    aim: '첫 세트에 목표의 60% 이상',
    check: '풀업 10회가 목표인데 첫 세트에 6회가 안 되면 밴드나 낮은 버전으로 바꾼다.',
  },
];

/* ------------------------------------------------------------- 기록 방법 */

export const recordFormats = [
  { format: 'For Time', what: '완료까지 걸린 시간', example: '12:47' },
  { format: 'For Time (캡 초과)', what: '제한 시간까지 완료한 총 렙 수', example: '15:00 CAP — 248 reps' },
  { format: 'AMRAP', what: '완료 라운드 + 남은 렙', example: '9 rounds + 12 reps' },
  { format: 'EMOM · E2MOM', what: '사용한 무게, 못 채운 회차가 있으면 몇 번째인지', example: '70kg × 8 all' },
  { format: 'Tabata', what: '가장 적게 한 세트의 개수', example: 'lowest 9' },
  { format: 'Strength', what: '세트별 무게', example: '5-5-3-3-2 @ 60/65/70/72.5/75kg' },
  { format: '팀 와드', what: '팀 합산 기록 + 파트너', example: '14 rounds (w/ 종훈)' },
];
