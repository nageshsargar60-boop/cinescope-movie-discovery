import type { Movie, OmdbSearchResponse } from '../models/Movie'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string | undefined
const API_URL = 'https://www.omdbapi.com/'
const seedTitles = ['Batman','Avengers','Harry Potter','Spider-Man','Star Wars','The Matrix','Toy Story','Jurassic Park']
async function request(params:Record<string,string>):Promise<OmdbSearchResponse>{
 if(!API_KEY || API_KEY==='your_omdb_api_key') throw new Error('OMDb API key is missing. Add VITE_OMDB_API_KEY to your .env file.')
 const url=new URL(API_URL); url.search=new URLSearchParams({apikey:API_KEY,...params}).toString()
 const response=await fetch(url); if(!response.ok) throw new Error(`Movie service returned HTTP ${response.status}.`)
 return response.json() as Promise<OmdbSearchResponse>
}
export async function searchMovies(query:string):Promise<Movie[]>{
 const trimmed=query.trim(); if(!trimmed)return []
 const data=await request({s:trimmed,type:'movie'})
 if(data.Response==='False'){if(data.Error==='Movie not found!')return [];throw new Error(data.Error||'Could not search movies.')}
 return data.Search??[]
}
export async function getPopularMovies():Promise<Movie[]>{
 const batches=await Promise.allSettled(seedTitles.map(title=>searchMovies(title)))
 const byId=new Map<string,Movie>()
 for(const batch of batches)if(batch.status==='fulfilled')for(const movie of batch.value)if(movie.Poster!=='N/A')byId.set(movie.imdbID,movie)
 return shuffle([...byId.values()]).slice(0,20)
}
function shuffle<T>(items:T[]):T[]{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
