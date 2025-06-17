// public/firebase-init.js
// CDN 방식으로 Firebase 초기화
const firebaseConfig = {
  apiKey: "AIzaSyC9xebZWI6ItNYr2iGhmenZNMZj1fhmMBE",
  authDomain: "vrook-comments.firebaseapp.com",
  projectId: "vrook-comments",
  storageBucket: "vrook-comments.firebasestorage.app",
  messagingSenderId: "281211962162",
  appId: "1:281211962162:web:1febe65d503b555bbf4d2b"
};

// Firebase 초기화 (글로벌 firebase 객체 사용)
const app = firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();

console.log('Firebase 초기화 완료');