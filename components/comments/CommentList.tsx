// components/comments/CommentList.tsx
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, RefreshCw, SortDesc, SortAsc } from 'lucide-react'
import CommentItem from './CommentItem'
import { Comment } from './types'
import { useTranslation } from '@/hooks/useTranslation'

interface CommentListProps {
  influencerId: string
  contentId: string
  comments: Comment[]
  isLoading: boolean
  onEdit: (commentId: string, newContent: string) => void
  onDelete: (commentId: string) => void
  onLike: (commentId: string) => void
  onRefresh: () => void
  currentUserEmail?: string
}

type SortOption = 'newest' | 'oldest' | 'mostLiked'

export default function CommentList({
  influencerId,
  contentId,
  comments,
  isLoading,
  onEdit,
  onDelete,
  onLike,
  onRefresh,
  currentUserEmail
}: CommentListProps) {
  const { t } = useTranslation()
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [sortedComments, setSortedComments] = useState<Comment[]>([])

  // 댓글 정렬
  useEffect(() => {
    const sorted = [...comments].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'mostLiked':
          if (b.likes !== a.likes) {
            return b.likes - a.likes
          }
          // 좋아요가 같으면 최신 순으로
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })
    setSortedComments(sorted)
  }, [comments, sortBy])

  const getSortButtonText = () => {
    switch (sortBy) {
      case 'newest':
        return t('comments.list.sortNewest')
      case 'oldest':
        return t('comments.list.sortOldest')
      case 'mostLiked':
        return t('comments.list.sortMostLiked')
      default:
        return t('comments.list.sortNewest')
    }
  }

  const getSortIcon = () => {
    return sortBy === 'oldest' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
  }

  const cycleSortOption = () => {
    const options: SortOption[] = ['newest', 'oldest', 'mostLiked']
    const currentIndex = options.indexOf(sortBy)
    const nextIndex = (currentIndex + 1) % options.length
    setSortBy(options[nextIndex])
  }

  // 활성 댓글만 필터링 (삭제되지 않은 댓글)
  const activeComments = sortedComments.filter(comment => !comment.isDeleted)

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            {t('comments.list.title')} ({activeComments.length})
          </CardTitle>
          <div className="flex items-center space-x-2">
            {/* 정렬 버튼 */}
            <Button
              variant="outline"
              size="sm"
              onClick={cycleSortOption}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              {getSortIcon()}
              <span className="ml-1">{getSortButtonText()}</span>
            </Button>
            
            {/* 새로고침 버튼 */}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isLoading}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          // 로딩 상태
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 animate-pulse"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-slate-700 rounded w-32 mb-1" />
                    <div className="h-3 bg-slate-700 rounded w-20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-700 rounded w-full" />
                  <div className="h-4 bg-slate-700 rounded w-3/4" />
                </div>
                <div className="mt-3">
                  <div className="h-6 bg-slate-700 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : activeComments.length === 0 ? (
          // 댓글이 없을 때
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg mb-2">{t('comments.list.noComments')}</p>
            <p className="text-slate-500 text-sm">
              {t('comments.list.noCommentsSubtext')}
            </p>
          </div>
        ) : (
          // 댓글 목록
          <div className="space-y-4">
            {activeComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={onEdit}
                onDelete={onDelete}
                onLike={onLike}
                currentUserEmail={currentUserEmail}
              />
            ))}
          </div>
        )}

        {/* 댓글 통계 */}
        {activeComments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>
                {t('comments.list.totalComments').replace('{count}', activeComments.length.toString())}
              </span>
              <span>
                {t('comments.list.totalLikes').replace('{count}', activeComments.reduce((sum, comment) => sum + comment.likes, 0).toString())}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}