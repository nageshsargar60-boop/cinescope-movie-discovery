import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from 'react'
import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut,type User} from 'firebase/auth'
import {auth,firebaseConfigured} from '../services/firebase'
interface AuthContextValue{user:User|null;loading:boolean;configured:boolean;register:(email:string,password:string)=>Promise<void>;login:(email:string,password:string)=>Promise<void>;logout:()=>Promise<void>}
const AuthContext=createContext<AuthContextValue|null>(null)
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true)
 useEffect(()=>{if(!auth){setLoading(false);return}return onAuthStateChanged(auth,next=>{setUser(next);setLoading(false)})},[])
 const value=useMemo<AuthContextValue>(()=>({user,loading,configured:firebaseConfigured,
  async register(email,password){if(!auth)throw new Error('Firebase is not configured. Add Firebase settings to .env.');await createUserWithEmailAndPassword(auth,email,password)},
  async login(email,password){if(!auth)throw new Error('Firebase is not configured. Add Firebase settings to .env.');await signInWithEmailAndPassword(auth,email,password)},
  async logout(){if(auth)await signOut(auth)}
 }),[user,loading])
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider.');return value}
