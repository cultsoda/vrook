// lib/ga.ts

// window 객체에 gtag가 있는지 확인하기 위한 타입 선언
declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params?: { [key: string]: any }
    ) => void;
  }
}

// 구글 애널리틱스 이벤트 추적 함수
export const trackEvent = (
  action: string,
  params?: { [key: string]: any }
) => {
  // window.gtag가 존재하는지 확인 (오류 방지)
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
    console.log(`GA Event: ${action}`, params); // 개발 중 확인을 위한 로그
  }
};