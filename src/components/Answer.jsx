import { decode } from "html-entities";
import PropTypes from "prop-types";

const Answer = (props) => {
  const setStyles = () => {
    if (props.score !== undefined) {
      if ((props.isSelected && props.isAnswerCorrect) || props.isCorrect) {
        return { backgroundColor: "#94D7A2", border: "none" };
      } else if (props.isSelected && !props.isAnswerCorrect) {
        return { backgroundColor: "#F8BCBC", border: "none" };
      } else if (!props.isSelected) {
        return { border: "0.7px solid #4d5b9e" };
      }
    } else {
      return props.isSelected
        ? { backgroundColor: "#848cb5", border: "none" }
        : { backgroundColor: "#f5f7fb", border: "0.7px solid #4d5b9e" };
    }
  };

  return (
    <div className="answer" style={setStyles()} onClick={props.toggleSelect}>
      {decode(props.answerText)}
    </div>
  );
};

Answer.propTypes = {
  answerText: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isAnswerCorrect: PropTypes.bool.isRequired,
  score: PropTypes.number,
  toggleSelect: PropTypes.func.isRequired,
};

export default Answer;
