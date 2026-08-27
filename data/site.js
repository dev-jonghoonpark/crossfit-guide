/**
 * 사이트 전역 설정 (SEO / 구조화 데이터의 단일 출처)
 *
 * ⚠️ 배포 주소가 확정되면 SITE_URL 하나만 고치면 canonical · og:url ·
 *    sitemap.xml · llms.txt · JSON-LD 가 전부 따라 바뀐다.
 *    빌드할 때 환경변수로 덮어쓸 수도 있다:
 *
 *      SITE_URL=https://내도메인.com npm run build
 */

const DEFAULT_URL = 'https://dev-jonghoonpark.github.io/crossfit-guide';

/** 뒤 슬래시 제거 */
const trim = (u) => String(u || '').replace(/\/+$/, '');

export const site = {
  url: trim(process.env.SITE_URL || DEFAULT_URL),
  name: '크로스핏 가이드',
  shortName: '크로스핏 가이드',
  tagline: '크로스핏 입문자를 위한 용어 · 운영 방식 · 동작 가이드',
  description:
    '크로스핏을 처음 시작하는 사람을 위한 한국어 가이드. 화이트보드 용어(EMOM, AMRAP, Rx)와 수업 운영 방식, ' +
    '주요 동작의 단계별 스켈레톤 애니메이션과 사용 근육을 정리했습니다.',
  locale: 'ko_KR',
  lang: 'ko',
  themeColor: '#0c0f14',

  /** 콘텐츠 발행 · 최종 수정일 (ISO 8601). 내용을 크게 고치면 갱신할 것. */
  datePublished: '2026-08-28',
  dateModified: '2026-08-28',

  /**
   * 저자 표기. 개인 이름을 넣고 싶으면 여기만 채우면
   * JSON-LD 의 author 와 각 페이지 하단 저자 블록이 자동으로 켜진다.
   *   author: { name: '박종훈', url: 'https://...', sameAs: ['https://github.com/...'] }
   */
  author: null,

  /** 콘텐츠 신뢰도 고지 (E-E-A-T). 모든 문서 페이지 하단에 노출된다. */
  editorialNote:
    '이 문서는 크로스핏 공개 표준 동작 기준과 일반적인 박스 수업 운영 방식을 정리한 입문자용 참고 자료입니다. ' +
    '특정 단체의 공식 자료가 아니며 개별 코칭을 대체하지 않습니다.',

  /** 대표 이미지 (1200×630). public/ 기준 경로 */
  ogImage: '/og-default.png',
};

/** 절대 URL 만들기 — 항상 site.url 기준 */
export const abs = (path) => site.url + '/' + String(path).replace(/^\/+/, '');
