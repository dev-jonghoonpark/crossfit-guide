/* =========================================================================
   skeleton.js — 스켈레톤(스틱 피겨) 동작 애니메이션 렌더러
   의존성 없음. window.Skeleton 으로 노출.

   Skeleton.render(pose, opts) -> SVG 문자열   (정적 썸네일용)
   Skeleton.createPlayer(el, data, opts)       (인터랙티브 플레이어)
   ========================================================================= */
(function () {
  'use strict';

  const VB = { w: 260, h: 330, ground: 300 };
  const NS = 'http://www.w3.org/2000/svg';

  /** 뼈대 연결 정의. side: 'B'(먼 쪽) | 'F'(가까운 쪽) | '' (중심선) */
  const BONES_FAR = [
    ['shoulder', 'elbowB'],
    ['elbowB', 'wristB'],
    ['hip', 'kneeB'],
    ['kneeB', 'ankleB'],
    ['ankleB', 'toeB'],
    ['ankleB', 'heelB'],
  ];
  const BONES_NECK = [
    ['neck', 'head'],
    ['neck', 'shoulder'],
  ];
  const BONES_SPINE = [['shoulder', 'hip']];
  const BONES_CORE = [...BONES_NECK, ...BONES_SPINE];
  const BONES_NEAR = [
    ['shoulder', 'elbowF'],
    ['elbowF', 'wristF'],
    ['hip', 'kneeF'],
    ['kneeF', 'ankleF'],
    ['ankleF', 'toeF'],
    ['ankleF', 'heelF'],
  ];

  const JOINTS_FAR = ['elbowB', 'wristB', 'kneeB', 'ankleB'];
  const JOINTS_NEAR = ['shoulder', 'elbowF', 'wristF', 'hip', 'kneeF', 'ankleF'];

  const BAR_R = 27;
  const ROPE_LEN = 132;

  /* ---------------------------------------------------------- 보간 유틸 */

  const lerp = (a, b, t) => a + (b - a) * t;

  function lerpPose(A, B, t) {
    const out = {};
    // 도구는 뒤 구간에서만 등장할 수 있으므로 두 포즈의 키를 합쳐서 돈다
    for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
      const a = A[k];
      const b = B[k];
      if (Array.isArray(a) && Array.isArray(b)) {
        out[k] = a.map((v, i) => lerp(v, b[i] == null ? v : b[i], t));
      } else if (Array.isArray(a) && b == null) {
        out[k] = a;
      } else if (a == null && Array.isArray(b)) {
        out[k] = b;
      } else if (typeof a === 'number' && typeof b === 'number') {
        out[k] = lerp(a, b, t);
      } else {
        out[k] = t < 0.5 ? a : b;
      }
    }
    return out;
  }

  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  /* ------------------------------------------------------------ 그리기 */

  function ropePath(hand, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    const tip = [hand[0] + ROPE_LEN * Math.cos(rad), hand[1] + ROPE_LEN * Math.sin(rad)];
    const bowRad = ((angleDeg - 38) * Math.PI) / 180;
    const ctrl = [hand[0] + ROPE_LEN * 0.62 * Math.cos(bowRad), hand[1] + ROPE_LEN * 0.62 * Math.sin(bowRad)];
    return `M ${hand[0].toFixed(1)} ${hand[1].toFixed(1)} Q ${ctrl[0].toFixed(1)} ${ctrl[1].toFixed(1)} ${tip[0].toFixed(1)} ${tip[1].toFixed(1)}`;
  }

  function headGeom(p) {
    // 목 → 머리 방향으로 반지름만큼 떨어진 곳이 머리 중심
    return { cx: p.head[0], cy: p.head[1], r: 14 };
  }

  /* ------------------------------------------------------------- 도구(prop)
     포즈에 실린 기구를 그린다. 값은 전부 [x, y] 2요소라 보간이 그대로 먹는다.
     BACK 은 몸 뒤에, FRONT 는 몸 앞에 그려진다. */

  const n1 = (v) => Number(v).toFixed(1);

  function riserGlyph(p, cls) {
    return `<rect class="${cls}" x="${n1(p[0] - 17)}" y="${n1(p[1])}" width="34" height="13" rx="3"/>`;
  }

  function dumbbellGlyph(p, cls) {
    // 측면에서 본 덤벨: 원판 두 장이 겹쳐 보이므로 둥근 사각형 하나로 단순화
    return `<g class="${cls}" transform="translate(${n1(p[0])} ${n1(p[1])})">
      <rect class="sk-db-plate" x="-13" y="-15" width="26" height="30" rx="7"/>
      <rect class="sk-db-hub" x="-4.5" y="-5" width="9" height="10" rx="3"/>
    </g>`;
  }

  function ringGlyph(p, cls) {
    return `<g class="${cls}">
      <line class="sk-strap" x1="${n1(p[0])}" y1="6" x2="${n1(p[0])}" y2="${n1(p[1] - 11)}"/>
      <ellipse class="sk-ring" cx="${n1(p[0])}" cy="${n1(p[1])}" rx="9" ry="12"/>
    </g>`;
  }

  /* 로잉 머신. 시트가 레일 위를 실제로 미끄러지도록 각 부분을 따로 잡는다.
     guide 는 체인이 하우징에서 빠져나오는 구멍 — 플라이휠 중심(hub)보다 아래라서
     캐치에서 손이 플라이휠 원 안에 파묻히지 않는다. */
  const ROWER = {
    hub: [228, 182],   // 플라이휠 중심
    wheelR: 26,
    guide: [218, 206], // 체인 구멍
    foot: [166, 244],  // 발판 중심 (레일에서 비스듬히 서 있는 판)
    footTilt: 25,      // 발판 기울기(도) — 윗변이 앞으로 눕는다
    railY: 268,
    railX: [16, 190],  // 시트가 지나는 레일
    legTop: [228, 204], // 앞다리 프레임이 플라이휠과 만나는 곳
  };

  const PROPS_BACK = {
    // 벽 — 월볼 타깃·핸드스탠드 푸시업 기준면
    wall: (v) => `<line class="sk-wall" x1="${n1(v[0])}" y1="4" x2="${n1(v[0])}" y2="${VB.ground}"/>`,
    // 월볼 타깃 (벽에 그려진 원)
    target: (v) => `<circle class="sk-target" cx="${n1(v[0])}" cy="${n1(v[1])}" r="15"/>`,
    // 플라이오 박스 — [중심x, 윗면y] 에서 바닥까지
    box: (v) => `<g class="sk-rack">
      <rect x="${n1(v[0] - 42)}" y="${n1(v[1])}" width="84" height="${n1(Math.max(3, VB.ground - v[1]))}" rx="5"/>
      <line class="sk-rack-edge" x1="${n1(v[0] - 42)}" y1="${n1(v[1])}" x2="${n1(v[0] + 42)}" y2="${n1(v[1])}"/>
    </g>`,
    // 벤치 — [중심x, 패드 윗면y]
    bench: (v) => `<g class="sk-rack">
      <rect x="${n1(v[0] - 68)}" y="${n1(v[1])}" width="136" height="12" rx="5"/>
      <rect x="${n1(v[0] - 54)}" y="${n1(v[1] + 12)}" width="8" height="${n1(Math.max(2, VB.ground - v[1] - 12))}" rx="2"/>
      <rect x="${n1(v[0] + 46)}" y="${n1(v[1] + 12)}" width="8" height="${n1(Math.max(2, VB.ground - v[1] - 12))}" rx="2"/>
    </g>`,
    // 손을 올려놓는 받침(원판·매트) — 디피싯 푸시업 등
    riserF: (v) => riserGlyph(v, 'sk-rack'),
    riserB: (v) => riserGlyph(v, 'sk-rack sk-dim'),
    // 먼 쪽 손에 들린 도구는 몸 뒤에 그려야 겹침이 자연스럽다
    dbB: (v) => dumbbellGlyph(v, 'sk-db sk-dim'),
    ringB: (v) => ringGlyph(v, 'sk-dim'),
    // 로잉 머신 — [시트x, 시트y]. 시트만 포즈를 따라 레일 위를 움직인다.
    rower: (v) => `<g class="sk-rack">
      <line class="sk-rail" x1="${ROWER.railX[0]}" y1="${ROWER.railY}" x2="${ROWER.railX[1]}" y2="${ROWER.railY}"/>
      <line class="sk-rail" x1="${ROWER.railX[1]}" y1="${ROWER.railY}" x2="${ROWER.legTop[0]}" y2="${ROWER.legTop[1]}"/>
      <circle class="sk-wheel" cx="${ROWER.hub[0]}" cy="${ROWER.hub[1]}" r="${ROWER.wheelR}"/>
      <rect x="${n1(ROWER.foot[0] - 5.5)}" y="${n1(ROWER.foot[1] - 24)}" width="11" height="48" rx="4"
            transform="rotate(${ROWER.footTilt} ${n1(ROWER.foot[0])} ${n1(ROWER.foot[1])})"/>
      <rect x="${n1(v[0] - 19)}" y="${n1(v[1])}" width="38" height="10" rx="4"/>
    </g>`,
  };

  const PROPS_FRONT = {
    // 바벨 (측면에서 원판은 원으로 보인다)
    bar: (v) => `<g class="sk-bar" transform="translate(${n1(v[0])} ${n1(v[1])})">
      <circle class="sk-plate" r="${BAR_R}"/>
      <circle class="sk-plate-in" r="${BAR_R - 8}"/>
      <circle class="sk-hub" r="5"/>
    </g>`,
    // 메디신볼 / 월볼
    ball: (v) => `<g class="sk-ballgrp" transform="translate(${n1(v[0])} ${n1(v[1])})">
      <circle class="sk-ball" r="18"/>
      <circle class="sk-ball-in" r="10"/>
    </g>`,
    dbF: (v) => dumbbellGlyph(v, 'sk-db'),
    // 철봉 (측면에서는 점으로 보이므로 봉이 이어진다는 힌트를 함께 그린다)
    rig: (v) => `<g class="sk-rig">
      <line class="sk-rig-span" x1="16" y1="${n1(v[1])}" x2="${VB.w - 16}" y2="${n1(v[1])}"/>
      <circle class="sk-rig-bar" cx="${n1(v[0])}" cy="${n1(v[1])}" r="7"/>
    </g>`,
    ringF: (v) => ringGlyph(v, ''),
  };

  /** 로잉 체인은 손 위치를 따라가므로 포즈 전체가 필요하다 */
  function chainMarkup(p) {
    if (!p.rower || !p.wristF) return '';
    return `<line class="sk-chain" x1="${n1(p.wristF[0])}" y1="${n1(p.wristF[1])}" x2="${ROWER.guide[0]}" y2="${ROWER.guide[1]}"/>`;
  }

  function propMarkup(p, table) {
    let out = '';
    for (const key of Object.keys(table)) {
      const v = p[key];
      if (Array.isArray(v)) out += table[key](v, p);
    }
    return out;
  }

  const backMarkup = (p) =>
    propMarkup(p, PROPS_BACK) +
    chainMarkup(p) +
    (p.ropeAngle != null ? `<path class="sk-rope" d="${ropePath(p.wristF, p.ropeAngle)}"/>` : '');

  const frontMarkup = (p) => propMarkup(p, PROPS_FRONT);

  /** SVG 마크업 문자열 (썸네일 / 초기 렌더 공용) */
  function render(p, opts) {
    opts = opts || {};
    const scale = opts.compact ? 1 : 1;
    const showGround = opts.ground !== false;
    const bones = (list, cls) =>
      list
        .filter(([a, b]) => p[a] && p[b])
        .map(
          ([a, b]) =>
            `<line class="${cls}" x1="${p[a][0].toFixed(1)}" y1="${p[a][1].toFixed(1)}" x2="${p[b][0].toFixed(1)}" y2="${p[b][1].toFixed(1)}" data-bone="${a}-${b}"/>`
        )
        .join('');
    const joints = (list, cls) =>
      list
        .filter((k) => p[k])
        .map((k) => `<circle class="${cls}" cx="${p[k][0].toFixed(1)}" cy="${p[k][1].toFixed(1)}" r="4.2" data-joint="${k}"/>`)
        .join('');

    const h = headGeom(p);
    const shadowY = VB.ground + 3;
    const lowest = Math.max(p.toeF ? p.toeF[1] : 0, p.toeB ? p.toeB[1] : 0);
    const airborne = Math.max(0, VB.ground - lowest) / 40;

    return `
<svg viewBox="0 0 ${VB.w} ${VB.h}" xmlns="${NS}" class="skel" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <defs>
    <linearGradient id="sk-floor" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#263041" stop-opacity="0"/>
      <stop offset=".5" stop-color="#3c4a63" stop-opacity="1"/>
      <stop offset="1" stop-color="#263041" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <g class="sk-scale" transform="scale(${scale})">
    ${showGround ? `<line class="sk-ground" x1="14" y1="${VB.ground}" x2="${VB.w - 14}" y2="${VB.ground}" stroke="url(#sk-floor)" stroke-width="2"/>` : ''}
    ${showGround ? `<ellipse class="sk-shadow" cx="${p.hip[0].toFixed(1)}" cy="${shadowY}" rx="${(40 - airborne * 8).toFixed(1)}" ry="${(5 - airborne * 1.5).toFixed(1)}" opacity="${(0.34 - airborne * 0.08).toFixed(2)}"/>` : ''}
    <g class="sk-path-layer"></g>
    <g class="sk-prop-back">${backMarkup(p)}</g>
    <g class="sk-far">${bones(BONES_FAR, 'sk-bone')}${joints(JOINTS_FAR, 'sk-joint')}</g>
    <g class="sk-body">
      ${bones(BONES_SPINE, 'sk-bone sk-spine')}
      ${bones(BONES_NECK, 'sk-bone')}
      <circle class="sk-head" cx="${h.cx.toFixed(1)}" cy="${h.cy.toFixed(1)}" r="${h.r}"/>
    </g>
    <g class="sk-near">${bones(BONES_NEAR, 'sk-bone')}${joints(JOINTS_NEAR, 'sk-joint')}</g>
    <g class="sk-prop-front">${frontMarkup(p)}</g>
  </g>
</svg>`.trim();
  }

  /* ------------------------------------------------------- 플레이어 --- */

  const ICON = {
    play: '<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>',
    pause: '<svg viewBox="0 0 16 16"><path d="M4 2.5h3.2v11H4zM8.8 2.5H12v11H8.8z"/></svg>',
    prev: '<svg viewBox="0 0 16 16"><path d="M4 3h2v10H4zM13 3v10l-6.5-5z"/></svg>',
    next: '<svg viewBox="0 0 16 16"><path d="M10 3h2v10h-2zM3 3l6.5 5L3 13z"/></svg>',
  };

  /**
   * @param {HTMLElement} root  .player 컨테이너
   * @param {Object} data       { phases: [{name, pose, desc, cues, emphasis}] }
   * @param {Object} opts       { onPhase(index, phase) }
   */
  function createPlayer(root, data, opts) {
    opts = opts || {};
    const phases = data.phases;
    const n = phases.length;
    if (!n) return null;

    const stage = root.querySelector('[data-stage]');
    const scrub = root.querySelector('[data-scrub]');
    const playBtn = root.querySelector('[data-play]');
    const prevBtn = root.querySelector('[data-prev]');
    const nextBtn = root.querySelector('[data-next]');
    const speedBtn = root.querySelector('[data-speed]');
    const chips = Array.from(root.querySelectorAll('[data-chip]'));
    const pathToggle = root.querySelector('[data-toggle-path]');
    const titleEl = root.querySelector('[data-phase-title]');
    const numEl = root.querySelector('[data-phase-num]');
    const descEl = root.querySelector('[data-phase-desc]');
    const cuesEl = root.querySelector('[data-phase-cues]');

    // 뼈대·관절 노드는 한 번만 만들어 두고 좌표만 갱신한다.
    // 도구(바벨·박스·링 …)는 구간마다 등장/퇴장하므로 레이어를 통째로 다시 그린다.
    stage.innerHTML = render(phases[0].pose);
    const svg = stage.querySelector('svg');
    const pathLayer = svg.querySelector('.sk-path-layer');
    const backLayer = svg.querySelector('.sk-prop-back');
    const frontLayer = svg.querySelector('.sk-prop-front');

    // 바 이동 경로(점선) — 역도 동작에서 바가 어떤 궤적을 그리는지
    const barPts = phases.map((ph) => ph.pose.bar).filter(Boolean);
    if (barPts.length > 1) {
      const d = barPts.map((b, i) => `${i ? 'L' : 'M'} ${b[0]} ${b[1]}`).join(' ');
      pathLayer.innerHTML =
        `<path class="sk-barpath" d="${d}"/>` +
        barPts.map((b) => `<circle class="sk-barpath-dot" cx="${b[0]}" cy="${b[1]}" r="2.6"/>`).join('');
    }
    let showPath = false;
    const applyPath = () => pathLayer.setAttribute('opacity', showPath ? '1' : '0');
    applyPath();

    /* --- 상태 --- */
    let t = 0;                 // 0 .. n-1
    let playing = false;
    let speed = 1;
    let raf = null;
    let last = 0;
    const SEG_MS = 1100;       // 구간 하나 이동에 걸리는 시간
    const HOLD_MS = 420;       // 키프레임에서 잠깐 멈춤
    let holdLeft = 0;
    let shownPhase = -1;

    const cache = {};
    function poseAt(raw) {
      const x = Math.max(0, Math.min(n - 1, raw));
      const i = Math.min(n - 1, Math.floor(x));
      const j = Math.min(n - 1, i + 1);
      const f = easeInOut(Math.min(1, Math.max(0, x - i)));
      if (i === j) return phases[i].pose;
      const key = i + ':' + f.toFixed(3);
      if (!cache[key]) cache[key] = lerpPose(phases[i].pose, phases[j].pose, f);
      return cache[key];
    }

    // 프레임마다 querySelector 를 돌리지 않도록 한 번만 찾아 캐시한다
    const boneEls = [...BONES_FAR, ...BONES_CORE, ...BONES_NEAR]
      .map(([a, b]) => [svg.querySelector(`[data-bone="${a}-${b}"]`), a, b])
      .filter(([el]) => el);
    const jointEls = [...JOINTS_FAR, ...JOINTS_NEAR]
      .map((k) => [svg.querySelector(`[data-joint="${k}"]`), k])
      .filter(([el]) => el);
    const headEl = svg.querySelector('.sk-head');
    const shadowEl = svg.querySelector('.sk-shadow');

    function draw(p) {
      for (const [el, a, b] of boneEls) {
        if (!p[a] || !p[b]) continue;
        el.setAttribute('x1', p[a][0].toFixed(1));
        el.setAttribute('y1', p[a][1].toFixed(1));
        el.setAttribute('x2', p[b][0].toFixed(1));
        el.setAttribute('y2', p[b][1].toFixed(1));
      }
      for (const [el, k] of jointEls) {
        if (!p[k]) continue;
        el.setAttribute('cx', p[k][0].toFixed(1));
        el.setAttribute('cy', p[k][1].toFixed(1));
      }

      const head = headEl;
      head.setAttribute('cx', p.head[0].toFixed(1));
      head.setAttribute('cy', p.head[1].toFixed(1));

      const shadow = shadowEl;
      if (shadow) {
        const lowest = Math.max(p.toeF[1], p.toeB[1]);
        const air = Math.max(0, VB.ground - lowest) / 40;
        shadow.setAttribute('cx', p.hip[0].toFixed(1));
        shadow.setAttribute('rx', (40 - air * 8).toFixed(1));
        shadow.setAttribute('ry', (5 - air * 1.5).toFixed(1));
        shadow.setAttribute('opacity', (0.34 - air * 0.08).toFixed(2));
      }

      backLayer.innerHTML = backMarkup(p);
      frontLayer.innerHTML = frontMarkup(p);
    }

    function updateCaption(force) {
      const idx = Math.min(n - 1, Math.round(t));
      if (idx === shownPhase && !force) return;
      shownPhase = idx;
      const ph = phases[idx];
      numEl.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
      titleEl.textContent = ph.name;
      descEl.textContent = ph.desc;
      cuesEl.innerHTML = (ph.cues || []).map((c) => `<li>${c}</li>`).join('');
      chips.forEach((c, i) => c.setAttribute('aria-pressed', String(i === idx)));
      if (opts.onPhase) opts.onPhase(idx, ph);
    }

    function frame(now) {
      if (!playing) return;
      const dt = Math.max(0, Math.min(64, now - last));
      last = now;
      if (holdLeft > 0) {
        holdLeft -= dt * speed;
      } else {
        const prevFloor = Math.floor(t);
        t += (dt * speed) / SEG_MS;
        if (t >= n - 1) {
          t = n - 1;
          holdLeft = HOLD_MS * 2.6;
          // 마지막에서 한 번 쉬고 처음으로
          setTimeout(() => {
            if (playing) { t = 0; holdLeft = HOLD_MS; sync(); }
          }, (HOLD_MS * 2.6) / speed);
        } else if (Math.floor(t) !== prevFloor) {
          t = Math.floor(t);
          holdLeft = HOLD_MS;
        }
      }
      sync();
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      draw(poseAt(t));
      scrub.value = String(Math.round((t / (n - 1)) * 1000));
      updateCaption();
    }

    function play() {
      if (playing) return;
      playing = true;
      last = performance.now();
      playBtn.innerHTML = ICON.pause;
      playBtn.setAttribute('aria-label', '일시정지');
      raf = requestAnimationFrame(frame);
    }
    function pause() {
      playing = false;
      if (raf) cancelAnimationFrame(raf);
      playBtn.innerHTML = ICON.play;
      playBtn.setAttribute('aria-label', '재생');
    }
    function goto(i, animate) {
      pause();
      const target = Math.max(0, Math.min(n - 1, i));
      if (!animate) { t = target; sync(); return; }
      const from = t;
      const start = performance.now();
      const dur = 380 * Math.max(0.5, Math.abs(target - from));
      (function step(now) {
        const k = Math.min(1, (now - start) / dur);
        t = lerp(from, target, easeInOut(k));
        sync();
        if (k < 1) requestAnimationFrame(step);
      })(start);
    }

    /* --- 이벤트 --- */
    playBtn.innerHTML = ICON.play;
    prevBtn.innerHTML = ICON.prev;
    nextBtn.innerHTML = ICON.next;

    playBtn.addEventListener('click', () => (playing ? pause() : play()));
    prevBtn.addEventListener('click', () => goto(Math.round(t) - 1, true));
    nextBtn.addEventListener('click', () => goto(Math.round(t) + 1, true));

    speedBtn.addEventListener('click', () => {
      speed = speed === 1 ? 0.5 : speed === 0.5 ? 2 : 1;
      speedBtn.textContent = speed + '×';
    });

    scrub.addEventListener('input', () => {
      pause();
      t = (Number(scrub.value) / 1000) * (n - 1);
      draw(poseAt(t));
      updateCaption();
    });

    chips.forEach((c, i) => c.addEventListener('click', () => goto(i, true)));

    if (pathToggle) {
      pathToggle.addEventListener('change', () => {
        showPath = pathToggle.checked;
        applyPath();
      });
    }

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goto(Math.round(t) + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goto(Math.round(t) - 1, true); }
      if (e.key === ' ') { e.preventDefault(); playing ? pause() : play(); }
    });

    // 화면에 보일 때만 재생 (모바일 배터리/성능)
    sync();
    updateCaption(true);
    if ('IntersectionObserver' in window) {
      let started = false;
      new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting && !started) { started = true; play(); }
            else if (!en.isIntersecting && playing) pause();
          });
        },
        { threshold: 0.25 }
      ).observe(root);
    } else {
      play();
    }

    return { play, pause, goto };
  }

  window.Skeleton = { render, createPlayer, VB };
})();
