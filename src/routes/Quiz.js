import { nanoid } from 'nanoid'
import { useQuiz } from '../hook/useQuiz'
import { useSWRDataFetch } from '../hook/useSWRDataFetch'
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

const Quiz = () => {
  const { data, isLoading, isError } = useSWRDataFetch(url)

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
  const selectAnswer = (questionId, answerId) => {
    const updatedQuizAnswer = quizData.map((question) => {
      if (question.questionId === questionId) {
        const answers = question.answersArr
        for (let i = 0; i < answers.length; i++) {
          const answer = answers[i]
          if (answer.answerId === answerId) {
            answer.isSelected = !answer.isSelected
          } else {
            answer.isSelected = false
          }
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
            questionId={data.questionId}
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
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <div className="loading"></div> : quizData && displayQuiz()}
    </div>
  )
}

export default Quiz
