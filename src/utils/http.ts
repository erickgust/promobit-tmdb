import { z } from 'zod'

export async function get <T> (
  zodSchema: z.ZodSchema<T>,
  path: string,
  query: Record<string, string> = {},
): Promise<T> {
  const baseURL = 'https://api.themoviedb.org/3/'
  const queryParams = new URLSearchParams({
    ...query,
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  })
  const url = `${baseURL}${path}?${queryParams}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return zodSchema.parse(data)
}
