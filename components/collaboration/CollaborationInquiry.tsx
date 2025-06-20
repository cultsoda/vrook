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

interface CollaborationFormData {
  name: string
  contact: string
  snsLinks: string
  activityField: string
  participationReason: string
  contentIdea: string
  preferredFormats: string[]
  referenceContent: string
}

export default function CollaborationInquiry() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CollaborationFormData>({
    name: '',
    contact: '',
    snsLinks: '',
    activityField: '',
    participationReason: '',
    contentIdea: '',
    preferredFormats: [],
    referenceContent: ''
  })

  const shootingFormats = [
    { id: 'photo', label: '이미지 화보', icon: Camera },
    { id: 'video', label: '영상 콘텐츠', icon: Video },
    { id: 'vr360', label: 'VR 360° 콘텐츠', icon: Eye },
    { id: 'aiPhoto', label: 'AI 합성 포토카드', icon: Sparkles }
  ]

  const handleFormatChange = (formatId: string, checked: string | boolean | "indeterminate") => {
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
        !formData.activityField || !formData.participationReason) {
      toast.error('필수 항목을 모두 입력해주세요.')
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
        await window.db.collection('collaboration-inquiries').add({
          ...formData,
          createdAt: window.firebase.firestore.FieldValue.serverTimestamp(),
          status: 'pending',
          ip: await fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => data.ip)
            .catch(() => 'unknown')
        })

        // Slack 알림 전송
        await sendSlackNotification(formData)

        toast.success('문의가 성공적으로 접수되었습니다! 검토 후 개별 연락드리겠습니다.')
        
        // 폼 초기화 및 모달 닫기
        setFormData({
          name: '',
          contact: '',
          snsLinks: '',
          activityField: '',
          participationReason: '',
          contentIdea: '',
          preferredFormats: [],
          referenceContent: ''
        })
        setIsOpen(false)

      } else {
        throw new Error('Firebase를 사용할 수 없습니다.')
      }

    } catch (error) {
      console.error('문의 접수 실패:', error)
      toast.error('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.')
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
              🎬 협업 문의하기
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white mb-2">
                VROOK 협업 문의
              </DialogTitle>
              <p className="text-slate-400 text-sm">
                모든 정보는 검토 후 개별 연락드리며, 안전하게 보관됩니다.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* 1. 이름/활동명 */}
              <div>
                <Label htmlFor="name" className="text-white font-medium">
                  1. 이름 / 활동명 <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="ex. 김민지 / MINJI"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              {/* 2. 연락처 */}
              <div>
                <Label htmlFor="contact" className="text-white font-medium">
                  2. 연락처 (이메일 또는 휴대폰) <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="contact"
                  placeholder="ex. hello@creator.com / 010-1234-5678"
                  value={formData.contact}
                  onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              {/* 3. SNS/채널 링크 */}
              <div>
                <Label htmlFor="snsLinks" className="text-white font-medium">
                  3. SNS/채널 링크 (최소 1개 이상) <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="snsLinks"
                  placeholder="ex. 인스타그램: @username&#10;유튜브: youtube.com/channel/...&#10;틱톡: @username"
                  value={formData.snsLinks}
                  onChange={(e) => setFormData(prev => ({ ...prev, snsLinks: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[80px]"
                  required
                />
              </div>

              {/* 4. 활동 분야/직업 */}
              <div>
                <Label htmlFor="activityField" className="text-white font-medium">
                  4. 활동 분야 / 직업 <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="activityField"
                  placeholder="ex. 모델, 댄서, 유튜버, 버츄얼 크리에이터 등"
                  value={formData.activityField}
                  onChange={(e) => setFormData(prev => ({ ...prev, activityField: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  required
                />
              </div>

              {/* 5. 참여 희망 이유 */}
              <div>
                <Label htmlFor="participationReason" className="text-white font-medium">
                  5. 브이룩 참여 희망 이유 <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="participationReason"
                  placeholder="자유롭게 기재해주세요"
                  value={formData.participationReason}
                  onChange={(e) => setFormData(prev => ({ ...prev, participationReason: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[100px]"
                  required
                />
              </div>

              {/* 6. 콘텐츠 아이디어 */}
              <div>
                <Label htmlFor="contentIdea" className="text-white font-medium">
                  6. 콘텐츠 아이디어 또는 콘셉트가 있다면 알려주세요 (선택)
                </Label>
                <Textarea
                  id="contentIdea"
                  placeholder="ex. 도심 데이트 VR, 콘셉트 화보 등"
                  value={formData.contentIdea}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentIdea: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[80px]"
                />
              </div>

              {/* 7. 희망 촬영 형태 */}
              <div>
                <Label className="text-white font-medium mb-3 block">
                  7. 희망 촬영 형태 (복수 선택 가능)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shootingFormats.map((format) => (
                    <div key={format.id} className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-600">
                      <Checkbox
                        id={format.id}
                        checked={formData.preferredFormats.includes(format.id)}
                        onCheckedChange={(checked: boolean | "indeterminate") => handleFormatChange(format.id, checked)}
                        className="border-slate-500"
                      />
                      <format.icon className="w-5 h-5 text-purple-400" />
                      <Label htmlFor={format.id} className="text-white cursor-pointer flex-1">
                        {format.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. 참고 콘텐츠 */}
              <div>
                <Label htmlFor="referenceContent" className="text-white font-medium">
                  8. 참고할 수 있는 본인의 콘텐츠가 있다면 업로드 또는 링크 공유해주세요 (선택)
                </Label>
                <Textarea
                  id="referenceContent"
                  placeholder="ex. Google Drive 링크, 유튜브 링크 등"
                  value={formData.referenceContent}
                  onChange={(e) => setFormData(prev => ({ ...prev, referenceContent: e.target.value }))}
                  className="mt-2 bg-slate-800 border-slate-600 text-white placeholder-slate-400 min-h-[80px]"
                />
              </div>

              {/* 참고 사항 */}
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600">
                <h4 className="text-white font-medium mb-2">📋 참고 사항</h4>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• 선정된 분께는 개별 연락 드립니다.</li>
                  <li>• 촬영은 서울 스튜디오 또는 지정 장소에서 진행됩니다.</li>
                  <li>• 수익모델, 제작 콘텐츠 활용 범위는 협의 후 진행됩니다.</li>
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
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isSubmitting ? '접수 중...' : '문의 접수하기'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
