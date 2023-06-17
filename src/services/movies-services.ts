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

export const moviesService = {
  listMovies,
}
