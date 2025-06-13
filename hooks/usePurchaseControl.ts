// hooks/usePurchaseControl.ts
"use client"

import { purchaseSettings } from '@/data/purchaseSettings'

export function usePurchaseControl() {
  const isPurchaseEnabled = (influencerId: string): boolean => {
    // GitHub 파일에서 직접 설정 값을 가져옴
    return purchaseSettings[influencerId] ?? true
  }

  const showPurchaseUnavailableAlert = () => {
    // 더 예쁜 토스트나 모달로 변경 가능
    alert('아직 구매 가능한 시간이 아니에요. 조금만 기다려 주세요! 😊')
  }

  return {
    isPurchaseEnabled,
    showPurchaseUnavailableAlert,
    isLoading: false, // GitHub 파일 기반이므로 로딩 없음
    purchaseSettings
  }
}