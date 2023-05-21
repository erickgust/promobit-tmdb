import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Root } from './pages/root'
import { MovieDetails } from './pages/movie-details'

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
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export { App }
