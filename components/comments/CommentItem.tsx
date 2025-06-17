// components/comments/CommentItem.tsx
"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Heart, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Calendar,
  User,
  MoreVertical 
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { CommentItemProps, maskEmail, verifyPassword } from './types'
import { useTranslation } from '@/hooks/useTranslation'
import { toast } from 'sonner'

export default function CommentItem({ 
  comment, 
  onEdit, 
  onDelete, 
  onLike, 
  currentUserEmail 
}: CommentItemProps) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [isLiked, setIsLiked] = useState(
    currentUserEmail ? comment.likedBy.includes(currentUserEmail) : false
  )
  const [likeCount, setLikeCount] = useState(comment.likes)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletePassword, setDeletePassword] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return t('comments.item.justNow')
    if (minutes === 1) return t('comments.item.minuteAgo')
    if (minutes < 60) return t('comments.item.minutesAgo').replace('{count}', minutes.toString())
    if (hours === 1) return t('comments.item.hourAgo')
    if (hours < 24) return t('comments.item.hoursAgo').replace('{count}', hours.toString())
    if (days === 1) return t('comments.item.dayAgo')
    if (days < 7) return t('comments.item.daysAgo').replace('{count}', days.toString())
    
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleLike = async () => {
    if (!currentUserEmail) {
      toast.error(t('comments.errors.loginRequired'))
      return
    }

    try {
      await onLike(comment.id)
      setIsLiked(!isLiked)
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
      toast.error(t('comments.errors.likeFailed'))
    }
  }

  const handleEdit = async () => {
    if (!editContent.trim()) {
      toast.error(t('comments.errors.contentRequired'))
      return
    }

    if (editContent.length > 500) {
      toast.error(t('comments.errors.contentMaxLength'))
      return
    }

    try {
      await onEdit(comment.id, editContent.trim())
      setIsEditing(false)
      toast.success(t('comments.success.commentEdited'))
    } catch (error) {
      console.error('댓글 수정 실패:', error)
      toast.error(t('comments.errors.editFailed'))
    }
  }

  const handleDelete = async () => {
    if (!deletePassword) {
      toast.error(t('comments.errors.passwordRequired'))
      return
    }

    setIsVerifying(true)
    try {
      const isValid = await verifyPassword(deletePassword, comment.password)
      if (!isValid) {
        toast.error(t('comments.errors.passwordIncorrect'))
        setDeletePassword('')
        return
      }

      await onDelete(comment.id)
      setShowDeleteDialog(false)
      toast.success(t('comments.success.commentDeleted'))
    } catch (error) {
      console.error('댓글 삭제 실패:', error)
      toast.error(t('comments.errors.deleteFailed'))
    } finally {
      setIsVerifying(false)
    }
  }

  const canModify = currentUserEmail === comment.email

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
      {/* 댓글 헤더 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">
              {maskEmail(comment.email)}
            </p>
            <div className="flex items-center text-slate-400 text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(comment.createdAt)}
              {comment.updatedAt > comment.createdAt && (
                <span className="ml-2 text-slate-500">{t('comments.item.edited')}</span>
              )}
            </div>
          </div>
        </div>

        {/* 더보기 메뉴 (본인 댓글만) */}
        {canModify && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem 
                onClick={() => setIsEditing(true)}
                className="text-slate-300 hover:bg-slate-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {t('comments.item.edit')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                className="text-red-400 hover:bg-slate-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('comments.item.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* 댓글 내용 */}
      <div className="mb-3">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white resize-none"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                {editContent.length}/500
              </p>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(comment.content)
                  }}
                  className="border-slate-600 text-slate-300"
                >
                  <X className="w-4 h-4 mr-1" />
                  {t('comments.item.cancel')}
                </Button>
                <Button
                  size="sm"
                  onClick={handleEdit}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={!editContent.trim() || editContent.length > 500}
                >
                  <Save className="w-4 h-4 mr-1" />
                  {t('comments.item.save')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-200 whitespace-pre-wrap">
            {comment.content}
          </p>
        )}
      </div>

      {/* 좋아요 버튼 */}
      {!isEditing && (
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`text-slate-400 hover:text-red-400 ${
              isLiked ? 'text-red-400' : ''
            }`}
          >
            <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount > 0 && likeCount}
          </Button>
        </div>
      )}

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">{t('comments.item.deleteTitle')}</DialogTitle>
            <DialogDescription className="text-slate-400">
              {t('comments.item.deleteDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete-password" className="text-white">
                {t('comments.item.deletePasswordLabel')}
              </Label>
              <Input
                id="delete-password"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder={t('comments.item.deletePasswordPlaceholder')}
                className="bg-slate-800 border-slate-600 text-white"
                disabled={isVerifying}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false)
                setDeletePassword('')
              }}
              disabled={isVerifying}
              className="border-slate-600 text-slate-300"
            >
              {t('comments.item.cancel')}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isVerifying || !deletePassword}
              className="bg-red-600 hover:bg-red-700"
            >
              {isVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t('comments.item.verifying')}
                </>
              ) : (
                t('comments.item.delete')
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}