import { useDataApi } from '../api/useDataApi'

const Questions = () => {
  const url = 'https://opentdb.com/api.php?amount=5'
  const [{ data, isLoading, isError }, setUrl] = useDataApi(url, [])

  return (
    <div className="quiz-container">
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <div className="loading"></div> : getResult(data)}
    </div>
  )
}

const getResult = (data) => {
  if (data.response_code !== 0) {
    return <div>Something went wrong ...</div>
  }

  return data.results.map((question, index) => {
    return (
      <div key={index} className="quiz">
        <h3>{question.question}</h3>
        <ul>
          {question.incorrect_answers.map((answer, index) => {
            return <li key={index}>{answer}</li>
          })}
        </ul>
      </div>
    )
  })
}

export default Questions
