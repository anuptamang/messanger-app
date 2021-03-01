import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCHm1c8jR71FWXfHYF_U4YHd1o9yDMo1ng',
  authDomain: 'messanger-app-1cf48.firebaseapp.com',
  projectId: 'messanger-app-1cf48',
  storageBucket: 'messanger-app-1cf48.appspot.com',
  messagingSenderId: '704584310386',
  appId: '1:704584310386:web:6587933adfc8f380a6aceb',
  measurementId: 'G-FJ14PCJLQQ',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
