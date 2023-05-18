import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Header } from '@/components/header'
import { Home } from './pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

function App () {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  )
}

export { App }
