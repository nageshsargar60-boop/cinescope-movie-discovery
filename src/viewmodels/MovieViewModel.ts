import {useCallback,useEffect,useState} from 'react'
import type {Movie} from '../models/Movie'
import {getPopularMovies,searchMovies} from '../services/omdbService'
export function useMovies(){
 const [movies,setMovies]=useState<Movie[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('')
 const loadPopular=useCallback(async()=>{setLoading(true);setError('');try{const result=await getPopularMovies();setMovies(result);if(!result.length)setError('No movies returned. Check your OMDb key and try again.')}catch(err){setError(err instanceof Error?err.message:'Unable to load movies.')}finally{setLoading(false)}},[])
 const search=useCallback(async(query:string)=>{setLoading(true);setError('');try{const result=await searchMovies(query);setMovies(result);if(!result.length)setError(`No movies found for “${query}”. Try another keyword.`)}catch(err){setError(err instanceof Error?err.message:'Unable to search movies.')}finally{setLoading(false)}},[])
 useEffect(()=>{void loadPopular()},[loadPopular])
 return {movies,loading,error,loadPopular,search}
}
