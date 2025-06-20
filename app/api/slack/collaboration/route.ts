// app/api/slack/collaboration/route.ts
import { NextRequest, NextResponse } from 'next/server'

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const SLACK_CHANNEL = '#vrook협업문의'

interface CollaborationData {
  name: string
  contact: string
  snsLinks: string
  activityField: string
  participationReason: string
  contentIdea: string
  preferredFormats: string[]
  referenceContent: string
}

export async function POST(request: NextRequest) {
  try {
     // 환경 변수 확인
    if (!SLACK_BOT_TOKEN) {
      return NextResponse.json(
        { error: 'Slack 토큰이 설정되지 않았습니다.' },
        { status: 500 }
      )
    }
     
    const data: CollaborationData = await request.json()
    
    // 필수 필드 검증
    if (!data.name || !data.contact || !data.snsLinks || !data.activityField || !data.participationReason) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 촬영 형태 라벨 매핑
    const formatLabels: { [key: string]: string } = {
      'photo': '이미지 화보',
      'video': '영상 콘텐츠',
      'vr360': 'VR 360° 콘텐츠',
      'aiPhoto': 'AI 합성 포토카드'
    }

    const formatNames = data.preferredFormats.map(id => formatLabels[id] || id).join(', ')

    // Slack 메시지 구성
    const slackPayload = {
      channel: SLACK_CHANNEL,
      text: '🎬 새로운 VROOK 협업 문의가 들어왔습니다!',
      attachments: [
        {
          color: '#7c3aed',
          fields: [
            {
              title: '이름 / 활동명',
              value: data.name,
              short: true
            },
            {
              title: '연락처',
              value: data.contact,
              short: true
            },
            {
              title: 'SNS/채널 링크',
              value: data.snsLinks,
              short: false
            },
            {
              title: '활동 분야 / 직업',
              value: data.activityField,
              short: true
            },
            {
              title: '희망 촬영 형태',
              value: formatNames || '선택하지 않음',
              short: true
            },
            {
              title: '참여 희망 이유',
              value: data.participationReason,
              short: false
            },
            {
              title: '콘텐츠 아이디어',
              value: data.contentIdea || '없음',
              short: false
            },
            {
              title: '참고 콘텐츠',
              value: data.referenceContent || '없음',
              short: false
            }
          ],
          footer: 'VROOK 협업 시스템',
          footer_icon: 'https://vrook.kr/icon-192.png',
          ts: Math.floor(Date.now() / 1000)
        }
      ]
    }

    // Slack API 호출
    const slackResponse = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SLACK_BOT_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slackPayload)
    })

    const slackResult = await slackResponse.json()

    if (!slackResult.ok) {
      console.error('Slack API 오류:', slackResult)
      throw new Error(`Slack API 실패: ${slackResult.error}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Slack 알림이 성공적으로 전송되었습니다.',
      slackTs: slackResult.ts 
    })

  } catch (error) {
    console.error('Slack 알림 전송 실패:', error)
    
    return NextResponse.json(
      { 
        error: 'Slack 알림 전송에 실패했습니다.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// CORS 처리를 위한 OPTIONS 메서드
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
