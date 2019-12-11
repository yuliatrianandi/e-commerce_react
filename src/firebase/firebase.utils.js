import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCIwWm_b2fgN6HRZTy2k26eHS_Nnba6VJ0",
    authDomain: "e-commerce-react-yt.firebaseapp.com",
    databaseURL: "https://e-commerce-react-yt.firebaseio.com",
    projectId: "e-commerce-react-yt",
    storageBucket: "e-commerce-react-yt.appspot.com",
    messagingSenderId: "1064151281418",
    appId: "1:1064151281418:web:ac8f14de4cfbb392dd14f3",
    measurementId: "G-6984Z4W217"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get()
  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error create data firestore', error.message)
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;