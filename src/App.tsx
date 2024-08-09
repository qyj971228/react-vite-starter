import { BrowserRouter as Router, useLocation, useRoutes } from 'react-router-dom'
import { routerConfigs, subRouterConfigs } from '@/router/index'
import Menu from '@/components/Menu'

const AppRoutes = () => {
  // TODO: 从zustand获取登录状态与页面权限
  const routing = useRoutes([...routerConfigs, ...subRouterConfigs])
  return routing
}

const CurrentPath = () => {
  const location = useLocation()
  return <p>Path: {location.pathname}</p>
}

const App = () => {
  return (
    <Router>
      <h3 className="h-[150px]">
        Navigation
      </h3>
      <div className="flex" style={{ height: 'calc(100vh - 150px)' }}>
        <Menu></Menu>
        <div className='flex-1 overflow-hidden' style={{ width: 'calc(100vw - 256px)' }}>
          <CurrentPath></CurrentPath>
          <AppRoutes />
        </div>
      </div>
    </Router>
  )
}

export default App
