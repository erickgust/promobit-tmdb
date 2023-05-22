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

function BulletPoint () {
  return (
    <span className='after:hidden sm:after:block after:absolute after:w-1 after:h-1 after:rounded-full after:bg-white relative after:top-1/2 after:-translate-y-1/2 after:right-0' />
  )
}

export function MovieDetails () {
  const { movieId } = useParams()

  return (
    <main>
      <header className='bg-[#2e1065] text-white p-4 py-16 sm:max-h-[36rem]'>
        <div className='w-full max-w-7xl mx-auto sm:flex items-start gap-8'>
          <img
            src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg'
            alt='Poster'
            className='object-cover object-center rounded-lg w-44 sm:w-96 drop-shadow-md mx-auto my-9 sm:my-0'
          />

          <div>
            <h1 className='text-3xl font-bold mb-2'>
              Deadpool 2 (2018)
            </h1>

            <div>
              <ul className='flex text-base font-normal flex-col sm:flex-row sm:gap-4'>
                <li>16 anos</li>
                <BulletPoint />
                <li>15/05/2018</li>
                <BulletPoint />
                <li>Ação, Comédia, Aventura</li>
                <BulletPoint />
                <li>1h 59m</li>
              </ul>

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
        </div>
      </header>
    </main>
  )
}
