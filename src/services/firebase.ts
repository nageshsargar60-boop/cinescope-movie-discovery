import { initializeApp,getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY as string|undefined,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string|undefined,databaseURL:import.meta.env.VITE_FIREBASE_DATABASE_URL as string|undefined,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID as string|undefined,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string|undefined,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string|undefined,appId:import.meta.env.VITE_FIREBASE_APP_ID as string|undefined}
export const firebaseConfigured=Boolean(config.apiKey&&config.authDomain&&config.projectId&&config.appId)
const app=firebaseConfigured?(getApps().length?getApps()[0]:initializeApp(config)):null
export const auth=app?getAuth(app):null
export const database=app&&config.databaseURL?getDatabase(app):null
