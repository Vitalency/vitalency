import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAx973RDfN4QH7zmRpQG-8mf2FywcX4IXM',
  authDomain: 'vitalency-dev.firebaseapp.com',
  databaseURL: 'https://vitalency-dev.firebaseio.com',
  projectId: 'vitalency-dev',
  storageBucket: '',
  messagingSenderId: '214492986664',
  appId: '1:214492986664:web:dd1627954ceafd5e'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// let app = null
// if (!firebase.apps.length) {
//   app = firebase.initializeApp(firebaseConfig)
// }

// export const db = app.database()
