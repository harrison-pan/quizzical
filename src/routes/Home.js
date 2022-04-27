import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({ difficulty: '' })

  function handleSubmit(event) {
    event.preventDefault()
    // let formData = new FormData(event.currentTarget)
    // let newLevel = formData.get('difficulty')
    // if (!newLevel) return
    const newLevel = formData.difficulty
    navigate(`/quiz?difficulty=${newLevel}`)
  }

  const handleChange = (event) => {
    setFormData((preFormData) => {
      return {
        ...preFormData,
        [event.target.name]: event.target.value,
      }
    })
  }

  return (
    <main>
      <form className="main-container" onSubmit={handleSubmit}>
        <h1>Quizzical</h1>
        <h2>A React Quiz App with Trivia API</h2>
        <label>Select Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="btn start-quiz" type="submit">
          Start Quiz
        </button>
      </form>
    </main>
  )
}

export default Home
