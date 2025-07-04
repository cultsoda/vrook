// components/comments/CommentForm.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageCircle, Send, Eye, EyeOff } from 'lucide-react'
import { CommentFormProps, CommentFormData } from './types'
import { useTranslation } from '@/hooks/useTranslation'
import { toast } from 'sonner'

export default function CommentForm({ influencerId, contentId, onSubmit, isSubmitting }: CommentFormProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<CommentFormData>({
    email: '',
    password: '',
    content: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<CommentFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<CommentFormData> = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = t('comments.errors.emailRequired')
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('comments.errors.emailInvalid')
    }

    if (!formData.password) {
      newErrors.password = t('comments.errors.passwordRequired')
    } else if (formData.password.length < 4) {
      newErrors.password = t('comments.errors.passwordMinLength')
    }

    if (!formData.content.trim()) {
      newErrors.content = t('comments.errors.contentRequired')
    } else if (formData.content.trim().length < 2) {
      newErrors.content = t('comments.errors.contentMinLength')
    } else if (formData.content.length > 500) {
      newErrors.content = t('comments.errors.contentMaxLength')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error(t('comments.errors.formValidation'))
      return
    }

    try {
      await onSubmit(formData)
      setFormData({ email: '', password: '', content: '' })
      setErrors({})
      toast.success(t('comments.success.commentCreated'))
    } catch (error) {
      console.error('댓글 작성 실패:', error)
      toast.error(t('comments.errors.submitFailed'))
    }
  }

  const handleInputChange = (field: keyof CommentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-700 mb-6">
      <CardHeader className="text-center p-4 md:p-8">
        {/* ✅ 수정: 폰트 크기를 모바일/데스크톱에 맞게 세분화 */}
        <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 flex items-center justify-center">
          <MessageCircle className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 mr-2" />
          {t('comments.form.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {/* ✅ 수정: Label에 text-sm 추가 */}
            <Label htmlFor="email" className="text-white text-sm">
              {t('comments.form.email')}
            </Label>
            {/* ✅ 수정: Input에 text-sm 추가하여 기본 스타일 덮어쓰기 */}
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={t('comments.form.emailPlaceholder')}
              className={`bg-slate-800 border-slate-600 text-white text-sm ${
                errors.email ? 'border-red-500' : ''
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            {/* ✅ 수정: Label에 text-sm 추가 */}
            <Label htmlFor="password" className="text-white text-sm">
              {t('comments.form.password')} {t('comments.form.passwordHelp')}
            </Label>
            <div className="relative">
              {/* ✅ 수정: Input에 text-sm 추가 */}
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t('comments.form.passwordPlaceholder')}
                className={`bg-slate-800 border-slate-600 text-white text-sm pr-10 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                disabled={isSubmitting}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            {/* ✅ 수정: Label에 text-sm 추가 */}
            <Label htmlFor="content" className="text-white text-sm">
              {t('comments.form.content')}
            </Label>
            {/* ✅ 수정: Textarea에 text-sm 추가 */}
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder={t('comments.form.contentPlaceholder')}
              className={`bg-slate-800 border-slate-600 text-white text-sm resize-none ${
                errors.content ? 'border-red-500' : ''
              }`}
              rows={4}
              disabled={isSubmitting}
            />
            <div className="flex justify-between items-center">
              {errors.content ? (
                <p className="text-red-400 text-sm">{errors.content}</p>
              ) : (
                <div />
              )}
              <p className="text-slate-400 text-sm">
                {formData.content.length}/500
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {t('comments.form.submitting')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t('comments.form.submitButton')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}