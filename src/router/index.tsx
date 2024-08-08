import Error from '@/views/Error'
import Home from '@/views/home'
import Profile from '@/views/Profile'
import NotFound from '@/views/404'
import Banned from '@/views/403'
import { RedirectTo } from '@/components/RedirectTo'

export type RouteConfig = {
  path: string;
  name: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
  children?: RouteConfig[];
};

export const subRouterConfigs: RouteConfig[] = [
  {
    path: '/403',
    name: '403',
    element: <Banned />,
  },
  {
    path: '*',
    name: '404',
    element: <NotFound />,
  },
]

export const routerConfigs: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/user',
    name: '用户',
    element: <RedirectTo to="/user/profile1" />,
    errorElement: <Error />,
    children: [
      {
        path: 'profile1',
        name: '档案1',
        element: <Profile />,
        errorElement: <Error />,
      },
      {
        path: 'profile2',
        name: '档案2',
        element: <RedirectTo to="/user/profile2/index" />,
        errorElement: <Error />,
        children: [
          {
            path: 'index',
            name: 'index',
            element: <Profile />,
            errorElement: <Error />,
          },
        ]
      }
    ]
  }
]
