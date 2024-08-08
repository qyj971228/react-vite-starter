import Error from '@/views/Error'
import Home from '@/views/home'
import Profile from '@/views/Profile'
import NotFound from '@/views/404'
import Banned from '@/views/403'
import { Navigate, Outlet } from 'react-router-dom'

export type RouteConfig = {
  path: string;
  name: string;
  element: React.ReactNode;
  errorElement?: React.ReactNode;
  children?: RouteConfig[];
};

function RedirectTo(props: { to: string }) {
  return (
    <>
      <Navigate to={props.to} replace />
      <Outlet />
    </>
  )
}

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
    element: <RedirectTo to="/user/profile" />,
    errorElement: <Error />,
    children: [
      {
        path: 'profile',
        name: '档案',
        element: <Profile />,
        errorElement: <Error />,
      }
    ]
  }
]
