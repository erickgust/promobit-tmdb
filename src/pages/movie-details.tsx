import { z } from 'zod'
import { CircularProgress } from '@/components/circular-progress'
import { MovieCard } from '@/components/movie-card'
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

type ActorProfileProps = {
  name: string
  character: string
  image: string
}

function ActorProfile (props: ActorProfileProps) {
  return (
    <article className='p-2 rounded-md inline-block overflow-hidden w-48 shadow-md first:ml-0 mx-2'>
      <img
        src={props.image}
        alt='Ryan'
        className='object-center object-cover rounded-md'
        loading='lazy'
      />

      <div className='mt-4'>
        <strong className='text-lg'>{props.name}</strong>
        <p className='text-base pt-1'>{props.character}</p>
      </div>
    </article>
  )
}

const MovieSchema = z.object({
  id: z.number(),
  runtime: z.number(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  vote_average: z.number(),
  recommendations: z.object({
    results: z.array(
      z.object({
        id: z.number(),
        title: z.string(),
        poster_path: z.string(),
        release_date: z.string(),
      }),
    ),
  }),
  release_dates: z.object({
    results: z.array(
      z.object({
        iso_3166_1: z.string(),
        release_dates: z.array(
          z.object({
            certification: z.string(),
            release_date: z.string(),
          }),
        ),
      }),
    ),
  }),
  credits: z.object({
    cast: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        character: z.string(),
        profile_path: z.string().nullable(),
      }),
    ),
    crew: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        job: z.string(),
      }),
    ),
  }),
  videos: z.object({
    results: z.array(
      z.object({
        key: z.string(),
        type: z.string(),
      }),
    ),
  }),
})

type Movie = z.infer<typeof MovieSchema>

const movie: Movie = {
  id: 603692,
  runtime: 170,
  vote_average: 7.954,
  genres: [
    {
      id: 28,
      name: 'Ação',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 80,
      name: 'Crime',
    },
  ],
  title: 'John Wick 4: Baba Yaga',
  overview: 'Com o preço por sua cabeça cada vez maior, John Wick leva sua luta contra a alta mesa global enquanto procura os jogadores mais poderosos do submundo, de Nova York a Paris, de Osaka a Berlim.',
  poster_path: '/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg',
  recommendations: {
    results: [
      {
        id: 1098239,
        title: 'Tangos, Tequilas e Algumas Mentiras',
        poster_path: '/y3z6H8oOS2y3dQY9dEKkxQiLWPn.jpg',
        release_date: '2023-03-09',
      },
      {
        id: 802401,
        title: 'Demon Slayer: Kimetsu no Yaiba Mt. Natagumo Arc',
        poster_path: '/wq1UG5lPCKpOJgmgpKJszKvoMUe.jpg',
        release_date: '2021-04-15',
      },
      {
        id: 24791,
        title: 'A',
        poster_path: '/dBLzrfh5DtxJey1hOYZaN2drPe3.jpg',
        release_date: '1998-09-09',
      },
      {
        id: 502356,
        title: 'Super Mario Bros.: O Filme',
        poster_path: '/ktU3MIeZtuEVRlMftgp0HMX2WR7.jpg',
        release_date: '2023-04-05',
      },
      {
        id: 385687,
        title: 'Velozes & Furiosos 10',
        poster_path: '/nxrmpkwVdmiVAiRTqSSC2SateN2.jpg',
        release_date: '2023-05-17',
      },
      {
        id: 525644,
        title: 'B.O.O.O.M.',
        poster_path: '/skb3JoNXIMNqIeQ5ziA3bY0t2Jq.jpg',
        release_date: '1979-05-21',
      },
    ],
  },
  release_dates: {
    results: [
      {
        iso_3166_1: 'BR',
        release_dates: [
          {
            certification: '16',
            release_date: '2021-05-27',
          },
        ],
      },
    ],
  },
  credits: {
    cast: [
      {
        id: 6384,
        name: 'Keanu Reeves',
        profile_path: '/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg',
        character: 'John Wick',
      },
      {
        id: 1341,
        name: 'Donnie Yen',
        profile_path: '/hTlhrrZMj8hZVvD17j4KyAFWBHc.jpg',
        character: 'Caine',
      },
    ],
    crew: [
      {
        id: 3615,
        name: 'Manfred Banach',
        job: 'Sound Mixer',
      },
      {
        id: 3615,
        name: 'Manfred Banach',
        job: 'Production Sound Mixer',
      },
      {
        id: 3683,
        name: 'Paco Delgado',
        job: 'Costume Design',
      },
      {
        id: 6384,
        name: 'Keanu Reeves',
        job: 'Executive Producer',
      },
    ],
  },
  videos: {
    results: [{
      key: 'Te3L5rT1Q8w',
      type: 'Trailer',
    }],
  },
}

