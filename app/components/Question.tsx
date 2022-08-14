import React from "react";
import PropTypes from "prop-types";

QuestionCard.propTypes = {
  question: PropTypes.string,
  correct_answer: PropTypes.string,
  incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  difficulty: PropTypes.string,
};

interface questionProps {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  type: string;
  difficulty: string;
}

function QuestionCard({question, correct_answer, incorrect_answers, type, difficulty}: questionProps) {
  console.log('cardly');
  return (
    <div>
      {type === 'boolean' &&
      <div className="flex w-full">
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">True</div>
        <div className="divider divider-horizontal">OR</div>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">False</div>
      </div>
      }

      {type === 'multiple' &&
        'todo: multiple'
      }


    </div>
  );
}

export default QuestionCard;
