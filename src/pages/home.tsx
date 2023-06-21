import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Genres } from '@/components/genres'
import { Spinner } from '@/components/spinner'
import { MovieCard } from '@/components/movie-card'
import { moviesService } from '@/services/movies-services'
import { genresService } from '@/services/genres-services'

export function Home () {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  const { data, isError, isLoading } = useQuery({
    queryKey: ['movies', selectedGenres],
    queryFn: () => {
      return moviesService.listMovies(selectedGenres)
    },
  })

  const { data: genresData } = useQuery({
    queryKey: ['genres'],
    queryFn: genresService.listGenres,
  })

  if (isError) {
    return <div>Não foi possível obter os filmes</div>
  }

  const genres = genresData?.genres ?? []
  const movies = data?.results
  const hasMovies = !isLoading && !!movies?.length

  function handleSelectedGenre (id: number) {
    const alreadySelected = selectedGenres.includes(id)

    if (alreadySelected) {
      const filteredGenres = selectedGenres.filter(item => item !== id)

      setSelectedGenres(filteredGenres)
    } else {
      setSelectedGenres(prevState => {
        return [...prevState, id].sort()
      })
    }
  }

  return (
    <main>
      <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        onSelectedGenre={handleSelectedGenre}
      />

      {isLoading && (
        <div className='flex justify-center items-center mt-10'>
          <Spinner />
        </div>
      )}

      {hasMovies && (
        <section className='mx-auto max-w-7xl px-4 py-8 flex justify-center gap-4 sm:gap-8 flex-wrap'>
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
      )}

    </main>
  )
}
