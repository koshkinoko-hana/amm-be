import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBLY2B8e2iZC6NGXsf1WTA3kquTmxivz14',
  authDomain: 'amm-vsu.firebaseapp.com',
  projectId: 'amm-vsu',
  storageBucket: 'amm-vsu.appspot.com',
  messagingSenderId: '1042621159194',
  appId: '1:1042621159194:web:4a3403e4bbb0111f867ea3',
  measurementId: 'G-R1GXSGHRTF',
}

export function initializeFirebaseApp() {
  const app = initializeApp(firebaseConfig)
  // const analytics = getAnalytics(app)
  const storage = getStorage(app)
  return { app, storage }
}
