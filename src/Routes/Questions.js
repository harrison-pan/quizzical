import { useDataApi } from '../api/useDataApi'
import { decode } from 'html-entities'
import Answers from './Answers'

const Questions = () => {
  const url = 'https://opentdb.com/api.php?amount=5'
  const [{ data, isLoading, isError }, setUrl] = useDataApi(url, [])

  return (
    <div className="main-container quiz">
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <div className="loading"></div> : displayQuiz(data)}
    </div>
  )
}

const displayQuiz = (data) => {
  if (data.response_code !== 0) {
    return <div>Something went wrong ...</div>
  }

  return data.results.map((question, index) => {
    return (
      <>
        <div key={index} className="question">
          <h3>{decode(question.question)}</h3>
          <Answers
            incorrectAnswers={decode(question.incorrect_answers)}
            correctAnswer={decode(question.correct_answer)}
          />
        </div>
        <div className="break-line"></div>
      </>
    )
  })
}

export default Questions
