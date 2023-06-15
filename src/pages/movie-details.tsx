import { z } from 'zod'
import { CircularProgress } from '@/components/circular-progress'
import { MovieCard } from '@/components/movie-card'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { ReactComponent as DefaultImage } from '@/assets/icons/default.svg'

type CrewInfoProps = {
  name: string
  role: string
}

function CrewInfo (props: CrewInfoProps) {
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
  const isImageNull = props.image.includes('null')

  return (
    <article className='p-2 rounded-md inline-block overflow-hidden w-48 shadow-md first:ml-0 mx-2'>
      {!isImageNull ? (
        <img
          src={props.image}
          alt={props.name}
          className='object-center object-cover rounded-md'
          loading='lazy'
        />
      ) : (
        <div className='bg-gray-100 flex justify-center items-center rounded-md h-66'>
          <DefaultImage
            className='w-24'
            aria-label='No actor image available'
          />
        </div>
      )}

      <div className='mt-4'>
        <strong className='text-lg'>{props.name}</strong>
        <p className='text-base pt-1'>{props.character}</p>
      </div>
    </article>
  )
}

const creditsSchema = z.object({
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
})

const movieReqSchema = z.object({
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
        poster_path: z.string().nullable(),
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
  release_date: z.string(),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
    }),
  ),
  credits: creditsSchema,
  videos: z.object({
    results: z.array(
      z.object({
        key: z.string(),
        type: z.string(),
      }),
    ),
  }),
})

type Movie = {
  id: number
  genres: {
    id: number
    name: string
  }[]
  title: string
  overview: string
  posterPath: string
  recommendations: {
    id: number
    title: string
    poster_path: string | null
    release_date: string
  }[]
  credits: z.infer<typeof creditsSchema>
  trailer?: {
    key: string
  }
  ageRestriction: string
  releaseDate: string
  country: string
  duration: string
  userRating: number
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY

export function MovieDetails () {
  const { movieId } = useParams()
  const [movieData, setMovieData] = useState<Movie | null>(null)
  const topCrewMembers = movieData?.credits.crew.slice(0, 5)

  useEffect(() => {
    async function getDetails () {
      const query = new URLSearchParams({
        api_key: apiKey,
        append_to_response: 'recommendations,release_dates,credits,videos',
        language: 'pt-BR',
      })

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?${query}`,
      )

      if (response.ok) {
        const data = await response.json()
        const movie = movieReqSchema.parse(data)

        const brReleaseExists = movie.release_dates.results.find(item => (
          item.iso_3166_1 === 'BR'
        ))

        const originalCountry = movie.production_countries[0].iso_3166_1

        const releaseInfo = brReleaseExists
          ? { ...brReleaseExists.release_dates[0], country: 'BR' }
          : {
              certification: 'G',
              release_date: movie.release_date,
              country: originalCountry,
            }

        const releaseDate = new Date(releaseInfo.release_date)
          .toLocaleDateString('pt-BR')

        const duration = Math.floor(movie.runtime / 60) + 'h ' + (movie.runtime % 60) + 'm'

        setMovieData({
          id: movie.id,
          genres: movie.genres,
          title: movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          recommendations: movie.recommendations.results.slice(0, 6),
          credits: movie.credits,
          trailer: movie.videos.results.find(item => item.type === 'Trailer'),
          ageRestriction: releaseInfo.certification,
          country: releaseInfo.country,
          releaseDate,
          duration,
          userRating: Math.round(movie.vote_average * 10),
        })
      }
    }

    getDetails()
  }, [movieId])

  return (
    <main>
      <header className='bg-[#2e1065] text-white p-4 py-16 sm:max-h-[36rem]'>
        <div className='w-full max-w-7xl mx-auto sm:flex items-start gap-8'>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieData?.posterPath}`}
            alt='Poster'
            className='object-cover object-center rounded-lg w-44 sm:w-96 max-w-sm drop-shadow-md mx-auto my-9 sm:my-0'
          />

          <div className='w-full'>
            <h1 className='text-3xl font-bold mb-2'>
              {movieData?.title}
            </h1>

            <div>
              <ul className='flex text-base font-normal flex-col sm:flex-row sm:gap-4'>
                <li>{movieData?.ageRestriction} anos</li>
                <BulletPoint />
                <li>{movieData?.releaseDate} ({movieData?.country})</li>
                <BulletPoint />
                <li>
                  {movieData?.genres.map(genre => genre.name).join(', ')}
                </li>
                <BulletPoint />
                <li>{movieData?.duration}</li>
              </ul>

              <div className='flex items-center justify-start gap-1 w-60 my-8'>
                <CircularProgress size={75} percent={movieData?.userRating ?? 0} />
                <span className='inline-block text-base'>
                  Avaliação dos usuários
                </span>
              </div>

              <div>
                <h2 className='text-xl font-bold mb-4'>
                  Sinopse
                </h2>

                <p className='text-base'>
                  {movieData?.overview}
                </p>
              </div>

              <div className='grid gap-6 grid-cols-[repeat(auto-fit,minmax(100px,1fr))] mt-8'>
                {topCrewMembers?.map(crewMember => (
                  <CrewInfo
                    key={crewMember.id}
                    name={crewMember.name}
                    role={crewMember.job}
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
            {movieData?.credits.cast.map(actor => (
              <ActorProfile
                key={actor.id}
                name={actor.name}
                character={actor.character}
                image={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              />
            ))}
          </div>
        </section>

        {!!movieData?.trailer && (
        <section className='mt-12 sm:mt-16'>
          <h2 className='font-bold text-2xl mb-4 sm:mb-6'>Trailer</h2>

          <div className='aspect-video mt-4 max-w-5xl'>
            <iframe
              src={`https://www.youtube.com/embed/${movieData?.trailer.key}`}
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              className='w-full h-full'
            />
          </div>
        </section>
        )}

        <section className='mt-12 sm:mt-16'>
          <h2 className='font-bold text-2xl mb-4 sm:mb-6'>Recomendações</h2>

          <div className='flex gap-4 sm:gap-8 flex-wrap'>
            {movieData?.recommendations.map(recommendation => (
              <MovieCard
                key={recommendation.id}
                date={recommendation.release_date}
                poster={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                title={recommendation.title}
                id={recommendation.id}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
