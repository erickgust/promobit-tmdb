import { z } from 'zod'

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const baseUrl = 'https://api.themoviedb.org/3/'

export async function get <T> (
  zodSchema: z.ZodSchema<T>,
  path: string,
  query: Record<string, string> = {},
): Promise<T> {
  const url = new URL(path, baseUrl)

  for (const [key, value] of Object.entries(query)) {
    url.searchParams.append(key, value)
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data = await response.json()

  return zodSchema.parse(data)
}
