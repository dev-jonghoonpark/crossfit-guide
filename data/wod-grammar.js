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
    wrote: ['10 Rounds For Time', '3 Rounds For Time', 'For Time / 4Rounds of', 'For Time / 3 Rounds of'],
    means: '정해진 양을 최대한 빨리 끝낸다. 앞의 숫자가 반복할 라운드 수다.',
    clock: '시계는 0부터 올라간다. 다 끝낸 순간의 시간이 기록.',
    score: '완료 시간 (짧을수록 좋음)',
    term: 'rft',
    tag: 'For Time',
  },
  {
    id: 'amrap',
    name: 'AMRAP',
    wrote: ['AMRAP 20', 'AMRAP 23', 'AMRAP 12', 'AMRAP 5'],
    means: '뒤의 숫자가 분(分)이다. 그 시간 동안 아래 라운드를 계속 돈다.',
    clock: '시계가 0에서 정해진 시간까지 올라가고 거기서 끝난다.',
    score: '완료 라운드 + 다음 라운드에서 넘긴 렙',
    term: 'amrap',
    tag: 'AMRAP',
  },
  {
    id: 'emom',
    name: 'EMOM',
    wrote: ['EMOM 32', 'EMOM 24', 'EMOM 21', 'Every 1:00 x 8', 'Every 01:00 x 8', 'Every 1:00 x 8 Sets', 'Every 1:00 x 8Sets'],
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
    wrote: ['E2MOM 20', 'Every 2:00 x 5', 'Every 02:00 x 5', 'Every 2:00 x 4', 'Every 70seconds x 12sets'],
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
    wrote: ['5set 30Seconds On 60Seconds Off', '0:30 Work 0:30 Easy Jog x 20Set', '3:00 Work / 2:00 Rest x 4Sets', '90 Seconds On / 90 Seconds Off x 3 Sets'],
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
    wrote: ['5-5-3-3-2', '5-4-3-3-3', '7-5-5-3-1', '5-5-3-2-1'],
    means:
      '라운드마다 개수가 바뀐다. 5-5-3-3-2 는 5회 → 5회 → 3회 → 3회 → 2회 다섯 세트라는 뜻. ' +
      '스트렝스 파트에서는 개수가 줄어드는 만큼 무게를 올린다.',
    clock: '보통 시간 제한 없이 세트 사이에 충분히 쉰다.',
    score: '세트별 무게',
    term: null,
    tag: '스트렝스',
  },
  {
    id: 'named-wod',
    name: '이름 붙은 와드 (Hero · The Girls)',
    wrote: ['JOSH', 'Double "Diane"'],
    means:
      '형식 대신 이름만 적혀 있는 줄. 내용이 이미 정해져 있는 벤치마크 와드라는 뜻이다. ' +
      '순직한 군인·소방관·경찰을 기리는 히어로 와드(JOSH, Murph, DT)와 여성 이름이 붙은 걸스 와드(Fran, Cindy, Diane)가 있다. ' +
      '이름 아래에 For Time 같은 실제 형식 줄이 따로 붙는다. 이름 앞에 Double 이 붙으면 그 와드를 두 번 이어서 한다는 뜻이다.',
    clock: '이름 아래 붙은 형식 줄을 따른다.',
    score: '그 형식의 기록. 내용이 고정돼 있어 다른 날·다른 박스의 기록과 그대로 비교된다.',
    term: 'hero',
    tag: '히어로 와드',
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
    wrote: ['[Team of 2]', '* 1:1 Rest With partner', '*Share The Reps Anyway', '*Switch Anytime', '*Split Anyway'],
    means:
      '둘이 한 조로 한다. "1:1 Rest" 는 한 명이 하는 동안 다른 한 명은 쉬며 번갈아 가는 방식, ' +
      '"Share The Reps" · "Split Anyway" 는 나누는 방법이 자유롭다는 뜻이다. ' +
      '"Athlete1: / Athlete2:" 로 칸이 나뉘고 "Switch Anytime" 이 붙으면 두 명이 동시에 움직이며 아무 때나 칸을 바꾼다.',
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
      { wrote: '10-5-3-5-10 · 55-70-82.5-72.5-60%', read: '렙과 퍼센트를 한 칸씩 짝지어 읽는 웨이브', note: '렙이 줄었다 다시 느는 만큼 무게는 올랐다 내려간다. 가운데 칸이 그날 가장 무거운 세트다.', term: 'percentage' },
      { wrote: '21-15-9-9-15-21', read: '21-15-9 를 한 번, 거꾸로 한 번 더', note: '줄의 동작들을 숫자마다 같은 개수씩 번갈아 한다. 뒤 절반은 개수가 늘어나는 방향이라 갈수록 힘들다.' },
      { wrote: '12 Dumbbell Snatch alt.', read: '덤벨 스내치 12회, 좌우 번갈아', note: 'alt. = alternating. 좌우 합쳐서 12회다.' },
      { wrote: '1. / 2. / 3. / 4.', read: '① ② ③ ④ 스테이션 번호', note: 'EMOM에서 분마다 하나씩 돌아가며 하는 순서.', term: 'emom' },
      { wrote: '7 Unbroken Power Snatch', read: '파워 스내치 7회를 쉬지 않고', note: '바를 내려놓거나 손을 놓으면 처음부터.', term: 'unbroken' },
      { wrote: '15/12 Cal Row', read: '로우 — 남 15칼로리 / 여 12칼로리', note: '머신은 횟수 대신 칼로리로 센다.' },
      { wrote: "10m DB Farmer's Carry", read: '덤벨을 들고 10m 걷기', note: '동작 앞의 숫자가 개수가 아니라 거리(m)인 경우.', term: 'fc' },
      { wrote: 'Max Unbroken Hang Power Clean', read: '끊기지 않고 할 수 있는 최대 개수', note: '개수가 정해져 있지 않다. 바를 놓는 순간이 그 세트의 끝.', term: 'unbroken' },
      { wrote: 'Max Dumbbell(x2) Push Press', read: '그 시간 안에 할 수 있는 최대 개수', note: 'Max 앞에 Unbroken 이 없으면 끊어서 해도 된다. 정해진 시간이 끝나는 게 그 세트의 끝.' },
      { wrote: 'Max Hang Power Clean (155/105)', read: '앞 동작을 끝내고 남은 시간 동안 최대 개수', note: '인터벌의 마지막 줄에 Max 가 오면 위의 정해진 개수를 다 채운 뒤 그 세트의 운동 시간이 끝날 때까지 쌓는다. 앞에서 빨리 끝낼수록 Max 에 쓸 시간이 늘어난다.' },
      { wrote: '30sec Max Push-Up', read: '30초 동안 푸시업 최대 개수', note: '숫자 뒤에 sec 가 붙으면 개수가 아니라 시간이다. 그 시간이 끝나면 남은 시간은 쉰다.' },
      { wrote: '5 Wall Walk', read: '월 워크 5회', note: '올라갔다 내려와야 1렙이다. 올라간 것만 세지 않는다.', term: 'ww' },
      { wrote: '(Above knee) / (Below Knee)', read: '무릎 위 / 무릎 아래에서 시작', note: '같은 동작이라도 시작 높이를 지정한다.', term: 'hang' },
      { wrote: 'Athlete 1: / Athlete2: / Athlete3:', read: '1번 / 2번 / 3번 선수 담당', note: '팀 와드에서 그 줄을 누가 맡는지 정한다. 번호가 없는 줄은 팀 전원이 한다.', term: 'synchro' },
      { wrote: 'Max Cal Row', read: '로잉 칼로리 최대한', note: 'Max 뒤에 Cal 이 붙으면 개수가 아니라 머신 화면의 칼로리를 최대한 쌓으라는 뜻. 교대해도 화면은 초기화하지 않는다.', term: 'cal' },
      { wrote: '*Switch Anytime', read: '아무 때나 교대', note: '선수별로 칸이 나뉜 팀 와드에서 정해진 개수 없이 원할 때 자리를 바꿔도 된다는 뜻.', term: 'switch-anytime' },
      { wrote: '20 Lateral Triangle Pogo Burpee Synchro.', read: '버피 20회를 팀원이 동시에', note: 'Synchro 가 붙으면 모두가 같은 렙을 끝내야 1렙이다. 앞에 붙은 말들은 버피의 점프 방식을 바꾼다.', term: 'synchro' },
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
      { wrote: '(A,24/16kg)', read: '아메리칸 스윙, 남 24kg / 여 16kg', note: '케틀벨 스윙 괄호 안의 A 는 아메리칸(머리 위까지), R 은 러시안(눈높이까지). 무게와 같이 적는다.', term: 'kbs' },
      { wrote: 'Dumbbell(x1)', read: '덤벨 한 개', note: '(x2) 의 반대. 드는 위치가 따로 적혀 있지 않으면 자유다.', term: 'single-db' },
      { wrote: '(22.5/15 , 24"/20")', read: '덤벨 남 22.5 / 여 15kg, 박스 남 24 / 여 20인치', note: '한 괄호에 무게와 높이를 쉼표로 같이 적은 것. 큰따옴표가 붙은 쪽이 높이다.', term: 'box-height' },
      { wrote: '(24"/20")', read: '남 24인치 / 여 20인치 높이', note: '박스 점프·디피싯의 높이. 큰따옴표는 인치.' },
      { wrote: '(Step down,24"/20")', read: '걸어 내려오기, 박스 남 24 / 여 20인치', note: '높이 앞에 내려오는 방법을 조건으로 같이 적은 것. 박스 점프 오버에서 뛰어내리지 말라는 뜻.', term: 'bjo' },
      { wrote: '@Clean & Jerk 70-80%', read: '클린 앤 저크 1RM의 70~80%', note: '@ 뒤는 기준값. 1RM을 모르면 반복 가능한 무게로.', term: 'percentage' },
      { wrote: '60% Build to heavy', read: '60%에서 시작해 점점 올리기', note: '고정 무게가 아니라 세트마다 올린다.' },
      { wrote: '*Start at 65% Build to Heavy', read: '65%에서 시작해 점점 올리기', note: '같은 표기인데 시작 퍼센트만 다르다. 렙이 적은 스킴일수록 시작점이 높아진다.', term: 'percentage' },
      { wrote: '*Start at 60% Build Up', read: '60%에서 시작해 세트마다 올리기', note: 'Build Up 은 Build to Heavy 의 줄임이다. 기준 1RM 은 그 줄에 적힌 동작 기준.', term: 'percentage' },
      { wrote: '*70% Build to Heavy', read: '70%에서 시작해 세트마다 올리기', note: 'Start at 이 빠져도 같은 뜻이다. 퍼센트 기준은 그 파트 동작(여기선 프론트 스쿼트)의 1RM.', term: 'percentage' },
      { wrote: '*Deadlift 50% Build to Heavy', read: '일반 데드리프트 1RM 의 50%에서 시작해 올리기', note: '퍼센트 앞에 다른 동작 이름이 붙으면 그 동작의 1RM 이 기준이다. 디피싯 데드리프트처럼 1RM 을 따로 재지 않는 변형 동작에 자주 쓴다.', term: 'percentage' },
      { wrote: '*Build to Heavy', read: '세트마다 올려 무거운 무게까지', note: '시작 퍼센트가 빠진 표기다. 가볍게 시작해 그날 자세가 유지되는 가장 무거운 무게까지 올린다.', term: 'percentage' },
      { wrote: '(x2, 22.5/15kg)', read: '덤벨 두 개, 한 개당 남 22.5 / 여 15kg', note: '(x2) 와 무게를 한 괄호에 쉼표로 같이 적은 것. Dumbbell(x2) ... (22.5/15) 와 같은 뜻이다.', term: 'dual-db' },
      { wrote: 'Dual DB ... (x2, 22.5/15kg, 24"/20")', read: '양손 덤벨 한 개당 22.5/15kg, 박스 24/20인치', note: 'Dual DB 와 (x2) 는 같은 말을 두 번 적은 것이다. 괄호 안 쉼표 뒤에 인치가 오면 무게가 아니라 박스 높이다.', term: 'dual-db' },
      { wrote: '-/- · -', read: '무게 표기 없음', note: '맨몸이거나 기구 자체 무게로 한다는 뜻.' },
    ],
  },
  {
    id: 'limits',
    title: '조건 · 제한 표기',
    rows: [
      { wrote: '*', read: '별표 = 조건·주석', note: '와드 본문이 아니라 "이렇게 하라"는 단서다.' },
      { wrote: '*Time Cap 15min', read: '15분 제한', note: '캡에 걸리면 그때까지 완료한 렙 수가 기록.', term: 'time-cap' },
      { wrote: '*Time Cap : 12minute', read: '12분 제한', note: '같은 타임 캡이라도 분 수는 와드마다 다르다. 캡이 짧을수록 첫 줄부터 끊어 갈 계획이 필요하다.', term: 'time-cap' },
      { wrote: '*Time Cap 10min · *Original Time Cap 3min', read: '수업 캡 10분 · 대회 원본 캡 3분', note: 'Original 이 붙은 쪽은 원래 대회 종목의 캡이다. 수업은 보통 더 넉넉하게 주고, 원본 캡은 "선수들은 이만큼 빨랐다"는 참고치다.', term: 'time-cap' },
      { wrote: 'x 8 · x 8sets', read: '8라운드 · 8세트', note: 'x 뒤 숫자가 반복 횟수.' },
      { wrote: '1 Hang Power Snatch · 2 Chest to Bar · 2 … · 4 … · ...', read: '줄을 풀어 쓴 사다리', note: '1-2-3… 처럼 한 줄로 적지 않고 첫 몇 라운드를 줄줄이 적은 뒤 … 로 끝낸 것. 줄 사이 개수가 늘어나는 규칙(여기선 1씩 · 2씩)을 찾아 그대로 이어 간다.' },
      { wrote: '-Directly into-', read: '쉬지 않고 바로 다음 블록으로', note: '위아래 블록이 시계 하나를 같이 쓴다는 뜻. 휴식 없이 이어 가고 기록도 하나다.' },
      { wrote: 'or Skill & Warm up', read: '또는 이 시간에 스킬 연습과 웜업', note: '파트 하나를 통째로 건너뛰어도 된다는 뜻. 그 시간에 뒤 와드의 어려운 동작을 연습하고 몸을 푼다.' },
      { wrote: 'or', read: '둘 중 아무거나', note: 'Ski or Assault Bike 처럼 기구를 골라도 된다는 뜻.' },
      { wrote: '(3Sec down 1sec up)', read: '3초 동안 내려가고 1초에 올라오기', note: '동작 이름 아래 괄호에 초가 붙으면 템포다. 개수보다 속도를 지키는 게 먼저다.', term: 'tempo' },
      { wrote: '(Legs Only)', read: '다리로만', note: '팬 바이크처럼 팔 손잡이가 있는 기구에서 손잡이를 밀고 당기지 말라는 뜻. 팔은 쉬게 둔다.' },
      { wrote: '(Light weight)', read: '가벼운 무게로', note: '숫자 대신 강도를 말로 적은 것. 회복일이나 워밍업에서 자세를 우선하라는 뜻이다.' },
      { wrote: '*Keep HR at 60–70%.', read: '심박을 최대의 60~70% 안에서', note: '개수나 시간이 아니라 심박으로 강도를 정한다. 넘어가면 속도를 줄인다.', term: 'hr-zone' },
      { wrote: '*Record : Todays mood', read: '기록 대신 오늘 컨디션을 적기', note: '점수를 매기지 않는 날이라는 신호. 회복일에 자주 붙는다.', term: 'recovery-day' },
      { wrote: '-Rest 2:00-', read: '두 블록 사이 2분 휴식', note: '-Directly into- 의 반대다. 위 블록이 끝나면 2분 쉬고 아래 블록 시계를 새로 시작한다.' },
      { wrote: "*Partner : Dumbbell(x2) Farmer's Hold", read: '파트너는 덤벨 두 개를 들고 버티기', note: '한 명이 동작하는 동안 다른 한 명도 쉬지 않는다. 보통 홀드가 끊기면 동작도 멈춘다.', term: 'partner-hold' },
      { wrote: '@Damper 10', read: '기구 설정값', note: '@ 는 무게 말고 설정에도 쓴다.' },
      { wrote: 'Same weight across', read: '전 세트 같은 무게', note: '올리지 말고 끝까지 유지하라는 뜻.' },
      { wrote: 'Score:Complete sets + HPC reps', read: '기록 방법을 코치가 직접 적어 둔 줄', note: '무엇으로 점수를 매기는지 = 이 와드의 목표가 뭔지.', term: 'score-line' },
      { wrote: 'Score:Finish Rounds + Push press reps', read: '완료 라운드 + 마지막 동작의 렙 수', note: '같은 Score 줄이라도 무엇을 더하는지는 와드마다 다르다. 그 줄이 곧 오늘의 목표다.', term: 'score-line' },
      { wrote: '*Score:Finish Round + Push-Up reps', read: '완료 라운드 + 푸시업 렙 수', note: '앞 칸을 1분 안에 다 채웠는지와 개수가 열려 있는 마지막 칸의 합계를 같이 적는다.', term: 'score-line' },
      { wrote: '*Score:Row+BJO+DBFL', read: '로우 칼로리 + BJO 렙 + 런지 렙의 합', note: '단위가 달라도 그냥 더한다. 1칼로리와 1렙이 같은 1점이다.', term: 'score-line' },
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
      { wrote: '1-2mat', read: '앱매트 1장 또는 2장', note: '하이픈은 범위다. 본인 수준에 맞게 고른다.', term: 'abmat' },
      { wrote: 'HSH', read: '핸드스탠드 홀드', note: 'HSPU 를 못 하면 버티기로 대체.', term: 'hsh' },
      { wrote: 'x2sec Hold', read: '1렙을 2초 버티기로', note: 'HSH 를 줄여 쓰지 않고 Hold 로만 적은 것. 21회면 42초 핸드스탠드 홀드다.', term: 'hsh' },
      { wrote: 'Pike push up', read: '파이크 푸시업', note: '물구나무 대신 엉덩이를 높이 든 ㅅ자 자세에서 하는 푸시업. HSPU 스케일 사다리의 아래 칸.', term: 'pike-push-up' },
      { wrote: 'K2C', read: '니 투 체스트', note: '토투바를 못 하면 무릎을 가슴까지.', term: 'k2c' },
      { wrote: 'BB / GB', read: '블랙 밴드 / 그린 밴드', note: '풀업·딥 보조에 쓰는 밴드 색.', term: 'band-scale' },
      { wrote: 'Black Band', read: '블랙 밴드 보조', note: '약어로 줄이지 않고 색 이름을 그대로 적기도 한다. BB 와 같은 뜻이다.', term: 'band-scale' },
      { wrote: 'Band Pull-Up (Black) · (Green)', read: '블랙 밴드 · 그린 밴드 보조 풀업', note: '색을 괄호에 넣어 적기도 한다. 같은 사다리에서는 그린이 보조가 더 큰 쪽(더 낮은 단계)이다.', term: 'band-scale' },
      { wrote: 'BB-GB PU', read: '블랙 밴드 또는 그린 밴드 보조 풀업', note: '하이픈은 "둘 중 골라서"라는 뜻. 본인 수준에 맞는 밴드를 고른다. PU 는 풀업.', term: 'band-scale' },
      { wrote: '(1BMU=2C2B=3PU)', read: '뮤스클업 1개 = C2B 2개 = 풀업 3개', note: '못 하는 동작을 개수를 늘려 바꾸는 환산표.', term: 'rep-conversion' },
      { wrote: 'Half WW / 4Step WW', read: '하프 월 워크 / 4스텝 월 워크', note: '월 워크를 끝까지 올라가지 않고 절반 또는 정해진 걸음 수까지만 하는 스케일.', term: 'ww' },
      { wrote: 'HLR', read: '행잉 레그 레이즈', note: 'K2C 도 어려우면 매달려서 다리를 허리 높이까지만 든다. 토투바 스케일 사다리의 아래 칸.', term: 'hlr' },
      { wrote: 'High Jump SU', read: '높이 뛰는 싱글 언더', note: '더블 언더 대신 싱글 언더를 하되, 더블 언더처럼 높게 뛰어 리듬을 흉내 낸다. 개수는 그대로.', term: 'du' },
      { wrote: 'Broken ok', read: '끊어서 해도 됨', note: 'Unbroken 조건을 푸는 표기.', term: 'broken-ok' },
      { wrote: 'b : Same', read: '보드에 적힌 그대로', note: '스케일 사다리 중 이 단계는 바꾸는 게 없다는 뜻.', term: 'tier' },
      { wrote: 'Machine:12/9 Cal', read: '바이크·로우 등 머신을 남 12 / 여 9칼로리로', note: '스케일 줄에서는 기구 이름을 하나하나 적지 않고 Machine 으로 묶는다.', term: 'cal' },
      { wrote: 'Pogo Up Down', read: '업다운 — 가슴을 대지 않는 버피', note: '버피에서 가슴·허벅지를 바닥에 대는 부분을 뺀 스케일.', term: 'up-down' },
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
