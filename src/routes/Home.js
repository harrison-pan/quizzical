import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()
  return (
    <div className="main-container">
      <h1>Quizzical</h1>
      <h2>A React Quiz App with Trivia API</h2>
      <button className="btn start-quiz" onClick={() => navigate('/questions')}>
        Start quiz
      </button>
    </div>
  )
}

export default Home
