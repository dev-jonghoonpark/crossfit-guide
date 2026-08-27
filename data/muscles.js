/**
 * 근육 그룹 사전.
 * view: 근육 지도에서 어느 면에 표시할지 ('front' | 'back' | 'both')
 */
export const muscles = {
  delts:      { ko: '삼각근',        en: 'Deltoids',          view: 'both'  },
  chest:      { ko: '대흉근',        en: 'Pectoralis',        view: 'front' },
  biceps:     { ko: '이두근',        en: 'Biceps',            view: 'front' },
  triceps:    { ko: '삼두근',        en: 'Triceps',           view: 'back'  },
  forearms:   { ko: '전완근 · 그립', en: 'Forearms / Grip',   view: 'both'  },
  traps:      { ko: '승모근',        en: 'Trapezius',         view: 'back'  },
  lats:       { ko: '광배근',        en: 'Latissimus Dorsi',  view: 'back'  },
  erectors:   { ko: '척추기립근',    en: 'Erector Spinae',    view: 'back'  },
  core:       { ko: '코어 · 복근',   en: 'Core / Abdominals', view: 'front' },
  glutes:     { ko: '둔근',          en: 'Glutes',            view: 'back'  },
  hamstrings: { ko: '햄스트링',      en: 'Hamstrings',        view: 'back'  },
  quads:      { ko: '대퇴사두근',    en: 'Quadriceps',        view: 'front' },
  hipflexors: { ko: '장요근',        en: 'Hip Flexors',       view: 'front' },
  calves:     { ko: '종아리',        en: 'Calves',            view: 'back'  },
};

/** 활성도 단계 */
export const levels = {
  primary:    { ko: '주동근',   desc: '이 동작에서 가장 큰 힘을 내는 근육' },
  secondary:  { ko: '협응근',   desc: '주동근을 도와 함께 일하는 근육' },
  stabilizer: { ko: '안정화근', desc: '자세와 관절을 잡아주는 근육' },
};
