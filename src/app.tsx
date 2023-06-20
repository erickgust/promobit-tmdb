import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Root } from './pages/root'
import { MovieDetails } from './pages/movie-details'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: ':movieId',
        element: <MovieDetails />,
      },
    ],
  },
])

function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export { App }
