// components/FirebaseTest.tsx
"use client"
import { useState, useEffect } from 'react'

export default function FirebaseTest() {
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState('Firebase 연결 확인 중...')

  useEffect(() => {
    // Firebase가 로드될 때까지 잠깐 기다리기
    const checkFirebase = () => {
      if (typeof window !== 'undefined' && window.db) {
        setIsConnected(true)
        setMessage('Firebase 연결 성공! ✅')
      } else {
        setTimeout(checkFirebase, 500) // 0.5초 후 다시 체크
      }
    }
    
    checkFirebase()
  }, [])

  const testWrite = async () => {
    try {
      if (!window.db) {
        alert('Firebase가 아직 로드되지 않았습니다')
        return
      }

      // Firestore에 테스트 데이터 쓰기
      const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js')
      
      const docRef = await addDoc(collection(window.db, 'test'), {
        message: 'Hello Firebase!',
        timestamp: new Date(),
        test: true
      })
      
      alert(`테스트 성공! Document ID: ${docRef.id}`)
    } catch (error) {
      alert(`테스트 실패: ${error.message}`)
    }
  }

  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <h3 className="text-white text-lg mb-4">🔥 Firebase 연결 테스트</h3>
      <p className={`mb-4 ${isConnected ? 'text-green-400' : 'text-yellow-400'}`}>
        {message}
      </p>
      
      {isConnected && (
        <button 
          onClick={testWrite}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Firestore 쓰기 테스트
        </button>
      )}
    </div>
  )
}