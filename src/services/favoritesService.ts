import { get,ref,remove,set } from 'firebase/database'
import type { Movie } from '../models/Movie'
import { database } from './firebase'
function requireDatabase(){if(!database)throw new Error('Firebase Realtime Database is not configured. Add Firebase settings to .env.');return database}
export async function getFavorites(uid:string):Promise<Movie[]>{const snapshot=await get(ref(requireDatabase(),`favorites/${uid}`));if(!snapshot.exists())return [];return Object.values(snapshot.val() as Record<string,Movie>)}
export async function saveFavorite(uid:string,movie:Movie):Promise<void>{await set(ref(requireDatabase(),`favorites/${uid}/${movie.imdbID}`),movie)}
export async function deleteFavorite(uid:string,movieId:string):Promise<void>{await remove(ref(requireDatabase(),`favorites/${uid}/${movieId}`))}
