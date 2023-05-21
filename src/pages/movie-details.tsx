import { CircularProgress } from '@/components/circular-progress'
import { useParams } from 'react-router-dom'

type AuthorInfoProps = {
  name: string
  role: string
}

function AuthorInfo (props: AuthorInfoProps) {
  return (
    <div className='text-base'>
      <strong>{props.name}</strong>
      <p className='text-sm'>{props.role}</p>
    </div>
  )
}

export function MovieDetails () {
  const { movieId } = useParams()

  return (
    <main>
      <header className='bg-[#2e1065] text-white p-4'>
        <img
          src='https://image.tmdb.org/t/p/w500/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg'
          alt='Poster'
          className='object-cover object-center rounded-lg w-44 drop-shadow-md mx-auto'
        />

        <div>
          <h1 className='text-3xl font-bold'>
            Deadpool 2 (2018)
          </h1>

          <div className='flex text-lg font-normal flex-col'>
            <span>16 anos</span>
            <span>15/05/2018</span>
            <span>Ação, Comédia, Aventura, Ficção científica</span>
            <span>1h 59m</span>

            <div className='flex items-center justify-start gap-1 w-60 my-8'>
              <CircularProgress size={75} percent={76} />
              <span className='inline-block text-base'>
                Avaliação dos usuários
              </span>
            </div>

            <div>
              <h2 className='text-xl font-bold mb-4'>
                Sinopse
              </h2>

              <p className='text-base'>
                Baseado no anti-herói não convencional da Marvel Comics, Deadpool conta a história da origem do ex-agente das Forças Especiais que se tornou o mercenário Wade Wilson. Depois de ser submetido a um desonesto experimento que o deixa com poderes de cura acelerada, Wade adota o alter ego de Deadpool. Armado com suas novas habilidades e um senso de humor negro e distorcido, Deadpool persegue o homem que quase destruiu sua vida.
              </p>
            </div>

            <div className='grid gap-6 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] mt-8'>
              <AuthorInfo name='Rob Liefeld' role='Characters' />
              <AuthorInfo name='Rob Liefeld' role='Characters' />
              <AuthorInfo name='Rob Liefeld' role='Characters' />
              <AuthorInfo name='Rob Liefeld' role='Characters' />
            </div>
          </div>
        </div>
      </header>
    </main>
  )
}
