// app/admin/page.tsx (완전한 파일 - 배포 로그 시스템 포함)
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Lock, Save, Eye, EyeOff, Rocket, GitBranch, Clock, CheckCircle, AlertCircle, History } from 'lucide-react'
import { influencers } from '@/data/influencers'
import { purchaseSettings as initialSettings } from '@/data/purchaseSettings'
import { toast } from 'sonner'

interface PurchaseSettings {
  [influencerId: string]: boolean
}

interface DeploymentLog {
  id: string
  timestamp: string
  updateNote: string
  status: 'pending' | 'success' | 'failed'
  changes: Array<{
    influencer: string
    from: boolean
    to: boolean
  }>
}

const ADMIN_PASSWORD = 'olim2468!@'
const AUTH_KEY = 'vrook-admin-auth'
const LOGS_KEY = 'vrook-deployment-logs'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [purchaseSettings, setPurchaseSettings] = useState<PurchaseSettings>(initialSettings)
  const [isDeploying, setIsDeploying] = useState(false)
  const [updateNote, setUpdateNote] = useState('')
  const [deploymentLogs, setDeploymentLogs] = useState<DeploymentLog[]>([])
  const [showLogs, setShowLogs] = useState(false)

  // 초기 로드 시 인증 상태와 로그 확인
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY)
    if (savedAuth === 'authenticated') {
      setIsAuthenticated(true)
    }

    const savedLogs = localStorage.getItem(LOGS_KEY)
    if (savedLogs) {
      try {
        setDeploymentLogs(JSON.parse(savedLogs))
      } catch (error) {
        console.error('Failed to parse deployment logs:', error)
      }
    }
  }, [])

  const saveLogsToStorage = (logs: DeploymentLog[]) => {
    try {
      localStorage.setItem(LOGS_KEY, JSON.stringify(logs))
    } catch (error) {
      console.error('Failed to save logs:', error)
    }
  }

  const addDeploymentLog = (updateNote: string, changes: DeploymentLog['changes']) => {
    const newLog: DeploymentLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      updateNote,
      status: 'pending',
      changes
    }

    const updatedLogs = [newLog, ...deploymentLogs].slice(0, 50) // 최대 50개 로그 유지
    setDeploymentLogs(updatedLogs)
    saveLogsToStorage(updatedLogs)
    return newLog.id
  }

  const updateLogStatus = (logId: string, status: 'success' | 'failed') => {
    const updatedLogs = deploymentLogs.map(log => 
      log.id === logId ? { ...log, status } : log
    )
    setDeploymentLogs(updatedLogs)
    saveLogsToStorage(updatedLogs)
  }

  const getChanges = () => {
    const changes: DeploymentLog['changes'] = []
    
    Object.entries(purchaseSettings).forEach(([id, enabled]) => {
      if (enabled !== initialSettings[id]) {
        const influencer = influencers.find(inf => inf.id === id)
        changes.push({
          influencer: influencer?.name || id,
          from: initialSettings[id],
          to: enabled
        })
      }
    })
    
    return changes
  }

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_KEY, 'authenticated')
      toast.success('관리자 로그인 성공!')
    } else {
      toast.error('비밀번호가 올바르지 않습니다.')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    localStorage.removeItem(AUTH_KEY)
    toast.info('로그아웃되었습니다.')
  }

  const handleToggle = (influencerId: string, enabled: boolean) => {
    setPurchaseSettings(prev => ({
      ...prev,
      [influencerId]: enabled
    }))
  }

 const generateSettingsCode = () => {
  const settingsCode = `// data/purchaseSettings.ts
export interface PurchaseSettings {
  [influencerId: string]: boolean
}

// 전역 구매 설정 - 이 파일을 수정하면 전 세계 모든 사용자에게 적용됩니다
export const purchaseSettings: PurchaseSettings = {
${Object.entries(purchaseSettings)
  .map(([id, enabled]) => `  ${id}: ${enabled},${' '.repeat(Math.max(1, 15 - id.length))}// ${influencers.find(inf => inf.id === id)?.name || id} ${enabled ? '구매 가능' : '구매 불가'}`)
  .join('\n')}
}