export function MovieDetails () {
  const { movieId } = useParams()
  const releaseInfo = movie.release_dates.results[0].release_dates[0]
  const country = movie.release_dates.results[0].iso_3166_1
  const ageRestriction = releaseInfo.certification
  const releaseDate = releaseInfo.release_date.split('-').reverse().join('/')
  const duration = (
    Math.floor(movie.runtime / 60) + 'h ' +
    (movie.runtime % 60) + 'm'
  )
  const userRating = Math.round(movie.vote_average * 10)

  return (
    <main>
      <header className='bg-[#2e1065] text-white p-4 py-16 sm:max-h-[36rem]'>
        <div className='w-full max-w-7xl mx-auto sm:flex items-start gap-8'>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
            alt='Poster'
            className='object-cover object-center rounded-lg w-44 sm:w-96 drop-shadow-md mx-auto my-9 sm:my-0'
          />

          <div>
            <h1 className='text-3xl font-bold mb-2'>
              {movie.title}
            </h1>

            <div>
              <ul className='flex text-base font-normal flex-col sm:flex-row sm:gap-4'>
                <li>{ageRestriction} anos</li>
                <BulletPoint />
                <li>{releaseDate} ({country})</li>
                <BulletPoint />
                <li>
                  {movie.genres.map(genre => genre.name).join(', ')}
                </li>
                <BulletPoint />
                <li>{duration}</li>
              </ul>

              <div className='flex items-center justify-start gap-1 w-60 my-8'>
                <CircularProgress size={75} percent={userRating} />
                <span className='inline-block text-base'>
                  Avaliação dos usuários
                </span>
              </div>

              <div>
                <h2 className='text-xl font-bold mb-4'>
                  Sinopse
                </h2>

                <p className='text-base'>
                  {movie.overview}
                </p>
              </div>

              <div className='grid gap-6 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] mt-8'>
                {movie.credits.crew.map(crew => (
                  <AuthorInfo
                    key={crew.id}
                    name={crew.name}
                    role={crew.job}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className='mt-11 sm:mt-20 max-w-7xl mx-auto px-4'>
        <section>
          <h2 className='font-bold text-2xl mb-4 sm:mb-6'>Elenco</h2>

          <div className='overflow-x-auto whitespace-nowrap'>
            {movie.credits.cast.map(actor => (
              <ActorProfile
                key={actor.id}
                name={actor.name}
                character={actor.character}
                image={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              />
            ))}
          </div>
        </section>

        <section className='mt-12 sm:mt-16'>
          <h2 className='font-bold text-2xl mb-4 sm:mb-6'>Trailer</h2>

          <div className='aspect-video mt-4 max-w-5xl'>
            <iframe
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              className='w-full h-full'
            />
          </div>
        </section>

        <section className='mt-12 sm:mt-16'>
          <h2 className='font-bold text-2xl mb-4 sm:mb-6'>Recomendações</h2>

          <div className='flex gap-4 sm:gap-8 flex-wrap'>
            {movie.recommendations.results.map(recommendation => (
              <MovieCard
                key={recommendation.id}
                date={recommendation.release_date}
                poster={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                title={recommendation.title}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
