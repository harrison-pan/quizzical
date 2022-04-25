import { useDataApi } from '../api/useDataApi'
import Question from '../components/Question'
import Answer from '../components/Answer'
import CheckAnswers from '../components/CheckAnswers'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'

const Quiz = () => {
  const url = 'https://opentdb.com/api.php?amount=5'
  const [{ data, isLoading, isError }, setUrl] = useDataApi(url, [])
  const [quiz, setQuiz] = useState(null)
  useEffect(() => {
    if (data.length !== 0) {
      const generateQuiz = () => {
        return {
          code: data.response_code,
          quizData: quizData(),
        }
      }

      const quizData = () => {
        return data.results.map((question) => {
          const answersArray = question.incorrect_answers.map((answer) =>
            initEachAnswer(answer, false)
          )
          answersArray.push(initEachAnswer(question.correct_answer, true))

          return {
            questionId: nanoid(),
            questionText: question.question,
            answersArr: answersArray.sort(() => Math.random() - 0.5),
          }
        })
      }

      const initEachAnswer = (text, isCorrect) => {
        return {
          answerText: text,
          isSelected: false,
          isCorrect: isCorrect,
          answerId: nanoid(),
        }
      }

      setQuiz(generateQuiz())
    }
  }, [data])

  // toggle select answer on each question
  const selectAnswer = (id) => {
    setQuiz((prevState) => {
      const newState = { ...prevState }
      newState.quizData.forEach((question) => {
        question.answersArr.forEach((answer) => {
          if (answer.answerId === id) {
            answer.isSelected = !answer.isSelected
          } else {
            answer.isSelected = false
          }
        })
      })
      return newState
    })
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

    return <div className="quiz">{quizElement}</div>
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
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <>
          {quiz && displayQuiz(quiz)}
          <CheckAnswers key={nanoid()} />
        </>
      )}
    </div>
  )
}

export default Quiz
