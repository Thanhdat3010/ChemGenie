// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Thêm dòng này
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//tait
const firebaseConfig = {
  apiKey: "AIzaSyDJ4nC12lFu8ASZUup7il1wCr-XSh7_qhA",
  authDomain: "login-satweb.firebaseapp.com",
  projectId: "login-satweb",
  storageBucket: "login-satweb.appspot.com",
  messagingSenderId: "694307193524",
  appId: "1:694307193524:web:662e95723f51f7b6cc0de1",
  measurementId: "G-BH50VJN30Y"
};

//dat9900
// const firebaseConfig = {
//   apiKey: "AIzaSyCAIwwcHXVt_dXrSln1qZ0mI7IKJPD7qCk",
//   authDomain: "sat-web-9b4e8.firebaseapp.com",
//   projectId: "sat-web-9b4e8",
//   storageBucket: "sat-web-9b4e8.appspot.com",
//   messagingSenderId: "461995815075",
//   appId: "1:461995815075:web:fe18a2e1065566ef0c4f16",
//   measurementId: "G-97KTVKR2Z0"
// };

//dat2
// const firebaseConfig = {
//   apiKey: "AIzaSyBU7qKdwHaHwCgSgq7zyIVH-6tdGy96qdQ",
//   authDomain: "sat-web-6881f.firebaseapp.com",
//   projectId: "sat-web-6881f",
//   storageBucket: "sat-web-6881f.appspot.com",
//   messagingSenderId: "40748290354",
//   appId: "1:40748290354:web:0723fd564aefc93c15472b",
//   measurementId: "G-0KK1QB4BMV"
// };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
export default app;
