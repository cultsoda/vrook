// data/purchaseSettings.ts
export interface PurchaseSettings {
  [influencerId: string]: boolean
}

// 전역 구매 설정 - 이 파일을 수정하면 전 세계 모든 사용자에게 적용됩니다
export const purchaseSettings: PurchaseSettings = {
  gyeoudi: true,        // 겨우디 구매 가능
  momorina: true,       // 모모리나 구매 가능
  ssoblly: true,        // 쏘블리 구매 가능
  yanghyewon: true,     // 양혜원 구매 가능
  kkyunyangnyang: true, // 뀨냥냥 구매 가능
  jeongdabyeol: true,   // 정다별이 구매 가능
  ina: true,            // 이나 구매 가능
  cuina: true,          // 큐이나 구매 가능
  trollya: true,        // 트롤야 구매 가능
}

// 설정 업데이트 히스토리 (참고용)
export const updateHistory = [
  {
    date: '2024-06-13',
    updatedBy: 'admin',
    changes: '초기 설정 - 모든 인플루언서 구매 가능',
  },
  // 새로운 업데이트는 여기에 추가하세요
]