import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: '',
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
export const DB = firebase.firestore()

export default firebase
