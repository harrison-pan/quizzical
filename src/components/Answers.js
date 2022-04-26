import Answer from './Answer'

const Answers = (props) => {
  return (
    <div className="answers">
      {props.answers.map((answer) => (
        <Answer
          key={answer.answerId}
          {...answer}
          isAnswerCorrect={props.isAnswerCorrect}
          score={props.score}
          toggleSelect={() =>
            props.toggleSelect(props.questionId, answer.answerId)
          }
        />
      ))}
    </div>
  )
}

export default Answers
