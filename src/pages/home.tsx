import { useEffect, useState } from 'react'
import { Genres } from '@/components/genres'
import { MovieCard } from '@/components/movie-card'
import { moviesService } from '@/services/movies-services'
import { GenreList, genresService } from '@/services/genres-services'
import { useQuery } from '@tanstack/react-query'

export function Home () {
  const [genres, setGenres] = useState<GenreList>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  const { data, isError, isLoading } = useQuery({
    queryKey: ['movies', selectedGenres],
    queryFn: () => {
      return moviesService.listMovies(selectedGenres)
    },
  })

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

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isError) {
    return <div>Não foi possível obter os filmes</div>
  }

  const movies = data.results

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
