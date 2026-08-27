/* =========================================================================
   muscles.js — 근육 활성화 지도 (앞/뒤 인체 도식)
   window.MuscleMap.render(activation) -> HTML 문자열
   window.MuscleMap.attach(el) -> { setEmphasis([keys]) }
   ========================================================================= */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';

  /* --- 마네킹 기본 골격 (viewBox 0 0 130 270), 중심 x = 65 --- */
  const BODY = `
    <circle cx="65" cy="20" r="13"/>
    <line x1="65" y1="30" x2="65" y2="45" stroke-width="13" stroke-linecap="round"/>
    <path d="M42,45 Q65,38 88,45 L82,112 Q65,120 48,112 Z"/>
    <path d="M48,112 Q65,120 82,112 L84,142 Q65,150 46,142 Z"/>
    <line x1="43" y1="51" x2="34" y2="96" stroke-width="16" stroke-linecap="round"/>
    <line x1="87" y1="51" x2="96" y2="96" stroke-width="16" stroke-linecap="round"/>
    <line x1="34" y1="96" x2="30" y2="138" stroke-width="13" stroke-linecap="round"/>
    <line x1="96" y1="96" x2="100" y2="138" stroke-width="13" stroke-linecap="round"/>
    <ellipse cx="29" cy="148" rx="6" ry="9"/>
    <ellipse cx="101" cy="148" rx="6" ry="9"/>
    <line x1="55" y1="138" x2="54" y2="200" stroke-width="24" stroke-linecap="round"/>
    <line x1="75" y1="138" x2="76" y2="200" stroke-width="24" stroke-linecap="round"/>
    <line x1="54" y1="200" x2="53" y2="248" stroke-width="17" stroke-linecap="round"/>
    <line x1="76" y1="200" x2="77" y2="248" stroke-width="17" stroke-linecap="round"/>
    <path d="M46,252 h14 a3,3 0 0 1 0,6 h-14 a3,3 0 0 1 0,-6 z"/>
    <path d="M70,252 h14 a3,3 0 0 1 0,6 h-14 a3,3 0 0 1 0,-6 z"/>
  `;

  /** 좌우 대칭 도형을 한 번에 만든다. x 좌표는 130 - x 로 미러링. */
  function pair(key, shape) {
    return shape(false) + shape(true);
  }
  const mx = (x) => 130 - x;

  const ell = (key, cx, cy, rx, ry, rot) =>
    `<ellipse data-m="${key}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"${
      rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : ''
    }/>`;

  const REGIONS = {
    front: [
      pair('delts', (m) => ell('delts', m ? mx(43) : 43, 52, 10, 11, m ? 14 : -14)),
      pair('chest', (m) => ell('chest', m ? mx(55) : 55, 61, 12, 9.5, m ? 12 : -12)),
      pair('biceps', (m) => ell('biceps', m ? mx(38) : 38, 73, 6.8, 16, m ? -10 : 10)),
      pair('forearms', (m) => ell('forearms', m ? mx(32) : 32, 117, 6, 19, m ? -6 : 6)),
      `<rect data-m="core" x="55" y="72" width="20" height="42" rx="7"/>`,
      pair('hipflexors', (m) => ell('hipflexors', m ? mx(56) : 56, 128, 7, 9)),
      pair('quads', (m) => ell('quads', m ? mx(55) : 55, 168, 10.5, 30)),
      pair('calves', (m) => ell('calves', m ? mx(54) : 54, 222, 6.5, 19)),
    ].join(''),
    back: [
      `<path data-m="traps" d="M48,42 L82,42 L73,78 L57,78 Z"/>`,
      pair('delts', (m) => ell('delts', m ? mx(43) : 43, 52, 10, 11, m ? 14 : -14)),
      pair('lats', (m) => ell('lats', m ? mx(51) : 51, 88, 9, 19, m ? -14 : 14)),
      `<rect data-m="erectors" x="60" y="76" width="4.2" height="42" rx="2"/>`,
      `<rect data-m="erectors" x="65.8" y="76" width="4.2" height="42" rx="2"/>`,
      pair('triceps', (m) => ell('triceps', m ? mx(38) : 38, 73, 6.8, 16, m ? -10 : 10)),
      pair('forearms', (m) => ell('forearms', m ? mx(32) : 32, 117, 6, 19, m ? -6 : 6)),
      pair('glutes', (m) => ell('glutes', m ? mx(55) : 55, 130, 11.5, 12.5)),
      pair('hamstrings', (m) => ell('hamstrings', m ? mx(55) : 55, 176, 10.5, 27)),
      pair('calves', (m) => ell('calves', m ? mx(54) : 54, 221, 8, 20)),
    ].join(''),
  };

  function figure(view, label) {
    return `
<figure class="muscle-fig">
  <svg viewBox="0 0 130 270" xmlns="${NS}" class="mm" data-view="${view}" role="img" aria-label="${label} 근육 활성화 도식">
    <g class="mm-body">${BODY}</g>
    <g class="mm-regions">${REGIONS[view]}</g>
  </svg>
  <figcaption>${label}</figcaption>
</figure>`;
  }

  /**
   * @param {Array<{key:string, level:string}>} activation
   */
  function render(activation) {
    const html = `<div class="muscle-wrap">${figure('front', 'FRONT')}${figure('back', 'BACK')}</div>`;
    return `<div class="muscle-map" data-activation='${JSON.stringify(activation).replace(/'/g, '&#39;')}'>${html}
  <div class="muscle-legend">
    <span><i class="dot primary"></i>주동근</span>
    <span><i class="dot secondary"></i>협응근</span>
    <span><i class="dot stabilizer"></i>안정화근</span>
  </div>
</div>`;
  }

  /** 렌더된 DOM에 활성도를 칠하고 emphasis 제어 핸들을 돌려준다. */
  function attach(el) {
    const activation = JSON.parse(el.getAttribute('data-activation') || '[]');
    const levelOf = {};
    activation.forEach((a) => (levelOf[a.key] = a.level));

    el.querySelectorAll('[data-m]').forEach((node) => {
      const lv = levelOf[node.getAttribute('data-m')];
      if (lv) node.classList.add('lv-' + lv);
      else node.classList.add('lv-none');
    });

    function setEmphasis(keys) {
      const set = new Set(keys || []);
      el.querySelectorAll('[data-m]').forEach((node) => {
        node.classList.toggle('is-emph', set.has(node.getAttribute('data-m')));
      });
      document.querySelectorAll('[data-muscle-item]').forEach((li) => {
        li.classList.toggle('is-emph', set.has(li.getAttribute('data-muscle-item')));
      });
    }

    return { setEmphasis };
  }

  window.MuscleMap = { render, attach };
})();
