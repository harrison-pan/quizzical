import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import './styles/App.css'

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const Home = lazy(() => import('./routes/Home'))
const Questions = lazy(() => import('./routes/Questions'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Suspense>
  )
}

export default App
