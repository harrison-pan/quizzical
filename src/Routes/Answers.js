import { useState } from 'react'
import { decode } from 'html-entities'

const Answers = (props) => {
  const [answersArray, setAnswersArray] = useState(
    answers(props.incorrectAnswers, props.correctAnswer)
  )

  return (
    <div className="answers">
      {answersArray.map((answer, index) => {
        return (
          <div key={index} className="answer">
            {decode(answer)}
          </div>
        )
      })}
    </div>
  )
}

const answers = (incorrectAnswers, correctAnswer) => {
  const answersArray = [...incorrectAnswers]
  answersArray.push(correctAnswer)
  return answersArray.sort(() => Math.random() - 0.5)
}

export default Answers
