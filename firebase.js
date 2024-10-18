// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blognextauth-fe822.firebaseapp.com",
  projectId: "blognextauth-fe822",
  storageBucket: "blognextauth-fe822.appspot.com",
  messagingSenderId: "918618874620",
  appId: "1:918618874620:web:ec70a1066aa7d8e0b7ed79"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);



// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 3 * 1024 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }