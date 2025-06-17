// lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9xebZWI6ItNYr2iGhmenZNMZj1fhmMBE",
  authDomain: "vrook-comments.firebaseapp.com",
  projectId: "vrook-comments",
  storageBucket: "vrook-comments.firebasestorage.app",
  messagingSenderId: "281211962162",
  appId: "1:281211962162:web:1febe65d503b555bbf4d2b"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)