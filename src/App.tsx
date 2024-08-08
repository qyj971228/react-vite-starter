import './App.css'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '@/router/index'

const AppRoutes = () => {
  // TODO: 从zustand获取登录状态
  const routing = useRoutes(routes)
  return routing
}

const App = () => {
  return (
    <div>
      <h3>Navigation</h3>
      <Router>
        <AppRoutes />
      </Router>
    </div>
  )
}

export default App
