import React from "react";
import PropTypes from "prop-types";
import { f } from "msw/lib/glossary-297d38ba";

QuestionCard.propTypes = {
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  difficulty: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  onAnswer: PropTypes.func
};

interface questionProps {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
  difficulty: string;
  answers: string[];
  onAnswer: (correctAnswer: boolean) => any;
}

function QuestionCard({ question, correct_answer, incorrect_answers, type, difficulty, onAnswer, answers }: questionProps) {




  const handleAnswer = (e: any) => {
    console.log("e", e, e.target.value);
    console.log("correct_answer", correct_answer, e.target.value === correct_answer);
    // return onAnswer(e.target.value === correct_answer)
  };
  return (
    <div>
      <h3 className="text-xl place-items-center" dangerouslySetInnerHTML={{ __html: question }}>
      </h3>
      {type === "boolean" &&
      <div className="flex w-full justify-center gap-4 mt-10">
        <input type={"button"} className={"btn btn-accent"} value="true" onClick={handleAnswer} />
        <div className="divider divider-horizontal">OR</div>
        <input type={"button"} className={"btn btn-accent"} value="false" onClick={handleAnswer} />
      </div>
      }

      {type === "multiple" &&
      <div className="flex flex-col w-full align-center gap-2 mt-10 items-center">
        {answers.map(answer => (
          <input key={answer} type={"button"} className="btn btn-accent w-full max-w-lg mx-4" value={answer} onClick={handleAnswer}/>
        ))}
      </div>
      }


    </div>
  );
}

export default QuestionCard;
