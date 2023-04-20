import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: `AIzaSyBGWX16JietbtU2UlJjfZhY7kOJSgZnD7c`,
    authDomain: "budgetbuddy-eeca3.firebaseapp.com",
    projectId: "budgetbuddy-eeca3",
    storageBucket: "budgetbuddy-eeca3.appspot.com",
    messagingSenderId: "11315054409",
    appId: "1:11315054409:web:3b3c1b825ba3bca93abc98",
    measurementId: "G-7YB9VNJWJY"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export const auth = getAuth(app);
  export const db = getFirestore(app);