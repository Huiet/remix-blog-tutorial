import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import he from 'he';

QuestionCard.propTypes = {
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  type: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  onAnswer: PropTypes.func
};

interface questionProps {
  question: string;
  correct_answer: string;
  type: string;
  answers: string[];
  onAnswer: (correctAnswer: boolean) => any;
}

function QuestionCard({ question, correct_answer, type, onAnswer, answers }: questionProps) {

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question]);

  const handleAnswer = (e: any) => {
    if(!selectedAnswer) {
      setSelectedAnswer(e.target.value);
      onAnswer(isCorrectAnswer(e.target.value));
    }
  };

  const isCorrectAnswer = (value: string) => {
    return value == he.decode(correct_answer);
  }

  const styleButtons = (value: string) => {
    let btnClass = 'btn ';
    if(selectedAnswer) {
      btnClass += 'no-animation cursor-default '
      if(isCorrectAnswer(value)) {
        btnClass += 'btn-success ';
        if(selectedAnswer !== value) {
          btnClass += 'btn-outline '
        }
      } else {
        btnClass += 'btn-error '
        if(selectedAnswer !== value) {
          btnClass += 'btn-outline '
        }
      }
    } else {
      btnClass += 'btn-accent ';
    }
    return btnClass;
  }

  return (
    <div>
      <h3 className="text-center mx-2 text-xl place-items-center">
        {he.decode(question)}
      </h3>

      {type === "boolean" &&
      <div className="flex w-full justify-center align-center gap-4 mt-10">
        <input type={"button"} className={styleButtons('True')} value="true" onClick={handleAnswer} />
        <div className="divider divider-horizontal">OR</div>
        <input type={"button"} className={styleButtons('False')} value="false" onClick={handleAnswer} />
      </div>
      }

      {type === "multiple" &&
      <div className="flex flex-col w-full align-center gap-2 mt-10 items-center">
        {answers.map(answer => (
          <input key={answer}
                 type={"button"}
                 className={styleButtons(he.decode(answer)) + ' w-full max-w-lg mx-4'}
                 value={(he.decode(answer))} onClick={handleAnswer}/>
        ))}
      </div>
      }
    </div>
  );
}

export default QuestionCard;
