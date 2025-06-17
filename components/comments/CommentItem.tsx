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
  
  const getLikeKey = () => `vrook_liked_${comment.id}`
  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(getLikeKey()) === 'true'
    }
    return false
  })
  const [likeCount, setLikeCount] = useState(comment.likes)
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteEmail, setDeleteEmail] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editEmail, setEditEmail] = useState('')
  const [editPassword, setEditPassword] = useState('')
  const [isEditVerifying, setIsEditVerifying] = useState(false)

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
    try {
      await onLike(comment.id)
      const newIsLiked = !isLiked
      setIsLiked(newIsLiked)
      setLikeCount(prev => newIsLiked ? prev + 1 : prev - 1)
      
      if (typeof window !== 'undefined') {
        if (newIsLiked) {
          localStorage.setItem(getLikeKey(), 'true')
        } else {
          localStorage.removeItem(getLikeKey())
        }
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error)
      toast.error(t('comments.errors.likeFailed'))
    }
  }

  const handleEditAuth = async () => {
    if (!editEmail || !editPassword) {
      toast.error('이메일과 비밀번호를 모두 입력해주세요')
      return
    }

    setIsEditVerifying(true)
    try {
      if (editEmail.toLowerCase().trim() !== comment.email.toLowerCase()) {
        toast.error('이메일이 일치하지 않습니다')
        return
      }

      const isValid = await verifyPassword(editPassword, comment.password)
      if (!isValid) {
        toast.error(t('comments.errors.passwordIncorrect'))
        setEditPassword('')
        return
      }

      setShowEditDialog(false)
      setIsEditing(true)
      setEditEmail('')
      setEditPassword('')
    } catch (error) {
      console.error('수정 인증 실패:', error)
      toast.error('인증에 실패했습니다')
    } finally {
      setIsEditVerifying(false)
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
    if (!deleteEmail || !deletePassword) {
      toast.error('이메일과 비밀번호를 모두 입력해주세요')
      return
    }

    setIsVerifying(true)
    try {
      if (deleteEmail.toLowerCase().trim() !== comment.email.toLowerCase()) {
        toast.error('이메일이 일치하지 않습니다')
        setDeleteEmail('')
        setDeletePassword('')
        return
      }

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

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
            <DropdownMenuItem 
              onClick={() => setShowEditDialog(true)}
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
      </div>

      <div className="mb-3">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-slate-800 border-slate-600 text-white resize-none text-sm"
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
          /* ✅ 수정: 댓글 내용 폰트 크기를 text-sm으로 지정 */
          <p className="text-slate-200 whitespace-pre-wrap text-sm">
            {comment.content}
          </p>
        )}
      </div>

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

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">댓글 수정 인증</DialogTitle>
            <DialogDescription className="text-slate-400">
              댓글을 수정하려면 작성 시 사용한 이메일과 비밀번호를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-white text-sm">이메일</Label>
              <Input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="이메일 입력"
                className="bg-slate-800 border-slate-600 text-white text-sm"
                disabled={isEditVerifying}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password" className="text-white text-sm">비밀번호</Label>
              <Input
                id="edit-password"
                type="password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="bg-slate-800 border-slate-600 text-white text-sm"
                disabled={isEditVerifying}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowEditDialog(false)
                setEditEmail('')
                setEditPassword('')
              }}
              disabled={isEditVerifying}
              className="border-slate-600 text-slate-300"
            >
              {t('comments.item.cancel')}
            </Button>
            <Button
              onClick={handleEditAuth}
              disabled={isEditVerifying || !editEmail || !editPassword}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isEditVerifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t('comments.item.verifying')}
                </>
              ) : (
                '인증하고 수정하기'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">{t('comments.item.deleteTitle')}</DialogTitle>
            <DialogDescription className="text-slate-400">
              댓글을 삭제하려면 작성 시 사용한 이메일과 비밀번호를 입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="delete-email" className="text-white text-sm">이메일</Label>
              <Input
                id="delete-email"
                type="email"
                value={deleteEmail}
                onChange={(e) => setDeleteEmail(e.target.value)}
                placeholder="이메일 입력"
                className="bg-slate-800 border-slate-600 text-white text-sm"
                disabled={isVerifying}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delete-password" className="text-white text-sm">
                {t('comments.item.deletePasswordLabel')}
              </Label>
              <Input
                id="delete-password"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder={t('comments.item.deletePasswordPlaceholder')}
                className="bg-slate-800 border-slate-600 text-white text-sm"
                disabled={isVerifying}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowDeleteDialog(false)
                setDeleteEmail('')
                setDeletePassword('')
              }}
              disabled={isVerifying}
              className="border-slate-600 text-slate-300"
            >
              {t('comments.item.cancel')}
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isVerifying || !deleteEmail || !deletePassword}
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