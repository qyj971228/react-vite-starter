import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '@/error-page'
import Home from '@/views/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
])

export default router
