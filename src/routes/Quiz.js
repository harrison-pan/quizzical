import useSWRImmutable from 'swr/immutable'
import axios from 'axios'
import { nanoid } from 'nanoid'
import { useQuiz } from '../hook/useQuiz'
import Question from '../components/Question'
import Answers from '../components/Answers'
import CheckAnswers from '../components/CheckAnswers'

/**
 * use SWR data fetching API: https://swr.vercel.app/docs/data-fetching
 * useSWRImmutable https://swr.vercel.app/docs/revalidation#disable-automatic-revalidations
 * Alternatively a custom hook: useDataApi is working as well
 * e.g. const [{ data, isLoading, isError }, setUrl] = useDataApi(url, [])
 * */
const url = 'https://opentdb.com/api.php?amount=5'
const fetcher = (url) => axios.get(url).then((res) => res.data)

const Quiz = () => {
  const { data, error } = useSWRImmutable(url, fetcher)

  /**
   * use custom hook: useQuiz(data)
   * Alternatively useState and useEffect is working as well
   * e.g.
   * const [quiz, setQuiz] = useState(null)
   * useEffect(() => {}) to handle initial quiz setup
   */
  const [{ code, quizData, score }, setQuiz, setScore] = useQuiz(data)

  /**
   * function: toggle select answer on each question
   */
  const selectAnswer = (id) => {
    const updatedQuizAnswer = quizData.map((question) => {
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

  /**
   * function: check answers on each question
   */
  const checkAnswers = () => {
    // reload page when clicking on "Play again"
    if (score !== undefined) {
      window.location.reload()
    }

    let countScore = 0
    const updatedQuizAnswer = quizData.map((question) => {
      const answers = question.answersArr
      let isAnswerCorrect = false
      for (let i = 0; i < answers.length; i++) {
        const answer = answers[i]
        if (answer.isSelected && answer.isCorrect) {
          isAnswerCorrect = true
          countScore++
          break
        }
      }
      question.isAnswerCorrect = isAnswerCorrect
      return question
    })
    setQuiz(updatedQuizAnswer)
    setScore(countScore)
  }

  /**
   * function: display the whole quiz component
   */
  const displayQuiz = () => {
    if (code !== 0) {
      return <div>Something went wrong ...</div>
    }

    const quizElement = quizData.map((data, index) => (
      <>
        <div key={index} className="question-answers">
          <Question key={data.questionId} questionText={data.questionText} />
          <Answers
            key={nanoid()}
            answers={data.answersArr}
            isAnswerCorrect={data.isAnswerCorrect}
            score={score}
            toggleSelect={selectAnswer}
          />
        </div>
        <div className="break-line"></div>
      </>
    ))

    return (
      <>
        <div className="quiz">{quizElement}</div>
        <CheckAnswers
          key={nanoid()}
          score={score}
          totalQuestions={quizData.length}
          clickToCheck={() => checkAnswers()}
        />
      </>
    )
  }

  /**
   * Render Main Quiz component
   */
  return (
    <div className="main-container">
      {error && <div>Something went wrong ...</div>}
      {!data ? <div className="loading"></div> : quizData && displayQuiz()}
    </div>
  )
}

export default Quiz