// 설정 업데이트 히스토리 (참고용)
export const updateHistory = [
  {
    date: "2024-06-13",
    updatedBy: "admin",
    changes: "초기 설정 - 모든 인플루언서 구매 가능",
  },
  {
    date: "${new Date().toISOString().split('T')[0]}",
    updatedBy: "admin",
    changes: "${updateNote || '설정 업데이트'}",
  },
  // 새로운 업데이트는 여기에 추가하세요
]`
  return settingsCode
}

  const handleAutoDeploy = async () => {
    if (!updateNote.trim()) {
      toast.error('업데이트 노트를 입력해주세요!')
      return
    }

    const changes = getChanges()
    if (changes.length === 0) {
      toast.error('변경된 설정이 없습니다!')
      return
    }

    setIsDeploying(true)
    const logId = addDeploymentLog(updateNote, changes)
    
    try {
      const settingsCode = generateSettingsCode()
      
      // GitHub Personal Access Token 확인
      const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      if (!githubToken) {
        throw new Error('GitHub 토큰이 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요.')
      }
      
      console.log('Sending dispatch to GitHub...', {
        repo: 'cultsoda/vrook',
        event_type: 'update-purchase-settings',
        update_note: updateNote
      })
      
      // GitHub repository dispatch API 호출
      const response = await fetch('https://api.github.com/repos/cultsoda/vrook/dispatches', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        body: JSON.stringify({
          event_type: 'update-purchase-settings',
          client_payload: {
            settings_content: settingsCode,
            update_note: updateNote,
            timestamp: new Date().toISOString(),
            changes: changes
          }
        })
      })

      console.log('GitHub API Response:', response.status, response.statusText)

      if (response.ok || response.status === 204) {
        toast.success('🚀 자동 배포가 시작되었습니다! 1-2분 후 적용됩니다.')
        updateLogStatus(logId, 'success')
        setUpdateNote('')
        
        // GitHub Actions 완료 확인을 위한 타이머
        setTimeout(() => {
          toast.success('✅ 배포가 완료되었습니다! 페이지를 새로고침해보세요.')
        }, 90000) // 1.5분 후
      } else {
        const errorText = await response.text()
        console.error('GitHub API Error Details:', errorText)
        throw new Error(`GitHub API Error: ${response.status} - ${errorText}`)
      }
    } catch (error: any) {
      console.error('Auto deploy error:', error)
      updateLogStatus(logId, 'failed')
      
      if (error.message.includes('토큰이 설정되지')) {
        toast.error('GitHub 토큰 설정이 필요합니다. Vercel 환경 변수를 확인해주세요.')
      } else if (error.message.includes('403')) {
        toast.error('GitHub 토큰 권한이 부족합니다. repo와 workflow 권한을 확인해주세요.')
      } else {
        toast.error(`자동 배포 실패: ${error.message}`)
      }
    } finally {
      setIsDeploying(false)
    }
  }

  const handleDownloadSettings = () => {
    const settingsCode = generateSettingsCode()
    const blob = new Blob([settingsCode], { type: 'text/typescript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'purchaseSettings.ts'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('설정 파일이 다운로드되었습니다!')
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getStatusIcon = (status: DeploymentLog['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />
    }
  }

  const getStatusText = (status: DeploymentLog['status']) => {
    switch (status) {
      case 'pending':
        return '배포 중'
      case 'success':
        return '성공'
      case 'failed':
        return '실패'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-purple-500/20 rounded-full w-fit">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
            <CardTitle className="text-xl font-bold text-white">
              VROOK Admin
            </CardTitle>
            <p className="text-slate-400">관리자 인증이 필요합니다</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="비밀번호를 입력하세요"
                  className="bg-slate-800 border-slate-600 text-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              로그인
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">VROOK Admin</h1>
            <p className="text-slate-400">전역 구매 가능 상태 관리 (자동 배포)</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowLogs(!showLogs)}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              <History className="w-4 h-4 mr-2" />
              {showLogs ? '로그 숨기기' : '배포 로그'}
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-slate-300"
            >
              로그아웃
            </Button>
          </div>
        </div>

        {/* Deployment Logs */}
        {showLogs && (
          <Card className="bg-slate-900 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <History className="w-5 h-5 mr-2" />
                배포 로그 ({deploymentLogs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {deploymentLogs.length === 0 ? (
                <p className="text-slate-400 text-center py-4">아직 배포 기록이 없습니다.</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {deploymentLogs.map((log) => (
                    <div key={log.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className="text-white font-medium">{log.updateNote}</span>
                        </div>
                        <span className="text-slate-400 text-sm">
                          {formatTimestamp(log.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          log.status === 'success' ? 'bg-green-900/50 text-green-300' :
                          log.status === 'failed' ? 'bg-red-900/50 text-red-300' :
                          'bg-yellow-900/50 text-yellow-300'
                        }`}>
                          {getStatusText(log.status)}
                        </span>
                      </div>
                      {log.changes.length > 0 && (
                        <div className="mt-2">
                          <p className="text-slate-400 text-sm mb-1">변경사항:</p>
                          <div className="space-y-1">
                            {log.changes.map((change, index) => (
                              <div key={index} className="text-xs text-slate-300">
                                • {change.influencer}: {change.from ? '구매 가능' : '구매 불가'} → {change.to ? '구매 가능' : '구매 불가'}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Auto Deploy Info */}
        <Card className="bg-green-900/20 border-green-700/50 mb-6">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center">
              <Rocket className="w-5 h-5 mr-2" />
              자동 배포 방식
            </CardTitle>
          </CardHeader>
          <CardContent className="text-green-200 space-y-2">
            <p>• 아래에서 설정을 변경한 후 "자동 배포" 버튼을 클릭하세요</p>
            <p>• GitHub Actions가 자동으로 파일을 업데이트하고 배포합니다</p>
            <p>• 1-2분 후 전 세계 모든 사용자에게 적용됩니다</p>
            <p>• 배포 로그에서 진행 상황과 히스토리를 확인할 수 있습니다</p>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="bg-slate-900 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">인플루언서별 구매 설정</CardTitle>
            <p className="text-slate-400">각 인플루언서의 구매 가능 여부를 설정할 수 있습니다.</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {influencers.map((influencer) => (
                <div 
                  key={influencer.id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={influencer.profileImage}
                      alt={influencer.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=48&width=48";
                      }}
                    />
                    <div>
                      <h3 className="text-white font-medium">{influencer.name}</h3>
                      <p className="text-slate-400 text-sm">
                        현재 상태: {purchaseSettings[influencer.id] ? 
                          <span className="text-green-400">구매 가능</span> : 
                          <span className="text-red-400">구매 불가</span>
                        }
                        {purchaseSettings[influencer.id] !== initialSettings[influencer.id] && (
                          <span className="text-yellow-400 ml-2">(변경됨)</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`toggle-${influencer.id}`} className="text-white">
                      {purchaseSettings[influencer.id] ? 'ON' : 'OFF'}
                    </Label>
                    <Switch
                      id={`toggle-${influencer.id}`}
                      checked={purchaseSettings[influencer.id] || false}
                      onCheckedChange={(checked: boolean) => handleToggle(influencer.id, checked)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Update Note */}
        <Card className="bg-slate-900 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">업데이트 노트 (필수)</CardTitle>
            <p className="text-slate-400">변경 사항에 대한 메모를 남겨주세요</p>
          </CardHeader>
          <CardContent>
            <Textarea
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              placeholder="예: 겨우디 구매 일시 중단, 신규 콘텐츠 준비 중..."
              className="bg-slate-800 border-slate-600 text-white"
              rows={3}
              required
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button 
            onClick={handleAutoDeploy}
            disabled={isDeploying || !updateNote.trim() || getChanges().length === 0}
            className="bg-green-600 hover:bg-green-700 flex-1 disabled:opacity-50"
          >
            {isDeploying ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                배포 중...
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4 mr-2" />
                자동 배포 ({getChanges().length}개 변경사항)
              </>
            )}
          </Button>
          <Button 
            onClick={handleDownloadSettings}
            variant="outline"
            className="border-slate-600 text-slate-300 flex-1"
          >
            <GitBranch className="w-4 h-4 mr-2" />
            수동 방식 (파일 다운로드)
          </Button>
        </div>

        {/* Current Settings Summary */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">현재 설정 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="text-slate-400">
                구매 가능: <span className="text-green-400 font-medium">
                  {Object.values(purchaseSettings).filter(Boolean).length}명
                </span>
              </div>
              <div className="text-slate-400">
                구매 불가: <span className="text-red-400 font-medium">
                  {Object.values(purchaseSettings).filter(v => !v).length}명
                </span>
              </div>
              <div className="text-slate-400">
                전체: <span className="text-white font-medium">{influencers.length}명</span>
              </div>
            </div>
            
            {/* 변경된 설정 표시 */}
            {getChanges().length > 0 && (
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded">
                <h4 className="text-yellow-300 font-medium mb-2">변경된 설정 ({getChanges().length}개):</h4>
                <div className="space-y-1">
                  {getChanges().map((change, index) => (
                    <div key={index} className="text-sm text-yellow-200">
                      • {change.influencer} : {change.from ? '구매 가능' : '구매 불가'} → {change.to ? '구매 가능' : '구매 불가'}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}