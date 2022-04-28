import { useState, useEffect, useReducer } from "react";
import { nanoid } from "nanoid";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        code: action.code,
        quizData: action.quizData,
      };
    case "UPDATE_ANSWER":
      return {
        ...state,
        quizData: action.quizData,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        quizData: action.quizData,
        score: action.score,
      };
    default:
      return state;
  }
};

const useQuiz = (data) => {
  const [quizData, updateQuizData] = useState();
  const [score, setScore] = useState();

  const initialState = {
    code: 0,
    quizData: quizData,
    score: score,
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);

  /**
   * handle initial quiz state setup
   */
  useEffect(() => {
    if (data !== undefined) {
      const generateQuizData = () => {
        return data.results.map((question) => {
          const answersArray = question.incorrect_answers.map((answer) =>
            initEachAnswer(answer, false)
          );
          answersArray.push(initEachAnswer(question.correct_answer, true));

          return {
            questionId: nanoid(),
            questionText: question.question,
            isAnswerCorrect: false,
            answersArr: answersArray.sort(() => Math.random() - 0.5),
          };
        });
      };

      const initEachAnswer = (text, isCorrect) => {
        return {
          answerText: text,
          isSelected: false,
          isCorrect: isCorrect,
          answerId: nanoid(),
        };
      };

      dispatch({
        type: "INIT",
        code: data.response_code,
        quizData: generateQuizData(),
      });
    }
  }, [data]);

  /**
   * handle update answer/score state
   */
  useEffect(() => {
    if (quizData !== undefined) {
      if (score !== undefined) {
        dispatch({
          type: "UPDATE_SCORE",
          quizData: quizData,
          score: score,
        });
        return;
      }

      dispatch({
        type: "UPDATE_ANSWER",
        quizData: quizData,
      });
    }
  }, [quizData, score]);

  return [state, updateQuizData, setScore];
};

export { useQuiz };
