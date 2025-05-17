import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkHv5aFySBsadvhuJlJR1VZt1DGKwiqq8",
  authDomain: "moazrovne-back.firebaseapp.com",
  projectId: "moazrovne-back",
  storageBucket: "moazrovne-back.firebasestorage.app",
  messagingSenderId: "211708066289",
  appId: "1:211708066289:web:42fce51052c47194372c50",
  measurementId: "G-VRBC5RCSHW"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);

export { auth, db };
export default firebaseApp