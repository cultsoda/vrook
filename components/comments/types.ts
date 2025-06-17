// components/comments/types.ts
export interface Comment {
  id: string
  influencerId: string        // 인플루언서 ID (예: "gyeoudi")
  contentId: string          // 콘텐츠 ID (예: "vrook-1", "vrook-2") - 확장성을 위해 추가
  email: string
  password: string // 해시된 비밀번호
  content: string
  likes: number
  likedBy: string[] // 좋아요한 사용자 이메일들
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  deletedBy?: 'user' | 'admin'
  deletedReason?: string
  adminDeletedAt?: Date
}

export interface CommentFormData {
  email: string
  password: string
  content: string
}

export interface CommentSectionProps {
  influencerId: string
  contentId: string          // 새로 추가: 브이룩 1차, 2차 구분용
}

export interface CommentItemProps {
  comment: Comment
  onEdit: (commentId: string, newContent: string) => void
  onDelete: (commentId: string) => void
  onLike: (commentId: string) => void
  currentUserEmail?: string
}

export interface CommentFormProps {
  influencerId: string
  contentId: string          // 새로 추가
  onSubmit: (data: CommentFormData) => void
  isSubmitting: boolean
}

// 이메일 마스킹 함수
export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@')
  if (!localPart || !domain) return email
  
  if (localPart.length <= 2) {
    return `${localPart[0]}*@${domain}`
  } else if (localPart.length <= 4) {
    return `${localPart.substring(0, 2)}**@${domain}`
  } else {
    return `${localPart.substring(0, 2)}${'*'.repeat(localPart.length - 2)}@${domain}`
  }
}

// 비밀번호 해싱 함수 (브라우저에서 사용)
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// 비밀번호 검증 함수
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}

// 댓글 번역 키 타입
export interface CommentTranslations {
  form: {
    title: string
    email: string
    emailPlaceholder: string
    password: string
    passwordHelp: string
    passwordPlaceholder: string
    content: string
    contentPlaceholder: string
    submitButton: string
    submitting: string
  }
  list: {
    title: string
    sortNewest: string
    sortOldest: string
    sortMostLiked: string
    refresh: string
    noComments: string
    noCommentsSubtext: string
    totalComments: string
    totalLikes: string
  }
  item: {
    edit: string
    delete: string
    cancel: string
    save: string
    justNow: string
    minuteAgo: string
    minutesAgo: string
    hourAgo: string
    hoursAgo: string
    dayAgo: string
    daysAgo: string
    edited: string
    deleteTitle: string
    deleteDescription: string
    deletePasswordLabel: string
    deletePasswordPlaceholder: string
    verifying: string
  }
  errors: {
    emailRequired: string
    emailInvalid: string
    passwordRequired: string
    passwordMinLength: string
    contentRequired: string
    contentMinLength: string
    contentMaxLength: string
    passwordIncorrect: string
    likeFailed: string
    editFailed: string
    deleteFailed: string
    submitFailed: string
    firebaseNotInitialized: string
    loginRequired: string
  }
  success: {
    commentCreated: string
    commentEdited: string
    commentDeleted: string
  }
}

// 다국어 번역 키 생성 헬퍼
export const getCommentTranslationKey = (section: string, key: string): string => {
  return `comments.${section}.${key}`
}