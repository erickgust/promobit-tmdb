import { get } from '@/utils/http'
import { z } from 'zod'

const genresSchema = z.object({
  genres: z.array(z.object({
    name: z.string(),
    id: z.number(),
  })),
})

export type GenreList = z.infer<typeof genresSchema>['genres']

function listGenres () {
  const query = {
    language: 'pt-BR',
  }

  return get(genresSchema, 'genre/movie/list', query)
}

export const genresService = {
  listGenres,
}
