// public/firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9xebZWI6ItNYr2iGhmenZNMZj1fhmMBE",
  authDomain: "vrook-comments.firebaseapp.com",
  projectId: "vrook-comments",
  storageBucket: "vrook-comments.firebasestorage.app",
  messagingSenderId: "281211962162",
  appId: "1:281211962162:web:1febe65d503b555bbf4d2b"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);

console.log('Firebase 초기화 완료');