import { GenreItem } from './genre-item'

const genres = ['Ação', 'Aventura', 'Animação', 'Comédia', 'Crime', 'Documentário', 'Drama', 'Família', 'Fantasia', 'História', 'Terror', 'Música', 'Mistério', 'Romance', 'Ficção científica', 'Cinema TV', 'Thriller', 'Guerra', 'Faroeste']

export function Genres () {
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
              <GenreItem key={genre} genre={genre} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
