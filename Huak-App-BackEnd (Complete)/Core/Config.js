import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyApbKikGdB1sKoBzdOU8By0q9Gt441T6NE",
    authDomain: "huak-98ade.firebaseapp.com",
    projectId: "huak-98ade",
    storageBucket: "huak-98ade.appspot.com",
    messagingSenderId: "957231815377",
    appId: "1:957231815377:web:c605bec3b6ef43c27943f0",
    measurementId: "G-B02JCXSM2Q"
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);