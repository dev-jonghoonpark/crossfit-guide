/**
 * 와드 아카이브.
 *
 * 화이트보드 한 장을 그대로 옮겨 적고(raw), 한 줄씩 해석한 데이터다.
 * 줄마다 movement / term id 를 달아 두면 빌드가 알아서
 *   · 와드 → 동작 링크
 *   · 동작 → "이 동작이 나온 와드" 역방향 링크
 * 를 만들어 준다. 같은 동작이 여러 와드에 나오면 자동으로 한 페이지로 모인다.
 *
 * ⚠️ 순서 규칙 — 배열 순서가 곧 화면 표시 순서다. 최신 와드가 위.
 *    새 와드는 반드시 **배열 맨 앞**에 추가한다. 목록·홈 미리보기·이전/다음
 *    페이저가 전부 이 순서를 그대로 따른다.
 *    날짜 필드는 두지 않는다 — 화이트보드 사진에 날짜가 적혀 있지 않고,
 *    추측한 날짜를 적으면 사실이 아닌 정보가 페이지에 노출되기 때문이다.
 *    (실제 날짜를 알고 있어서 넣고 싶다면 date 필드를 되살리는 것보다
 *     사진에 적힌 그대로를 raw 로 남기는 쪽이 이 프로젝트의 원칙에 맞는다.)
 *
 * 새 와드 추가하는 법
 *  1. 배열 **맨 앞**에 항목 하나 추가 (id 는 URL 이 된다)
 *  2. 사진에 적힌 줄을 raw 에 그대로, 해석을 read / explain 에
 *  3. 이미 있는 동작이면 movement 에 그 id 를 적기만 하면 연결된다
 *  4. 새 동작이면 data/movements.js 에 먼저 추가
 *  5. `npm run build` — 오타가 있으면 어느 와드 어느 줄인지 알려주고 멈춘다
 *
 * 필드
 *  guide:true  "와드 읽는 법" 튜토리얼 페이지에서 예제로 쓰는 와드 (한 개만)
 *  parts[].kind  'warmup' | 'strength' | 'metcon'  — 목록에서 파트 성격 표시용
 *  tiers[]     화이트보드 구석의 a / b / c 스케일링 사다리
 */

