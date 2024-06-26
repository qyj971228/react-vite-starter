import { ReactNode } from 'react'
import './App.css'

function App({children}: {children: ReactNode}) {
  return (
    <div>APP{children}</div>
  )
}

export default App
