import Error from '@/views/Error'
import Home from '@/views/home'
import NotFound from '@/views/404'
import Banned from '@/views/403'

const router = [
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/403',
    element: <Banned />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default router
