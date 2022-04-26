const CheckAnswers = (props) => {
  return (
    <div className="footer">
      {props.score !== undefined && (
        <p className="score-text">
          You scored {props.score}/{props.totalQuestions} correct answers
        </p>
      )}
      <button className="check-answer-btn" onClick={props.clickToCheck}>
        {props.score >= 0 ? `Play again` : `Check answers`}
      </button>
    </div>
  )
}

export default CheckAnswers
