import Answer from "./Answer";
import PropTypes from "prop-types";

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
  );
};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  score: PropTypes.number,
  toggleSelect: PropTypes.func.isRequired,
  questionId: PropTypes.string.isRequired,
};

export default Answers;
