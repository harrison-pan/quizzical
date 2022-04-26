import useSWR from 'swr'
import axios from 'axios'
import { useQuiz } from '../hook/useQuiz'
import Question from '../components/Question'
import Answer from '../components/Answer'
import CheckAnswers from '../components/CheckAnswers'
import { nanoid } from 'nanoid'

const Quiz = () => {
  /**
   * use SWR data fetching API: https://swr.vercel.app/docs/data-fetching
   * Alternatively a custom hook: useDataApi is working as well
   * e.g. const [{ data, isLoading, isError }, setUrl] = useDataApi(url, [])
   * */
  const url = 'https://opentdb.com/api.php?amount=5'
  const fetcher = (url) => axios.get(url).then((res) => res.data)
  const { data, error } = useSWR(url, fetcher)

  /**
   * use custom hook: useQuiz(data)
   * Alternatively useState and useEffect is working as well
   * e.g.:
   * const [quiz, setQuiz] = useState(null)
   * useEffect(() => {}) to handle initial quiz setup
   */
  const [quiz, setQuiz] = useQuiz(data)

  // toggle select answer on each question
  const selectAnswer = (id) => {
    const updatedQuizAnswer = quiz.quizData.map((question) => {
      const answers = question.answersArr
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i]
        if (answer.answerId === id) {
          answer.isSelected = !answer.isSelected
          break
        }
      }
      return question
    })
    setQuiz(updatedQuizAnswer)
  }

  // display the whole quiz
  const displayQuiz = (quiz) => {
    if (quiz.code !== 0) {
      return <div>Something went wrong ...</div>
    }

    const quizElement = quiz.quizData.map((data, index) => {
      return (
        <>
          <div key={index} className="question-answers">
            <Question key={data.questionId} questionText={data.questionText} />
            {displayAnswers(data.answersArr)}
          </div>
          <div className="break-line"></div>
        </>
      )
    })

    return (
      <>
        <div className="quiz">{quizElement}</div>
        <CheckAnswers key={nanoid()} />
      </>
    )
  }

  // display answers for each question
  const displayAnswers = (answers) => {
    return (
      <div className="answers">
        {answers.map((answer) => (
          <Answer
            key={answer.answerId}
            {...answer}
            toggleSelect={() => selectAnswer(answer.answerId)}
          />
        ))}
      </div>
    )
  }

  // Main Quiz component
  return (
    <div className="main-container">
      {error && <div>Something went wrong ...</div>}
      {!data ? <div className="loading"></div> : quiz && displayQuiz(quiz)}
    </div>
  )
}

export default Quiz
