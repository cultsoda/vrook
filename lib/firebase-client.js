// lib/firebase-client.js
// 브라우저에서만 실행되는 Firebase 설정

let db = null;

export const initFirebase = () => {
  if (typeof window === 'undefined') return null;
  
  // Firebase가 이미 초기화되었다면 기존 db 반환
  if (db) return db;
  
  // Firebase CDN이 로드되었는지 확인
  if (window.firebase) {
    const firebaseConfig = {
      apiKey: "AIzaSyC9xebZWI6ItNYr2iGhmenZNMZj1fhmMBE",
      authDomain: "vrook-comments.firebaseapp.com",
      projectId: "vrook-comments",
      storageBucket: "vrook-comments.firebasestorage.app",
      messagingSenderId: "281211962162",
      appId: "1:281211962162:web:1febe65d503b555bbf4d2b"
    };

     try {
      // Firebase 앱 초기화
      const app = window.firebase.initializeApp(firebaseConfig);
      db = window.firebase.firestore();
      
      // Firestore 설정 (오프라인 지원 등)
      db.enableNetwork();
      
      console.log('✅ Firebase 초기화 완료');
      return db;
    } catch (error) {
      console.error('❌ Firebase 초기화 실패:', error);
      return null;
    }
  } else {
    console.error('❌ Firebase CDN이 로드되지 않았습니다');
    return null;
  }
};

export const getFirebaseDb = () => db;