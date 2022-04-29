import PropTypes from "prop-types";

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
  );
};

CheckAnswers.propTypes = {
  score: PropTypes.number,
  totalQuestions: PropTypes.number.isRequired,
  clickToCheck: PropTypes.func.isRequired,
};

export default CheckAnswers;
