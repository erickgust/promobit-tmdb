import { useEffect, useState } from 'react'
import { Genres } from '@/components/genres'
import { Header } from '@/components/header'
import { Post } from '@/components/post'
import poster from '@/assets/poster.png'
import { z } from 'zod'

const discoverScheme = z.object({
  page: z.number(),
  results: z.array(z.object({
    poster_path: z.string(),
    release_date: z.string(),
    title: z.string(),
  })),
  total_pages: z.number(),
})

type Movies = z.infer<typeof discoverScheme>['results']

export function Home () {
  const [movies, setMovies] = useState<Movies>([])

  useEffect(() => {
    async function getMovies () {
      const query = new URLSearchParams({
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        include_adult: 'false',
        include_video: 'false',
        page: '1',
      })

      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?${query}`)

      if (!response.ok) {
        throw new Error('Não foi possível obter os filmes')
      }

      const data = await response.json()
      const { results } = discoverScheme.parse(data)

      setMovies(results)
    }

    getMovies()
  }, [])

  return (
    <div>
      <Header />

      <main>
        <Genres />

        <section className='max-w-7xl px-4 py-8 flex justify-center gap-4 flex-wrap'>
          {movies.map(movie => (
            <Post
              key={movie.title}
              date={movie.release_date}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
            />
          ))}
        </section>
      </main>
    </div>
  )
}
