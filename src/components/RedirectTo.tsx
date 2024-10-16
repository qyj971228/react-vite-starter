import { Navigate, Outlet } from 'react-router-dom'

export function RedirectTo(props: { to: string }) {
  return (
    <>
      <Navigate
        to={props.to}
        replace
      />
      <Outlet />
    </>
  )
}
