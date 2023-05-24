import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Genres } from '@/components/genres'
import { MovieCard } from '@/components/movie-card'

const genresSchema = z.object({
  genres: z.array(z.object({
    name: z.string(),
    id: z.number(),
  })),
})

const discoverScheme = z.object({
  page: z.number(),
  results: z.array(z.object({
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
  })),
  total_pages: z.number(),
})

export type GenreList = z.infer<typeof genresSchema>['genres']
type Movies = z.infer<typeof discoverScheme>['results']

const apiKey = import.meta.env.VITE_TMDB_API_KEY

export function Home () {
  const [movies, setMovies] = useState<Movies>([])

  const [genres, setGenres] = useState<GenreList>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  useEffect(() => {
    async function getGenres () {
      const query = new URLSearchParams({
        api_key: apiKey,
        language: 'pt-BR',
      })

      const url = `https://api.themoviedb.org/3/genre/movie/list?${query}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Não foi possível obter os gêneros')
      }

      const data = await response.json()
      const { genres } = genresSchema.parse(data)

      setGenres(genres)
    }

    getGenres()
  }, [])

  useEffect(() => {
    async function getMovies () {
      const selectedGenresQuery = selectedGenres.join('|')

      const query = new URLSearchParams({
        api_key: apiKey,
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        include_adult: 'false',
        include_video: 'false',
        page: '1',
        with_genres: selectedGenresQuery,
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
  }, [selectedGenres])

  function handleSelectedGenre (id: number) {
    const alreadySelected = selectedGenres.includes(id)

    if (alreadySelected) {
      const filteredGenres = selectedGenres.filter(item => item !== id)

      setSelectedGenres(filteredGenres)
    } else {
      setSelectedGenres(prevState => [...prevState, id])
    }
  }

  return (
    <main>
      <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        onSelectedGenre={handleSelectedGenre}
      />

      <section className='max-w-7xl px-4 py-8 flex justify-center gap-4 sm:gap-8 flex-wrap'>
        {movies.map(movie => (
          <MovieCard
            key={movie.title}
            date={movie.release_date}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
        ))}
      </section>
    </main>
  )
}
