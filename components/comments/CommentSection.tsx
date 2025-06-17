// components/comments/CommentSection.tsx
"use client"

import { useState, useEffect } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import { Comment, CommentFormData, CommentSectionProps, hashPassword } from './types'
import { useTranslation } from '@/hooks/useTranslation'
import { toast } from 'sonner'

export default function CommentSection({ influencerId, contentId }: CommentSectionProps) {
  const { t } = useTranslation()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('')

  // Firebase 초기화 및 실시간 리스너 설정
  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const initializeFirebase = async () => {
      if (typeof window === 'undefined') return

      try {
        // Firebase 초기화 확인
        if (!window.firebase) {
          console.error('Firebase가 로드되지 않았습니다')
          setIsLoading(false)
          return
        }

        // Firestore 초기화
        if (!window.db) {
          const firebaseConfig = {
            apiKey: "AIzaSyC9xebZWI6ItNYr2iGhmenZNMZj1fhmMBE",
            authDomain: "vrook-comments.firebaseapp.com",
            projectId: "vrook-comments",
            storageBucket: "vrook-comments.firebasestorage.app",
            messagingSenderId: "281211962162",
            appId: "1:281211962162:web:1febe65d503b555bbf4d2b"
          }

          const app = window.firebase.initializeApp(firebaseConfig)
          window.db = window.firebase.firestore()
        }

        // 실시간 댓글 리스너 설정 - 확장 가능한 구조
        const commentsRef = window.db
          .collection('comments')
          .where('influencerId', '==', influencerId)
          .where('contentId', '==', contentId)  // contentId 필터 추가
          .orderBy('createdAt', 'desc')

        unsubscribe = commentsRef.onSnapshot(
          (snapshot: any) => {
            const commentsData: Comment[] = []
            snapshot.forEach((doc: any) => {
              const data = doc.data()
              commentsData.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
                adminDeletedAt: data.adminDeletedAt?.toDate()
              } as Comment)
            })
            setComments(commentsData)
            setIsLoading(false)
          },
          (error: any) => {
            console.error('댓글 로딩 실패:', error)
            toast.error('댓글을 불러오는데 실패했습니다')
            setIsLoading(false)
          }
        )
      } catch (error) {
        console.error('Firebase 초기화 실패:', error)
        toast.error('Firebase 연결에 실패했습니다')
        setIsLoading(false)
      }
    }

    initializeFirebase()

    // cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [influencerId, contentId])

  // 댓글 작성
  const handleSubmitComment = async (formData: CommentFormData) => {
    if (!window.db) {
      throw new Error(t('comments.errors.firebaseNotInitialized'))
    }

    setIsSubmitting(true)
    try {
      // 비밀번호 해싱
      const hashedPassword = await hashPassword(formData.password)
      
      const commentData = {
        influencerId,
        contentId,  // contentId 추가로 확장 가능한 구조
        email: formData.email.toLowerCase().trim(),
        password: hashedPassword,
        content: formData.content.trim(),
        likes: 0,
        likedBy: [],
        createdAt: window.firebase.firestore.Timestamp.now(),
        updatedAt: window.firebase.firestore.Timestamp.now(),
        isDeleted: false
      }

      await window.db.collection('comments').add(commentData)
      setCurrentUserEmail(formData.email.toLowerCase().trim())
    } catch (error) {
      console.error('댓글 작성 실패:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  // 댓글 수정
  const handleEditComment = async (commentId: string, newContent: string) => {
    if (!window.db) {
      throw new Error(t('comments.errors.firebaseNotInitialized'))
    }

    try {
      await window.db.collection('comments').doc(commentId).update({
        content: newContent.trim(),
        updatedAt: window.firebase.firestore.Timestamp.now()
      })
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      throw error
    }
  }

  // 댓글 삭제 (사용자)
  const handleDeleteComment = async (commentId: string) => {
    if (!window.db) {
      throw new Error(t('comments.errors.firebaseNotInitialized'))
    }

    try {
      await window.db.collection('comments').doc(commentId).update({
        isDeleted: true,
        deletedBy: 'user',
        updatedAt: window.firebase.firestore.Timestamp.now()
      })
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      throw error
    }
  }

  // 좋아요 토글
  const handleLikeComment = async (commentId: string) => {
    if (!window.db || !currentUserEmail) {
      throw new Error(t('comments.errors.loginRequired'))
    }

    try {
      const commentRef = window.db.collection('comments').doc(commentId)
      const commentDoc = await commentRef.get()
      
      if (!commentDoc.exists) {
        throw new Error('댓글을 찾을 수 없습니다')
      }

      const commentData = commentDoc.data()
      const likedBy = commentData?.likedBy || []
      const isLiked = likedBy.includes(currentUserEmail)

      let newLikedBy: string[]
      let newLikes: number

      if (isLiked) {
        // 좋아요 취소
        newLikedBy = likedBy.filter((email: string) => email !== currentUserEmail)
        newLikes = Math.max(0, (commentData?.likes || 0) - 1)
      } else {
        // 좋아요 추가
        newLikedBy = [...likedBy, currentUserEmail]
        newLikes = (commentData?.likes || 0) + 1
      }

      await commentRef.update({
        likes: newLikes,
        likedBy: newLikedBy,
        updatedAt: window.firebase.firestore.Timestamp.now()
      })
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
      throw error
    }
  }

  // 댓글 새로고침
  const handleRefresh = () => {
    setIsLoading(true)
    // 실시간 리스너가 자동으로 최신 데이터를 가져오므로
    // 단순히 로딩 상태만 표시
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="space-y-6">
      {/* 댓글 작성 폼 */}
      <CommentForm
        influencerId={influencerId}
        contentId={contentId}
        onSubmit={handleSubmitComment}
        isSubmitting={isSubmitting}
      />

      {/* 댓글 목록 */}
      <CommentList
        influencerId={influencerId}
        contentId={contentId}
        comments={comments}
        isLoading={isLoading}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onLike={handleLikeComment}
        onRefresh={handleRefresh}
        currentUserEmail={currentUserEmail}
      />
    </div>
  )
}