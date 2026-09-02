/**
 * 용어 사전. group 으로 묶여서 렌더링된다.
 * movement: 연결할 동작 id (있으면 링크가 생김)
 */

export const termGroups = [
  {
    id: 'format',
    title: '와드 형식 · 시간 방식',
    desc: '화이트보드에 적힌 첫 줄이 대부분 이 형식이다. 이것만 읽을 줄 알면 오늘 뭘 하는지 알 수 있다.',
    terms: [
      {
        id: 'wod',
        term: 'WOD',
        full: 'Workout of the Day',
        ko: '오늘의 운동',
        desc: '그날 모든 회원이 공통으로 하는 메인 운동. "와드"라고 읽는다.',
      },
      {
        id: 'emom',
        term: 'EMOM',
        full: 'Every Minute On the Minute',
        ko: '매 분 시작마다',
        desc:
          '매 분이 시작될 때 정해진 렙을 수행하고, 남은 시간은 쉰다. 빨리 끝낼수록 더 오래 쉰다. ' +
          '"Every 1:00 x 8" 은 1분 간격으로 8라운드 = 총 8분이라는 뜻.',
        example: 'Every 1:00 x 8 / 1 Squat Clean + 1 Split Jerk',
      },
      {
        id: 'amrap',
        term: 'AMRAP',
        full: 'As Many Rounds/Reps As Possible',
        ko: '제한 시간 내 최대 라운드',
        desc: '정해진 시간 동안 가능한 많은 라운드(또는 렙)를 반복한다. 기록은 "라운드 + 남은 렙"으로 적는다.',
        example: 'AMRAP 12 / 10 Pull-up, 15 Push-up, 20 Air Squat',
      },
      {
        id: 'rft',
        term: 'For Time / RFT',
        full: '(Rounds) For Time',
        ko: '완료 시간 측정',
        desc: '정해진 라운드를 최대한 빨리 끝내고 걸린 시간을 기록한다. 기록이 짧을수록 좋다.',
        example: '10 Rounds For Time / 3 Hang Squat Clean, 2 Push Jerk, 30 Double Unders',
      },
      {
        id: 'time-cap',
        term: 'Time Cap',
        full: 'Time Cap',
        ko: '제한 시간',
        desc:
          'For Time 와드가 무한정 길어지지 않도록 두는 상한선. 캡에 걸리면 그 시점까지 완료한 렙 수를 기록한다. ' +
          '캡 안에 못 끝냈다고 실패가 아니라, 그게 오늘의 기록이다.',
        example: '*Time Cap 15min',
      },
      {
        id: 'tabata',
        term: 'Tabata',
        full: 'Tabata',
        ko: '타바타',
        desc:
          '20초 운동 + 10초 휴식을 8라운드(총 4분) 반복. 보통 가장 적게 한 라운드의 렙 수를 기록한다. ' +
          '동작이 여러 개면 한 동작을 4분씩 끝내고 다음으로 넘어간다.',
        example: 'TABATA / 20sec on 10sec off x 8sets',
      },
      {
        id: 'e2mom',
        term: 'E2MOM / Every 2:00',
        full: 'Every 2 Minutes On the Minute',
        ko: '2분마다',
        desc:
          'EMOM 의 간격이 2분인 버전. "E2MOM 20" 은 2분 간격으로 총 20분 = 10라운드다. ' +
          '홀수 라운드(Odd)와 짝수 라운드(Even)에 다른 동작을 배치하는 구성이 흔하다.',
        example: 'E2MOM 20 / Odd: 15/12 Cal Row + 8 C2B · Even: 12 DB Snatch + 12 Box Jump',
      },
      {
        id: 'odd-even',
        term: 'Odd / Even Round',
        full: 'Odd / Even Round',
        ko: '홀수 · 짝수 라운드',
        desc: '라운드 번호에 따라 다른 동작을 하는 구성. 1·3·5…라운드는 Odd, 2·4·6…라운드는 Even 을 수행한다.',
      },
      {
        id: 'unbroken',
        term: 'Unbroken',
        full: 'Unbroken',
        ko: '언브로큰',
        desc:
          '해당 렙 수를 중간에 바를 내려놓지 않고 한 번에 이어서 하라는 뜻. ' +
          '끊으면 처음부터 다시 하거나 페널티가 붙는 경우가 있으니 브리핑에서 규칙을 확인한다.',
        example: '7 Unbroken Power Snatch (95/65)',
      },
      {
        id: 'team-of-2',
        term: 'Team of 2',
        full: 'Team of 2',
        ko: '2인 1조',
        desc:
          '두 명이 한 팀으로 하는 와드. "1:1 Rest With partner" 는 한 명이 한 라운드를 하는 동안 ' +
          '다른 한 명은 쉬고 번갈아 간다는 뜻이고, "Share The Reps Anyway" 는 렙을 어떻게 나눠도 상관없다는 뜻이다.',
        example: '[Team of 2] AMRAP 23 · *1:1 Rest With partner',
      },
      {
        id: 'chipper',
        term: 'Chipper',
        full: 'Chipper',
        ko: '치퍼',
        desc: '여러 동작을 각각 많은 렙수로 한 번씩만, 위에서부터 순서대로 깎아 내려가듯 수행하는 와드.',
      },
      {
        id: 'emom-death',
        term: 'Death By ...',
        full: 'Death By',
        ko: '데스 바이',
        desc: '1분에 1렙 → 2분에 2렙 → 3분에 3렙... 정해진 시간 안에 렙을 못 채우면 종료. 실패할 때까지 하는 EMOM.',
      },
      {
        id: 'buyin',
        term: 'Buy-in / Cash-out',
        full: 'Buy-in / Cash-out',
        ko: '시작 과제 / 마무리 과제',
        desc: '메인 와드 앞(Buy-in)이나 뒤(Cash-out)에 붙는 추가 과제. "Buy-in: 800m Run" 처럼 표기된다.',
      },
    ],
  },

  {
    id: 'load',
    title: '무게 · 강도 표기',
    desc: '괄호와 퍼센트 기호가 뭘 뜻하는지 알아야 오늘 몇 kg을 들지 정할 수 있다.',
    terms: [
      {
        id: 'rx',
        term: 'Rx',
        full: 'As Prescribed',
        ko: '처방된 그대로',
        desc:
          '와드에 적힌 무게·동작·가동범위를 그대로 수행하는 것. 줄이거나 바꾸면 Scaled. ' +
          'Rx는 목표일 뿐이고, 초보자가 Scaled로 하는 건 전혀 부끄러운 일이 아니다.',
      },
      {
        id: 'rx-plus',
        term: 'Rx+ / Rxd+',
        full: 'Rx Plus',
        ko: 'Rx 위 단계',
        desc:
          'Rx 가 너무 쉬운 사람을 위해 코치가 하나 더 얹어 두는 상향 옵션. ' +
          '보통 무게를 올리거나 동작을 더 어려운 것으로 바꾼다. ' +
          '"*Rxd+ : 2-3RMU" 는 바 뮤스클업 자리를 링 뮤스클업 2~3회로 바꿔서 하라는 뜻이다.',
        example: '*Rxd+ : 2-3RMU',
      },
      {
        id: 'scaled',
        term: 'Scaled / Scaling',
        full: 'Scaling',
        ko: '스케일링',
        desc:
          '내 수준에 맞게 무게를 낮추거나 동작을 쉬운 버전으로 바꾸는 것. ' +
          '와드의 "의도(자극)"를 유지하는 게 목적이다. 코치가 항상 대안을 제시해 준다.',
      },
      {
        id: 'lbs-notation',
        term: '(135/85)',
        full: 'Male / Female Load',
        ko: '남성 / 여성 권장 무게',
        desc:
          '슬래시 앞이 남성, 뒤가 여성 기준 무게. 단위는 보통 파운드(lb)다. ' +
          '135lb ≈ 61kg, 85lb ≈ 38.5kg. 국내 박스는 (60/40) 처럼 kg로 적기도 한다.',
        example: '3 Hang Squat clean (135/85)',
      },
      {
        id: 'one-rm',
        term: '1RM',
        full: 'One-Rep Max',
        ko: '1회 최대 중량',
        desc: '딱 한 번만 들 수 있는 최대 무게. 퍼센트 표기의 기준값이 된다.',
      },
      {
        id: 'percentage',
        term: '@ 70-80%',
        full: 'Percentage of 1RM',
        ko: '1RM 대비 비율',
        desc:
          '내 1RM의 70~80% 무게로 하라는 뜻. "@Clean & Jerk 70-80%" 는 스쿼트 클린이나 저크 각각이 아니라 ' +
          '"클린 앤 저크" 1RM 을 기준으로 잡으라는 의미다. 1RM을 모르면 편하게 반복 가능한 무게로 시작한다.',
        example: '@Clean & Jerk 70-80%',
      },
      {
        id: 'pr',
        term: 'PR',
        full: 'Personal Record',
        ko: '개인 최고 기록',
        desc: '무게든 시간이든 본인 최고 기록. 갱신하면 박스에서 종을 치는 문화가 있다.',
      },
    ],
  },

  {
    id: 'scaling-notation',
    title: '스케일링 표기 (a / b / c)',
    desc:
      '박스 화이트보드 구석에 작게 적힌 a·b·c 줄은 "이 와드를 낮춰서 하는 사다리"다. ' +
      'Rx 가 맨 위이고 a → b → c 로 갈수록 쉬워진다. 어느 줄을 고를지는 브리핑 때 코치가 정해 준다.',
    terms: [
      {
        id: 'tier',
        term: 'a: / b: / c:',
        full: 'Scaling Tiers',
        ko: '스케일링 단계',
        desc:
          'a 가 Rx 바로 아래, 그다음이 b, c… 순으로 내려가는 단계별 대안이다. ' +
          '한 줄 안에서 쉼표로 구분된 값은 와드에 나온 동작 순서대로의 대안이고, ' +
          '"-" 는 그 동작은 그대로 두라는 뜻, "-/-" 는 그 단계에서는 바꿀 게 없다는 뜻으로 쓰인다.',
        example: 'a:185/125 1mat · b:155/105 2mat or x2 sec HSH · c:135/95 , - · d:-/-',
      },
      {
        id: 'nscaled',
        term: '1Scaled / 2Scaled',
        full: 'Scaled Level',
        ko: '스케일 단계',
        desc:
          '개별 대안을 다 적기 번거로울 때 쓰는 축약. "1Scaled" 는 한 단계 낮춘 버전, ' +
          '"2Scaled" 는 두 단계 낮춘 버전을 코치 안내대로 적용하라는 뜻이다.',
        example: 'a:1Scaled / b:2Scaled / c:-/-',
      },
      {
        id: 'abmat',
        term: '1mat / 2mat',
        full: 'AbMat',
        ko: '앱매트 개수',
        desc:
          '핸드스탠드 푸시업에서 머리 아래 깔 매트 개수. 많이 깔수록 내려가는 거리가 짧아져 쉬워진다.',
        movement: 'handstand-push-up',
      },
      {
        id: 'hsh',
        term: 'HSH',
        full: 'Handstand Hold',
        ko: '핸드스탠드 홀드',
        desc:
          '핸드스탠드 푸시업을 못 할 때 렙 대신 버티는 시간으로 바꾸는 스케일링. ' +
          '"x2 sec HSH" 는 1렙을 2초 버티기로 환산하라는 뜻이다.',
        movement: 'handstand-push-up',
      },
      {
        id: 'k2c',
        term: 'K2C',
        full: 'Knees to Chest',
        ko: '니 투 체스트',
        desc: '토투바의 대표적인 스케일링. 발끝 대신 무릎을 가슴 높이까지만 올린다.',
        movement: 'toes-to-bar',
      },
      {
        id: 'broken-ok',
        term: 'Broken ok',
        full: 'Broken OK',
        ko: '끊어도 됨',
        desc: 'Unbroken 조건을 빼 준다는 뜻. 중간에 바를 내려놓고 쉬어도 인정된다.',
      },
      {
        id: 'rep-conversion',
        term: '1BMU=2C2B=3PU',
        full: 'Rep Conversion',
        ko: '렙 환산',
        desc:
          '어려운 동작을 못 할 때 "몇 개로 바꿔서 하라"고 미리 정해 둔 환산표다. ' +
          '바 뮤스클업 1개 대신 체스트 투 바 2개, 그것도 어려우면 풀업 3개를 하라는 뜻. ' +
          '동작이 쉬워지는 만큼 개수를 늘려 라운드 시간을 비슷하게 맞추는 게 목적이라, ' +
          '"3 Bar muscle-Ups" 는 풀업으로 바꾸면 9개가 된다.',
        example: '3 Bar muscle-Ups (1BMU=2C2B=3PU)',
        movement: 'bar-muscle-up',
      },
      {
        id: 'band-scale',
        term: 'BB / GB',
        full: 'Band-assisted variations',
        ko: '밴드 보조 계열',
        desc:
          '풀업 계열을 밴드 등으로 보조해 낮추는 단계를 가리키는 박스 내부 약어다. ' +
          '박스마다 정확히 무엇을 가리키는지 다르니 브리핑 때 확인하는 게 맞다. ' +
          '공통점은 BB 가 GB 보다 한 단계 어려운 쪽이라는 것.',
        example: 'a:BB or Pull-Up · b:GB',
      },
    ],
  },

  {
    id: 'position',
    title: '자세 · 포지션 용어',
    desc: '코치가 수업 중에 실제로 던지는 단어들.',
    terms: [
      {
        id: 'front-rack',
        term: 'Front Rack',
        full: 'Front Rack Position',
        ko: '프론트 랙',
        desc: '바벨을 쇄골과 삼각근 위에 얹고 팔꿈치를 높이 든 자세. 클린을 받는 위치이자 저크의 시작 위치.',
        movement: 'squat-clean',
      },
      {
        id: 'hang',
        term: 'Hang',
        full: 'Hang Position',
        ko: '행 포지션',
        desc: '바가 바닥에 닿지 않고 손에 매달린 상태. 보통 무릎 위~허벅지 중간 높이에서 시작한다.',
        movement: 'hang-squat-clean',
      },
      {
        id: 'triple-extension',
        term: 'Triple Extension',
        full: 'Triple Extension',
        ko: '트리플 익스텐션',
        desc: '발목·무릎·고관절 세 관절을 동시에 쭉 펴는 것. 모든 역도 동작에서 힘이 나오는 순간이다.',
        movement: 'squat-clean',
      },
      {
        id: 'dip-drive',
        term: 'Dip & Drive',
        full: 'Dip and Drive',
        ko: '딥 앤 드라이브',
        desc: '무릎을 짧게 굽혔다가(딥) 폭발적으로 펴는(드라이브) 동작. 저크·푸시 프레스의 엔진.',
        movement: 'push-jerk',
      },
      {
        id: 'lockout',
        term: 'Lockout',
        full: 'Lockout',
        ko: '락아웃',
        desc: '팔꿈치(또는 무릎)를 완전히 편 상태. 락아웃이 안 되면 노렙 처리된다.',
        movement: 'split-jerk',
      },
      {
        id: 'hook-grip',
        term: 'Hook Grip',
        full: 'Hook Grip',
        ko: '훅 그립',
        desc: '엄지를 바에 먼저 감고 검지·중지로 엄지를 덮어 잡는 방법. 처음엔 아프지만 그립이 훨씬 오래 버틴다.',
        movement: 'squat-clean',
      },
      {
        id: 'kipping',
        term: 'Kipping',
        full: 'Kipping',
        ko: '킵',
        desc: '몸의 반동(호로우 ↔ 아치)을 이용해 체조 동작을 더 효율적으로 반복하는 기술. 스트릭트(반동 없음)의 반대말.',
      },
      {
        id: 'no-rep',
        term: 'No Rep',
        full: 'No Rep',
        ko: '노렙',
        desc: '기준(가동범위·락아웃 등)을 못 채워 인정되지 않는 렙. 코치가 "노렙!" 하면 그 개수는 다시 해야 한다.',
      },
    ],
  },

  {
    id: 'movements',
    title: '동작 약어',
    desc: '화이트보드는 공간이 좁아서 대부분 약어로 적힌다.',
    terms: [
      { id: 'sc', term: 'SC', full: 'Squat Clean', ko: '스쿼트 클린', desc: '바닥에서 어깨까지, 풀 스쿼트로 받기.', movement: 'squat-clean' },
      { id: 'hsc', term: 'HSC', full: 'Hang Squat Clean', ko: '행 스쿼트 클린', desc: '행 포지션에서 시작하는 스쿼트 클린.', movement: 'hang-squat-clean' },
      { id: 'pj', term: 'PJ', full: 'Push Jerk', ko: '푸시 저크', desc: '발 위치를 유지한 채 1/4 스쿼트로 받는 저크.', movement: 'push-jerk' },
      { id: 'sj', term: 'SJ', full: 'Split Jerk', ko: '스플릿 저크', desc: '다리를 앞뒤로 갈라 받는 저크.', movement: 'split-jerk' },
      { id: 'cj', term: 'C&J', full: 'Clean & Jerk', ko: '클린 앤 저크', desc: '클린 + 저크를 이어서 하는 올림픽 역도 종목.', movement: 'clean-and-jerk' },
      { id: 'du', term: 'DU', full: 'Double Under', ko: '더블 언더', desc: '한 번 점프에 줄이 두 번 지나가는 줄넘기.', movement: 'double-under' },
      { id: 't2b', term: 'T2B', full: 'Toes To Bar', ko: '토투바', desc: '철봉에 매달려 발끝을 봉에 닿게 올리는 동작.', movement: 'toes-to-bar' },
      { id: 'c2b', term: 'C2B', full: 'Chest To Bar', ko: '체스트투바', desc: '가슴이 봉에 닿는 풀업.', movement: 'chest-to-bar-pull-up' },
      { id: 'bmu', term: 'BMU', full: 'Bar Muscle-Up', ko: '바 뮤스클업', desc: '철봉 아래에서 봉 위로 넘어가 팔을 완전히 펴는 동작. 풀업 + 딥을 한 번에 이은 것.', movement: 'bar-muscle-up' },
      { id: 'rmu', term: 'RMU', full: 'Ring Muscle-Up', ko: '링 뮤스클업', desc: '같은 동작을 링에서 하는 버전. 링이 흔들려서 바 뮤스클업보다 한 단계 더 어렵다.' },
      { id: 'hspu', term: 'HSPU', full: 'Handstand Push-up', ko: '핸드스탠드 푸시업', desc: '물구나무 상태에서 하는 푸시업.', movement: 'handstand-push-up' },
      { id: 'ohs', term: 'OHS', full: 'Overhead Squat', ko: '오버헤드 스쿼트', desc: '바를 머리 위에 든 채 하는 스쿼트. 스쿼트 스내치를 받는 자세이기도 하다.', movement: 'squat-snatch' },
      { id: 'kbs', term: 'KBS', full: 'Kettlebell Swing', ko: '케틀벨 스윙', desc: '케틀벨을 힙 힌지로 스윙하는 동작.' },
      { id: 'wb', term: 'WB', full: 'Wall Ball', ko: '월볼', desc: '메디신볼로 스쿼트 후 벽 목표 지점에 던지는 동작.', movement: 'wall-ball' },
      { id: 'dl', term: 'DL', full: 'Deadlift', ko: '데드리프트', desc: '바닥의 바를 고관절 신전으로 세워 드는 동작.', movement: 'deadlift' },
      { id: 'sdhp', term: 'SDHP', full: 'Sumo Deadlift High Pull', ko: '스모 데드리프트 하이 풀', desc: '넓은 스탠스에서 바를 쇄골 높이까지 당기는 동작.', movement: 'sumo-deadlift-high-pull' },
      { id: 'sn', term: 'SN / PSN', full: 'Snatch / Power Snatch', ko: '스내치 / 파워 스내치', desc: '바닥에서 머리 위까지 한 번에 보내는 리프트. 풀 스쿼트로 받으면 스쿼트 스내치, 하프 스쿼트면 파워 스내치.', movement: 'power-snatch' },
      { id: 'rd', term: 'RD', full: 'Ring Dip', ko: '링 딥', desc: '링 위에서 몸을 내렸다 밀어 올리는 딥.', movement: 'ring-dip' },
      { id: 'bj', term: 'BJ / (24"/20")', full: 'Box Jump', ko: '박스 점프', desc: '괄호 안 숫자는 박스 높이(인치). 24" ≈ 61cm, 20" ≈ 51cm.', movement: 'box-jump' },
      { id: 's2oh', term: 'S2OH', full: 'Shoulder to Overhead', ko: '숄더 투 오버헤드', desc: '어깨에서 머리 위로 보내기만 하면 방법은 자유. 프레스·푸시 프레스·저크 아무거나 된다.', movement: 'dumbbell-shoulder-to-overhead' },
      { id: 'ps-pistol', term: 'Pistol', full: 'Pistol Squat', ko: '피스톨 스쿼트', desc: '한 다리로 앉았다 일어서는 스쿼트.', movement: 'pistol-squat' },
      { id: 'deficit', term: 'Deficit', full: 'Deficit', ko: '디피싯', desc: '손이나 발을 받침 위에 올려 가동 범위를 늘리는 것. (4.5"/2.5") 는 받침 높이다.', movement: 'deficit-push-up' },
      { id: 'alt', term: 'alt.', full: 'Alternating', ko: '좌우 번갈아', desc: '매 렙 좌우를 번갈아 수행하라는 뜻. "16 Pistol Squats alt." 는 좌우 합쳐 16회다.' },
      { id: 'dual-db', term: 'Dual DB', full: 'Dual Dumbbell', ko: '양손 덤벨', desc: '양손에 각각 덤벨을 든다는 뜻. "Dual 22.5/15kg" 이나 "Dumbbell(x2) 22.5/15" 은 한쪽 손마다 그 무게다 — 실제로 드는 총 무게는 두 배.', movement: 'dumbbell-deadlift' },
      { id: 'cal', term: 'Cal', full: 'Calorie', ko: '칼로리', desc: '거리 대신 기구 화면의 칼로리로 목표를 정하는 방식. "15/12 Cal" 은 남 15 / 여 12 칼로리.', movement: 'row' },
      { id: 'damper', term: 'Damper', full: 'Damper Setting', ko: '댐퍼', desc: '에르그 옆 레버(1~10). 무게가 아니라 들어오는 공기량이다. 로잉은 3~5, 바이크는 와드 지시대로.', movement: 'row' },
      { id: 'box-height', term: '(24"/20")', full: 'Box Height', ko: '박스 높이', desc: '슬래시 앞이 남성, 뒤가 여성 기준 박스 높이(인치).', movement: 'box-jump' },
    ],
  },

  {
    id: 'culture',
    title: '장비 · 박스 문화',
    desc: '처음 가면 낯선 단어들.',
    terms: [
      { id: 'box', term: 'Box', full: 'Box', ko: '박스', desc: '크로스핏 체육관을 부르는 말. 거울과 러닝머신 대신 바벨과 철봉이 있다.' },
      { id: 'metcon', term: 'Metcon', full: 'Metabolic Conditioning', ko: '대사 컨디셔닝', desc: '심폐·대사 능력을 자극하는 고강도 순환 운동. 사실상 WOD 본편.' },
      { id: 'hero', term: 'Hero WOD', full: 'Hero WOD', ko: '히어로 와드', desc: '순직한 군인·소방관·경찰의 이름을 딴 특별히 긴 와드. Murph, DT 등.' },
      { id: 'girls', term: 'The Girls', full: 'The Girls', ko: '걸스 와드', desc: 'Fran, Cindy, Grace 처럼 여성 이름이 붙은 벤치마크 와드. 기록을 비교하는 기준이 된다.' },
      { id: 'benchmark', term: 'Benchmark', full: 'Benchmark WOD', ko: '벤치마크 와드', desc: '주기적으로 반복해 성장을 측정하는 표준 와드.' },
      { id: 'dnf', term: 'DNF', full: 'Did Not Finish', ko: '미완주', desc: '타임캡 안에 끝내지 못한 경우. 완료 렙 수로 기록한다.' },
      { id: 'plate', term: 'Bumper Plate', full: 'Bumper Plate', ko: '범퍼 플레이트', desc: '바닥에 떨어뜨려도 되는 고무 원판. 크기(지름)는 같고 무게만 다르다.' },
      { id: 'pvc', term: 'PVC', full: 'PVC Pipe', ko: 'PVC 파이프', desc: '무게가 거의 없는 연습용 봉. 역도 동작 폼 연습에 쓴다.' },
      { id: 'c2', term: 'C2 / Erg', full: 'Concept2 Rower', ko: '로잉 머신', desc: '박스에 거의 반드시 있는 로잉 머신. Assault Bike, SkiErg, Bike Erg 도 같은 계열이라 와드에서 "Machine" 으로 묶어 부른다.', movement: 'row' },
      { id: 'games', term: 'CrossFit Games', full: 'The CrossFit Games', ko: '크로스핏 게임즈', desc: '크로스핏 세계 선수권. 여기서 나온 종목(Event)이 이후 박스 와드로 자주 재활용된다.' },
      { id: 'hopper', term: 'The Hopper', full: 'The Hopper', ko: '호퍼', desc: '"무작위로 뽑은 동작 조합"이라는 크로스핏의 오래된 개념. 무엇이 나올지 모르는 상태에 대비하는 것이 훈련 목표라는 뜻이다.' },
      { id: 'promoter', term: 'Promoter', full: 'Promoter', ko: '프로모터', desc: '그 와드를 만들었거나 대표적으로 수행한 선수 이름. 기록 비교의 기준으로 적어 둔다.' },
    ],
  },
];

/** 평평한 조회용 맵 */
export const termIndex = Object.fromEntries(
  termGroups.flatMap((g) => g.terms.map((t) => [t.id, { ...t, group: g.id }]))
);
