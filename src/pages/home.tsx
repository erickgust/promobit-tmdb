import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Genres } from '@/components/genres'
import { MovieCard } from '@/components/movie-card'
import { get } from '@/utils/http'

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
    id: z.number(),
  })),
  total_pages: z.number(),
})

export type GenreList = z.infer<typeof genresSchema>['genres']
type Movies = z.infer<typeof discoverScheme>['results']

export function Home () {
  const [movies, setMovies] = useState<Movies>([])

  const [genres, setGenres] = useState<GenreList>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  useEffect(() => {
    async function getGenres () {
      try {
        const { genres } = await get(genresSchema, 'genre/movie/list', {
          language: 'pt-BR',
        })

        setGenres(genres)
      } catch {
        setGenres([])
        throw new Error('Não foi possível obter os gêneros')
      }
    }

    getGenres()
  }, [])

  useEffect(() => {
    async function getMovies () {
      const selectedGenresQuery = selectedGenres.join('|')

      const query = {
        language: 'pt-BR',
        sort_by: 'popularity.desc',
        include_adult: 'false',
        include_video: 'false',
        page: '1',
        with_genres: selectedGenresQuery,
      }

      try {
        const { results } = await get(discoverScheme, 'discover/movie', query)

        setMovies(results)
      } catch {
        setMovies([])
        throw new Error('Não foi possível obter os filmes')
      }
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
            id={movie.id}
          />
        ))}
      </section>
    </main>
  )
}
