import { z } from 'zod'
import { get } from '@/utils/http'

export const discoverScheme = z.object({
  page: z.number(),
  results: z.array(z.object({
    poster_path: z.string().nullable(),
    release_date: z.string(),
    title: z.string(),
    id: z.number(),
  })),
  total_pages: z.number(),
})

export const creditsSchema = z.object({
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

export const movieReqSchema = z.object({
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

function listMovies (genres: number[]) {
  const selectedGenresQuery = genres.join('|')

  const query = {
    language: 'pt-BR',
    sort_by: 'popularity.desc',
    include_adult: 'false',
    include_video: 'false',
    page: '1',
    with_genres: selectedGenresQuery,
  }

  return get(discoverScheme, 'discover/movie', query)
}

function getMovieById (id = '') {
  const query = {
    append_to_response: 'recommendations,release_dates,credits,videos',
    language: 'pt-BR',
  }

  return get(movieReqSchema, `movie/${id}`, query)
}

export const moviesService = {
  listMovies,
  getMovieById,
}
