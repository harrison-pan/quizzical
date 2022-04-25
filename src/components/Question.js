import { decode } from 'html-entities'

const Question = (props) => {
  return <h3>{decode(props.questionText)}</h3>
}

export default Question
