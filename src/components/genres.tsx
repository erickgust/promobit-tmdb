import { GenreList } from '@/services/genres-services'
import { GenreItem } from './genre-item'

type GenresProps = {
  genres: GenreList
  selectedGenres: number[]
  onSelectedGenre: (id: number) => void
}

export function Genres ({ genres, selectedGenres, onSelectedGenre }: GenresProps) {
  return (
    <header className='bg-[#2e1065] text-white sm:text-center px-4 py-10'>
      <div className='max-w-6xl mx-auto font-bold'>
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
                onSelectedGenre={() => onSelectedGenre(genre.id)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
