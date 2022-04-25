import { useDataApi } from '../api/useDataApi'
import { decode } from 'html-entities'
import Answers from '../components/Answers'
import CheckAnswers from '../components/CheckAnswers'

const Questions = () => {
  const url = 'https://opentdb.com/api.php?amount=5'
  const [{ data, isLoading, isError }, setUrl] = useDataApi(url, [])

  return (
    <div className="main-container">
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <>
          {displayQuiz(data)}
          <CheckAnswers />
        </>
      )}
    </div>
  )
}

const displayQuiz = (data) => {
  if (data.response_code !== 0) {
    return <div>Something went wrong ...</div>
  }

  const questionsElement = data.results.map((question, index) => {
    return (
      <>
        <div key={index} className="question">
          <h3>{decode(question.question)}</h3>
          <Answers
            incorrectAnswers={question.incorrect_answers}
            correctAnswer={decode(question.correct_answer)}
          />
        </div>
        <div className="break-line"></div>
      </>
    )
  })

  return <div className="quiz">{questionsElement}</div>
}

export default Questions
