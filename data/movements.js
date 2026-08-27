/**
 * 동작 데이터.
 *
 * 새 동작 추가하는 법
 *  1. data/poses.js 에 필요한 포즈를 추가 (기존 포즈 재사용 가능)
 *  2. 아래 배열에 항목 하나 추가
 *  3. `npm run build`
 *
 * phases[].pose 는 poses.js 의 키 이름.
 * phases[].emphasis 는 그 구간에서 특히 크게 일하는 근육 (근육 지도가 구간마다 반응함)
 */

export const movements = [
  /* ==================================================================== */
  {
    id: 'squat-clean',
    seoTitle: '스쿼트 클린 동작 방법과 사용 근육',
    seoDesc:
      '스쿼트 클린은 바닥의 바벨을 어깨(프론트 랙)까지 한 번에 올려 풀 스쿼트로 받는 역도 동작입니다. 6단계 애니메이션과 코치 큐, 흔한 실수 교정법을 정리했습니다.',
    thumb: 4,
    ko: '스쿼트 클린',
    en: 'Squat Clean',
    abbr: 'SC',
    category: '역도',
    level: '중급',
    equipment: ['바벨', '원판'],
    tagline: '바닥의 바벨을 어깨(프론트 랙)까지 한 번에 올려 풀 스쿼트로 받아내는 동작',
    intro:
      '클린은 "바닥 → 어깨"를 한 동작으로 잇는 역도 리프트다. 받는 깊이가 풀 스쿼트면 스쿼트 클린, ' +
      '하프 스쿼트보다 얕으면 파워 클린이라 부른다. 팔로 당기는 운동처럼 보이지만 실제로는 ' +
      '다리와 엉덩이로 바를 띄우고, 그 아래로 몸이 빠르게 들어가는 운동이다.',
    phases: [
      {
        name: '셋업',
        pose: 'floorSetup',
        desc: '바를 발 중앙 위에 두고 정강이가 바에 닿을 때까지 다가선다. 손은 어깨너비보다 조금 넓게, 훅 그립으로 잡는다.',
        cues: ['가슴 들고 등은 평평하게', '어깨가 바보다 아주 살짝 앞', '시선은 3~4m 앞 바닥'],
        emphasis: ['erectors', 'forearms'],
      },
      {
        name: '1차 풀',
        pose: 'firstPull',
        desc: '바가 무릎을 지날 때까지 다리로 바닥을 밀어낸다. 이 구간에서 상체 각도는 바뀌지 않고 무릎만 뒤로 빠진다.',
        cues: ['상체 각도 유지 — 엉덩이만 먼저 솟지 않게', '바는 다리를 스치듯 수직으로', '팔은 그냥 줄'],
        emphasis: ['quads', 'erectors', 'hamstrings'],
      },
      {
        name: '2차 풀 (트리플 익스텐션)',
        pose: 'extension',
        desc: '바가 허벅지 위쪽에 닿는 순간 발목·무릎·고관절을 한 번에 폭발적으로 펴고 승모근으로 슈러그한다. 바 속도의 대부분이 여기서 나온다.',
        cues: ['점프하듯 수직으로', '엉덩이로 바를 밀어 올린다', '팔 당김은 신전이 끝난 뒤'],
        emphasis: ['glutes', 'hamstrings', 'calves', 'traps'],
      },
      {
        name: '풀 언더 (턴오버)',
        pose: 'pullUnder',
        desc: '바를 더 높이 올리는 게 아니라, 떠 있는 바 아래로 몸을 빠르게 집어넣는다. 팔꿈치를 바 밑으로 회전시켜 앞으로 던진다.',
        cues: ['발을 살짝 들어 스쿼트 스탠스로 다시 놓기', '팔꿈치를 빠르게 앞으로 휘감기', '바는 몸에 붙인 채'],
        emphasis: ['traps', 'delts', 'core'],
      },
      {
        name: '스쿼트 캐치',
        pose: 'squatCatch',
        desc: '프론트 랙(쇄골·삼각근 위)에 바를 얹은 채 풀 스쿼트 바닥까지 내려가 받는다. 팔꿈치가 내려가면 바가 앞으로 굴러 떨어진다.',
        cues: ['팔꿈치 높게 유지', '상체는 수직', '무릎은 발끝 방향으로'],
        emphasis: ['quads', 'glutes', 'core', 'erectors'],
      },
      {
        name: '일어서기',
        pose: 'frontRack',
        desc: '프론트 스쿼트로 일어선다. 고관절과 무릎이 완전히 펴지면 1렙 완료.',
        cues: ['가슴 먼저 세우고 일어나기', '팔꿈치 끝까지 높게', '무릎 완전 신전'],
        emphasis: ['quads', 'glutes', 'core'],
      },
    ],
    muscles: [
      { key: 'glutes', level: 'primary' },
      { key: 'quads', level: 'primary' },
      { key: 'hamstrings', level: 'primary' },
      { key: 'erectors', level: 'primary' },
      { key: 'traps', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'delts', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'lats', level: 'stabilizer' },
    ],
    faults: [
      { problem: '엉덩이가 먼저 솟는다', fix: '1차 풀에서 "가슴과 엉덩이가 같은 속도로 올라간다"고 생각하고, 무게를 줄여 상체 각도부터 익힌다.' },
      { problem: '바가 몸에서 멀어진다', fix: '광배근으로 바를 몸 쪽으로 끌어당긴 채 유지. 정강이·허벅지를 스치며 올라와야 한다.' },
      { problem: '팔로 먼저 당긴다', fix: '신전이 끝나기 전에는 팔꿈치를 굽히지 않는다. 하이 풀 드릴로 순서를 분리해서 연습.' },
      { problem: '받을 때 팔꿈치가 처진다', fix: '프론트 랙 유연성 문제인 경우가 많다. 손목·광배·흉추 모빌리티를 먼저 풀고, 프론트 스쿼트로 랙 포지션을 따로 훈련.' },
    ],
    scaling: [
      '빈 바(15/20kg) 또는 PVC 파이프로 순서만 익히기',
      '덤벨/케틀벨 클린으로 대체',
      '깊이가 안 나오면 파워 클린 + 프론트 스쿼트로 분리',
      '무게를 낮춰 폼이 유지되는 범위에서만',
    ],
    related: ['hang-squat-clean', 'clean-and-jerk', 'split-jerk'],
    terms: ['front-rack', 'triple-extension', 'hook-grip', 'rx'],
  },

  /* ==================================================================== */
  {
    id: 'hang-squat-clean',
    seoTitle: '행 스쿼트 클린 하는 법과 사용 근육',
    seoDesc:
      '행 스쿼트 클린은 바를 바닥에 내려놓지 않고 허벅지 높이에서 시작하는 클린입니다. 힙 힌지부터 스쿼트 캐치까지 6단계 애니메이션과 스케일링 방법을 정리했습니다.',
    thumb: 2,
    ko: '행 스쿼트 클린',
    en: 'Hang Squat Clean',
    abbr: 'HSC',
    category: '역도',
    level: '중급',
    equipment: ['바벨', '원판'],
    tagline: '바닥이 아니라 "행 포지션"(무릎 위)에서 시작하는 스쿼트 클린',
    intro:
      '"행(Hang)"은 바가 바닥에 닿지 않고 손에 매달려 있는 상태를 말한다. 바닥에서 무릎까지 올리는 ' +
      '1차 풀이 빠지기 때문에, 클린에서 가장 중요한 2차 풀(고관절 신전)과 풀 언더만 집중해서 연습할 수 있다. ' +
      '와드에서는 반복 사이에 바를 바닥에 완전히 내려놓지 않으므로 그립과 코어 피로가 훨씬 크다.',
    phases: [
      {
        name: '시작 (스탠딩)',
        pose: 'standHold',
        desc: '프론트 랙이 아니라 팔을 편 상태로 바를 허벅지 앞에 들고 선다. 바닥에서 데드리프트로 세워 올려 시작한다.',
        cues: ['훅 그립', '어깨는 뒤로, 가슴은 위로', '바는 허벅지에 붙여서'],
        emphasis: ['forearms', 'erectors'],
      },
      {
        name: '행 포지션 (힙 힌지)',
        pose: 'hang',
        desc: '무릎을 살짝 굽히고 엉덩이를 뒤로 빼며 바를 허벅지 중간까지 내린다. 등은 계속 평평하게. 여기가 시작점이다.',
        cues: ['등 각도 고정, 엉덩이만 뒤로', '어깨가 바보다 앞', '체중은 발 중앙~뒤꿈치'],
        emphasis: ['hamstrings', 'erectors', 'lats'],
      },
      {
        name: '폭발적 신전',
        pose: 'extension',
        desc: '허벅지에 닿은 바를 고관절로 "쳐 올린다". 발목·무릎·고관절을 동시에 펴며 승모근으로 슈러그.',
        cues: ['수직으로 점프하듯', '바를 몸에 붙인 채', '팔은 마지막에'],
        emphasis: ['glutes', 'hamstrings', 'traps', 'calves'],
      },
      {
        name: '풀 언더',
        pose: 'pullUnder',
        desc: '팔꿈치를 빠르게 회전시켜 바 밑으로 파고든다. 바가 무중력으로 뜬 아주 짧은 순간 안에 끝내야 한다.',
        cues: ['발을 스쿼트 스탠스로 다시 놓기', '팔꿈치 회전 속도가 전부', '고개는 살짝 뒤로'],
        emphasis: ['traps', 'delts', 'core'],
      },
      {
        name: '스쿼트 캐치',
        pose: 'squatCatch',
        desc: '프론트 랙에 받으며 풀 스쿼트 바닥까지 내려간다.',
        cues: ['팔꿈치 높게', '상체 수직', '발바닥 전체로 딛기'],
        emphasis: ['quads', 'glutes', 'core'],
      },
      {
        name: '일어서기',
        pose: 'frontRack',
        desc: '프론트 스쿼트로 일어서면 1렙 완료. 다음 렙은 다시 행 포지션으로 내린다.',
        cues: ['완전 신전으로 마무리', '내릴 때는 컨트롤해서 허벅지까지'],
        emphasis: ['quads', 'glutes'],
      },
    ],
    muscles: [
      { key: 'hamstrings', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'quads', level: 'primary' },
      { key: 'traps', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'delts', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'lats', level: 'stabilizer' },
    ],
    faults: [
      { problem: '스쿼트로 내려갔다 온다', fix: '행 포지션은 스쿼트가 아니라 힙 힌지다. 무릎은 살짝만, 엉덩이를 뒤로 보낸다.' },
      { problem: '팔로 들어 올리려 한다', fix: '고관절이 다 펴지기 전엔 팔꿈치를 굽히지 않는다. 무게를 줄이고 하이 행 클린부터.' },
      { problem: '연속 렙에서 그립이 먼저 터진다', fix: '훅 그립을 쓰고, 받을 때 손가락을 풀었다가 다시 잡는다. 세트를 쪼개 쉬는 구간을 계획한다.' },
    ],
    scaling: [
      '하이 행(허벅지 상단)에서 시작해 가동 범위 축소',
      '행 파워 클린 + 프론트 스쿼트로 분리',
      '덤벨 행 클린으로 대체',
      '(135/85 lb) → 남 43~50kg / 여 30~35kg 등으로 하향',
    ],
    related: ['squat-clean', 'push-jerk', 'clean-and-jerk'],
    terms: ['hang', 'front-rack', 'triple-extension', 'hook-grip'],
  },

  /* ==================================================================== */
  {
    id: 'split-jerk',
    seoTitle: '스플릿 저크 동작 방법과 사용 근육',
    seoDesc:
      '스플릿 저크는 다리를 앞뒤로 갈라 딛으며 바벨을 머리 위로 고정하는 동작입니다. 딥·드라이브·스플릿 캐치 5단계 애니메이션과 흔한 실수 교정법을 정리했습니다.',
    thumb: 3,
    ko: '스플릿 저크',
    en: 'Split Jerk',
    abbr: 'SJ',
    category: '역도',
    level: '중급',
    equipment: ['바벨', '원판'],
    tagline: '다리를 앞뒤로 갈라 딛으며 바벨을 머리 위로 고정하는, 가장 무겁게 들 수 있는 저크',
    intro:
      '저크는 프론트 랙의 바를 머리 위로 보내는 동작이다. 팔 힘이 아니라 다리의 딥-드라이브가 바를 띄우고, ' +
      '그 아래로 몸이 내려가면서 팔이 펴진다. 스플릿 저크는 앞뒤로 다리를 벌려 받기 때문에 ' +
      '받는 위치가 가장 낮아 세 가지 저크 중 가장 무거운 무게를 다룰 수 있다.',
    phases: [
      {
        name: '프론트 랙 준비',
        pose: 'frontRack',
        desc: '바를 쇄골·삼각근 위에 얹고 발은 골반 너비. 팔꿈치는 바 아래에서 살짝 앞으로 나와 있다.',
        cues: ['체중은 발 중앙', '갈비뼈 닫고 코어 조이기', '숨을 크게 들이마셔 고정'],
        emphasis: ['core', 'delts'],
      },
      {
        name: '딥',
        pose: 'dip',
        desc: '상체를 수직으로 유지한 채 무릎만 굽혀 10~15cm 정도 짧게 내려간다. 뒤꿈치는 바닥에 붙어 있어야 한다.',
        cues: ['빠르게 말고 "컨트롤해서" 내려가기', '상체가 앞으로 기울면 바가 앞으로 떨어진다', '깊이는 얕게'],
        emphasis: ['quads', 'core'],
      },
      {
        name: '드라이브',
        pose: 'drive',
        desc: '멈춤 없이 방향을 바꿔 다리로 바닥을 밀어 수직으로 바를 쏘아 올린다. 이때까지 팔은 아직 밀지 않는다.',
        cues: ['최대한 빠르게 방향 전환', '바는 수직으로만', '팔은 아직 가만히'],
        emphasis: ['quads', 'glutes', 'calves'],
      },
      {
        name: '스플릿 캐치',
        pose: 'splitCatch',
        desc: '한 발은 앞, 한 발은 뒤로 동시에 점프해 딛으며 몸을 바 아래로 내린다. 앞 무릎은 90도, 뒤 무릎은 살짝 굽히고 뒤꿈치는 든다. 팔은 완전히 펴서 고정.',
        cues: ['앞발은 뒤꿈치부터, 뒷발은 앞꿈치로', '바는 귀 뒤쪽 수직선 위', '앞뒤 발 간격은 골반 너비 유지'],
        emphasis: ['delts', 'triceps', 'core', 'quads'],
      },
      {
        name: '리커버리',
        pose: 'overheadLockout',
        desc: '앞발을 반, 뒷발을 반 되돌려 발을 모은다. 팔꿈치와 무릎이 모두 펴진 채로 정지하면 1렙 인정.',
        cues: ['앞발 먼저 → 뒷발 순서로', '바가 흔들리면 다시 세우고 나서 이동', '완전 신전 + 정지'],
        emphasis: ['delts', 'triceps', 'core'],
      },
    ],
    muscles: [
      { key: 'quads', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
      { key: 'hamstrings', level: 'stabilizer' },
    ],
    faults: [
      { problem: '딥에서 상체가 앞으로 기운다', fix: '뒤꿈치에 체중을 두고 수직으로만 내려간다. 벽 앞에 서서 딥 연습을 하면 바로 교정된다.' },
      { problem: '앞발이 너무 멀리 나간다', fix: '스플릿 폭은 앞뒤로 대략 한 걸음. 발이 일직선 위에 놓이면 좌우 균형이 무너진다.' },
      { problem: '바가 머리 앞에 멈춘다', fix: '락아웃 시 고개를 살짝 앞으로 밀어 "창문"을 만들어 바를 귀 뒤로 보낸다.' },
      { problem: '팔로 밀어서 올린다(프레스 아웃)', fix: '다리 드라이브로 띄우고 팔은 "받치는" 역할. 무게를 줄여 타이밍부터.' },
    ],
    scaling: [
      'PVC/빈 바로 스플릿 발 위치부터 반복',
      '푸시 프레스 또는 푸시 저크로 대체',
      '딥+드라이브만 따로 연습 (저크 밸런스)',
      '오버헤드 유연성이 부족하면 덤벨 스플릿 저크',
    ],
    related: ['push-jerk', 'clean-and-jerk', 'squat-clean'],
    terms: ['front-rack', 'lockout', 'dip-drive', 'rx'],
  },

  /* ==================================================================== */
  {
    id: 'push-jerk',
    seoTitle: '푸시 저크 동작 방법과 푸시 프레스 차이',
    seoDesc:
      '푸시 저크는 발 위치를 바꾸지 않고 1/4 스쿼트로 내려가며 바를 머리 위에 받는 동작입니다. 5단계 애니메이션, 사용 근육, 스케일링 옵션을 정리했습니다.',
    thumb: 3,
    ko: '푸시 저크',
    en: 'Push Jerk',
    abbr: 'PJ',
    category: '역도',
    level: '초중급',
    equipment: ['바벨', '원판'],
    tagline: '발 위치를 바꾸지 않고, 1/4 스쿼트로 내려가며 바를 머리 위에 받는 저크',
    intro:
      '푸시 프레스(팔로 끝까지 밀어 올림)와 스플릿 저크(다리를 갈라 받음)의 중간이다. ' +
      '딥-드라이브로 바를 띄운 뒤 두 번째로 몸을 살짝 낮춰(재딥) 팔이 펴진 상태로 받는다. ' +
      '발 위치를 옮기지 않아 사이클이 빨라서 와드에서 반복 횟수가 많을 때 자주 쓴다.',
    phases: [
      {
        name: '프론트 랙 준비',
        pose: 'frontRack',
        desc: '바를 어깨 위에 얹고 발은 골반 너비, 손은 어깨보다 살짝 넓게. 팔꿈치는 바 바로 아래.',
        cues: ['코어 단단히', '체중은 발 전체', '팔꿈치는 바 밑으로'],
        emphasis: ['core', 'delts'],
      },
      {
        name: '딥',
        pose: 'dip',
        desc: '상체 수직, 무릎만 짧게 굽혀 내려간다. 스쿼트가 아니라 아주 얕은 "누르기".',
        cues: ['뒤꿈치 유지', '깊이는 10~15cm', '가슴은 계속 위로'],
        emphasis: ['quads', 'core'],
      },
      {
        name: '드라이브',
        pose: 'drive',
        desc: '다리로 폭발적으로 밀어 바를 수직으로 띄운다. 바가 이마를 지날 때까지 팔은 거들기만 한다.',
        cues: ['멈추지 않고 방향 전환', '바는 머리 옆으로 지나가게 고개를 살짝 뒤로', '수직 경로 유지'],
        emphasis: ['quads', 'glutes', 'calves', 'delts'],
      },
      {
        name: '재딥 · 캐치',
        pose: 'pushCatch',
        desc: '발 위치는 그대로 두고 몸을 1/4 스쿼트만큼 다시 낮추면서 그 아래에서 팔을 편다. 바는 이미 머리 위에 고정.',
        cues: ['"밀어 올린다"가 아니라 "밑으로 들어간다"', '팔은 빠르게 락아웃', '바는 귀 뒤 수직선'],
        emphasis: ['delts', 'triceps', 'quads', 'core'],
      },
      {
        name: '스탠드업',
        pose: 'overheadLockout',
        desc: '오버헤드를 고정한 채 일어선다. 팔꿈치·무릎·고관절이 모두 펴지고 정지하면 1렙.',
        cues: ['바가 안정된 뒤 일어서기', '갈비뼈 닫고 코어 유지', '완전 신전'],
        emphasis: ['delts', 'triceps', 'core'],
      },
    ],
    muscles: [
      { key: 'delts', level: 'primary' },
      { key: 'quads', level: 'primary' },
      { key: 'triceps', level: 'primary' },
      { key: 'glutes', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '딥이 너무 깊다', fix: '깊을수록 느리고 힘이 새어 나간다. 무릎 각도가 살짝 굽는 정도로 짧게.' },
      { problem: '바가 앞으로 나간다', fix: '딥에서 상체가 기울었다는 신호. 뒤꿈치에 체중을 두고 수직으로 내려간다.' },
      { problem: '캐치에서 팔이 덜 펴진다', fix: '드라이브 후 몸을 낮추는 동작을 빼먹은 것. "밑으로 들어가기"를 의식적으로 넣는다.' },
    ],
    scaling: [
      '푸시 프레스로 대체(다리 재딥 없이 팔로 마무리)',
      '덤벨 푸시 저크',
      '무게 하향 후 세트 쪼개기 (예: 2렙을 1+1로)',
    ],
    related: ['split-jerk', 'hang-squat-clean', 'clean-and-jerk'],
    terms: ['front-rack', 'dip-drive', 'lockout'],
  },

  /* ==================================================================== */
  {
    id: 'clean-and-jerk',
    seoTitle: '클린 앤 저크 전체 동작 10단계 정리',
    seoDesc:
      '클린 앤 저크는 바닥의 바벨을 어깨로 올린 뒤 머리 위까지 보내는 올림픽 역도 종목입니다. 셋업부터 리커버리까지 10단계 애니메이션과 사용 근육을 정리했습니다.',
    thumb: 8,
    ko: '클린 앤 저크',
    en: 'Clean & Jerk',
    abbr: 'C&J',
    category: '역도',
    level: '중고급',
    equipment: ['바벨', '원판'],
    tagline: '클린(바닥→어깨)과 저크(어깨→머리 위)를 이어 붙인 올림픽 역도 종목',
    intro:
      '올림픽 역도 2종목 중 하나로, 사람이 머리 위로 들어 올릴 수 있는 가장 무거운 무게를 다루는 리프트다. ' +
      '와드에서 "@Clean & Jerk 70-80%" 같은 표기를 만나면, 내 클린 앤 저크 1RM의 70~80% 무게로 하라는 뜻이다.',
    phases: [
      { name: '셋업', pose: 'floorSetup', desc: '바는 발 중앙 위, 정강이가 바에 닿게. 훅 그립.', cues: ['등 평평하게', '어깨는 바보다 살짝 앞'], emphasis: ['erectors', 'forearms'] },
      { name: '1차 풀', pose: 'firstPull', desc: '다리로 밀어 바를 무릎 위로. 상체 각도 유지.', cues: ['바는 다리를 스치듯', '엉덩이만 솟지 않게'], emphasis: ['quads', 'hamstrings', 'erectors'] },
      { name: '2차 풀', pose: 'extension', desc: '고관절 신전 + 슈러그로 바를 최고 속도로 띄운다.', cues: ['수직 점프하듯', '팔은 마지막에'], emphasis: ['glutes', 'hamstrings', 'traps', 'calves'] },
      { name: '풀 언더', pose: 'pullUnder', desc: '팔꿈치를 회전시켜 바 밑으로 파고든다.', cues: ['빠른 팔꿈치', '발을 스쿼트 스탠스로'], emphasis: ['traps', 'delts', 'core'] },
      { name: '스쿼트 캐치', pose: 'squatCatch', desc: '프론트 랙에 받아 풀 스쿼트 바닥까지.', cues: ['팔꿈치 높게', '상체 수직'], emphasis: ['quads', 'glutes', 'core'] },
      { name: '일어서기', pose: 'frontRack', desc: '프론트 스쿼트로 일어선다. 여기까지가 "클린".', cues: ['가슴 먼저', '완전 신전'], emphasis: ['quads', 'glutes'] },
      { name: '딥', pose: 'dip', desc: '저크 시작. 상체 수직으로 짧게 내려간다.', cues: ['뒤꿈치 유지', '얕게'], emphasis: ['quads', 'core'] },
      { name: '드라이브', pose: 'drive', desc: '다리로 바를 수직으로 쏘아 올린다.', cues: ['멈추지 않고 전환', '수직 경로'], emphasis: ['quads', 'glutes', 'calves'] },
      { name: '스플릿 캐치', pose: 'splitCatch', desc: '앞뒤로 다리를 갈라 딛으며 오버헤드 락아웃.', cues: ['바는 귀 뒤', '팔 완전 신전'], emphasis: ['delts', 'triceps', 'core'] },
      { name: '리커버리', pose: 'overheadLockout', desc: '발을 모아 정지. 1렙 완료.', cues: ['앞발 → 뒷발 순서', '정지 후 내리기'], emphasis: ['delts', 'triceps', 'core'] },
    ],
    muscles: [
      { key: 'glutes', level: 'primary' },
      { key: 'quads', level: 'primary' },
      { key: 'hamstrings', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'lats', level: 'stabilizer' },
    ],
    faults: [
      { problem: '클린에서 이미 지쳐 저크를 망친다', fix: '클린 후 랙에서 한 호흡 정리하고 자세를 다시 세운 뒤 저크를 시작한다.' },
      { problem: '랙 포지션에서 팔꿈치가 처져 딥이 안 된다', fix: '저크 직전 팔꿈치를 살짝 내려 삼두 위에 바를 얹는 "저크 랙"으로 바꿔 잡는다.' },
    ],
    scaling: ['파워 클린 + 푸시 저크', '덤벨 클린 앤 저크', '1RM의 60% 이하 가벼운 무게로 기술만'],
    related: ['squat-clean', 'split-jerk', 'push-jerk'],
    terms: ['one-rm', 'percentage', 'front-rack', 'triple-extension'],
  },

  /* ==================================================================== */
  {
    id: 'double-under',
    seoTitle: '더블 언더 하는 법과 자꾸 걸리는 이유',
    seoDesc:
      '더블 언더는 한 번 점프하는 동안 줄이 발밑을 두 번 지나가는 줄넘기입니다. 4단계 애니메이션, 자꾸 걸리는 원인과 교정법, 싱글 언더 스케일링을 정리했습니다.',
    thumb: 2,
    ko: '더블 언더',
    en: 'Double Under',
    abbr: 'DU',
    category: '모노스트럭처',
    level: '초중급',
    equipment: ['줄넘기'],
    tagline: '한 번 점프하는 동안 줄이 발 밑을 두 번 지나가는 줄넘기',
    intro:
      '크로스핏에서 가장 자주 나오는 유산소 동작이자, 입문자가 가장 오래 붙잡고 씨름하는 기술이다. ' +
      '더 높이 뛰는 게 아니라 손목을 더 빨리 돌리는 게 핵심이다. 팔을 크게 휘두르면 줄이 짧아져서 오히려 걸린다.',
    phases: [
      {
        name: '셋업',
        pose: 'duSetup',
        desc: '줄은 뒤꿈치 뒤에 두고, 팔꿈치를 옆구리에 가볍게 붙인 채 손을 골반 옆 약간 앞에 둔다. 줄 길이는 발로 밟았을 때 손잡이가 겨드랑이~가슴 높이.',
        cues: ['팔꿈치는 몸통에 고정', '시선은 정면', '어깨 힘 빼기'],
        emphasis: ['forearms', 'core'],
      },
      {
        name: '점프 (1회전)',
        pose: 'duJump',
        desc: '발끝으로 가볍게 튀어 오르며 손목을 빠르게 한 번 돌린다. 무릎을 뒤로 접지 않고 몸을 곧게 유지한다.',
        cues: ['발목으로 튀기', '무릎은 거의 펴진 채', '몸통은 한 줄'],
        emphasis: ['calves', 'core', 'forearms'],
      },
      {
        name: '정점 (2회전)',
        pose: 'duPeak',
        desc: '공중 최고점에서 손목을 한 번 더 빠르게 돌려 줄을 두 번째로 통과시킨다. 점프 높이는 15~20cm면 충분하다.',
        cues: ['손목 스냅만 두 번', '팔은 계속 몸통 옆', '몸을 접지 말 것'],
        emphasis: ['forearms', 'delts', 'core'],
      },
      {
        name: '착지',
        pose: 'duLand',
        desc: '앞발바닥으로 부드럽게 착지하고, 무릎과 발목으로 충격을 흡수한 뒤 곧바로 다음 점프로 이어간다.',
        cues: ['뒤꿈치는 살짝만 닿게', '리듬을 일정하게', '한 박자 쉬지 않기'],
        emphasis: ['calves', 'quads', 'core'],
      },
    ],
    muscles: [
      { key: 'calves', level: 'primary' },
      { key: 'forearms', level: 'primary' },
      { key: 'quads', level: 'secondary' },
      { key: 'delts', level: 'secondary' },
      { key: 'hamstrings', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'glutes', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔을 크게 휘두른다', fix: '팔꿈치를 옆구리에 붙이고 손목만 돌린다. 손이 몸에서 멀어지면 줄이 짧아져 발에 걸린다.' },
      { problem: '무릎을 뒤로 접으며 뛴다', fix: '"막대기처럼" 뛰는 연습. 벽 앞이나 거울 앞에서 몸통 일직선 유지.' },
      { problem: '점프가 너무 높다', fix: '15~20cm면 충분하다. 높이 대신 손목 속도를 올린다.' },
      { problem: '한 번에 다 하려다 계속 걸린다', fix: '5~10개씩 끊어서 세트를 계획하고, 걸리면 바로 다시 시작하는 리듬을 만든다.' },
    ],
    scaling: [
      '싱글 언더 2~3배수로 대체 (예: DU 30 → 싱글 60~90)',
      '싱글-싱글-더블 리듬 연습',
      '점프 없이 손목 회전만 연습 (한 손으로 줄 두 개 잡고 돌리기)',
      '시간 제한을 두고 시도 (예: 45초 시도 후 다음 동작)',
    ],
    related: ['row', 'box-jump'],
    terms: ['du', 'time-cap', 'rft'],
  },

  /* ==================================================================== */
  {
    id: 'deadlift',
    seoTitle: '데드리프트 하는 법과 허리 안 아프게 드는 법',
    seoDesc:
      '데드리프트는 바닥의 바벨을 다리와 고관절 신전으로 세워 드는 동작입니다. 4단계 애니메이션과 등이 말리는 이유, 락아웃 기준, 스케일링을 정리했습니다.',
    thumb: 1,
    ko: '데드리프트',
    en: 'Deadlift',
    abbr: 'DL',
    category: '역도',
    level: '초급',
    equipment: ['바벨', '원판'],
    tagline: '바닥의 바를 고관절과 무릎을 펴서 그대로 세워 드는, 가장 무겁게 들 수 있는 동작',
    intro:
      '모든 바벨 동작의 출발점이다. 클린도 스내치도 처음 구간은 결국 데드리프트다. ' +
      '허리로 들어 올리는 운동이 아니라 "바닥을 다리로 밀어내면서 등을 평평하게 유지하는" 운동이다. ' +
      '와드에서는 무게가 무겁고 반복이 많아 가장 먼저 자세가 무너지는 동작이기도 하다.',
    phases: [
      {
        name: '셋업',
        pose: 'dlSetup',
        desc: '바를 발 중앙 위에 놓고 정강이가 바에 닿을 때까지 다가선다. 엉덩이는 스쿼트보다 높고, 어깨는 바 바로 위나 아주 살짝 앞.',
        cues: ['가슴 들고 등은 평평하게', '겨드랑이를 조여 바를 몸 쪽으로', '숨을 크게 마시고 배를 단단히'],
        emphasis: ['erectors', 'lats', 'forearms'],
      },
      {
        name: '바닥에서 떼기',
        pose: 'dlKnee',
        desc: '다리로 바닥을 밀어 바를 무릎까지 올린다. 이 구간에서 상체 각도는 변하지 않고 무릎만 뒤로 빠진다.',
        cues: ['엉덩이와 가슴이 같은 속도로', '바는 정강이를 스치듯 수직으로', '어깨를 뒤로 잡아 두기'],
        emphasis: ['quads', 'hamstrings', 'erectors'],
      },
      {
        name: '락아웃',
        pose: 'standHold',
        desc: '무릎이 지나가면 고관절을 밀어 완전히 편다. 무릎과 엉덩이가 다 펴지고 어깨가 뒤에 있으면 1렙.',
        cues: ['엉덩이를 앞으로 "밀어" 마무리', '뒤로 젖히지 말 것', '갈비뼈 닫고 코어 유지'],
        emphasis: ['glutes', 'hamstrings', 'erectors', 'traps'],
      },
      {
        name: '내리기',
        pose: 'dlKnee',
        desc: '고관절을 먼저 접어 바를 무릎까지 내리고, 그다음 무릎을 굽혀 바닥에 놓는다. 올릴 때의 역순이다.',
        cues: ['엉덩이 먼저 뒤로', '등은 계속 평평하게', '바를 몸에서 떼지 않기'],
        emphasis: ['hamstrings', 'erectors', 'core'],
      },
    ],
    muscles: [
      { key: 'hamstrings', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'erectors', level: 'primary' },
      { key: 'quads', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'lats', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'calves', level: 'stabilizer' },
    ],
    faults: [
      { problem: '등이 둥글게 말린다', fix: '거의 항상 무게가 무겁다는 신호다. 무게를 빼고, 셋업에서 "가슴을 들고 겨드랑이를 조인다"를 먼저 만든 뒤 든다.' },
      { problem: '엉덩이가 먼저 솟는다', fix: '다리 힘을 쓰기 전에 허리로 들어 올린 것. 바닥을 발로 밀어낸다는 느낌으로 다리부터 개입시킨다.' },
      { problem: '바가 몸에서 멀어진다', fix: '광배근으로 바를 정강이 쪽으로 계속 끌어당긴다. 바가 앞으로 나가면 허리 부담이 몇 배가 된다.' },
      { problem: '락아웃에서 뒤로 젖힌다', fix: '펴는 것과 젖히는 것은 다르다. 엉덩이를 앞으로 밀어 골반이 중립이 되는 지점에서 멈춘다.' },
    ],
    scaling: [
      '무게를 낮춰 등이 끝까지 평평한 범위에서만',
      '반복 수를 나눠 세트로 (예: 21회 → 7+7+7)',
      '가동 범위를 줄여 블록·원판 위에서 시작 (랙 풀)',
      '루마니안 데드리프트나 케틀벨 데드리프트로 대체',
    ],
    related: ['sumo-deadlift-high-pull', 'squat-clean', 'dumbbell-deadlift'],
    terms: ['dl', 'lbs-notation', 'rx'],
  },

  /* ==================================================================== */
  {
    id: 'sumo-deadlift-high-pull',
    seoTitle: '스모 데드리프트 하이 풀(SDHP) 하는 법',
    seoDesc:
      'SDHP는 넓은 스탠스에서 좁게 잡은 바를 쇄골 높이까지 당기는 크로스핏 동작입니다. 다리→팔 순서, 어깨가 아픈 이유, 타바타 페이스 배분을 정리했습니다.',
    thumb: 2,
    ko: '스모 데드리프트 하이 풀',
    en: 'Sumo Deadlift High Pull',
    abbr: 'SDHP',
    category: '역도',
    level: '초중급',
    equipment: ['바벨', '원판'],
    tagline: '다리를 넓게 벌리고 바를 쇄골 높이까지 한 번에 끌어올리는 크로스핏 고유 동작',
    intro:
      '데드리프트와 업라이트 로우를 이어 붙인 동작이다. 스모(넓은) 스탠스로 서서 좁게 잡은 바를 ' +
      '다리 힘으로 띄운 뒤, 그 관성을 팔꿈치로 이어받아 쇄골 높이까지 당긴다. ' +
      '타바타처럼 짧고 빠른 인터벌에 자주 나오는데, 어깨가 뻣뻣하면 부담이 큰 동작이라 폼을 먼저 잡아야 한다.',
    phases: [
      {
        name: '스모 셋업',
        pose: 'sumoSetup',
        desc: '발을 어깨보다 넓게, 발끝은 바깥으로. 손은 다리 사이 어깨너비보다 좁게 잡는다. 상체는 데드리프트보다 훨씬 세워져 있다.',
        cues: ['무릎을 발끝 방향으로 밀어내기', '가슴은 위로, 팔은 그냥 줄', '체중은 발 중앙'],
        emphasis: ['quads', 'glutes', 'erectors'],
      },
      {
        name: '다리로 밀기',
        pose: 'extension',
        desc: '다리로 바닥을 밀어 바를 고관절 높이까지 올린다. 여기까지는 팔을 쓰지 않는다.',
        cues: ['바닥을 발로 밀어낸다', '바는 몸에 붙여서', '팔꿈치는 아직 펴진 채'],
        emphasis: ['quads', 'glutes', 'hamstrings'],
      },
      {
        name: '하이 풀',
        pose: 'highPull',
        desc: '고관절이 다 펴진 관성을 이어받아 팔꿈치를 높이 들어 바를 쇄골 높이까지 당긴다. 팔꿈치가 항상 손보다 위에 있어야 한다.',
        cues: ['팔꿈치를 천장으로', '바는 몸을 스치듯', '발뒤꿈치가 살짝 들려도 된다'],
        emphasis: ['traps', 'delts', 'biceps', 'forearms'],
      },
      {
        name: '내리기',
        pose: 'sumoSetup',
        desc: '당긴 경로 그대로 컨트롤해서 내린다. 빠른 인터벌에서는 이 내리는 구간에서 힘이 새기 쉽다.',
        cues: ['바를 던지듯 놓지 않기', '엉덩이를 뒤로 빼며 받기', '호흡을 리듬에 맞추기'],
        emphasis: ['erectors', 'core'],
      },
    ],
    muscles: [
      { key: 'traps', level: 'primary' },
      { key: 'quads', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'delts', level: 'secondary' },
      { key: 'hamstrings', level: 'secondary' },
      { key: 'biceps', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'erectors', level: 'stabilizer' },
      { key: 'core', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔로만 당긴다', fix: '다리 신전이 먼저다. 바가 고관절을 지날 때까지 팔꿈치를 굽히지 않는 드릴부터.' },
      { problem: '손목이 꺾이고 어깨가 아프다', fix: '팔꿈치가 손보다 낮으면 어깨 앞쪽에 걸린다. 팔꿈치를 위로 먼저 보내고, 아프면 가슴 높이까지만 당긴다.' },
      { problem: '허리가 둥글어진다', fix: '스모 스탠스에서 가슴이 무너진 것. 무릎을 바깥으로 밀고 상체를 세운 채 시작한다.' },
      { problem: '타바타에서 첫 라운드에 다 쏟는다', fix: '8라운드 중 가장 적은 렙이 기록이다. 1라운드를 기준으로 잡고 8라운드를 같은 개수로 간다.' },
    ],
    scaling: [
      '빈 바 또는 PVC 로 팔꿈치 순서만 익히기',
      '케틀벨 SDHP 로 대체',
      '가슴 높이까지만 당기기 (어깨가 불편할 때)',
      '(75/55 lb) → 남 25~30kg / 여 15~20kg 등으로 하향',
    ],
    related: ['deadlift', 'squat-clean'],
    terms: ['sdhp', 'tabata', 'triple-extension', 'lbs-notation'],
  },

  /* ==================================================================== */
  {
    id: 'bench-press',
    seoTitle: '벤치 프레스 하는 법과 5-5-3-3-2 세트 읽는 법',
    seoDesc:
      '벤치 프레스의 견갑 고정·팔꿈치 각도·락아웃 기준을 5단계로 정리했습니다. 크로스핏 스트렝스 파트에서 자주 나오는 5-5-3-3-2 형식 해석도 함께 다룹니다.',
    thumb: 2,
    ko: '벤치 프레스',
    en: 'Bench Press',
    abbr: 'BP',
    category: '역도',
    level: '초급',
    equipment: ['바벨', '원판', '벤치'],
    tagline: '벤치에 누워 바를 가슴까지 내렸다가 팔을 완전히 펴서 밀어 올리는 상체 근력 운동',
    intro:
      '크로스핏 와드 본편보다는 앞쪽 스트렝스 파트에 나오는 동작이다. ' +
      '"Every 2:00 x 5 / 5-5-3-3-2" 처럼 세트마다 렙이 줄어드는 형식과 함께 나오면, ' +
      '렙이 줄어드는 만큼 무게를 올려 마지막 2렙에서 그날의 최고 무게를 치라는 뜻이다.',
    phases: [
      {
        name: '셋업 · 락아웃',
        pose: 'benchTop',
        desc: '눈이 바 바로 아래 오도록 눕는다. 발은 바닥에 단단히, 견갑을 모아 등 위쪽으로 아치를 만들고 바를 어깨 수직선 위에 든다.',
        cues: ['견갑을 모아 벤치에 고정', '발로 바닥을 밀어 몸을 고정', '손목은 세워서 바를 손바닥 뿌리에'],
        emphasis: ['delts', 'triceps', 'core'],
      },
      {
        name: '내리기',
        pose: 'benchMid',
        desc: '팔꿈치를 몸통에서 45도 정도 유지한 채 컨트롤해서 내린다. 팔꿈치를 완전히 벌리면 어깨가 다친다.',
        cues: ['바를 "당겨 내린다"는 느낌', '팔꿈치는 45도', '견갑은 계속 모은 채'],
        emphasis: ['chest', 'delts', 'lats'],
      },
      {
        name: '바텀',
        pose: 'benchBottom',
        desc: '바가 명치~젖꼭지 라인에 닿는다. 가슴 위에서 튕기지 않고 잠깐 멈춘다는 느낌으로.',
        cues: ['가슴에 살짝 닿기만', '반동으로 튕기지 않기', '손목·팔꿈치·바가 한 수직선'],
        emphasis: ['chest', 'delts', 'triceps'],
      },
      {
        name: '프레스',
        pose: 'benchMid',
        desc: '발로 바닥을 밀며 가슴과 삼두로 바를 밀어 올린다. 바는 약간 사선으로 어깨 위를 향한다.',
        cues: ['다리 드라이브도 함께', '엉덩이는 벤치에 붙인 채', '끝까지 밀어 팔꿈치 락아웃'],
        emphasis: ['chest', 'triceps', 'delts'],
      },
      {
        name: '락아웃',
        pose: 'benchTop',
        desc: '팔꿈치가 완전히 펴지고 바가 어깨 수직선 위에 멈추면 1렙. 다음 렙 전에 호흡을 다시 채운다.',
        cues: ['완전 신전 후 정지', '견갑 고정 유지', '숨을 다시 크게 마시기'],
        emphasis: ['triceps', 'delts'],
      },
    ],
    muscles: [
      { key: 'chest', level: 'primary' },
      { key: 'triceps', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'lats', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'glutes', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔꿈치를 90도로 완전히 벌린다', fix: '어깨 앞쪽에 부담이 집중된다. 팔꿈치를 몸통에서 45도 정도로 좁혀 내린다.' },
      { problem: '엉덩이가 벤치에서 뜬다', fix: '무게가 무겁다는 신호. 발로 바닥을 밀되 엉덩이는 벤치에 붙인 상태를 유지한다.' },
      { problem: '가슴에서 튕겨 올린다', fix: '반동이 아니라 근력으로 미는 게 목적이다. 닿는 순간 잠깐 멈추고 밀어 올린다.' },
      { problem: '혼자 무거운 무게를 친다', fix: '반드시 보조자를 세우거나 세이프티 바를 건다. 벤치 프레스는 혼자 실패하면 빠져나올 수 없는 유일한 동작이다.' },
    ],
    scaling: [
      '빈 바로 시작해 세트마다 조금씩 올리기',
      '덤벨 벤치 프레스로 대체 (좌우 균형·어깨 부담 감소)',
      '푸시업으로 대체',
      '어깨가 불편하면 가동 범위를 줄여 보드/수건을 가슴에 올리고',
    ],
    related: ['push-up', 'dumbbell-shoulder-to-overhead'],
    terms: ['percentage', 'one-rm', 'emom', 'pr'],
  },

  /* ==================================================================== */
  {
    id: 'power-snatch',
    seoTitle: '파워 스내치 하는 법과 스쿼트 스내치와의 차이',
    seoDesc:
      '파워 스내치는 바닥의 바를 한 번에 머리 위로 보내 하프 스쿼트에서 받는 동작입니다. 6단계 애니메이션과 바가 앞으로 날아가는 이유, 스케일링을 정리했습니다.',
    thumb: 4,
    ko: '파워 스내치',
    en: 'Power Snatch',
    abbr: 'PSN',
    category: '역도',
    level: '중급',
    equipment: ['바벨', '원판'],
    tagline: '바닥의 바를 한 번에 머리 위로 보내고 하프 스쿼트 깊이에서 받아내는 동작',
    intro:
      '스내치는 바닥에서 머리 위까지를 한 동작으로 잇는, 역도에서 가장 빠른 리프트다. ' +
      '받는 깊이가 무릎 위(하프 스쿼트)면 파워 스내치, 풀 스쿼트 바닥까지 내려가면 스쿼트 스내치다. ' +
      '그립이 아주 넓어서 클린보다 바가 짧은 거리만 올라가도 되지만, 그만큼 어깨·흉추 유연성이 필요하다.',
    phases: [
      {
        name: '셋업',
        pose: 'snatchSetup',
        desc: '넓은 스내치 그립(바를 잡고 팔을 벌려 바가 고관절 접히는 곳에 오는 폭)으로 잡는다. 그립이 넓어 엉덩이가 클린보다 낮고 가슴은 더 서 있다.',
        cues: ['훅 그립', '어깨는 바보다 살짝 앞', '겨드랑이를 조여 바를 몸 쪽으로'],
        emphasis: ['erectors', 'lats', 'forearms'],
      },
      {
        name: '1차 풀',
        pose: 'hangLow',
        desc: '다리로 바닥을 밀어 바를 무릎 위로 보낸다. 상체 각도는 그대로 두고 무릎만 뒤로 빠진다.',
        cues: ['상체 각도 유지', '바는 다리를 스치듯', '팔은 그냥 줄'],
        emphasis: ['quads', 'hamstrings', 'erectors'],
      },
      {
        name: '2차 풀 (신전)',
        pose: 'snatchExtension',
        desc: '바가 고관절(허벅지 상단)에 닿는 순간 발목·무릎·고관절을 폭발적으로 펴며 슈러그한다. 바 속도의 대부분이 여기서 나온다.',
        cues: ['수직으로 점프하듯', '바를 고관절로 쳐 올린다', '팔 당김은 신전이 끝난 뒤'],
        emphasis: ['glutes', 'hamstrings', 'traps', 'calves'],
      },
      {
        name: '풀 언더',
        pose: 'snatchPullUnder',
        desc: '팔꿈치를 높고 넓게 끌어올리며 바 밑으로 몸을 밀어 넣는다. 바는 계속 몸 가까이 수직으로 올라간다.',
        cues: ['팔꿈치는 항상 손보다 위', '바를 몸에서 떼지 않기', '발을 살짝 옮겨 받을 준비'],
        emphasis: ['traps', 'delts', 'core'],
      },
      {
        name: '파워 캐치',
        pose: 'snatchPowerCatch',
        desc: '무릎 위 깊이(하프 스쿼트)에서 팔을 완전히 편 채 바를 머리 위에 받는다. 바는 귀 뒤 수직선 위.',
        cues: ['"밀어 올린다"가 아니라 "밑으로 들어간다"', '어깨를 귀 쪽으로 밀어 능동적으로 받치기', '바는 머리 뒤'],
        emphasis: ['delts', 'triceps', 'core', 'quads'],
      },
      {
        name: '스탠드업',
        pose: 'overheadLockout',
        desc: '오버헤드를 고정한 채 일어선다. 팔꿈치·무릎·고관절이 모두 펴지고 정지하면 1렙.',
        cues: ['바가 안정된 뒤 일어서기', '갈비뼈 닫고 코어 유지', '완전 신전 + 정지'],
        emphasis: ['delts', 'core', 'glutes'],
      },
    ],
    muscles: [
      { key: 'glutes', level: 'primary' },
      { key: 'hamstrings', level: 'primary' },
      { key: 'traps', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'quads', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'lats', level: 'stabilizer' },
    ],
    faults: [
      { problem: '바가 앞으로 날아간다', fix: '신전이 끝나기 전에 팔로 당겼거나 상체가 먼저 일어난 경우. 바가 고관절에 닿는 타이밍부터 다시 잡는다.' },
      { problem: '받을 때 팔이 흔들린다', fix: '오버헤드에서 어깨를 위로 밀어 능동적으로 지지한다. 오버헤드 홀드·스낫치 밸런스로 따로 훈련.' },
      { problem: '팔꿈치가 손보다 낮게 당긴다', fix: '하이 풀에서 팔꿈치가 처지면 바가 몸에서 떨어진다. 하이 행 하이 풀로 순서를 분리해 연습.' },
      { problem: '그립이 아파 놓친다', fix: '훅 그립을 쓰고, 세트를 쪼개 그립 회복 시간을 만든다.' },
    ],
    scaling: [
      'PVC·빈 바로 신전 → 풀 언더 타이밍만 반복',
      '행 파워 스내치로 가동 범위 축소',
      '덤벨 스내치로 대체 (오버헤드 유연성 부담이 훨씬 적다)',
      '(95/65 lb) → 남 30~35kg / 여 20~25kg 등으로 하향',
    ],
    related: ['hang-power-snatch', 'squat-snatch', 'squat-clean', 'dumbbell-snatch'],
    terms: ['triple-extension', 'hook-grip', 'lockout', 'lbs-notation'],
  },

  /* ==================================================================== */
  {
    id: 'hang-power-snatch',
    seoTitle: '행 파워 스내치 — 무릎 위/아래 시작 차이',
    seoDesc:
      'Above knee와 Below knee 표기가 무엇을 뜻하는지, 행 파워 스내치의 힙 힌지와 신전 타이밍을 6단계 애니메이션으로 정리했습니다.',
    thumb: 2,
    ko: '행 파워 스내치',
    en: 'Hang Power Snatch',
    abbr: 'HPSN',
    category: '역도',
    level: '중급',
    equipment: ['바벨', '원판'],
    tagline: '바닥이 아니라 매달린 위치에서 시작하는 파워 스내치 — 무릎 위/아래로 시작 높이를 나눠 쓴다',
    intro:
      '"Above knee(무릎 위)"와 "Below knee(무릎 아래)"는 시작 높이를 지정하는 표기다. ' +
      '높을수록 반동이 짧아 순수한 고관절 신전 능력을 시험하고, 낮을수록 바닥에서 하는 스내치에 가까워진다. ' +
      '이 둘과 파워 스내치를 이어 붙인 "1+1+1 콤플렉스"는 스내치 기술을 한 세트 안에서 점검하는 고전적인 구성이다.',
    phases: [
      {
        name: '스탠딩',
        pose: 'standHold',
        desc: '데드리프트로 바를 세워 올려 선다. 스내치 그립이라 바가 고관절 접히는 지점에 걸린다.',
        cues: ['훅 그립', '어깨는 뒤, 가슴은 위', '바는 허벅지에 붙여서'],
        emphasis: ['forearms', 'erectors'],
      },
      {
        name: '행 (무릎 위)',
        pose: 'hangHigh',
        desc: '무릎을 살짝 굽히고 엉덩이를 뒤로 빼 바를 허벅지 상단까지 내린다. 여기가 "Above knee" 시작점이다.',
        cues: ['등 각도 고정, 엉덩이만 뒤로', '어깨가 바보다 앞', '체중은 발 중앙~뒤꿈치'],
        emphasis: ['hamstrings', 'erectors', 'lats'],
      },
      {
        name: '행 (무릎 아래)',
        pose: 'hangLow',
        desc: '같은 힌지를 더 깊게 해 바를 무릎 아래까지 내린다. "Below knee" 시작점. 거리가 길어져 더 어렵다.',
        cues: ['무릎을 다시 앞으로 조금 내보내기', '등은 계속 평평하게', '바는 정강이를 스치듯'],
        emphasis: ['hamstrings', 'erectors', 'quads'],
      },
      {
        name: '신전',
        pose: 'snatchExtension',
        desc: '고관절로 바를 쳐 올린다. 바닥에서 시작할 때보다 준비 구간이 짧아 타이밍이 훨씬 예민하다.',
        cues: ['수직 점프하듯', '팔은 마지막에', '바를 몸에 붙인 채'],
        emphasis: ['glutes', 'hamstrings', 'traps', 'calves'],
      },
      {
        name: '풀 언더',
        pose: 'snatchPullUnder',
        desc: '팔꿈치를 높이 들어 바 밑으로 파고든다.',
        cues: ['팔꿈치는 손보다 위', '발을 스쿼트 스탠스로', '바는 수직 경로'],
        emphasis: ['traps', 'delts', 'core'],
      },
      {
        name: '파워 캐치 · 스탠드업',
        pose: 'snatchPowerCatch',
        desc: '하프 스쿼트 깊이에서 오버헤드로 받고 일어선다. 다음 렙은 다시 컨트롤해서 행 포지션으로 내린다.',
        cues: ['능동적으로 어깨 밀어 받치기', '완전 신전으로 마무리', '내릴 때 허벅지로 받기'],
        emphasis: ['delts', 'triceps', 'quads', 'core'],
      },
    ],
    muscles: [
      { key: 'hamstrings', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'traps', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'quads', level: 'secondary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'lats', level: 'stabilizer' },
    ],
    faults: [
      { problem: '행에서 스쿼트로 내려간다', fix: '행은 힙 힌지다. 무릎은 살짝만 굽히고 엉덩이를 뒤로 보낸다.' },
      { problem: '반동을 못 쓰고 팔로 들어 올린다', fix: '무게를 줄이고 하이 행(허벅지 상단)에서 신전만 반복해 타이밍을 만든다.' },
      { problem: '무릎 아래에서 바가 몸에서 멀어진다', fix: '광배근으로 바를 계속 몸 쪽으로 끌어당긴다. 정강이를 스치는 경로를 유지.' },
    ],
    scaling: [
      '무릎 위(하이 행)에서만 수행',
      'PVC·빈 바로 콤플렉스 순서만 반복',
      '오버헤드가 불편하면 행 파워 클린으로 대체',
      '@60~65% 대신 편하게 반복 가능한 가벼운 무게로',
    ],
    related: ['power-snatch', 'squat-snatch', 'hang-squat-clean'],
    terms: ['hang', 'triple-extension', 'percentage', 'emom'],
  },

  /* ==================================================================== */
  {
    id: 'squat-snatch',
    seoTitle: '스쿼트 스내치 하는 법과 필요한 선행 능력',
    seoDesc:
      '스쿼트 스내치는 바를 머리 위에 든 채 풀 스쿼트 바닥에서 받는 가장 어려운 역도 동작입니다. 6단계 분해와 오버헤드 스쿼트 선행 조건을 정리했습니다.',
    thumb: 4,
    ko: '스쿼트 스내치',
    en: 'Squat Snatch',
    abbr: 'SSN',
    category: '역도',
    level: '중고급',
    equipment: ['바벨', '원판'],
    tagline: '바를 머리 위에 든 채 풀 스쿼트 바닥까지 내려가 받아내는, 가장 어려운 역도 동작',
    intro:
      '올림픽 역도 2종목 중 하나이자 크로스핏에서 기술 난도가 가장 높은 동작이다. ' +
      '파워 스내치와 다른 점은 받는 깊이 하나지만, 그 깊이 때문에 오버헤드 스쿼트를 할 수 있어야 시도할 수 있다. ' +
      '와드에 "Hang Snatch", "Squat Snatch" 가 따로 적혀 있으면 대개 풀 스쿼트로 받으라는 뜻이다.',
    phases: [
      {
        name: '셋업',
        pose: 'snatchSetup',
        desc: '넓은 스내치 그립으로 바를 발 중앙 위에 두고 선다.',
        cues: ['훅 그립', '가슴 들고 등은 평평하게', '겨드랑이 조이기'],
        emphasis: ['erectors', 'lats', 'forearms'],
      },
      {
        name: '1차 풀',
        pose: 'hangLow',
        desc: '다리로 밀어 바를 무릎 위로 보낸다. 상체 각도 유지.',
        cues: ['엉덩이만 먼저 솟지 않게', '바는 다리를 스치듯', '팔은 그냥 줄'],
        emphasis: ['quads', 'hamstrings', 'erectors'],
      },
      {
        name: '2차 풀 (신전)',
        pose: 'snatchExtension',
        desc: '고관절로 바를 쳐 올리며 발목·무릎·고관절을 동시에 편다.',
        cues: ['수직 점프하듯', '팔은 마지막에', '슈러그까지 이어서'],
        emphasis: ['glutes', 'hamstrings', 'traps', 'calves'],
      },
      {
        name: '풀 언더',
        pose: 'snatchPullUnder',
        desc: '팔꿈치를 높이 들며 바 밑으로 몸을 던져 넣는다. 파워 스내치보다 더 빠르고 더 깊게 들어가야 한다.',
        cues: ['팔꿈치는 손보다 위', '고개를 살짝 뒤로', '발을 스쿼트 스탠스로'],
        emphasis: ['traps', 'delts', 'core'],
      },
      {
        name: '스쿼트 캐치',
        pose: 'snatchSquatCatch',
        desc: '팔을 완전히 편 채 오버헤드 스쿼트 바닥에서 받는다. 바는 어깨·고관절과 한 수직선 위에 있어야 버틴다.',
        cues: ['어깨를 위로 밀어 능동적으로 지지', '가슴은 세우고 무릎은 바깥으로', '바는 귀 뒤'],
        emphasis: ['delts', 'quads', 'glutes', 'core'],
      },
      {
        name: '일어서기',
        pose: 'overheadLockout',
        desc: '오버헤드 스쿼트로 일어선다. 완전 신전 + 정지하면 1렙.',
        cues: ['가슴 먼저 세우고', '바는 계속 머리 뒤 수직선', '흔들리면 멈췄다가 일어나기'],
        emphasis: ['quads', 'glutes', 'delts', 'core'],
      },
    ],
    muscles: [
      { key: 'glutes', level: 'primary' },
      { key: 'quads', level: 'primary' },
      { key: 'hamstrings', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'traps', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'lats', level: 'stabilizer' },
    ],
    faults: [
      { problem: '바닥에서 바가 앞으로 떨어진다', fix: '오버헤드 스쿼트 자체가 안 되는 경우가 대부분이다. 빈 바 오버헤드 스쿼트부터 만들고 나서 스쿼트 스내치를 시도한다.' },
      { problem: '받자마자 팔꿈치가 굽는다', fix: '락아웃을 능동적으로 유지해야 한다. 오버헤드 홀드 30초 × 3세트로 지지력을 먼저 만든다.' },
      { problem: '깊이가 안 나온다', fix: '발목·흉추 모빌리티 문제인 경우가 많다. 역도화를 신거나 원판 위에 뒤꿈치를 올리고 연습.' },
    ],
    scaling: [
      '파워 스내치 + 오버헤드 스쿼트로 분리',
      '파워 스내치로 대체',
      '빈 바 오버헤드 스쿼트로 깊이부터 확보',
      '무게를 크게 낮추고 기술 반복에 집중',
    ],
    related: ['power-snatch', 'hang-power-snatch', 'squat-clean'],
    terms: ['ohs', 'lockout', 'unbroken', 'rft'],
  },

  /* ==================================================================== */
  {
    id: 'pull-up',
    seoTitle: '킵핑 풀업 하는 법 — 아치와 호로우 리듬',
    seoDesc:
      '크로스핏 풀업(킵핑)의 아치-호로우 리듬과 턱이 봉 위로 올라가는 인정 기준을 5단계로 정리했습니다. 밴드·점핑 풀업 등 스케일링도 함께 다룹니다.',
    thumb: 3,
    ko: '풀업',
    en: 'Pull-up',
    abbr: 'PU',
    category: '체조',
    level: '초중급',
    equipment: ['철봉'],
    tagline: '철봉에 매달려 턱이 봉 위로 올라가게 몸을 끌어올리는 동작',
    intro:
      '크로스핏에서 풀업은 보통 "킵핑 풀업"을 뜻한다. 반동 없이 하는 스트릭트 풀업과 달리, ' +
      '아치와 호로우를 오가는 몸의 흔들림으로 반복 효율을 크게 올린다. ' +
      '반동이 붙는 만큼 어깨에 실리는 힘도 커서, 스트릭트로 3~5개를 할 수 있게 된 뒤 킵을 배우는 순서가 안전하다.',
    phases: [
      {
        name: '데드 행',
        pose: 'barHang',
        desc: '어깨너비보다 약간 넓게 잡고 팔을 완전히 편 채 매달린다. 어깨는 완전히 늘어지지 않게 살짝 잡아 둔다.',
        cues: ['엄지를 봉 위로 감아 잡기', '갈비뼈 닫고 코어 조이기', '다리는 모아서'],
        emphasis: ['lats', 'forearms', 'core'],
      },
      {
        name: '아치 (킵 뒤)',
        pose: 'barArch',
        desc: '가슴을 앞으로 내밀고 발을 뒤로 보내 몸을 활처럼 만든다. 킵의 "충전" 구간이다.',
        cues: ['어깨로 밀어 몸을 뒤로', '팔은 편 채', '시선은 봉'],
        emphasis: ['lats', 'delts', 'core'],
      },
      {
        name: '호로우 (킵 앞)',
        pose: 'barHollow',
        desc: '엉덩이를 뒤로 빼고 발을 앞으로 차 몸을 바나나 모양으로 만든다. 이 반동이 당김을 시작시킨다.',
        cues: ['배를 조여 갈비뼈 닫기', '발끝을 앞으로', '리듬은 "아치-호로우"의 반복'],
        emphasis: ['core', 'hipflexors', 'lats'],
      },
      {
        name: '풀',
        pose: 'barChinOver',
        desc: '호로우에서 팔꿈치를 뒤로 당겨 턱이 봉 위로 올라가게 한다. 턱이 봉을 넘어야 1렙 인정.',
        cues: ['팔꿈치를 옆구리 쪽으로', '봉을 아래로 부러뜨린다는 느낌', '턱이 아니라 가슴을 봉으로'],
        emphasis: ['lats', 'biceps', 'traps', 'forearms'],
      },
      {
        name: '푸시 어웨이',
        pose: 'barArch',
        desc: '내려오면서 봉을 살짝 밀어내 다시 아치로 이어간다. 그냥 떨어지면 다음 렙의 리듬이 끊긴다.',
        cues: ['내려올 때 봉을 밀어내기', '팔을 완전히 펴서 1렙 마무리', '리듬을 유지'],
        emphasis: ['lats', 'delts', 'core'],
      },
    ],
    muscles: [
      { key: 'lats', level: 'primary' },
      { key: 'biceps', level: 'primary' },
      { key: 'forearms', level: 'primary' },
      { key: 'traps', level: 'secondary' },
      { key: 'delts', level: 'secondary' },
      { key: 'core', level: 'secondary' },
      { key: 'chest', level: 'stabilizer' },
      { key: 'hipflexors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔을 완전히 펴지 않고 반만 내려온다', fix: '노렙이다. 매 렙 팔꿈치를 완전히 펴고 다시 시작한다. 반복 수를 줄이더라도 가동 범위를 지킨다.' },
      { problem: '다리만 퍼덕이고 몸이 안 올라간다', fix: '킵은 다리 차기가 아니라 어깨의 아치-호로우다. 매달린 채 스윙만 10회씩 연습해 리듬부터 만든다.' },
      { problem: '손바닥이 찢어진다', fix: '봉을 손바닥 뿌리가 아니라 손가락 쪽으로 얕게 잡고, 그립(손 보호대)을 쓰거나 굳은살을 정리한다.' },
      { problem: '어깨 앞쪽이 아프다', fix: '스트릭트 풀업 능력 없이 킵부터 배운 경우가 많다. 밴드 풀업·링 로우로 근력을 먼저 만든다.' },
    ],
    scaling: [
      '밴드 보조 풀업 (밴드가 굵을수록 쉬움)',
      '점핑 풀업 — 박스를 밟고 뛰어 올라 천천히 내려오기',
      '링 로우 / 인버티드 로우로 대체',
      '반복 수를 줄여 세트로 나누기 (예: 12회 → 4×3)',
    ],
    related: ['chest-to-bar-pull-up', 'toes-to-bar', 'ring-dip'],
    terms: ['kipping', 'no-rep', 'c2b'],
  },

  /* ==================================================================== */
  {
    id: 'chest-to-bar-pull-up',
    seoTitle: '체스트 투 바 풀업(C2B) 하는 법',
    seoDesc:
      '가슴이 봉에 닿아야 인정되는 C2B 풀업의 킵 진폭과 고관절 스냅, 노렙이 나는 이유와 스케일링을 5단계 애니메이션으로 정리했습니다.',
    thumb: 3,
    ko: '체스트 투 바 풀업',
    en: 'Chest-to-Bar Pull-up',
    abbr: 'C2B',
    category: '체조',
    level: '중급',
    equipment: ['철봉'],
    tagline: '턱이 아니라 가슴(쇄골 아래)이 봉에 닿아야 인정되는 풀업',
    intro:
      '일반 풀업보다 5~10cm 더 높이 당겨야 하고, 그만큼 킵의 힘과 타이밍이 정확해야 한다. ' +
      '팔 힘만으로 그 높이를 만들기는 어렵고, 아치에서 호로우로 바뀌는 순간의 고관절 스냅을 얼마나 잘 쓰느냐가 갈린다. ' +
      '코치는 "가슴이 봉에 닿는 소리"로 판정한다.',
    phases: [
      {
        name: '데드 행',
        pose: 'barHang',
        desc: '풀업보다 살짝 넓게 잡는다. 넓을수록 가슴이 봉에 닿기 쉬워진다.',
        cues: ['그립은 어깨너비보다 넓게', '코어 조이고 다리 모으기', '어깨는 완전히 늘어뜨리지 않기'],
        emphasis: ['lats', 'forearms', 'core'],
      },
      {
        name: '아치',
        pose: 'barArch',
        desc: '가슴을 내밀고 발을 뒤로 보내 크게 활을 만든다. C2B 는 이 진폭이 일반 풀업보다 커야 한다.',
        cues: ['어깨로 크게 밀기', '팔은 편 채', '리듬을 서두르지 않기'],
        emphasis: ['lats', 'delts', 'core'],
      },
      {
        name: '호로우 + 고관절 스냅',
        pose: 'barHollow',
        desc: '발을 앞으로 차면서 고관절을 접었다 펴는 스냅으로 몸을 위로 쏘아 올린다.',
        cues: ['발끝을 앞으로 차기', '배를 조여 갈비뼈 닫기', '스냅은 짧고 강하게'],
        emphasis: ['core', 'hipflexors', 'glutes'],
      },
      {
        name: '풀 — 가슴이 봉에',
        pose: 'barChestTo',
        desc: '팔꿈치를 뒤로 당기면서 상체를 살짝 뒤로 눕혀 쇄골 아래가 봉에 닿게 한다.',
        cues: ['봉을 골반 쪽으로 당긴다는 느낌', '상체를 살짝 뒤로', '가슴이 닿는 소리를 확인'],
        emphasis: ['lats', 'biceps', 'traps', 'delts'],
      },
      {
        name: '푸시 어웨이',
        pose: 'barArch',
        desc: '봉을 밀어내며 내려와 다음 아치로 이어간다.',
        cues: ['내려올 때 밀어내기', '팔 완전히 펴기', '연속 렙은 리듬 유지'],
        emphasis: ['lats', 'delts', 'core'],
      },
    ],
    muscles: [
      { key: 'lats', level: 'primary' },
      { key: 'biceps', level: 'primary' },
      { key: 'traps', level: 'primary' },
      { key: 'core', level: 'secondary' },
      { key: 'delts', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'hipflexors', level: 'stabilizer' },
      { key: 'glutes', level: 'stabilizer' },
    ],
    faults: [
      { problem: '가슴이 안 닿아 계속 노렙', fix: '높이가 아니라 각도 문제인 경우가 많다. 상체를 살짝 뒤로 눕히며 봉을 골반 쪽으로 당긴다.' },
      { problem: '초반에 다 쏟고 후반에 한 개도 못 한다', fix: '와드 시작부터 세트를 쪼개 계획한다. 8개면 5+3 처럼.' },
      { problem: '킵 진폭이 작다', fix: '아치를 크게 만드는 연습부터. 매달려서 크게 스윙만 하는 드릴을 웜업에 넣는다.' },
    ],
    scaling: [
      '일반 풀업으로 대체',
      '밴드 보조 풀업',
      '점핑 C2B (박스를 밟고 뛰어 가슴까지)',
      '링 로우 — 몸을 더 눕힐수록 어려워진다',
    ],
    related: ['pull-up', 'toes-to-bar'],
    terms: ['c2b', 'kipping', 'no-rep'],
  },

  /* ==================================================================== */
  {
    id: 'toes-to-bar',
    seoTitle: '토투바(T2B) 하는 법과 발이 안 올라가는 이유',
    seoDesc:
      '토투바는 매달린 채 발끝을 봉에 닿게 올리는 동작입니다. 광배근으로 봉을 당겨 몸을 눕히는 원리와 K2C 스케일링을 5단계로 정리했습니다.',
    thumb: 3,
    ko: '토투바',
    en: 'Toes-to-Bar',
    abbr: 'T2B',
    category: '체조',
    level: '중급',
    equipment: ['철봉'],
    tagline: '철봉에 매달린 채 발끝을 봉까지 올려 닿게 하는 코어 동작',
    intro:
      '두 발끝이 손 사이 봉에 닿아야 1렙이다. 복근 운동처럼 보이지만 실제로는 광배근으로 봉을 당겨 ' +
      '몸을 뒤로 눕히는 힘과, 아치-호로우 리듬이 반복 수를 결정한다. ' +
      '연속으로 하려면 올라간 발을 뒤로 "던져" 다음 아치를 만드는 감을 잡아야 한다.',
    phases: [
      {
        name: '데드 행',
        pose: 'barHang',
        desc: '어깨너비로 잡고 매달린다. 어깨를 살짝 잡아 두고 몸은 한 줄로.',
        cues: ['갈비뼈 닫기', '다리 모으고 발끝 모으기', '어깨 늘어뜨리지 않기'],
        emphasis: ['lats', 'core', 'forearms'],
      },
      {
        name: '아치',
        pose: 'barArch',
        desc: '가슴을 내밀고 발을 뒤로 보내 활을 만든다. 이 반동이 다리를 올리는 힘이 된다.',
        cues: ['어깨로 밀기', '발을 뒤로 크게', '팔은 편 채'],
        emphasis: ['lats', 'delts', 'core'],
      },
      {
        name: '호로우 + 당기기',
        pose: 'barHollow',
        desc: '광배근으로 봉을 당겨 몸을 살짝 뒤로 눕히면서 무릎을 가슴 쪽으로 끌어올린다.',
        cues: ['봉을 아래로 당겨 몸을 눕히기', '배를 먼저 접기', '팔은 살짝만 굽혀도 된다'],
        emphasis: ['lats', 'core', 'hipflexors'],
      },
      {
        name: '토투바',
        pose: 'barToesTo',
        desc: '무릎을 편 상태로 발끝을 손 사이 봉까지 올려 닿게 한다. 두 발이 함께 닿아야 인정된다.',
        cues: ['발끝으로 봉을 "찍는다"', '엉덩이를 뒤로 접기', '시선은 발끝'],
        emphasis: ['core', 'hipflexors', 'lats', 'quads'],
      },
      {
        name: '내리며 아치로',
        pose: 'barArch',
        desc: '내려오는 다리를 뒤로 던져 다음 아치를 만든다. 그냥 떨어뜨리면 리듬이 끊긴다.',
        cues: ['발을 뒤로 던지기', '팔은 편 채로', '호흡을 리듬에 맞추기'],
        emphasis: ['core', 'lats', 'delts'],
      },
    ],
    muscles: [
      { key: 'core', level: 'primary' },
      { key: 'hipflexors', level: 'primary' },
      { key: 'lats', level: 'primary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'quads', level: 'secondary' },
      { key: 'delts', level: 'secondary' },
      { key: 'biceps', level: 'stabilizer' },
    ],
    faults: [
      { problem: '다리를 앞으로만 차서 봉에 못 닿는다', fix: '광배근으로 봉을 당겨 몸을 뒤로 눕혀야 발이 올라갈 공간이 생긴다. 팔을 완전히 편 채 버티지 말 것.' },
      { problem: '그립이 먼저 터진다', fix: '21회처럼 렙이 많으면 처음부터 7+7+7 로 쪼갠다. 손가락 끝으로 얕게 잡으면 오래 버틴다.' },
      { problem: '무릎이 굽는다', fix: '가동 범위 기준은 발끝이 봉에 닿는 것이라 무릎이 굽어도 인정되는 경우가 많지만, 다리를 펴야 반동이 산다. 힘들면 K2C 로 스케일링한다.' },
    ],
    scaling: [
      '니 투 체스트(K2C) — 무릎을 가슴까지만',
      '니 투 엘보 — 무릎이 팔꿈치에 닿게',
      '행잉 니 레이즈 또는 누워서 레그 레이즈',
      '반복 수를 줄이기 (21 → 12)',
    ],
    related: ['pull-up', 'chest-to-bar-pull-up'],
    terms: ['t2b', 'k2c', 'kipping', 'no-rep'],
  },

  /* ==================================================================== */
  {
    id: 'ring-dip',
    seoTitle: '링 딥 하는 법과 어깨 안 아프게 하는 요령',
    seoDesc:
      '링 딥의 서포트 자세, 팔꿈치 방향, 어깨가 팔꿈치 아래까지 내려가는 인정 기준을 4단계로 정리했습니다. 밴드 보조 등 스케일링도 함께 다룹니다.',
    thumb: 2,
    ko: '링 딥',
    en: 'Ring Dip',
    abbr: 'RD',
    category: '체조',
    level: '중급',
    equipment: ['링'],
    tagline: '흔들리는 링 위에서 몸을 내렸다 밀어 올리는, 딥의 가장 어려운 버전',
    intro:
      '평행봉 딥과 동작은 같지만 링이 고정되어 있지 않아 안정화 근육이 훨씬 많이 동원된다. ' +
      '어깨가 팔꿈치 아래로 내려가야 1렙이고, 위에서는 팔꿈치를 완전히 펴야 한다. ' +
      '타바타처럼 짧고 강한 인터벌에 나오면 첫 라운드에 다 쏟지 않는 게 핵심이다.',
    phases: [
      {
        name: '서포트',
        pose: 'ringSupport',
        desc: '팔을 완전히 편 채 링 위에 몸을 올린다. 링은 몸통에 붙이고 손등이 바깥을 향하게 살짝 돌려 둔다.',
        cues: ['팔꿈치 완전히 펴기', '링을 몸에 붙이기', '어깨를 아래로 눌러 고정'],
        emphasis: ['triceps', 'delts', 'core'],
      },
      {
        name: '내려가기',
        pose: 'ringMid',
        desc: '팔꿈치를 뒤로 접으며 컨트롤해서 내려간다. 링이 벌어지지 않게 계속 몸 쪽으로 조인다.',
        cues: ['팔꿈치는 뒤로, 옆으로 벌리지 않기', '상체는 살짝 앞으로', '링을 겨드랑이 쪽으로 조이기'],
        emphasis: ['chest', 'triceps', 'delts'],
      },
      {
        name: '바텀',
        pose: 'ringBottom',
        desc: '어깨가 팔꿈치보다 아래로 내려가면 깊이 인정. 여기서 멈추지 말고 바로 밀어 올린다.',
        cues: ['어깨가 팔꿈치 아래까지', '링은 계속 몸에 붙인 채', '바닥에서 튕기지 않기'],
        emphasis: ['chest', 'delts', 'triceps'],
      },
      {
        name: '프레스 · 락아웃',
        pose: 'ringSupport',
        desc: '삼두와 가슴으로 밀어 올려 팔꿈치를 완전히 편다. 마지막에 손을 바깥으로 돌리면 락아웃이 안정된다.',
        cues: ['가슴을 세우며 밀기', '끝에서 링을 바깥으로 돌리기', '완전 신전으로 마무리'],
        emphasis: ['triceps', 'chest', 'delts'],
      },
    ],
    muscles: [
      { key: 'triceps', level: 'primary' },
      { key: 'chest', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'core', level: 'secondary' },
      { key: 'lats', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'biceps', level: 'stabilizer' },
    ],
    faults: [
      { problem: '링이 옆으로 벌어진다', fix: '링을 계속 몸통 쪽으로 조인다. 팔꿈치가 옆으로 벌어지면 어깨 앞쪽 부담이 커진다.' },
      { problem: '깊이가 안 나온다', fix: '어깨가 팔꿈치보다 아래로 가야 한다. 밴드를 걸어 보조하면서 전체 가동 범위로 연습하는 게 반쪽 딥보다 낫다.' },
      { problem: '어깨 앞쪽이 찌릿하다', fix: '상체를 너무 세우고 팔꿈치를 벌린 경우가 많다. 상체를 살짝 앞으로 기울이고 팔꿈치를 뒤로 보낸다.' },
      { problem: '타바타 첫 세트에 다 쏟는다', fix: '20초 안에 최대치를 하지 말고 8라운드를 같은 개수로 나눈다. 기록은 가장 적은 라운드다.' },
    ],
    scaling: [
      '밴드 보조 링 딥 (발이나 무릎을 밴드에 얹기)',
      '평행봉 딥 또는 박스 딥',
      '발을 바닥에 두고 링 딥 (체중 일부만 싣기)',
      '푸시업으로 대체',
    ],
    related: ['push-up', 'handstand-push-up'],
    terms: ['tabata', 'lockout', 'no-rep'],
  },

  /* ==================================================================== */
  {
    id: 'handstand-push-up',
    seoTitle: '핸드스탠드 푸시업(HSPU) 하는 법과 매트 스케일링',
    seoDesc:
      'HSPU의 킥업·락아웃·바텀 자세를 5단계로 정리했습니다. 스케일링 표기 1mat/2mat과 HSH(핸드스탠드 홀드)가 무슨 뜻인지도 함께 설명합니다.',
    thumb: 1,
    ko: '핸드스탠드 푸시업',
    en: 'Handstand Push-up',
    abbr: 'HSPU',
    category: '체조',
    level: '중고급',
    equipment: ['매트', '벽'],
    tagline: '벽에 기대 물구나무선 채 정수리가 바닥에 닿았다가 팔을 펴서 올라오는 동작',
    intro:
      '체중 전체를 어깨와 삼두로 밀어 올리는 동작이라 상체 근력 요구가 가장 큰 체조 동작 중 하나다. ' +
      '와드 스케일링에 적힌 "1mat / 2mat" 은 머리 아래 깔 매트(앱매트) 개수로, 많이 깔수록 가동 범위가 줄어 쉬워진다. ' +
      '"HSH" 는 핸드스탠드 홀드로, 렙 대신 버티는 시간으로 바꾸는 스케일링이다.',
    phases: [
      {
        name: '셋업',
        pose: 'hsSetup',
        desc: '벽에서 한 뼘 정도 떨어진 곳에 손을 어깨너비보다 살짝 넓게 짚고 엉덩이를 접어 올린다.',
        cues: ['손가락을 벌려 바닥을 움켜쥐기', '어깨를 손 위에 놓기', '시선은 손 사이 앞쪽'],
        emphasis: ['delts', 'core', 'lats'],
      },
      {
        name: '킥업 · 락아웃',
        pose: 'hsLockout',
        desc: '한 발씩 차 올려 뒤꿈치를 벽에 대고 몸을 한 줄로 만든다. 갈비뼈를 닫고 엉덩이를 조인다.',
        cues: ['갈비뼈 닫고 배 조이기', '어깨를 귀 쪽으로 밀어 올리기', '엉덩이가 꺾이지 않게'],
        emphasis: ['delts', 'triceps', 'core'],
      },
      {
        name: '내려가기',
        pose: 'hsMid',
        desc: '팔꿈치를 살짝 앞으로 보내며 컨트롤해서 내려간다. 손·머리가 삼각형을 이루는 위치를 목표로.',
        cues: ['팔꿈치는 앞으로, 옆으로 벌리지 않기', '천천히 컨트롤', '코어는 계속 단단하게'],
        emphasis: ['delts', 'triceps', 'core'],
      },
      {
        name: '바텀',
        pose: 'hsBottom',
        desc: '정수리가 바닥(또는 매트)에 닿는다. 머리와 두 손이 정삼각형을 이루면 밀어 올릴 힘이 가장 잘 나온다.',
        cues: ['머리는 손보다 앞에', '목에 체중을 다 싣지 않기', '닿자마자 바로 밀기'],
        emphasis: ['delts', 'triceps', 'traps'],
      },
      {
        name: '프레스',
        pose: 'hsLockout',
        desc: '바닥을 밀어 어깨를 펴 올린다. 팔꿈치가 완전히 펴지고 몸이 한 줄이 되면 1렙.',
        cues: ['바닥을 밀어낸다', '다리로 벽을 살짝 밀어 도와도 된다', '완전 신전으로 마무리'],
        emphasis: ['delts', 'triceps', 'traps', 'core'],
      },
    ],
    muscles: [
      { key: 'delts', level: 'primary' },
      { key: 'triceps', level: 'primary' },
      { key: 'traps', level: 'secondary' },
      { key: 'chest', level: 'secondary' },
      { key: 'core', level: 'secondary' },
      { key: 'forearms', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
      { key: 'glutes', level: 'stabilizer' },
    ],
    faults: [
      { problem: '허리가 꺾여 바나나 자세가 된다', fix: '갈비뼈를 닫고 엉덩이를 조인다. 벽 앞 핸드스탠드 홀드 30초로 자세 감각부터 만든다.' },
      { problem: '팔꿈치가 옆으로 벌어진다', fix: '힘이 새고 어깨가 아프다. 팔꿈치를 앞으로 보내며 내려간다.' },
      { problem: '목에 체중이 실린다', fix: '머리를 손보다 앞에 놓아 삼각형을 만든다. 매트를 한 장 깔아 가동 범위를 줄이는 게 안전하다.' },
      { problem: '킥업이 무섭다', fix: '박스에 발을 올린 파이크 푸시업부터. 벽 앞에서 발을 올렸다 내리는 것만 반복해도 금방 익숙해진다.' },
    ],
    scaling: [
      '매트를 1~2장 깔아 가동 범위 줄이기',
      '핸드스탠드 홀드로 대체 (렙당 2초씩)',
      '박스 파이크 푸시업 — 박스가 높을수록 어렵다',
      '덤벨·바벨 스트릭트 프레스로 대체',
    ],
    related: ['ring-dip', 'push-up', 'dumbbell-shoulder-to-overhead'],
    terms: ['hspu', 'hsh', 'abmat', 'no-rep'],
  },

  /* ==================================================================== */
  {
    id: 'push-up',
    seoTitle: '푸시업 크로스핏 기준과 노렙이 나는 이유',
    seoDesc:
      '가슴과 허벅지가 동시에 바닥에 닿고 팔을 완전히 펴야 인정되는 크로스핏 푸시업 기준을 3단계로 정리했습니다. 엉덩이가 먼저 솟는 실수 교정법도 다룹니다.',
    thumb: 1,
    ko: '푸시업',
    en: 'Push-up',
    abbr: 'PUSH',
    category: '체조',
    level: '초급',
    equipment: ['맨몸'],
    tagline: '몸을 한 줄로 유지한 채 가슴이 바닥에 닿았다가 팔을 완전히 펴는 동작',
    intro:
      '가장 흔한 동작이지만 크로스핏 기준은 생각보다 빡빡하다. 가슴과 허벅지가 동시에 바닥에 닿고, ' +
      '올라올 때 팔꿈치가 완전히 펴지면서 몸이 한 줄이어야 1렙이다. ' +
      '엉덩이만 먼저 올라오는 "웜(worm)" 은 노렙이다.',
    phases: [
      {
        name: '플랭크',
        pose: 'pushTop',
        desc: '손은 어깨 바로 아래보다 살짝 넓게, 발끝부터 머리까지 한 줄. 배와 엉덩이를 조인다.',
        cues: ['손가락 벌려 바닥 움켜쥐기', '엉덩이를 조여 골반 중립', '시선은 손 앞쪽 바닥'],
        emphasis: ['core', 'delts', 'glutes'],
      },
      {
        name: '내려가기 · 바텀',
        pose: 'pushBottom',
        desc: '팔꿈치를 45도로 뒤로 보내며 가슴이 바닥에 닿을 때까지 내려간다. 몸은 계속 한 줄.',
        cues: ['팔꿈치는 몸통에서 45도', '가슴과 허벅지가 동시에 닿기', '허리가 꺾이지 않게'],
        emphasis: ['chest', 'triceps', 'core'],
      },
      {
        name: '프레스 · 락아웃',
        pose: 'pushTop',
        desc: '바닥을 밀어 한 줄인 채로 올라온다. 팔꿈치가 완전히 펴지면 1렙.',
        cues: ['몸 전체가 같이 올라오기', '엉덩이만 먼저 솟지 않게', '완전 신전으로 마무리'],
        emphasis: ['chest', 'triceps', 'delts'],
      },
    ],
    muscles: [
      { key: 'chest', level: 'primary' },
      { key: 'triceps', level: 'primary' },
      { key: 'delts', level: 'secondary' },
      { key: 'core', level: 'secondary' },
      { key: 'glutes', level: 'stabilizer' },
      { key: 'quads', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '엉덩이가 먼저 올라온다', fix: '노렙이다. 배와 엉덩이를 조여 몸을 판자처럼 만들고, 힘들면 무릎 푸시업으로 낮춘다.' },
      { problem: '허리가 아래로 처진다', fix: '코어가 풀린 것. 플랭크 30초를 먼저 만들고 나서 렙 수를 늘린다.' },
      { problem: '팔꿈치가 T자로 벌어진다', fix: '어깨에 부담이 크다. 팔꿈치를 45도 뒤로 보낸다.' },
    ],
    scaling: [
      '무릎 푸시업',
      '박스·벤치에 손을 올린 인클라인 푸시업 (높을수록 쉬움)',
      '반복 수를 줄여 세트로 나누기',
      '내려가는 구간만 천천히 (네거티브)',
    ],
    related: ['deficit-push-up', 'ring-dip', 'bench-press'],
    terms: ['no-rep', 'amrap'],
  },

  /* ==================================================================== */
  {
    id: 'deficit-push-up',
    seoTitle: '디피싯 푸시업이란 — (4.5"/2.5") 표기 뜻',
    seoDesc:
      '손을 원판 위에 올려 가동 범위를 늘린 디피싯 푸시업의 원리와 (4.5"/2.5") 표기의 의미, 어깨 부담을 줄이는 방법을 정리했습니다.',
    thumb: 1,
    ko: '디피싯 푸시업',
    en: 'Deficit Push-up',
    abbr: 'DEF PU',
    category: '체조',
    level: '중급',
    equipment: ['원판'],
    tagline: '손을 원판 위에 올려 가슴이 손보다 더 깊이 내려가게 만든 푸시업',
    intro:
      '"Deficit" 은 손을 올려 바닥보다 높은 위치에서 시작한다는 뜻이다. ' +
      '와드에 적힌 (4.5"/2.5") 은 손을 올릴 높이로, 숫자가 클수록 가슴이 더 깊이 내려가 어려워진다. ' +
      '가동 범위가 늘어난 만큼 어깨와 가슴이 늘어난 상태에서 힘을 써야 해 일반 푸시업보다 훨씬 힘들다.',
    phases: [
      {
        name: '플랭크 (손은 원판 위)',
        pose: 'deficitTop',
        desc: '두 손을 원판이나 낮은 받침 위에 올리고 몸을 한 줄로 만든다.',
        cues: ['받침 가장자리를 손으로 감싸 쥐기', '엉덩이 조이고 골반 중립', '손목이 아프면 낮은 받침으로'],
        emphasis: ['core', 'delts', 'glutes'],
      },
      {
        name: '바텀 (손보다 아래로)',
        pose: 'deficitBottom',
        desc: '가슴이 받침 높이보다 더 내려가 바닥 쪽으로 향한다. 어깨가 크게 늘어나는 구간이다.',
        cues: ['팔꿈치는 45도 뒤로', '가슴을 손 사이로 내리기', '어깨가 아프면 깊이를 줄인다'],
        emphasis: ['chest', 'delts', 'triceps'],
      },
      {
        name: '프레스 · 락아웃',
        pose: 'deficitTop',
        desc: '받침을 밀어 한 줄인 채로 올라온다. 팔꿈치 완전 신전으로 1렙.',
        cues: ['몸 전체가 같이 올라오기', '가장 힘든 바닥 구간을 서두르지 않기', '완전 신전'],
        emphasis: ['chest', 'triceps', 'delts'],
      },
    ],
    muscles: [
      { key: 'chest', level: 'primary' },
      { key: 'triceps', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'core', level: 'secondary' },
      { key: 'glutes', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '깊이만 신경 쓰다 허리가 꺾인다', fix: '가동 범위보다 몸의 한 줄이 먼저다. 받침을 낮추고 자세를 지킨다.' },
      { problem: '어깨 앞쪽이 당긴다', fix: '깊이를 줄이거나 일반 푸시업으로 바꾼다. 디피싯은 어깨 유연성에 여유가 있을 때만.' },
      { problem: '손목이 아프다', fix: '원판 가장자리를 잡거나 덤벨을 세워 손목을 중립으로 만든다.' },
    ],
    scaling: [
      '받침 높이를 낮추기 (4.5" → 2.5" → 0")',
      '일반 푸시업으로 대체',
      '무릎 디피싯 푸시업',
      '반복 수를 줄이기',
    ],
    related: ['push-up', 'ring-dip', 'bench-press'],
    terms: ['deficit', 'tabata', 'scaled'],
  },

  /* ==================================================================== */
  {
    id: 'air-squat',
    seoTitle: '에어 스쿼트 크로스핏 기준 — 깊이와 인정 조건',
    seoDesc:
      '고관절이 무릎보다 아래로 내려가고 위에서 완전히 펴야 하는 에어 스쿼트 기준을 4단계로 정리했습니다. 무릎이 모이는 이유와 교정법도 다룹니다.',
    thumb: 2,
    ko: '에어 스쿼트',
    en: 'Air Squat',
    abbr: 'AS',
    category: '체조',
    level: '초급',
    equipment: ['맨몸'],
    tagline: '맨몸으로 고관절이 무릎보다 아래까지 내려갔다가 완전히 펴며 일어서는 동작',
    intro:
      '크로스핏의 모든 스쿼트 계열 동작(프론트 스쿼트, 스러스터, 월볼)의 뿌리다. ' +
      '가동 범위 기준은 "고관절 접힘점이 무릎보다 아래"이고, 위에서는 무릎과 고관절이 완전히 펴져야 한다. ' +
      '와드에서 렙 수가 많은 자리에 배치되는 경우가 많아 호흡을 정리하는 구간으로 쓰기도 한다.',
    phases: [
      {
        name: '스탠스',
        pose: 'airSquatTop',
        desc: '발은 어깨너비, 발끝은 살짝 바깥으로. 체중은 발 중앙~뒤꿈치.',
        cues: ['가슴 들고 시선은 정면', '배를 조여 코어 고정', '발바닥 삼각형으로 딛기'],
        emphasis: ['core', 'erectors'],
      },
      {
        name: '내려가기',
        pose: 'airSquatMid',
        desc: '엉덩이를 뒤로 빼면서 무릎을 굽힌다. 무릎은 발끝 방향으로 밀어낸다.',
        cues: ['엉덩이 먼저 뒤로', '무릎을 바깥으로 밀기', '뒤꿈치는 계속 바닥에'],
        emphasis: ['quads', 'glutes', 'hamstrings'],
      },
      {
        name: '바텀',
        pose: 'airSquatBottom',
        desc: '고관절이 무릎보다 아래로 내려간다. 가슴은 계속 들려 있고 등은 평평하게.',
        cues: ['고관절이 무릎 아래까지', '가슴 유지', '바닥에서 튕기지 않기'],
        emphasis: ['quads', 'glutes', 'erectors', 'core'],
      },
      {
        name: '일어서기',
        pose: 'airSquatTop',
        desc: '뒤꿈치로 바닥을 밀어 일어선다. 무릎과 고관절이 완전히 펴지면 1렙.',
        cues: ['가슴과 엉덩이를 같이 올리기', '무릎이 안으로 모이지 않게', '완전 신전으로 마무리'],
        emphasis: ['quads', 'glutes', 'core'],
      },
    ],
    muscles: [
      { key: 'quads', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'hamstrings', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
    ],
    faults: [
      { problem: '무릎이 안으로 모인다', fix: '무릎을 발끝 방향으로 밀어낸다. 엉덩이 바깥쪽 근육이 약한 경우가 많아 밴드를 무릎에 걸고 연습하면 감이 온다.' },
      { problem: '뒤꿈치가 뜬다', fix: '발목 유연성 문제. 뒤꿈치 아래에 얇은 원판을 깔고 연습하면서 발목 모빌리티를 병행한다.' },
      { problem: '깊이가 안 나온다', fix: '박스에 앉았다 일어나는 박스 스쿼트로 깊이를 정해 두고 조금씩 낮춘다.' },
      { problem: '위에서 완전히 서지 않는다', fix: '노렙이다. 렙 수를 줄이더라도 매번 완전히 펴고 다음 렙으로 간다.' },
    ],
    scaling: [
      '박스나 벤치에 앉았다 일어나기 (깊이 고정)',
      '기둥·링을 잡고 균형 보조',
      '반복 수를 줄이기',
      '템포 스쿼트 — 내려가는 데 3초를 써서 자세부터',
    ],
    related: ['pistol-squat', 'wall-ball', 'squat-clean'],
    terms: ['no-rep', 'amrap'],
  },

  /* ==================================================================== */
  {
    id: 'pistol-squat',
    seoTitle: '피스톨 스쿼트 하는 법과 못 할 때 대체 동작',
    seoDesc:
      '한 다리로 앉았다 일어서는 피스톨 스쿼트의 균형·발목 문제를 4단계로 정리했습니다. 박스 피스톨, 에어 스쿼트 배수 등 스케일링도 함께 다룹니다.',
    thumb: 2,
    ko: '피스톨 스쿼트',
    en: 'Pistol Squat',
    abbr: 'PS',
    category: '체조',
    level: '중고급',
    equipment: ['맨몸'],
    tagline: '한 다리로만 앉았다 일어서고, 반대 다리는 앞으로 뻗어 유지하는 한 발 스쿼트',
    intro:
      '근력보다 균형·발목 유연성이 먼저 갈리는 동작이다. 와드에서는 "16 Pistol Squats alt." 처럼 ' +
      '좌우 번갈아(alternating) 수행하라고 적히고, 못 하면 보통 에어 스쿼트 배수로 바꾼다. ' +
      '지지하는 발의 뒤꿈치가 끝까지 바닥에 붙어 있어야 인정된다.',
    phases: [
      {
        name: '한 발로 서기',
        pose: 'pistolStart',
        desc: '한 발로 서고 반대 다리를 앞으로 살짝 든다. 팔은 앞으로 뻗어 균형추로 쓴다.',
        cues: ['지지발 전체로 바닥을 딛기', '든 다리는 무릎을 편 채', '시선은 정면'],
        emphasis: ['quads', 'core', 'calves'],
      },
      {
        name: '내려가기',
        pose: 'pistolMid',
        desc: '엉덩이를 뒤로 빼며 지지 다리를 천천히 굽힌다. 든 다리는 바닥에 닿지 않게 앞으로 뻗어 나간다.',
        cues: ['천천히, 컨트롤해서', '뻗은 다리는 계속 들고 있기', '지지발 뒤꿈치 유지'],
        emphasis: ['quads', 'glutes', 'hipflexors'],
      },
      {
        name: '바텀',
        pose: 'pistolBottom',
        desc: '고관절이 무릎보다 아래로 내려가고 뻗은 다리는 바닥과 거의 평행해진다.',
        cues: ['가슴을 들어 균형 잡기', '뻗은 발이 바닥에 닿지 않게', '뒤꿈치는 계속 바닥에'],
        emphasis: ['quads', 'glutes', 'core', 'hipflexors'],
      },
      {
        name: '일어서기',
        pose: 'pistolStart',
        desc: '지지 다리로 밀어 완전히 일어선다. 무릎과 고관절이 다 펴지면 1렙, 다음은 반대 다리.',
        cues: ['뒤꿈치로 밀기', '무릎이 안으로 무너지지 않게', '완전 신전 후 다리 교대'],
        emphasis: ['quads', 'glutes', 'calves'],
      },
    ],
    muscles: [
      { key: 'quads', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'core', level: 'secondary' },
      { key: 'hipflexors', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'hamstrings', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '뒤꿈치가 뜬다', fix: '발목 유연성이 부족한 것. 뒤꿈치 아래에 얇은 원판을 깔거나 역도화를 신고 시작한다.' },
      { problem: '뒤로 넘어진다', fix: '팔과 뻗은 다리를 더 앞으로 보내 균형추로 쓴다. 기둥이나 링을 잡고 궤적부터 익힌다.' },
      { problem: '무릎이 안으로 무너진다', fix: '무게를 지탱하지 못한다는 신호. 박스 피스톨로 깊이를 줄여 근력부터 만든다.' },
    ],
    scaling: [
      '박스나 벤치에 앉았다 일어나는 박스 피스톨 (높을수록 쉬움)',
      '기둥·링·밴드를 잡고 보조',
      '뒤꿈치 아래에 원판을 깔기',
      '에어 스쿼트로 대체 (예: 피스톨 16 → 에어 스쿼트 30)',
    ],
    related: ['air-squat', 'box-jump'],
    terms: ['alt', 'emom', 'scaled'],
  },

  /* ==================================================================== */
  {
    id: 'wall-ball',
    seoTitle: '월볼(Wall Ball) 하는 법과 숨 덜 차게 하는 요령',
    seoDesc:
      '월볼은 풀 스쿼트에서 일어서는 힘으로 메디신볼을 벽 타깃에 던지는 동작입니다. 4단계 분해와 팔로만 던지는 실수 교정, 스케일링을 정리했습니다.',
    thumb: 2,
    ko: '월볼',
    en: 'Wall Ball Shot',
    abbr: 'WB',
    category: '기타 기구',
    level: '초급',
    equipment: ['메디신볼'],
    tagline: '메디신볼을 안고 풀 스쿼트로 앉았다가 일어서는 힘으로 벽 목표 지점에 던지는 동작',
    intro:
      '"프론트 스쿼트 + 푸시 프레스"를 볼 하나로 이어 붙인 동작이다. 동작 자체는 단순하지만 ' +
      '다리와 어깨를 동시에 태워서 크로스핏에서 가장 숨이 차는 동작으로 꼽힌다. ' +
      '(20/14 lb) 는 볼 무게이고, 타깃 높이는 보통 남 10ft(약 305cm) / 여 9ft(약 274cm) 다.',
    phases: [
      {
        name: '랙 포지션',
        pose: 'wbRack',
        desc: '볼을 가슴 앞 턱 아래에 안고 팔꿈치를 안쪽으로 붙인 채 벽 앞 한 걸음 거리에 선다.',
        cues: ['볼은 턱 아래, 몸에 붙여서', '팔꿈치는 아래로', '벽에서 30~50cm 거리'],
        emphasis: ['delts', 'core'],
      },
      {
        name: '스쿼트 바닥',
        pose: 'wbBottom',
        desc: '볼을 안은 그대로 고관절이 무릎보다 아래로 갈 때까지 앉는다. 상체는 최대한 세운다.',
        cues: ['고관절이 무릎 아래까지', '가슴은 계속 위로', '볼을 몸에서 떼지 않기'],
        emphasis: ['quads', 'glutes', 'core', 'erectors'],
      },
      {
        name: '드라이브 · 던지기',
        pose: 'wbThrow',
        desc: '다리로 폭발적으로 일어서면서 그 관성을 그대로 팔로 이어 볼을 타깃으로 던진다. 팔로만 던지면 금방 지친다.',
        cues: ['다리가 먼저, 팔은 이어받기', '볼은 수직으로', '완전 신전에서 손을 떠나게'],
        emphasis: ['quads', 'glutes', 'delts', 'triceps'],
      },
      {
        name: '타깃 · 받기',
        pose: 'wbFlight',
        desc: '볼이 타깃에 닿으면 렙 인정. 떨어지는 볼을 팔로 받아 바로 다음 스쿼트로 흡수한다.',
        cues: ['볼을 눈으로 끝까지 따라가기', '받으면서 바로 앉기', '팔로 버티지 말고 다리로 흡수'],
        emphasis: ['delts', 'core', 'quads'],
      },
    ],
    muscles: [
      { key: 'quads', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'hamstrings', level: 'secondary' },
      { key: 'calves', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔로만 던진다', fix: '다리 신전이 끝나는 타이밍에 볼이 손을 떠나야 한다. 팔은 방향만 잡는다고 생각한다.' },
      { problem: '깊이가 안 나온다', fix: '고관절이 무릎보다 아래로 내려가야 인정된다. 볼을 몸에 붙이고 상체를 세우면 깊이가 나온다.' },
      { problem: '벽에서 너무 멀리 선다', fix: '멀수록 볼이 앞으로 날아가 매번 쫓아가게 된다. 볼을 안고 팔을 뻗어 벽에 닿는 정도의 거리가 적당하다.' },
      { problem: '받을 때 팔로 버틴다', fix: '받자마자 다리로 흡수해 다음 스쿼트로 이어야 어깨가 오래 버틴다.' },
    ],
    scaling: [
      '가벼운 볼로 (14 → 10 → 6 lb)',
      '타깃 높이 낮추기',
      '메디신볼 스러스터 (던지지 않고 머리 위까지만)',
      '스쿼트 + 프레스로 분리',
    ],
    related: ['air-squat', 'squat-clean', 'box-jump'],
    terms: ['wb', 'lbs-notation', 'amrap'],
  },

  /* ==================================================================== */
  {
    id: 'box-jump',
    seoTitle: '박스 점프 하는 법과 정강이 안 찧는 법',
    seoDesc:
      '박스 점프의 딥·팔 스윙·착지·완전 신전 기준을 5단계로 정리했습니다. (24"/20") 높이 표기의 뜻과 스텝업 스케일링도 함께 다룹니다.',
    thumb: 2,
    ko: '박스 점프',
    en: 'Box Jump',
    abbr: 'BJ',
    category: '기타 기구',
    level: '초급',
    equipment: ['플라이오 박스'],
    tagline: '두 발로 뛰어 박스 위에 올라선 뒤 완전히 일어서는 동작',
    intro:
      '(24"/20") 는 박스 높이다(약 61cm / 51cm). 인정 기준은 박스 위에서 고관절과 무릎이 완전히 펴지는 것이고, ' +
      '내려오는 방법은 뛰어내리든 걸어 내려오든 상관없다. ' +
      '크로스핏에서 정강이 부상이 가장 자주 나는 동작이라, 지칠수록 높이를 낮추는 게 정답이다.',
    phases: [
      {
        name: '셋업',
        pose: 'bjStand',
        desc: '박스에서 한 걸음 거리에 발을 골반 너비로 두고 선다.',
        cues: ['박스와 거리는 한 걸음', '시선은 박스 윗면 모서리', '체중은 발 중앙'],
        emphasis: ['core', 'calves'],
      },
      {
        name: '딥 · 팔 스윙',
        pose: 'bjDip',
        desc: '1/4 스쿼트로 짧게 앉으면서 팔을 뒤로 보낸다. 이 반동이 점프 높이를 만든다.',
        cues: ['짧고 빠르게', '팔을 뒤로 크게', '뒤꿈치는 바닥에'],
        emphasis: ['quads', 'glutes', 'core'],
      },
      {
        name: '점프',
        pose: 'bjAir',
        desc: '팔을 앞위로 휘두르며 두 발로 뛴다. 공중에서 무릎을 접어 발을 박스 위로 가져간다.',
        cues: ['팔 스윙과 함께 뛰기', '무릎을 접어 발을 올리기', '박스를 넘겨다보지 말고 모서리를 보기'],
        emphasis: ['quads', 'glutes', 'calves'],
      },
      {
        name: '착지',
        pose: 'bjLand',
        desc: '두 발 전체를 박스 위에 얹고 무릎을 살짝 굽혀 부드럽게 받는다. 발끝만 걸치면 미끄러진다.',
        cues: ['발바닥 전체를 박스에', '무릎으로 충격 흡수', '소리가 크면 잘못 착지한 것'],
        emphasis: ['quads', 'glutes', 'core'],
      },
      {
        name: '완전 신전',
        pose: 'bjStandUp',
        desc: '박스 위에서 무릎과 고관절을 완전히 편다. 여기까지 해야 1렙이다.',
        cues: ['박스 위에서 확실히 서기', '가슴 들고 마무리', '내려올 때는 뛰어내리거나 걸어 내려오기'],
        emphasis: ['glutes', 'quads', 'core'],
      },
    ],
    muscles: [
      { key: 'quads', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'calves', level: 'primary' },
      { key: 'hamstrings', level: 'secondary' },
      { key: 'core', level: 'secondary' },
      { key: 'delts', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
    ],
    faults: [
      { problem: '지쳐서 정강이를 찧는다', fix: '박스 점프 부상 대부분이 이것이다. 피곤해지면 즉시 높이를 낮추거나 스텝업으로 바꾼다.' },
      { problem: '박스 위에서 완전히 서지 않는다', fix: '노렙이다. 고관절과 무릎이 다 펴진 뒤 내려온다.' },
      { problem: '뛰어내릴 때 무릎이 아프다', fix: '내려올 때 충격이 크다. 리바운드 대신 걸어 내려오는 스텝다운으로 바꾸면 무릎 부담이 크게 준다.' },
      { problem: '발끝만 박스에 걸린다', fix: '무릎을 더 접어 발을 높이 올린다. 높이를 낮추는 게 더 빠른 해결책일 때가 많다.' },
    ],
    scaling: [
      '낮은 박스로 (24" → 20" → 12")',
      '박스 스텝업 — 한 발씩 올라서기 (무릎 부담이 가장 적다)',
      '원판을 쌓아 높이 조절',
      '점프 없이 스텝업 + 내려올 때 걸어 내려오기',
    ],
    related: ['air-squat', 'pistol-squat', 'wall-ball'],
    terms: ['box-height', 'no-rep', 'e2mom'],
  },

  /* ==================================================================== */
  {
    id: 'dumbbell-deadlift',
    seoTitle: '덤벨 데드리프트 하는 법 — Dual 표기 뜻',
    seoDesc:
      '양손에 덤벨을 들고 하는 덤벨 데드리프트를 4단계로 정리했습니다. 와드의 "Dual 22.5/15kg" 표기가 무슨 뜻인지도 함께 설명합니다.',
    thumb: 0,
    ko: '덤벨 데드리프트',
    en: 'Dumbbell Deadlift',
    abbr: 'DB DL',
    category: '덤벨',
    level: '초급',
    equipment: ['덤벨'],
    tagline: '두 손에 덤벨을 들고 바닥에서 고관절 신전으로 세워 드는 동작',
    intro:
      '바벨 데드리프트와 원리는 같지만 무게가 몸 옆에 있어 균형 잡기가 쉽고 허리 부담이 적다. ' +
      '와드에서 "Dual 22.5/15kg" 은 양손에 각각 그 무게의 덤벨을 든다는 뜻이다. ' +
      '덤벨 두 개를 바닥에 나란히 놓고, 매 렙 양쪽이 동시에 바닥에 닿아야 한다.',
    phases: [
      {
        name: '셋업',
        pose: 'dbFloor',
        desc: '덤벨을 발 옆에 나란히 놓고 엉덩이를 뒤로 빼 손잡이를 잡는다. 등은 평평하게.',
        cues: ['덤벨은 발 중앙 옆', '가슴 들고 등 평평하게', '팔은 그냥 줄'],
        emphasis: ['erectors', 'hamstrings', 'forearms'],
      },
      {
        name: '들어 올리기',
        pose: 'dbHang',
        desc: '다리로 바닥을 밀며 고관절을 펴 덤벨을 무릎 위로 올린다.',
        cues: ['엉덩이와 가슴이 같이 올라오기', '덤벨은 다리 옆에 붙여서', '등 각도 유지'],
        emphasis: ['hamstrings', 'glutes', 'quads'],
      },
      {
        name: '락아웃',
        pose: 'dbStand',
        desc: '무릎과 고관절이 완전히 펴지고 어깨가 뒤에 오면 1렙.',
        cues: ['엉덩이를 앞으로 밀어 마무리', '뒤로 젖히지 않기', '어깨는 내려서 고정'],
        emphasis: ['glutes', 'erectors', 'traps'],
      },
      {
        name: '내리기',
        pose: 'dbFloor',
        desc: '고관절을 먼저 접고 무릎을 굽혀 덤벨을 바닥에 내려놓는다. 양쪽이 동시에 닿아야 인정된다.',
        cues: ['엉덩이 먼저 뒤로', '떨어뜨리지 말고 내려놓기', '양쪽 동시에 바닥에'],
        emphasis: ['hamstrings', 'erectors', 'core'],
      },
    ],
    muscles: [
      { key: 'hamstrings', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'erectors', level: 'primary' },
      { key: 'quads', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
    ],
    faults: [
      { problem: '등이 말린다', fix: '무게를 줄인다. 가슴을 들고 겨드랑이를 조인 상태를 만든 뒤 든다.' },
      { problem: '덤벨이 몸에서 멀어진다', fix: '덤벨을 다리 옆 라인에 붙여 수직으로 움직인다.' },
      { problem: '떨어뜨려 놓는다', fix: '팀 와드에서는 시간이 아까워도 컨트롤해서 내려놓는 게 결국 빠르다. 덤벨이 튀면 다음 렙 셋업이 흐트러진다.' },
    ],
    scaling: [
      '가벼운 덤벨로 (22.5 → 15 → 10kg)',
      '케틀벨 하나로 대체',
      '덤벨을 원판 위에 올려 가동 범위 축소',
      '반복 수 줄이기',
    ],
    related: ['deadlift', 'dumbbell-hang-power-clean', 'dumbbell-shoulder-to-overhead'],
    terms: ['dual-db', 'dl', 'team-of-2'],
  },

  /* ==================================================================== */
  {
    id: 'dumbbell-hang-power-clean',
    seoTitle: '덤벨 행 파워 클린 하는 법',
    seoDesc:
      '허벅지 높이의 덤벨을 고관절 신전으로 띄워 어깨에 받는 덤벨 행 파워 클린을 4단계로 정리했습니다. 팔로 들어 올리는 실수 교정법도 다룹니다.',
    thumb: 3,
    ko: '덤벨 행 파워 클린',
    en: 'Dumbbell Hang Power Clean',
    abbr: 'DB HPC',
    category: '덤벨',
    level: '초중급',
    equipment: ['덤벨'],
    tagline: '허벅지 높이의 덤벨을 고관절 신전으로 띄워 어깨 위에 받는 동작',
    intro:
      '바벨 행 파워 클린의 덤벨 버전이다. 덤벨은 손목을 자유롭게 쓸 수 있어 프론트 랙이 훨씬 편하고, ' +
      '두 개가 따로 움직이기 때문에 좌우 균형이 그대로 드러난다. ' +
      '"Hang" 이므로 매 렙 바닥에 내려놓지 않고 허벅지 높이에서 다시 시작한다.',
    phases: [
      {
        name: '행 포지션',
        pose: 'dbHang',
        desc: '덤벨을 허벅지 옆에 들고 엉덩이를 뒤로 빼 힌지를 만든다. 등은 평평하게.',
        cues: ['무릎은 살짝, 엉덩이를 뒤로', '어깨는 덤벨보다 앞', '덤벨은 허벅지에 붙여서'],
        emphasis: ['hamstrings', 'erectors', 'forearms'],
      },
      {
        name: '신전',
        pose: 'dbExtension',
        desc: '고관절과 무릎을 폭발적으로 펴며 덤벨을 위로 띄운다. 이때까지 팔은 펴져 있다.',
        cues: ['수직으로 점프하듯', '어깨를 으쓱 올리기', '팔은 마지막에'],
        emphasis: ['glutes', 'hamstrings', 'traps', 'calves'],
      },
      {
        name: '풀 언더 · 캐치',
        pose: 'dbCatch',
        desc: '팔꿈치를 빠르게 앞으로 돌려 1/4 스쿼트 깊이에서 덤벨을 어깨 위에 받는다.',
        cues: ['팔꿈치를 빠르게 앞으로', '덤벨 손잡이를 어깨에 얹기', '살짝 앉아서 받기'],
        emphasis: ['traps', 'delts', 'quads', 'core'],
      },
      {
        name: '스탠드업 (랙)',
        pose: 'dbRack',
        desc: '완전히 일어서면 1렙. 다음 렙은 컨트롤해서 다시 허벅지까지 내린다.',
        cues: ['완전 신전으로 마무리', '내릴 때 허벅지로 받기', '덤벨을 던지지 않기'],
        emphasis: ['glutes', 'quads', 'core'],
      },
    ],
    muscles: [
      { key: 'hamstrings', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'traps', level: 'primary' },
      { key: 'delts', level: 'secondary' },
      { key: 'quads', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'biceps', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔로 들어 올린다', fix: '고관절이 다 펴지기 전에는 팔꿈치를 굽히지 않는다. 가벼운 덤벨로 신전 타이밍만 반복한다.' },
      { problem: '받을 때 덤벨이 어깨에 안 얹힌다', fix: '팔꿈치 회전이 늦은 것. "팔꿈치를 빠르게 앞으로"만 의식해도 대부분 해결된다.' },
      { problem: '스쿼트로 내려갔다 온다', fix: '행은 힙 힌지다. 무릎은 살짝만 굽힌다.' },
    ],
    scaling: [
      '가벼운 덤벨로',
      '덤벨 하나로 한 팔씩 번갈아',
      '파워 클린 없이 덤벨 프론트 랙 홀드로 자세만',
      '반복 수 줄이기',
    ],
    related: ['hang-squat-clean', 'dumbbell-deadlift', 'dumbbell-shoulder-to-overhead'],
    terms: ['hang', 'dual-db', 'front-rack'],
  },

  /* ==================================================================== */
  {
    id: 'dumbbell-shoulder-to-overhead',
    seoTitle: '덤벨 숄더 투 오버헤드(S2OH)란',
    seoDesc:
      'S2OH는 어깨에서 머리 위로 보내기만 하면 방법이 자유인 동작입니다. 프레스·푸시 프레스·저크 중 무엇을 고를지와 락아웃 기준을 정리했습니다.',
    thumb: 3,
    ko: '덤벨 숄더 투 오버헤드',
    en: 'Dumbbell Shoulder to Overhead',
    abbr: 'DB S2OH',
    category: '덤벨',
    level: '초중급',
    equipment: ['덤벨'],
    tagline: '어깨의 덤벨을 머리 위로 보내기만 하면 되는 — 방법은 자유인 동작',
    intro:
      '"Shoulder to Overhead" 는 어깨에서 머리 위까지 가면 방법을 묻지 않는다는 뜻이다. ' +
      '스트릭트 프레스, 푸시 프레스, 푸시 저크, 스플릿 저크 중 아무거나 써도 되고, 렙마다 바꿔도 된다. ' +
      '보통 가벼우면 푸시 프레스, 무거워지면 푸시 저크가 효율이 좋다.',
    phases: [
      {
        name: '랙 포지션',
        pose: 'dbRack',
        desc: '덤벨을 어깨 위에 얹고 팔꿈치는 앞아래를 향한다. 발은 골반 너비.',
        cues: ['덤벨을 어깨에 확실히 얹기', '코어 단단히', '갈비뼈 닫기'],
        emphasis: ['delts', 'core'],
      },
      {
        name: '딥',
        pose: 'dbDip',
        desc: '상체를 수직으로 유지한 채 무릎만 짧게 굽힌다. 스쿼트가 아니라 얕은 누르기.',
        cues: ['뒤꿈치 유지', '깊이는 10~15cm', '상체가 앞으로 기울지 않게'],
        emphasis: ['quads', 'core'],
      },
      {
        name: '드라이브',
        pose: 'dbExtension',
        desc: '멈추지 않고 다리로 폭발적으로 밀어 덤벨을 위로 쏘아 올린다.',
        cues: ['빠른 방향 전환', '덤벨은 수직 경로로', '팔은 이어받기만'],
        emphasis: ['quads', 'glutes', 'delts'],
      },
      {
        name: '락아웃',
        pose: 'dbOverhead',
        desc: '팔꿈치를 완전히 펴 덤벨을 머리 위에 고정한다. 귀 뒤 수직선 위에서 정지하면 1렙.',
        cues: ['팔꿈치 완전 신전', '덤벨은 귀 뒤', '무릎도 완전히 펴고 정지'],
        emphasis: ['delts', 'triceps', 'core'],
      },
    ],
    muscles: [
      { key: 'delts', level: 'primary' },
      { key: 'triceps', level: 'primary' },
      { key: 'quads', level: 'secondary' },
      { key: 'glutes', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'erectors', level: 'stabilizer' },
      { key: 'forearms', level: 'stabilizer' },
    ],
    faults: [
      { problem: '락아웃에서 팔이 앞에 있다', fix: '노렙이다. 고개를 살짝 앞으로 밀어 덤벨을 귀 뒤 수직선까지 보낸다.' },
      { problem: '허리가 젖혀진다', fix: '갈비뼈를 닫고 배를 조인다. 어깨 유연성이 부족하면 무게를 낮춘다.' },
      { problem: '팔로만 밀어 금방 지친다', fix: '다리 딥-드라이브를 쓴다. 렙이 많을수록 다리 비중을 늘린다.' },
    ],
    scaling: [
      '가벼운 덤벨로',
      '한 팔씩 번갈아 (덤벨 하나)',
      '스트릭트 프레스로 대체 (다리 반동 없이)',
      '반복 수 줄이기',
    ],
    related: ['push-jerk', 'dumbbell-hang-power-clean', 'handstand-push-up'],
    terms: ['s2oh', 'dip-drive', 'lockout', 'dual-db'],
  },

  /* ==================================================================== */
  {
    id: 'dumbbell-snatch',
    seoTitle: '덤벨 스내치 하는 법과 alt. 표기 뜻',
    seoDesc:
      '한 팔로 바닥의 덤벨을 머리 위까지 보내는 덤벨 스내치를 4단계로 정리했습니다. "alt."(좌우 번갈아) 표기와 손 바꾸는 요령도 함께 다룹니다.',
    thumb: 2,
    ko: '덤벨 스내치',
    en: 'Dumbbell Snatch',
    abbr: 'DB SN',
    category: '덤벨',
    level: '초중급',
    equipment: ['덤벨'],
    tagline: '바닥의 덤벨 하나를 한 팔로 머리 위까지 한 번에 보내는 동작',
    intro:
      '바벨 스내치의 부담을 크게 덜어낸 버전이라 크로스핏 와드에 가장 자주 나오는 덤벨 동작이다. ' +
      '"alt." 가 붙으면 매 렙 좌우를 번갈아 하라는 뜻이고, 바닥에서 손을 바꿔 잡는 게 보통이다. ' +
      '팔로 들어 올리는 게 아니라 고관절로 던지고 그 아래로 팔을 펴 넣는 동작이다.',
    phases: [
      {
        name: '셋업',
        pose: 'dbSnatchSetup',
        desc: '덤벨을 두 발 사이에 세로로 놓고 엉덩이를 뒤로 빼 한 손으로 잡는다. 반대 팔은 뒤로 자연스럽게.',
        cues: ['덤벨은 발 중앙 사이', '가슴 들고 등 평평하게', '어깨는 덤벨보다 앞'],
        emphasis: ['erectors', 'hamstrings', 'forearms'],
      },
      {
        name: '신전',
        pose: 'dbSnatchExtension',
        desc: '다리와 고관절을 폭발적으로 펴며 덤벨을 몸 가까이 수직으로 띄운다.',
        cues: ['수직 점프하듯', '덤벨은 몸 중앙선을 따라', '팔은 마지막에'],
        emphasis: ['glutes', 'hamstrings', 'traps', 'calves'],
      },
      {
        name: '펀치 스루',
        pose: 'dbSnatchPunch',
        desc: '덤벨이 뜬 순간 살짝 앉으면서 손을 위로 "찔러" 넣어 팔을 편다. 덤벨을 돌려 받는 게 아니라 밑으로 파고드는 것.',
        cues: ['손을 천장으로 찌르기', '덤벨을 머리 옆으로 넘기기', '살짝 앉아 밑으로 들어가기'],
        emphasis: ['delts', 'triceps', 'traps', 'core'],
      },
      {
        name: '락아웃',
        pose: 'dbSnatchLockout',
        desc: '팔꿈치를 완전히 편 채 덤벨을 머리 위에 고정하고 일어선다. 완전 신전 + 정지하면 1렙.',
        cues: ['팔은 귀 옆 수직선', '어깨를 밀어 능동적으로 지지', '무릎·고관절 완전 신전'],
        emphasis: ['delts', 'triceps', 'core'],
      },
    ],
    muscles: [
      { key: 'glutes', level: 'primary' },
      { key: 'hamstrings', level: 'primary' },
      { key: 'delts', level: 'primary' },
      { key: 'traps', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'triceps', level: 'secondary' },
      { key: 'quads', level: 'secondary' },
      { key: 'forearms', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔로 휘둘러 올린다', fix: '어깨가 금방 탄다. 고관절 신전으로 띄우고 팔은 방향만 잡는다.' },
      { problem: '덤벨이 머리 뒤에서 등을 때린다', fix: '덤벨을 돌려 넘기지 말고 손을 위로 찔러 넣는다. 가벼운 무게로 "펀치" 감각부터.' },
      { problem: '락아웃에서 팔이 흔들린다', fix: '어깨를 위로 밀어 능동적으로 지지한다. 한 팔 오버헤드 홀드 20초로 지지력을 만든다.' },
      { problem: '좌우 교대에서 시간이 샌다', fix: '바닥에 내려놓는 순간 손을 바꾸는 리듬을 정해 둔다. 매 렙 같은 순서로.' },
    ],
    scaling: [
      '가벼운 덤벨로 (22.5 → 15 → 10kg)',
      '행 덤벨 스내치 (허벅지에서 시작)',
      '덤벨 하이 풀 + 프레스로 분리',
      '케틀벨 스내치 또는 케틀벨 스윙으로 대체',
    ],
    related: ['power-snatch', 'dumbbell-shoulder-to-overhead', 'dumbbell-hang-power-clean'],
    terms: ['alt', 'e2mom', 'lockout'],
  },

  /* ==================================================================== */
  {
    id: 'row',
    seoTitle: '로잉 머신 제대로 타는 법과 Cal 표기 뜻',
    seoDesc:
      '로잉의 캐치·드라이브·피니시·리커버리 4단계와 "다리→상체→팔" 순서를 정리했습니다. 15/12 Cal 표기와 댐퍼 설정이 무슨 뜻인지도 설명합니다.',
    thumb: 2,
    ko: '로잉',
    en: 'Row (Concept2)',
    abbr: 'ROW',
    category: '모노스트럭처',
    level: '초급',
    equipment: ['로잉 머신'],
    tagline: '다리 → 상체 → 팔 순서로 밀고 당기는, 크로스핏에서 가장 자주 나오는 유산소 기구',
    intro:
      '와드에 "15/12 Cal Row" 라고 적히면 남자 15칼로리 / 여자 12칼로리를 채우라는 뜻이다. ' +
      '거리(m)가 아니라 칼로리로 적히는 이유는, 힘을 세게 쓸수록 칼로리가 빨리 오르기 때문이다. ' +
      '힘의 60%는 다리에서 나오는데 대부분의 초보자가 팔로 당겨서 금방 지친다.',
    phases: [
      {
        name: '캐치',
        pose: 'rowCatch',
        desc: '무릎을 접어 몸을 앞으로 당긴 시작 자세. 정강이는 수직, 팔은 앞으로 뻗고 상체는 살짝 앞으로 기운다.',
        cues: ['정강이는 수직까지만', '어깨는 힘 빼고 앞으로', '등은 평평하게'],
        emphasis: ['hamstrings', 'core', 'lats'],
      },
      {
        name: '드라이브',
        pose: 'rowDrive',
        desc: '다리로 발판을 밀어낸다. 다리가 거의 다 펴질 때까지 팔과 상체는 그대로 둔다.',
        cues: ['다리 먼저 — 팔은 아직', '발판을 밀어낸다', '등 각도 유지'],
        emphasis: ['quads', 'glutes', 'calves'],
      },
      {
        name: '피니시',
        pose: 'rowFinish',
        desc:
          '다리가 다 펴진 뒤 상체를 뒤로 열고 마지막에 손잡이를 갈비뼈 아래로 당긴다. ' +
          '기울기는 시계로 치면 캐치의 11시에서 1시까지, 수직에서 뒤로 10~15° 정도다.',
        cues: ['다리 → 상체 → 팔 순서', '뒤로는 1시까지만', '손잡이는 명치 아래로', '어깨는 아래로, 팔꿈치는 뒤로'],
        emphasis: ['lats', 'erectors', 'biceps'],
      },
      {
        name: '리커버리',
        pose: 'rowRecovery',
        desc: '팔 → 상체 → 다리 순서로 되돌아간다. 드라이브의 정확한 역순이고, 여기서 쉬는 것이다.',
        cues: ['팔부터 먼저 뻗기', '무릎은 손이 지나간 뒤에 굽히기', '드라이브보다 두 배 천천히'],
        emphasis: ['core', 'hamstrings'],
      },
    ],
    muscles: [
      { key: 'quads', level: 'primary' },
      { key: 'glutes', level: 'primary' },
      { key: 'lats', level: 'primary' },
      { key: 'hamstrings', level: 'secondary' },
      { key: 'erectors', level: 'secondary' },
      { key: 'biceps', level: 'secondary' },
      { key: 'traps', level: 'secondary' },
      { key: 'core', level: 'stabilizer' },
      { key: 'calves', level: 'stabilizer' },
    ],
    faults: [
      { problem: '팔로 먼저 당긴다', fix: '순서가 전부다. 다리 → 상체 → 팔. 다리가 다 펴질 때까지 팔꿈치를 굽히지 않는 드릴로 교정한다.' },
      { problem: '리커버리가 드라이브만큼 빠르다', fix: '리커버리는 쉬는 구간이다. 드라이브 1 : 리커버리 2 리듬을 만든다.' },
      { problem: '등이 둥글게 말린다', fix: '캐치에서 무릎을 너무 접은 것. 정강이가 수직이 되는 곳까지만 앞으로 간다.' },
      { problem: '피니시에서 눕다시피 넘어간다', fix: '뒤로 30° 넘게 가면 다시 일어나는 데 힘이 들고 허리만 지친다. 1시 방향에서 멈추고, 갈비뼈가 아니라 골반에서 여는 느낌으로.' },
      { problem: '댐퍼를 10에 놓는다', fix: '댐퍼는 무게가 아니라 공기량이다. 로잉은 보통 3~5가 효율적이고, 바이크 에르그는 와드에 적힌 대로 맞춘다.' },
    ],
    scaling: [
      '칼로리 수를 줄이기 (15/12 → 12/9)',
      '어썰트 바이크·스키 에르그로 대체 (같은 칼로리 기준)',
      '댐퍼를 3~5로 낮춰 기술 위주로',
      '거리 기준(예: 250m)으로 바꾸기',
    ],
    related: ['double-under'],
    terms: ['c2', 'cal', 'damper', 'e2mom'],
  },
];
