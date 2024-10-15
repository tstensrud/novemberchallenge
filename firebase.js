import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0FtFdsURWD-yq0d4EubYGGslH45_5vDo",
  authDomain: "novemberchallenge2024.firebaseapp.com",
  projectId: "novemberchallenge2024",
  storageBucket: "novemberchallenge2024.appspot.com",
  messagingSenderId: "777282888321",
  appId: "1:777282888321:web:cb41fc95180c32349ba380"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);