import { decode } from "html-entities";
import PropTypes from "prop-types";

const Question = (props) => {
  return <h3>{decode(props.questionText)}</h3>;
};

Question.propTypes = { questionText: PropTypes.string.isRequired };

export default Question;