export const wods = [
  /* ==================================================================== */
  {
    id: 'bench-press-tabata',
    box: 'RNL CrossFit',
    title: '벤치 프레스 5-5-3-3-2 + 4종 타바타',
    seoTitle: '크로스핏 와드 — 벤치 프레스 5-5-3-3-2와 타바타 4종 해석',
    seoDesc:
      'Every 2:00 x 5 / 5-5-3-3-2 벤치 프레스와 링 딥·바이크·SDHP·디피싯 푸시업 타바타. 화이트보드 표기를 한 줄씩 해석했습니다.',
    focus: '상체 근력 → 4분 인터벌 4세트',
    tags: ['스트렝스', '타바타', '상체'],
    summary:
      '앞에서 벤치 프레스를 5-5-3-3-2로 올려 치고, 뒤에서 타바타 4종을 이어 붙인 상체 위주 와드다. ' +
      '타바타 4종을 연달아 하면 총 16분이라 마지막 디피싯 푸시업까지 남길 힘을 계산해 두는 게 핵심이다.',
    parts: [
      {
        label: '1',
        kind: 'strength',
        subtitle: '스트렝스 파트 — 벤치 프레스',
        lines: [
          {
            raw: 'Every 2:00 x 5',
            read: '2분마다 시작해서 총 5세트 = 10분',
            explain:
              'EMOM 과 같은 방식인데 간격이 2분이다. 타이머가 0:00, 2:00, 4:00, 6:00, 8:00 이 될 때 한 세트씩 친다. ' +
              '무거운 세트라 회복 시간을 넉넉히 주려고 2분으로 잡은 것.',
            term: 'e2mom',
          },
          {
            raw: '5-5-3-3-2',
            read: '세트별 반복 수 — 5회, 5회, 3회, 3회, 2회',
            explain:
              '세트마다 렙이 줄어드는 형식이다. 렙이 줄어드는 만큼 무게를 올려서, 마지막 2회에서 오늘의 가장 무거운 무게를 친다.',
          },
          {
            raw: 'Bench Press',
            read: '벤치 프레스',
            explain: '견갑을 모아 고정하고 바가 가슴에 닿았다가 팔꿈치가 완전히 펴지면 1렙이다.',
            movement: 'bench-press',
          },
          {
            raw: '*60% Build to heavy',
            read: '1RM의 60%에서 시작해 그날 최고 무게까지 올려라',
            explain:
              '첫 세트(5회)를 1RM의 60% 정도로 가볍게 시작해서, 세트마다 조금씩 올려 마지막 2회에서 그날 가장 무거운 무게를 친다. ' +
              '1RM을 모르면 "5회를 여유 있게 할 수 있는 무게"에서 시작하면 된다.',
            term: 'percentage',
          },
        ],
        summary: '총 10분. 실패하는 게 목적이 아니라 마지막 2회를 성공시키는 게 목적이다. 무게를 너무 급하게 올리지 않는다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD — 타바타 4종',
        lines: [
          {
            raw: 'TABATA',
            read: '타바타 형식',
            explain: '20초 최대한 많이 + 10초 휴식을 8라운드 반복. 한 동작당 4분이다.',
            term: 'tabata',
          },
          {
            raw: '20sec on 10sec off x 8sets',
            read: '20초 운동 / 10초 휴식 × 8라운드',
            explain:
              '기록은 보통 8라운드 중 가장 적게 한 라운드의 렙 수다. 1라운드에 20개를 하고 8라운드에 5개를 하면 기록은 5다. ' +
              '그래서 처음부터 8라운드 내내 유지할 수 있는 개수로 시작하는 게 이긴다.',
          },
          {
            raw: '1.Ring Dips',
            read: '① 링 딥',
            explain: '어깨가 팔꿈치 아래로 내려갔다가 팔을 완전히 펴야 1렙. 4분 동안 8라운드.',
            movement: 'ring-dip',
          },
          {
            raw: '2.Bike Erg (@Damper 10) or Ski or Assault Bike',
            read: '② 바이크 에르그 (댐퍼 10) — 없으면 스키 에르그나 어썰트 바이크',
            explain:
              '댐퍼는 기구 옆 레버(1~10)로 들어오는 공기량을 정한다. 10은 가장 무겁고 뻑뻑한 설정이라 짧고 강한 20초에 맞춘 것이다. ' +
              '기구가 없으면 스키 에르그나 어썰트 바이크로 대체한다.',
            term: 'damper',
            movement: 'row',
          },
          {
            raw: '3.Sumo Deadlift High Pull (75/55lb)',
            read: '③ 스모 데드리프트 하이 풀 — 남 75lb(≈34kg) / 여 55lb(≈25kg)',
            explain: '다리로 띄우고 팔꿈치를 높이 들어 바를 쇄골까지. 팔로 당기면 4분을 못 버틴다.',
            movement: 'sumo-deadlift-high-pull',
            term: 'sdhp',
          },
          {
            raw: '4.Def.Push-Up (4.5"/2.5")',
            read: '④ 디피싯 푸시업 — 손 받침 높이 남 4.5인치 / 여 2.5인치',
            explain:
              'Deficit(디피싯)은 손을 원판 위에 올려 가슴이 손보다 더 깊이 내려가게 만든다는 뜻이다. ' +
              '숫자는 받침 높이(인치)이고, 높을수록 어렵다.',
            movement: 'deficit-push-up',
            term: 'deficit',
          },
        ],
        summary:
          '네 동작을 각각 4분씩 하면 총 16분이다. 전부 미는 동작(링 딥·SDHP·푸시업)이라 어깨와 삼두가 누적으로 지친다.',
      },
    ],
    tiers: [
      { tier: 'a', raw: '1Scaled', text: '전 동작을 한 단계씩 낮춘 버전으로 (링 딥 → 밴드 보조, 디피싯 → 일반 푸시업 등).' },
      { tier: 'b', raw: '2Scaled', text: '두 단계 낮춘 버전으로 (링 딥 → 박스 딥, 푸시업 → 무릎 푸시업 등).' },
      { tier: 'c', raw: '-/-', text: '더 낮출 게 없다 — 이 단계에서는 개수와 시간만 조절한다.' },
    ],
    strategy: [
      '타바타 기록은 "가장 적게 한 라운드"다. 1라운드에 최대치를 하면 손해다.',
      '링 딥이 4~5개밖에 안 되면 처음부터 3개씩 8라운드로 고정하는 게 총합이 더 크다.',
      '바이크는 댐퍼가 10이라 20초에 RPM 을 올리는 데 시간이 걸린다. 10초 휴식에도 페달을 완전히 멈추지 않는다.',
      '마지막 디피싯 푸시업에서 어깨가 이미 탄 상태다. 받침 높이를 낮추는 게 개수를 지키는 방법이다.',
    ],
    record: 'Tabata — 동작별로 8라운드 중 가장 적은 라운드의 렙 수. (벤치 프레스는 세트별 무게를 따로 기록)',
  },

  /* ==================================================================== */
  {
    id: 'team-deadlift-hspu-wallball',
    box: 'RNL CrossFit',
    title: '[2인] 데드리프트 · HSPU · 월볼 AMRAP 23',
    seoTitle: '크로스핏 팀 와드 — 데드리프트 HSPU 월볼 AMRAP 23분 해석',
    seoDesc:
      '[Team of 2] AMRAP 23, 3 Deadlifts (225/155) · 6 Handstand Push-ups · 9 Wall Ball Shots. 1:1 파트너 휴식 방식과 a/b/c 스케일링을 해석했습니다.',
    focus: '2인 1조 · 23분 AMRAP',
    tags: ['팀 와드', 'AMRAP', '체조'],
    summary:
      '두 명이 한 라운드씩 번갈아 하는 팀 와드다. 파트너가 하는 동안 쉬기 때문에 실제 운동 시간은 절반이지만, ' +
      '그만큼 자기 차례에는 전력으로 가야 하는 구성이다. 3-6-9 는 한 라운드가 짧아 교대가 빠르다.',
    parts: [
      {
        label: '1',
        kind: 'warmup',
        subtitle: '웜업 & 스트레칭',
        lines: [
          {
            raw: 'Warm-Up & Stretching',
            read: '웜업과 스트레칭',
            explain:
              '데드리프트가 무겁고 핸드스탠드 푸시업이 들어 있어 햄스트링·어깨·손목을 충분히 풀어야 한다. ' +
              '코치가 빈 바 데드리프트와 파이크 푸시업으로 특이적 웜업을 붙여 준다.',
          },
        ],
        summary: '이 파트는 기록하지 않는다. 대신 여기서 오늘 쓸 무게를 미리 한 번 들어 보고 정한다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD — 2인 팀 AMRAP',
        lines: [
          {
            raw: '[Team of 2]',
            read: '2인 1조',
            explain: '두 명이 한 팀으로 기록을 합산한다. 파트너와 무게·스케일링을 각자 다르게 잡아도 된다.',
            term: 'team-of-2',
          },
          {
            raw: 'AMRAP 23',
            read: '23분 동안 최대한 많은 라운드',
            explain: '23분이 끝났을 때 팀이 완료한 총 라운드 수 + 남은 렙이 기록이다.',
            term: 'amrap',
          },
          {
            raw: '3 Deadlifts (225/155)',
            read: '데드리프트 3회 — 남 225lb(≈102kg) / 여 155lb(≈70kg)',
            explain: '꽤 무거운 무게다. 3회씩이라 매 라운드 언브로큰으로 가되, 등이 말리면 즉시 무게를 내린다.',
            movement: 'deadlift',
            term: 'lbs-notation',
          },
          {
            raw: '6 Handstand Push-ups',
            read: '핸드스탠드 푸시업 6회',
            explain: '벽에 기대 물구나무선 채 정수리가 바닥에 닿았다가 팔을 완전히 펴야 1렙이다.',
            movement: 'handstand-push-up',
            term: 'hspu',
          },
          {
            raw: '9 Wall Ball Shots (20/14 lb)',
            read: '월볼 9회 — 남 20lb(≈9kg) / 여 14lb(≈6kg) 볼',
            explain: '풀 스쿼트로 앉았다 일어서는 힘으로 벽 타깃에 던진다. 타깃 높이는 보통 남 10ft / 여 9ft.',
            movement: 'wall-ball',
            term: 'wb',
          },
          {
            raw: '* 1:1 Rest With partner',
            read: '파트너와 1:1로 번갈아 — 한 명이 한 라운드를 다 하는 동안 다른 한 명은 쉰다',
            explain:
              '내가 3-6-9 를 다 끝내면 파트너가 시작하고 나는 쉰다. 쉬는 시간이 곧 상대의 라운드 시간이라, ' +
              '파트너가 빨리 하면 내 휴식도 짧아진다.',
            term: 'team-of-2',
          },
        ],
        summary:
          '한 라운드가 대략 60~90초. 23분이면 팀 합계 16~20라운드 정도가 흔한 결과다.',
      },
    ],
    tiers: [
      { tier: 'a', raw: '185/125 1mat', text: '데드리프트 남 185lb(≈84kg) / 여 125lb(≈57kg), HSPU 는 머리 아래 매트 1장.' },
      { tier: 'b', raw: '155/105 2mat or x2 sec HSH', text: '데드리프트 155/105lb, HSPU 는 매트 2장 — 또는 렙당 2초 핸드스탠드 홀드로 대체.' },
      { tier: 'c', raw: '135/95 , -', text: '데드리프트 135/95lb. HSPU 는 앞 단계와 동일하게 두거나 코치 안내대로.' },
      { tier: 'd', raw: '-/-', text: '무게를 더 낮추고 HSPU 는 박스 파이크 푸시업 등으로 대체.' },
    ],
    strategy: [
      '팀 와드는 "쉬는 동안 숨을 완전히 돌리는 것"이 전략이다. 파트너 라운드 동안 물 마시고 손 털고 다음 라운드 계획을 세운다.',
      'HSPU 6개가 막히기 시작하면 그때부터 라운드 시간이 두 배가 된다. 처음부터 매트를 한 장 더 깔고 6개를 언브로큰으로 유지하는 편이 총 라운드에 유리하다.',
      '월볼 9개는 쉬지 않고 — 볼을 내려놓으면 다시 드는 데만 5초가 든다.',
      '데드리프트는 매 라운드 첫 동작이라 회복된 상태에서 친다. 여기서 무리하지 않으면 23분 내내 자세가 유지된다.',
    ],
    record: 'AMRAP — 팀 합계 라운드 수 + 남은 렙. 예: 18 rounds + 6 reps',
  },

  /* ==================================================================== */
  {
    id: 'e2mom-row-c2b-db-box',
    box: 'RNL CrossFit',
    title: 'E2MOM 20 — 로우·C2B / 덤벨 스내치·박스 점프',
    seoTitle: '크로스핏 E2MOM 20 와드 — 홀수·짝수 라운드 구성 해석',
    seoDesc:
      'E2MOM 20, 홀수 라운드는 15/12 Cal Row + 8 C2B, 짝수 라운드는 12 덤벨 스내치 + 12 박스 점프. Odd/Even 구성과 a/b/c 스케일링을 해석했습니다.',
    focus: '2분 간격 인터벌 10라운드',
    tags: ['E2MOM', '인터벌', '덤벨'],
    summary:
      '2분마다 시작하는 10라운드짜리 인터벌인데, 홀수 라운드와 짝수 라운드에 서로 다른 두 동작이 배치된다. ' +
      '결과적으로 당기는 라운드(로우+C2B)와 미는·뛰는 라운드(덤벨 스내치+박스 점프)를 번갈아 하게 된다.',
    parts: [
      {
        label: '1',
        kind: 'warmup',
        subtitle: '스트레칭 & 웜업',
        lines: [
          {
            raw: 'Stretching & Warm-Ups',
            read: '스트레칭과 웜업',
            explain: '로잉 자세와 철봉 매달리기, 덤벨 가볍게 스내치까지 미리 한 번씩 해 보고 시작한다.',
          },
        ],
        summary: '체스트 투 바가 들어 있어 어깨와 광배를 특히 충분히 풀어 둔다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD — 홀수/짝수 인터벌',
        lines: [
          {
            raw: 'E2MOM 20',
            read: '2분마다 시작, 총 20분 = 10라운드',
            explain:
              '타이머 0:00, 2:00, 4:00 … 18:00 에 한 라운드씩 시작한다. 정해진 동작을 끝내면 다음 2분이 될 때까지 쉰다. ' +
              '빨리 끝낼수록 오래 쉬는 구조.',
            term: 'e2mom',
          },
          {
            raw: 'Odd Round :',
            read: '홀수 라운드 (1, 3, 5, 7, 9라운드)',
            explain: '아래 두 동작을 이어서 한다. 총 5번 돌아온다.',
            term: 'odd-even',
          },
          {
            raw: '15/12 Cal Row',
            read: '로잉 — 남 15칼로리 / 여 12칼로리',
            explain:
              '거리(m)가 아니라 기구 화면의 칼로리 숫자를 채운다. 세게 당길수록 칼로리가 빨리 오르지만 그만큼 뒤 동작이 힘들어진다.',
            movement: 'row',
            term: 'cal',
          },
          {
            raw: '8 Chest-to-Bar Pull-ups',
            read: '체스트 투 바 풀업 8회',
            explain: '턱이 아니라 가슴(쇄골 아래)이 봉에 닿아야 인정된다. 로우 직후라 그립이 이미 지쳐 있다.',
            movement: 'chest-to-bar-pull-up',
            term: 'c2b',
          },
          {
            raw: 'Even Round :',
            read: '짝수 라운드 (2, 4, 6, 8, 10라운드)',
            explain: '아래 두 동작을 이어서 한다. 역시 총 5번.',
            term: 'odd-even',
          },
          {
            raw: '12 Dumbbell Snatch alt.(22.5/15kg)',
            read: '덤벨 스내치 12회, 좌우 번갈아 — 남 22.5kg / 여 15kg',
            explain:
              '"alt." 는 alternating, 즉 매 렙 손을 바꾼다는 뜻이다. 좌우 합쳐 12회이므로 한쪽당 6회다.',
            movement: 'dumbbell-snatch',
            term: 'alt',
          },
          {
            raw: '12 Box Jumps (24"/20")',
            read: '박스 점프 12회 — 남 24인치(≈61cm) / 여 20인치(≈51cm)',
            explain: '박스 위에서 무릎과 고관절이 완전히 펴져야 1렙. 내려올 때는 뛰어내리든 걸어 내려오든 상관없다.',
            movement: 'box-jump',
            term: 'box-height',
          },
        ],
        summary:
          '한 라운드를 90초 안에 끝내는 것이 목표. 그래야 30초를 쉬고 다음 라운드를 같은 속도로 갈 수 있다.',
      },
    ],
    tiers: [
      {
        tier: 'a',
        raw: 'BB or Pull-Up 20-15/12.5-10kg',
        text: '체스트 투 바 → 밴드 보조(BB) 또는 일반 풀업으로. 덤벨은 남 20~15kg / 여 12.5~10kg 중에서 선택.',
      },
      { tier: 'b', raw: 'GB , 12.5-10/8-6kg', text: '풀업을 한 단계 더 낮춘 버전(GB)으로. 덤벨은 남 12.5~10kg / 여 8~6kg.' },
      { tier: 'c', raw: '12/9cal , -/-', text: '로잉을 남 12 / 여 9칼로리로 줄인다. 나머지는 앞 단계와 동일.' },
    ],
    strategy: [
      '홀수 라운드가 훨씬 길다. 로우를 90% 세기로 당기고 C2B 를 4+4 로 쪼개는 편이 대부분 더 빠르다.',
      '로잉은 스트로크 수를 세면 페이스가 잡힌다. 15칼로리는 보통 18~22스트로크다.',
      '짝수 라운드는 상대적으로 여유가 있다. 여기서 호흡을 완전히 회복해 다음 홀수 라운드를 대비한다.',
      '박스 점프는 지치면 정강이를 찧는 1순위 동작이다. 후반 라운드는 스텝업으로 바꿔도 좋다.',
    ],
    record: 'EMOM 계열 — 라운드를 다 채웠는지 여부와 가장 오래 걸린 라운드 시간. 못 채운 라운드가 있으면 몇 라운드째인지.',
  },

  /* ==================================================================== */
  {
    id: 'snatch-complex-hopper-2026',
    box: 'RNL CrossFit',
    title: '스내치 콤플렉스 + "The Hopper 2026"',
    seoTitle: '크로스핏 게임즈 The Hopper 2026 와드 해석 — 스내치 3종',
    seoDesc:
      'Every 01:00 x 8 스내치 콤플렉스와 2026 CrossFit Games Event 12 "The Hopper 2026" 3RFT. Unbroken 표기와 타임캡 해석을 정리했습니다.',
    focus: '스내치 기술 + 게임즈 종목',
    tags: ['EMOM', 'For Time', '스내치', '게임즈'],
    summary:
      '앞에서 스내치 세 가지를 한 세트로 묶은 콤플렉스로 기술을 다듬고, 뒤에서 2026 크로스핏 게임즈 종목을 그대로 가져와 친다. ' +
      '뒤 파트는 스내치 세 종류를 각각 언브로큰 7회씩 해야 해서 그립과 어깨가 관건이다.',
    parts: [
      {
        label: '1',
        kind: 'strength',
        subtitle: '스킬 파트 — 스내치 콤플렉스',
        lines: [
          {
            raw: 'Every 01:00 x 8',
            read: '1분마다 시작, 총 8라운드 = 8분',
            explain: 'EMOM 이다. 매 분 아래 세 동작을 한 세트로 이어서 하고 남은 시간은 쉰다.',
            term: 'emom',
          },
          {
            raw: '1 Hang Power Snatch (Above knee)',
            read: '행 파워 스내치 1회 — 무릎 위에서 시작',
            explain:
              '바를 바닥에 내려놓지 않고 허벅지 상단(무릎 위)까지만 내렸다가 친다. 반동 거리가 가장 짧아 고관절 신전 능력이 그대로 드러난다.',
            movement: 'hang-power-snatch',
            term: 'hang',
          },
          {
            raw: '1 Hang Power Snatch (Below Knee)',
            read: '행 파워 스내치 1회 — 무릎 아래에서 시작',
            explain: '같은 동작인데 바를 무릎 아래(정강이 중간)까지 더 내렸다가 친다. 거리가 길어져 더 어렵다.',
            movement: 'hang-power-snatch',
          },
          {
            raw: '1 Power Snatch',
            read: '파워 스내치 1회 — 바닥에서',
            explain: '마지막은 바를 바닥에 완전히 내려놓고 정식 셋업에서 친다. 세 동작을 합쳐 1세트다.',
            movement: 'power-snatch',
          },
          {
            raw: '*For Quality , @60-65% Same weight across',
            read: '무겁게가 아니라 정확하게. 1RM의 60~65%로 8세트 내내 같은 무게',
            explain:
              '"For Quality" 는 기록이나 무게가 아니라 자세를 목적으로 하라는 뜻이다. ' +
              '무게를 올리지 말고 8세트 전부 같은 무게로 가면서 매 렙 같은 자세가 나오게 한다.',
            term: 'percentage',
          },
        ],
        summary: '총 8분, 스내치 24회. 실패하면 무게가 잘못된 것이니 즉시 내린다. 여기서 지치면 2번 파트가 망가진다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD — 2026 CrossFit Games Event 12',
        lines: [
          {
            raw: '2026 CrossFit Games Event12 "The Hopper 2026"',
            read: '2026 크로스핏 게임즈 12번째 종목',
            explain:
              '게임즈에서 나온 종목을 박스에서 그대로 해 보는 것이다. "The Hopper" 는 "무엇이 나올지 모르는 무작위 조합"을 뜻하는 크로스핏의 오래된 개념이다.',
            term: 'hopper',
          },
          {
            raw: '3 Rounds For Time',
            read: '아래 4개 동작을 한 라운드로, 3라운드를 최대한 빨리',
            explain: '기록은 3라운드를 끝낸 총 시간.',
            term: 'rft',
          },
          {
            raw: '21 Toes to Bar',
            read: '토투바 21회',
            explain: '매달린 채 두 발끝이 손 사이 봉에 닿아야 1렙. 21회는 그립이 가장 먼저 터지는 개수다.',
            movement: 'toes-to-bar',
            term: 't2b',
          },
          {
            raw: '7 Unbroken Power Snatch (95/65)',
            read: '파워 스내치 7회 — 끊지 말고 한 번에. 남 95lb(≈43kg) / 여 65lb(≈29.5kg)',
            explain:
              '"Unbroken" 은 중간에 바를 내려놓지 말고 7회를 이어서 하라는 뜻이다. 끊었을 때의 규칙은 브리핑에서 확인한다.',
            movement: 'power-snatch',
            term: 'unbroken',
          },
          {
            raw: '7 Unbroken Hang Snatch',
            read: '행 스내치 7회 — 역시 언브로큰',
            explain:
              '같은 바를 바닥에 내려놓지 않고 허벅지 높이에서 7회. 앞의 파워 스내치 7회에 바로 이어진다. ' +
              '"Hang Snatch" 만 적혀 있으면 받는 깊이(파워인지 스쿼트인지)가 지정되지 않은 것이라 브리핑에서 확인한다. ' +
              '다음 줄이 스쿼트 스내치이므로 여기서는 파워로 받는 게 자연스럽다.',
            movement: 'hang-power-snatch',
          },
          {
            raw: '7 Unbroken Squat Snatch',
            read: '스쿼트 스내치 7회 — 역시 언브로큰',
            explain: '풀 스쿼트 바닥까지 내려가 받는 버전으로 7회. 라운드당 스내치가 총 21회다.',
            movement: 'squat-snatch',
          },
          {
            raw: '*Time Cap : 12minute',
            read: '제한 시간 12분 (이 박스 기준)',
            explain: '12분이 지나면 멈추고 그때까지 완료한 렙 수를 기록한다.',
            term: 'time-cap',
          },
          {
            raw: '*Original Time Cap : 6minute',
            read: '게임즈 원본 제한 시간은 6분',
            explain:
              '선수들은 6분 안에 끝냈다는 뜻이다. 박스에서는 두 배인 12분을 준다. 원본 캡은 "이게 얼마나 빠른 종목인지" 알려주는 참고 수치다.',
          },
          {
            raw: '*Promoter : Tia Clair Toomey',
            read: '이 종목의 기준 선수 — 티아 클레어 투미',
            explain: '이 와드를 대표하는 선수 이름이다. 기록 비교의 기준으로 적어 둔다.',
            term: 'promoter',
          },
        ],
        summary:
          '라운드당 토투바 21 + 스내치 21 = 42렙, 3라운드면 126렙이다. 무게는 가볍지만 언브로큰 조건 때문에 그립이 승부처다.',
      },
    ],
    tiers: [
      { tier: 'a', raw: '75/55', text: '스내치 무게를 남 75lb(≈34kg) / 여 55lb(≈25kg)로.' },
      { tier: 'b', raw: '65/45, K2C , Broken ok', text: '스내치 65/45lb, 토투바는 니 투 체스트(K2C)로, 언브로큰 조건은 빼도 된다.' },
      { tier: 'c', raw: '-/- , Broken ok', text: '무게를 더 낮추고 토투바도 더 쉬운 버전으로. 언브로큰 조건 없음.' },
    ],
    strategy: [
      '토투바 21회를 처음부터 7+7+7 로 쪼갠다. 끝까지 매달려 버티면 그다음 스내치 21회를 잡을 그립이 안 남는다.',
      '스내치 21회는 종류가 바뀔 뿐 같은 바다. 7회 끝날 때마다 바를 내려놓고 손을 털 수 있는 구간이 바로 거기다.',
      '스쿼트 스내치 7회가 가장 어렵다. 앞의 14회에서 얼마나 아꼈는지가 여기서 드러난다.',
      '1번 파트에서 무게 욕심을 내면 2번 파트에서 스내치 자세가 무너진다. "For Quality" 는 진짜로 그렇게 하라는 뜻이다.',
    ],
    record: 'For Time — 3라운드 완료 시간. 12분 캡에 걸리면 완료한 총 렙 수.',
  },

  /* ==================================================================== */
  {
    id: 'team-dumbbell-cindy',
    box: 'RNL CrossFit',
    title: '[2인] 덤벨 3종 + 신디 변형 AMRAP 20',
    seoTitle: '크로스핏 팀 와드 — 덤벨 3종과 신디 변형 AMRAP 20분 해석',
    seoDesc:
      '[Team of 2] AMRAP 20. 덤벨 데드리프트·행 파워 클린·숄더 투 오버헤드 1라운드 + 풀업·푸시업·에어 스쿼트 2라운드. Dual DB 표기와 렙 분배를 해석했습니다.',
    focus: '2인 1조 · 덤벨 + 맨몸',
    tags: ['팀 와드', 'AMRAP', '덤벨'],
    summary:
      '덤벨 3종 한 라운드와 맨몸 3종(신디 변형) 두 라운드를 묶어 20분 동안 반복하는 팀 와드다. ' +
      '렙을 어떻게 나눠도 되기 때문에, 파트너와 강한 동작·약한 동작을 서로 맡는 전략이 그대로 기록으로 나온다.',
    parts: [
      {
        label: '1',
        kind: 'warmup',
        subtitle: '스트레칭 & 웜업',
        lines: [
          {
            raw: 'Stretching & Warm Up',
            read: '스트레칭과 웜업',
            explain: '덤벨을 어깨 위로 올리는 동작이 있어 어깨와 손목을, 풀업이 있어 광배를 풀어 둔다.',
          },
        ],
        summary: '가벼운 덤벨로 데드리프트 → 행 파워 클린 → 오버헤드를 한 번씩 이어서 해 보면 순서가 몸에 남는다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD — 2인 팀 AMRAP',
        lines: [
          {
            raw: '[Team of 2]',
            read: '2인 1조',
            explain: '두 명이 팀 기록을 합산한다.',
            term: 'team-of-2',
          },
          {
            raw: 'AMRAP 20',
            read: '20분 동안 최대한 많은 라운드',
            explain: '아래 "덤벨 1라운드 + 맨몸 2라운드"를 한 사이클로 보고, 20분 동안 몇 사이클을 도는지 센다.',
            term: 'amrap',
          },
          {
            raw: '1 Round of  /  14 Dumbbell Deadlifts',
            read: '덤벨 데드리프트 14회 (사이클당 1라운드만)',
            explain: '양손에 덤벨을 들고 바닥에서 세워 든다. 양쪽 덤벨이 동시에 바닥에 닿아야 1렙.',
            movement: 'dumbbell-deadlift',
            term: 'dl',
          },
          {
            raw: '10 Dumbbell Hang Power Cleans',
            read: '덤벨 행 파워 클린 10회',
            explain: '허벅지 높이에서 시작해 덤벨을 어깨 위로. 바닥에 내려놓지 않고 이어서 한다.',
            movement: 'dumbbell-hang-power-clean',
            term: 'hang',
          },
          {
            raw: '8 Dumbbell Shoulder to Overheads',
            read: '덤벨 숄더 투 오버헤드 8회',
            explain:
              '어깨에서 머리 위로 보내기만 하면 방법은 자유다. 프레스든 푸시 프레스든 저크든 상관없다.',
            movement: 'dumbbell-shoulder-to-overhead',
            term: 's2oh',
          },
          {
            raw: '2 Rounds of  /  6 Pull-Ups',
            read: '아래 3개 동작을 2라운드 — 풀업 6회',
            explain: '맨몸 파트는 두 바퀴 돈다. 벤치마크 와드 "Cindy(5-10-15)"를 살짝 늘린 구성이다.',
            movement: 'pull-up',
            term: 'girls',
          },
          {
            raw: '12 Push-Ups',
            read: '푸시업 12회',
            explain: '가슴과 허벅지가 동시에 바닥에 닿고 팔을 완전히 펴야 1렙이다.',
            movement: 'push-up',
          },
          {
            raw: '18 Air Squats',
            read: '에어 스쿼트 18회',
            explain: '고관절이 무릎보다 아래로 내려갔다가 완전히 펴야 1렙.',
            movement: 'air-squat',
          },
          {
            raw: '*Dumbbell: All Dual 22.5/15kg',
            read: '덤벨은 전부 양손 — 남 22.5kg / 여 15kg (한쪽당)',
            explain: '"Dual" 은 양손에 하나씩 든다는 뜻이다. 22.5kg 짜리 두 개, 즉 총 45kg 을 다룬다.',
            term: 'dual-db',
          },
          {
            raw: '*Share The Reps Anyway',
            read: '렙은 어떻게 나눠도 된다',
            explain:
              '앞 와드처럼 한 라운드씩 번갈아 하는 게 아니라, 같은 동작 안에서 몇 개씩 나눠 해도 된다. ' +
              '한 명이 8개 하고 파트너가 6개 해서 14개를 채워도 인정된다.',
            term: 'team-of-2',
          },
        ],
        summary:
          '한 사이클은 덤벨 32렙 + 맨몸 72렙 = 104렙이다. 둘이 나눠 하므로 개인은 사이클당 50렙 남짓.',
      },
    ],
    tiers: [
      { tier: 'a', raw: '20-15/12.5-10kg , BB', text: '덤벨을 남 20~15kg / 여 12.5~10kg 로. 풀업은 밴드 보조(BB).' },
      { tier: 'b', raw: '12.5-10/8-6kg , GB Scaled Push-Up', text: '덤벨을 남 12.5~10kg / 여 8~6kg 로. 풀업은 한 단계 더 낮추고(GB) 푸시업도 스케일(무릎 등).' },
      { tier: 'c', raw: '-/-', text: '무게를 더 낮추고 링 로우·인클라인 푸시업 등으로 대체.' },
    ],
    strategy: [
      '렙을 자유롭게 나눌 수 있으니 잘하는 동작을 더 맡는다. 풀업이 강한 사람이 풀업을 더 하고, 스쿼트가 강한 사람이 스쿼트를 더 한다.',
      '한 번에 다 하지 말고 처음부터 반씩 쪼갠다. 덤벨 데드리프트 14개는 7+7 이 거의 항상 빠르다.',
      '덤벨을 바꿔 쓰면 시간이 샌다. 파트너와 같은 무게를 쓸 수 있으면 그게 가장 빠르다.',
      '에어 스쿼트 18개 구간이 유일하게 숨을 돌릴 수 있는 곳이다. 여기서 호흡을 정리한다.',
    ],
    record: 'AMRAP — 팀 합계 사이클 수 + 남은 렙.',
  },

  /* ==================================================================== */
  {
    id: 'emom-32-pistol-wallball',
    box: 'RNL CrossFit',
    title: 'EMOM 32 — 머신 · 피스톨 · 머신 · 월볼',
    seoTitle: '크로스핏 EMOM 32 와드 해석 — 머신·피스톨 스쿼트·월볼',
    seoDesc:
      'EMOM 32, 12/9 Cal Machine · 16 Pistol Squats alt. · 12/9 Cal Machine · 12-15 Wallballs. 4동작 8사이클 구성과 페이스 배분을 정리했습니다.',
    focus: '32분 롱 EMOM',
    tags: ['EMOM', '롱 메트콘', '하체'],
    summary:
      '네 동작을 1분씩 돌아 8사이클, 총 32분짜리 긴 EMOM 이다. 한 동작을 40~45초 안에 끝내고 15~20초를 쉬는 리듬을 ' +
      '32분 내내 유지하는 게 전부다. 하체가 계속 일하는 구성이라 후반에 페이스가 무너지기 쉽다.',
    parts: [
      {
        label: '1',
        kind: 'warmup',
        subtitle: '스트레칭 & 웜업',
        lines: [
          {
            raw: 'Stretching & Warm-Up',
            read: '스트레칭과 웜업',
            explain: '피스톨 스쿼트가 있어 발목과 고관절을 특히 충분히 풀어 둔다. 한쪽씩 몇 개 해 보고 스케일링을 미리 정한다.',
          },
        ],
        summary: '32분 동안 같은 동작이 8번 돌아온다. 웜업에서 각 동작의 목표 개수를 확정해 두면 흔들리지 않는다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD — 4동작 EMOM',
        lines: [
          {
            raw: 'EMOM 32',
            read: '매 분 시작마다, 총 32분',
            explain:
              '아래 네 동작이 1분씩 순서대로 돌아간다. 4분이 한 사이클이고 8사이클을 돈다. ' +
              '즉 각 동작을 8번씩 하게 된다.',
            term: 'emom',
          },
          {
            raw: '1.12/9Cal Machine',
            read: '① 머신 — 남 12칼로리 / 여 9칼로리',
            explain:
              '"Machine" 은 로잉·바이크 에르그·스키 에르그·어썰트 바이크 중 아무거나 쓰라는 뜻이다. ' +
              '32분 내내 같은 기구를 쓰는 게 페이스를 잡기 쉽다.',
            movement: 'row',
            term: 'cal',
          },
          {
            raw: '2.16 Pistol Squats alt. (30 Air Squats)',
            read: '② 피스톨 스쿼트 16회, 좌우 번갈아 — 못 하면 에어 스쿼트 30회',
            explain:
              '좌우 합쳐 16회이므로 한쪽당 8회다. 괄호 안이 이미 준비된 대체 동작이라 따로 물어볼 필요가 없다.',
            movement: 'pistol-squat',
            term: 'alt',
          },
          {
            raw: '3.12/9Cal Machine',
            read: '③ 머신 — 남 12칼로리 / 여 9칼로리 (①과 동일)',
            explain: '같은 기구로 한 번 더. 피스톨로 다리가 탄 상태에서 하는 거라 ①보다 훨씬 힘들다.',
            movement: 'row',
          },
          {
            raw: '4.12-15 Wallballs (20/14lb)',
            read: '④ 월볼 12~15회 — 남 20lb / 여 14lb 볼',
            explain:
              '개수에 폭이 있는 건 "1분 안에 소화 가능한 범위에서 골라라"라는 뜻이다. ' +
              '8사이클 내내 유지할 수 있는 개수를 고르는 게 맞다.',
            movement: 'wall-ball',
            term: 'wb',
          },
        ],
        summary:
          '총 32분. 머신 16회, 피스톨 8회, 월볼 8회를 수행하게 된다. 쉬는 시간은 각 동작을 얼마나 빨리 끝내느냐로 스스로 만든다.',
      },
    ],
    tiers: [
      { tier: 'a', raw: '1Scaled', text: '한 단계 낮춘 버전 — 피스톨은 박스 피스톨, 월볼은 12회·가벼운 볼로.' },
      { tier: 'b', raw: '2Scaled', text: '두 단계 낮춘 버전 — 피스톨은 에어 스쿼트 30회, 머신 칼로리도 하향.' },
      { tier: 'c', raw: '-/-', text: '더 낮출 게 없다 — 개수와 칼로리만 조절한다.' },
    ],
    strategy: [
      '긴 EMOM 의 목표는 "매 분 15초 이상 쉬는 것"이다. 쉬는 시간이 사라지기 시작하면 그 회차부터 개수를 줄인다.',
      '월볼 개수는 12로 시작한다. 8사이클을 12개로 다 채우는 게 앞에서 15개 하다 뒤에서 8개 하는 것보다 낫다.',
      '머신이 두 번 들어가므로 첫 번째를 세게 가면 세 번째 라운드에서 회복이 안 된다. 두 번 다 같은 속도로.',
      '피스톨은 한쪽 8개다. 4+4 로 나눠서 다리를 바꿔가며 하면 균형이 덜 흔들린다.',
    ],
    record: 'EMOM — 32분을 다 채웠는지, 개수를 못 채운 회차가 있으면 몇 번째인지. 월볼은 선택한 개수도 함께.',
  },
  /* ==================================================================== */
  {
    id: 'emom-clean-jerk-10rft',
    guide: true,
    box: 'RNL CrossFit',
    title: '클린 앤 저크 EMOM + 10라운드 For Time',
    seoTitle: '크로스핏 와드 예시 — 클린 앤 저크 EMOM과 10RFT 해석',
    seoDesc:
      'Every 1:00 x 8, 10 Rounds For Time, (135/85), @70-80%, Time Cap 15min. 실제 박스 화이트보드 한 장을 한 줄씩 해석했습니다.',
    focus: '역도 기술 + 짧은 메트콘',
    tags: ['EMOM', 'For Time', '역도'],
    summary:
      '앞에서 무거운 클린 앤 저크를 매 분 한 번씩 8세트 치고, 뒤에서는 가벼운 바로 10라운드를 최대한 빨리 도는 구성이다. ' +
      '앞 파트가 기술, 뒤 파트가 심폐다.',
    parts: [
      {
        label: '1',
        kind: 'strength',
        subtitle: '스트렝스 / 스킬 파트',
        lines: [
          {
            raw: 'Every 1:00 x 8',
            read: '1분마다 시작해서 총 8라운드 = 8분',
            explain:
              'EMOM 형식이다. 타이머가 0:00, 1:00, 2:00 … 7:00 이 될 때마다 아래 세트를 하나씩 수행하고, ' +
              '남은 시간은 쉰다. 30초 만에 끝내면 30초를 쉬는 것.',
            term: 'emom',
          },
          {
            raw: '1 Squat Clean',
            read: '스쿼트 클린 1회',
            explain: '바닥에서 어깨(프론트 랙)까지 한 번에 올리고 풀 스쿼트로 받아 일어선다.',
            movement: 'squat-clean',
          },
          {
            raw: '1 Split Jerk',
            read: '스플릿 저크 1회',
            explain: '방금 어깨에 올린 그 바를 딥-드라이브로 머리 위에 고정한다. 즉, 세트당 클린 앤 저크 1회.',
            movement: 'split-jerk',
          },
          {
            raw: '@Clean & Jerk 70-80%',
            read: '내 클린 앤 저크 1RM의 70~80% 무게',
            explain:
              '1RM이 100kg이면 70~80kg. 1RM을 모르면 "8세트를 다 성공할 수 있을 만한, 조금 무겁지만 여유 있는 무게"로 잡는다. ' +
              '8세트 내내 같은 무게로 가거나 가볍게 시작해 올려도 된다 (코치 안내에 따름).',
            term: 'percentage',
            movement: 'clean-and-jerk',
          },
        ],
        summary: '총 8분. 매 분 클린 1 + 저크 1. 무거운 무게로 기술을 반복하는 파트라 숨이 차는 게 목적이 아니다.',
      },
      {
        label: '2',
        kind: 'metcon',
        subtitle: '메인 WOD (메트콘)',
        lines: [
          {
            raw: '10 Rounds For Time',
            read: '아래 3개 동작을 한 라운드로, 10라운드를 최대한 빨리',
            explain: '기록은 10라운드를 다 끝낸 총 시간. 짧을수록 좋다.',
            term: 'rft',
          },
          {
            raw: '3 Hang Squat clean (135/85)',
            read: '행 스쿼트 클린 3회 — 남 135lb(≈61kg) / 여 85lb(≈38.5kg)',
            explain: '바를 바닥에 완전히 내려놓지 않고 허벅지 높이에서 시작한다. 라운드마다 3회씩, 총 30회.',
            movement: 'hang-squat-clean',
            term: 'lbs-notation',
          },
          {
            raw: '2 Push jerk',
            read: '푸시 저크 2회 (같은 바, 같은 무게)',
            explain:
              '클린으로 어깨에 온 바를 그대로 이어서 머리 위로. 발 위치를 바꾸지 않아 스플릿보다 빠르게 반복할 수 있다.',
            movement: 'push-jerk',
          },
          {
            raw: '30 Double Unders',
            read: '더블 언더 30회',
            explain: '한 번 점프에 줄이 두 번 지나가야 1회. 10라운드면 총 300회다.',
            movement: 'double-under',
            term: 'du',
          },
          {
            raw: '*Time Cap 15min',
            read: '15분 제한',
            explain:
              '15분이 지나면 멈추고, 그 시점까지 완료한 총 렙 수를 기록한다. 10라운드를 다 못 해도 실패가 아니다.',
            term: 'time-cap',
          },
        ],
        summary:
          '한 라운드당 대략 60~90초를 목표로 잡으면 15분 캡 안에 들어온다. 더블 언더가 약하면 싱글 언더 60~90회로 스케일링하는 게 일반적이다.',
      },
    ],
    strategy: [
      '1번 파트는 숨이 차면 무게가 아니라 페이스가 잘못된 것이다. 세트를 30초 안에 끝내고 30초를 쉰다.',
      '2번 파트는 첫 3라운드를 "너무 쉬운데?" 싶게 가야 10라운드가 완주된다.',
      '행 스쿼트 클린 3회는 끊지 말고 한 번에 — 바를 다시 잡는 데 드는 시간이 더 크다.',
    ],
    record: 'For Time — 10라운드 완료 시간. 캡에 걸리면 완료한 총 렙 수.',
  },

];

/** 이 와드에 등장하는 동작 id 목록 (중복 제거, 등장 순서 유지) */
export function movementIdsOf(wod) {
  const out = [];
  for (const part of wod.parts) {
    for (const line of part.lines) {
      if (line.movement && !out.includes(line.movement)) out.push(line.movement);
    }
  }
  return out;
}

/** 동작 id → 그 동작이 나온 와드 목록 (역방향 색인) */
export const wodsByMovement = (() => {
  const map = {};
  for (const w of wods) {
    for (const id of movementIdsOf(w)) {
      (map[id] ||= []).push(w);
    }
  }
  return map;
})();

/** "와드 읽는 법" 페이지에서 예제로 쓰는 와드 */
export const guideWod = wods.find((w) => w.guide) || wods[0];
