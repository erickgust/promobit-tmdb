import { useEffect, useState } from 'react'
import { GenreItem } from './genre-item'

export type Genre = {
  name: string
  id: number
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY

export function Genres () {
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])

  useEffect(() => {
    async function getGenres () {
      const url = 'https://api.themoviedb.org/3/genre/movie/list?language=pt'

      const response = await fetch(`${url}&api_key=${apiKey}`)
      const data = await response.json()

      setGenres(data.genres)
    }

    getGenres()
  }, [])

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
    <header className='bg-[#2e1065] text-white sm:text-center px-4 py-10'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-2xl sm:text-5xl'>
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </h1>

        <nav className='mt-9'>
          <strong className='text-sm mb-2 inline-block uppercase'>
            Filtre por:
          </strong>

          <ul className='flex gap-3 flex-wrap sm:justify-center'>
            {genres.map(genre => (
              <GenreItem
                key={genre.id}
                genreName={genre.name}
                isSelected={selectedGenres.includes(genre.id)}
                onSelectedGenre={() => handleSelectedGenre(genre.id)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
