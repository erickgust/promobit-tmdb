import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Root } from './pages/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />,
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
