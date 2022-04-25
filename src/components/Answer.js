import { decode } from 'html-entities'

const Answer = (props) => {
  const styles = {
    backgroundColor: props.isSelected ? '#848cb5' : '#f5f7fb',
    border: props.isSelected ? 'none' : '0.8px solid #4d5b9e',
  }

  return (
    <div className="answer" style={styles} onClick={props.toggleSelect}>
      {decode(props.answerText)}
    </div>
  )
}

export default Answer
