import {useCallback,useEffect,useState} from 'react'
import type {Movie} from '../models/Movie'
import {deleteFavorite,getFavorites,saveFavorite} from '../services/favoritesService'
export function useFavorites(uid?:string){
 const [favorites,setFavorites]=useState<Movie[]>([]);const [loading,setLoading]=useState(false);const [error,setError]=useState('')
 const refresh=useCallback(async()=>{if(!uid){setFavorites([]);return}setLoading(true);setError('');try{setFavorites(await getFavorites(uid))}catch(err){setError(err instanceof Error?err.message:'Could not load favorites.')}finally{setLoading(false)}},[uid])
 useEffect(()=>{void refresh()},[refresh])
 const toggle=useCallback(async(movie:Movie)=>{if(!uid)throw new Error('Please sign in to manage favorites.');setError('');const exists=favorites.some(item=>item.imdbID===movie.imdbID);try{if(exists)await deleteFavorite(uid,movie.imdbID);else await saveFavorite(uid,movie);await refresh()}catch(err){const message=err instanceof Error?err.message:'Could not update favorites.';setError(message);throw err}},[uid,favorites,refresh])
 return {favorites,loading,error,refresh,toggle}
}
