import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG3UGx9jMEBiLc0qbYuuv4Qm5dr1iNTv0",
  authDomain: "todolist-7b85d.firebaseapp.com",
  projectId: "todolist-7b85d",
  storageBucket: "todolist-7b85d.appspot.com",
  messagingSenderId: "115234993186",
  appId: "1:115234993186:web:2de5808efd287531b7c67b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
