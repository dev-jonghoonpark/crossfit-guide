/* =========================================================================
   app.js — 페이지 부트스트랩
   ========================================================================= */
(function () {
  'use strict';

  /* ------------------------------------------------- 동작 상세 페이지 */
  const dataEl = document.getElementById('movement-data');
  if (dataEl && window.Skeleton) {
    const data = JSON.parse(dataEl.textContent);
    const root = document.getElementById('player');
    const mapEl = document.querySelector('.muscle-map');
    const map = mapEl && window.MuscleMap ? window.MuscleMap.attach(mapEl) : null;

    window.Skeleton.createPlayer(root, data, {
      onPhase(i, phase) {
        if (map) map.setEmphasis(phase.emphasis || []);
      },
    });
  }

  /* --------------------------------------- 동작 목록 페이지 검색/필터 */
  const search = document.getElementById('mv-search');
  const catChips = Array.from(document.querySelectorAll('[data-cat]'));
  const cards = Array.from(document.querySelectorAll('[data-mv]'));

  if (cards.length && (search || catChips.length)) {
    let cat = 'all';
    let q = '';

    function apply() {
      let shown = 0;
      cards.forEach((c) => {
        // data-cat-val 은 "|" 로 여러 개를 담을 수 있다 (와드는 태그가 여러 개)
        const okCat = cat === 'all' || (c.getAttribute('data-cat-val') || '').split('|').includes(cat);
        const okQ = !q || c.getAttribute('data-search').includes(q);
        const on = okCat && okQ;
        c.style.display = on ? '' : 'none';
        if (on) shown++;
      });
      const empty = document.getElementById('mv-empty');
      if (empty) empty.style.display = shown ? 'none' : '';
    }

    if (search) {
      search.addEventListener('input', () => {
        q = search.value.trim().toLowerCase();
        apply();
      });
    }
    catChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        cat = chip.getAttribute('data-cat');
        catChips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        apply();
      });
    });
    apply();
  }

  /* --------------------------------------------- 용어 페이지 필터 */
  const termSearch = document.getElementById('term-search');
  if (termSearch) {
    const items = Array.from(document.querySelectorAll('[data-term-search]'));
    const groups = Array.from(document.querySelectorAll('[data-term-group]'));
    termSearch.addEventListener('input', () => {
      const q = termSearch.value.trim().toLowerCase();
      items.forEach((el) => {
        el.style.display = !q || el.getAttribute('data-term-search').includes(q) ? '' : 'none';
      });
      groups.forEach((g) => {
        const any = Array.from(g.querySelectorAll('[data-term-search]')).some((el) => el.style.display !== 'none');
        g.style.display = any ? '' : 'none';
      });
    });
  }
})();
