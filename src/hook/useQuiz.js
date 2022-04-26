import { useState, useEffect, useReducer } from 'react'
import { nanoid } from 'nanoid'

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        code: action.code,
        quizData: action.quizData,
      }
    case 'UPDATE_ANSWER':
      return {
        ...state,
        quizData: action.quizData,
      }
    default:
      return state
  }
}

const useQuiz = (data) => {
  const initialState = {
    code: 0,
    quizData: [],
  }

  const [quizData, updateQuizData] = useState()
  const [state, dispatch] = useReducer(quizReducer, initialState)

  useEffect(() => {
    if (data !== undefined) {
      const generateQuizData = () => {
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

      dispatch({
        type: 'INIT',
        code: data.response_code,
        quizData: generateQuizData(),
      })
    }
  }, [data])

  useEffect(() => {
    if (quizData !== undefined) {
      dispatch({
        type: 'UPDATE_ANSWER',
        quizData: quizData,
      })
    }
  }, [quizData])

  return [state, updateQuizData]
}

export { useQuiz }
