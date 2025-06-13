// hooks/usePurchaseControl.ts
"use client"

import { purchaseSettings } from '@/data/purchaseSettings'

export function usePurchaseControl() {
  const isPurchaseEnabled = (influencerId: string): boolean => {
    // GitHub 파일에서 직접 설정 값을 가져옴
    return purchaseSettings[influencerId] ?? true
  }

  const showPurchaseUnavailableAlert = () => {
    // 번역이 필요한 경우를 위해 하드코딩된 메시지 유지
    // 하지만 토스트는 client.tsx에서 번역된 메시지 사용
    alert('아직 준비 중인 콘텐츠예요! 곧 만나보실 수 있어요 😊')
  }

  return {
    isPurchaseEnabled,
    showPurchaseUnavailableAlert,
    isLoading: false, // GitHub 파일 기반이므로 로딩 없음
    purchaseSettings
  }
}