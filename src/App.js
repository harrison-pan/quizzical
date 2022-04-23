import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import './Styles/App.css'

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const Home = lazy(() => import('./Routes/Home'))
const Questions = lazy(() => import('./Routes/Questions'))

function App() {
  return (
    <div className="main-container">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
