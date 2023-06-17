import { z } from 'zod'
import { useEffect, useState } from 'react'
import { Genres } from '@/components/genres'
import { MovieCard } from '@/components/movie-card'
import { discoverScheme, moviesService } from '@/services/movies-services'
import { GenreList, genresService } from '@/services/genres-services'

type Movies = z.infer<typeof discoverScheme>['results']

export function Home () {
  const [movies, setMovies] = useState<Movies>([])

  const [genres, setGenres] = useState<GenreList>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  useEffect(() => {
    async function getGenres () {
      try {
        const { genres } = await genresService.listGenres()

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
      try {
        const { results } = await moviesService.listMovies(selectedGenres)

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
