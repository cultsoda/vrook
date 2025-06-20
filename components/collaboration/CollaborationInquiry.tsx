// components/collaboration/CollaborationInquiry.tsx
"use client"

import * as React from "react"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { X, Upload, Star, Camera, Video, Eye, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { useTranslation } from '@/hooks/useTranslation'

// Radix UI Checkbox 정확한 타입 정의
type CheckedState = boolean | "indeterminate"

interface CollaborationFormData {
  name: string
  contact: string
  snsLinks: string
  activityField: string
  participationReason: string
  contentIdea: string
  preferredFormats: string[]
  referenceContent: string
  privacyConsent: boolean // 개인정보 동의 추가
}

export default function CollaborationInquiry() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false) // 개인정보 모달 상태
  const [formData, setFormData] = useState<CollaborationFormData>({
    name: '',
    contact: '',
    snsLinks: '',
    activityField: '',
    participationReason: '',
    contentIdea: '',
    preferredFormats: [],
    referenceContent: '',
    privacyConsent: false // 초기값 false
  })

  const shootingFormats = [
    { id: 'photo', label: '이미지 화보', icon: Camera },
    { id: 'video', label: '영상 콘텐츠', icon: Video },
    { id: 'vr360', label: 'VR 360° 콘텐츠', icon: Eye },
    { id: 'aiPhoto', label: 'AI 합성 포토카드', icon: Sparkles }
  ]

  const handleFormatChange = (formatId: string, checked: CheckedState) => {
    const isChecked = checked === true
    setFormData(prev => ({
      ...prev,
      preferredFormats: isChecked
        ? [...prev.preferredFormats, formatId]
        : prev.preferredFormats.filter(id => id !== formatId)
    }))
  }

  const sendSlackNotification = async (data: CollaborationFormData) => {
    try {
      const response = await fetch('/api/slack/collaboration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Slack 전송 실패')
      }

      const result = await response.json()
      console.log('Slack 알림 전송 성공:', result)
    } catch (error) {
      console.error('Slack 알림 전송 실패:', error)
      // Slack 실패해도 Firebase 저장은 성공했다고 처리
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 필드 검증
    if (!formData.name || !formData.contact || !formData.snsLinks || 
        !formData.activityField || !formData.participationReason || !formData.privacyConsent) {
      toast.error(t('collaboration.form.messages.required'))
      return
    }

    setIsSubmitting(true)

    try {
      // Firebase에 데이터 저장
      if (typeof window !== 'undefined' && window.firebase) {
        // Firebase 초기화 (기존 설정 재사용)
        if (!window.db) {
          const firebaseConfig = {
            apiKey: "AIzaSyC9xebZWI6ItNYr2iGhmenZNMZj1fhmMBE",
            authDomain: "vrook-comments.firebaseapp.com",
            projectId: "vrook-comments",
            storageBucket: "vrook-comments.firebasestorage.app",
            messagingSenderId: "281211962162",
            appId: "1:281211962162:web:1febe65d503b555bbf4d2b"
          }

          const app = window.firebase.initializeApp(firebaseConfig, 'collaboration')
          window.db = window.firebase.firestore()
        }

        // Firestore에 저장
        // privacyConsent 제외하고 저장
        const { privacyConsent, ...dataToSave } = formData

        await window.db.collection('collaboration-inquiries').add({
          ...dataToSave,  // privacyConsent 제외된 데이터
          createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
          status: 'pending',
          ip: await fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => 'unknown')
        })

        // Slack 알림 전송
        await sendSlackNotification(formData)

        toast.success(t('collaboration.form.messages.success'))
        
        // 폼 초기화 및 모달 닫기
        setFormData({
          name: '',
          contact: '',
          snsLinks: '',
          activityField: '',
          participationReason: '',
          contentIdea: '',
          preferredFormats: [],
          referenceContent: '',
          privacyConsent: false
        })
        setIsOpen(false)

      } else {
        throw new Error(t('collaboration.form.messages.firebaseError'))
      }

    } catch (error) {
      console.error('문의 접수 실패:', error)
      toast.error(t('collaboration.form.messages.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-16 px-4 bg-slate-800/30">
      <div className="container mx-auto text-center">
        {/* 메인 제목 */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ✨ {t('collaboration.title')}
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('collaboration.subtitle')}
          </p>
        </div>

        {/* 특징 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-700/50 rounded-lg p-6 backdrop-blur-sm border border-slate-600">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('collaboration.features.studio.title')}</h3>
            <p className="text-slate-300 text-sm">{t('collaboration.features.studio.desc')}</p>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-6 backdrop-blur-sm border border-slate-600">
            <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('collaboration.features.vr.title')}</h3>
            <p className="text-slate-300 text-sm">{t('collaboration.features.vr.desc')}</p>
          </div>
          
          <div className="bg-slate-700/50 rounded-lg p-6 backdrop-blur-sm border border-slate-600">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{t('collaboration.features.revenue.title')}</h3>
            <p className="text-slate-300 text-sm">{t('collaboration.features.revenue.desc')}</p>
          </div>
        </div>

        {/* 문의하기 버튼 */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t('collaboration.form.buttons.inquire')}
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white mb-2">
                {t('collaboration.form.title')}
              </DialogTitle>
              <p className="text-slate-400 text-sm">
                {t('collaboration.form.subtitle')}
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* 1. 이름/활동명 */}
              <div>
                <Label htmlFor="name" className="text-white font-medium">
                  {t('collaboration.form.fields.name')} <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder={t('collaboration.form.fields.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              {/* 2. 연락처 */}
              <div>
                <Label htmlFor="contact" className="text-white font-medium">
                  {t('collaboration.form.fields.contact')} <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="contact"
                  placeholder={t('collaboration.form.fields.contactPlaceholder')}
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              {/* 3. SNS/채널 링크 */}
              <div>
                <Label htmlFor="snsLinks" className="text-white font-medium">
                  {t('collaboration.form.fields.snsLinks')} <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="snsLinks"
                  placeholder={t('collaboration.form.fields.snsPlaceholder')}
                  value={formData.snsLinks}
                  onChange={(e) => setFormData(prev => ({ ...prev, snsLinks: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[80px]"
                  required
                />
              </div>

              {/* 4. 활동 분야/직업 */}
              <div>
                <Label htmlFor="activityField" className="text-white font-medium">
                  {t('collaboration.form.fields.activityField')} <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="activityField"
                  placeholder={t('collaboration.form.fields.activityPlaceholder')}
                  value={formData.activityField}
                  onChange={(e) => setFormData(prev => ({ ...prev, activityField: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              {/* 5. 참여 희망 이유 */}
              <div>
                <Label htmlFor="participationReason" className="text-white font-medium">
                  {t('collaboration.form.fields.participationReason')} <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="participationReason"
                  placeholder={t('collaboration.form.fields.participationPlaceholder')}
                  value={formData.participationReason}
                  onChange={(e) => setFormData(prev => ({ ...prev, participationReason: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
                  required
                />
              </div>

              {/* 6. 콘텐츠 아이디어 */}
              <div>
                <Label htmlFor="contentIdea" className="text-white font-medium">
                  {t('collaboration.form.fields.contentIdea')}
                </Label>
                <Textarea
                  id="contentIdea"
                  placeholder={t('collaboration.form.fields.contentIdeaPlaceholder')}
                  value={formData.contentIdea}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentIdea: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[80px]"
                />
              </div>

              {/* 7. 희망 촬영 형태 */}
              <div>
                <Label className="text-white font-medium mb-3 block">
                  {t('collaboration.form.fields.preferredFormats')}
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shootingFormats.map((format) => (
                    <div key={format.id} className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-600">
                      <Checkbox
                        id={format.id}
                        checked={formData.preferredFormats.includes(format.id)}
                        onCheckedChange={(checked: CheckedState) => handleFormatChange(format.id, checked)}
                        className="border-slate-500"
                      />
                      <format.icon className="w-5 h-5 text-purple-400" />
                      <Label htmlFor={format.id} className="text-white cursor-pointer flex-1">
                        {t(`collaboration.form.formats.${format.id}`)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. 참고 콘텐츠 */}
              <div>
                <Label htmlFor="referenceContent" className="text-white font-medium">
                  {t('collaboration.form.fields.referenceContent')}
                </Label>
                <Textarea
                  id="referenceContent"
                  placeholder={t('collaboration.form.fields.referencePlaceholder')}
                  value={formData.referenceContent}
                  onChange={(e) => setFormData(prev => ({ ...prev, referenceContent: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[80px]"
                />
              </div>

              {/* 개인정보 수집 동의 */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacyConsent"
                    checked={formData.privacyConsent}
                    onCheckedChange={(checked: CheckedState) => 
                      setFormData(prev => ({ ...prev, privacyConsent: checked === true }))
                    }
                    className="border-slate-500 mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="privacyConsent" className="text-white cursor-pointer">
                      {t('collaboration.form.privacy.consent')} <span className="text-red-400">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-purple-400 hover:text-purple-300 text-sm underline ml-2"
                    >
                      {t('collaboration.form.privacy.view')}
                    </button>
                  </div>
                </div>
              </div>

              {/* 참고 사항 */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <h4 className="text-white font-medium mb-2">📋 {t('collaboration.form.notes.title')}</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• {t('collaboration.form.notes.items.selection')}</li>
                  <li>• {t('collaboration.form.notes.items.location')}</li>
                  <li>• {t('collaboration.form.notes.items.revenue')}</li>
                </ul>
              </div>

              {/* 제출 버튼 */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800"
                  disabled={isSubmitting}
                >
                  {t('collaboration.form.buttons.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isSubmitting ? t('collaboration.form.buttons.submitting') : t('collaboration.form.buttons.submit')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* 개인정보 처리방침 모달 */}
        <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white mb-2">
                {t('collaboration.form.privacy.title')}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-slate-300 text-sm">
              <div>
                <h4 className="text-white font-medium mb-2">{t('collaboration.form.privacy.items.collection.title')}</h4>
                <p>{t('collaboration.form.privacy.items.collection.content')}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">{t('collaboration.form.privacy.items.purpose.title')}</h4>
                <p>{t('collaboration.form.privacy.items.purpose.content')}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">{t('collaboration.form.privacy.items.retention.title')}</h4>
                <p>{t('collaboration.form.privacy.items.retention.content')}</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">{t('collaboration.form.privacy.items.rights.title')}</h4>
                <p>{t('collaboration.form.privacy.items.rights.content')}</p>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setShowPrivacyModal(false)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {t('collaboration.form.privacy.confirm')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
