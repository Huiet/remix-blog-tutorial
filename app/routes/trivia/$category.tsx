import { useActionData, useLoaderData, useTransition } from "@remix-run/react";

import { json, LoaderFunction } from "@remix-run/node";
import { Categories, Category, Question } from "~/routes/trivia/index";
import QuestionCard from "~/components/Question";
import { useEffect, useState } from "react";

// https://opentdb.com/api.php?amount=10
// https://opentdb.com/api.php?amount=10&category=11

export const loader: LoaderFunction = async ({ request, params }) => {
  const categories = (await (await fetch("https://opentdb.com/api_category.php")).json()).trivia_categories;
  const id = categories.find((x: Category) => x.name === params.category)?.id;
  const url = new URL(request.url);
  const count = parseInt(url.searchParams.get("count") || "1");
  const difficulty = url.searchParams.get("difficulty");
  const apiCount = count > 50 ? 50 : count <= 0 ? 1 : count;

  let apiUrl = `https://opentdb.com/api.php?amount=${apiCount}`;
  if (id) apiUrl += `&category=${id}`;
  if(difficulty !== 'Any') apiUrl += `&difficulty=${difficulty}`;
  const questions: Question[] = (await (await fetch(apiUrl)).json())?.results || [];

  function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  questions.map(question => {
    question.answers = shuffle([...question.incorrect_answers, question.correct_answer]);
  })
  return json<LoaderData>({ category: params.category || null, questions: questions });
};


export default function TriviaCategory() {
  const { category, questions } = useLoaderData<LoaderData>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  // useEffect(() => {
  //   console.log('currentQuestion', currentQuestion);
  //   console.log('questions', questions);
  //   // if(currentQuestio)
  // }, [currentQuestion]);

  console.log('qq', questions, currentQuestion, questions[currentQuestion])

  const onAnswer = (correct: boolean) => {
    console.log('heyo')
    setQuestionAnswered(true);
    if (correct) setCorrectAnswers(correctAnswers + 1);
    if(currentQuestion === questions.length - 1) {
      // endGame();
    } else {
      // setCurrentQuestion(currentQuestion + 1);
    }
  }

  const nextQuestion = () => {
    setQuestionAnswered(false);
    setCurrentQuestion(currentQuestion + 1);
  }


  const restartGame = () => { // todo: restart
    console.log('todo: restart game');
  }

  const endGame = () => { // todo: End
    console.log('todo: end game');
  }

  const getDifficultyColor = () => {
    console.log('meep', questions[currentQuestion].difficulty)
    switch (questions[currentQuestion].difficulty) {
      case 'easy':
        return 'badge-success';
        break;
      case 'medium':
        return 'badge-info';
        break;
      case 'hard':
        return 'badge-error';
        break;
    }
  }


  return (
    <>
      <main className="grid place-items-center mt-8">
        <div className={"flex justify-end text-lg gap-4 mt-5 mb-8 ml-8"}>
          <span className="badge badge-lg">Question {currentQuestion + 1}/{questions.length}</span>
          <span className={"badge badge-lg " + getDifficultyColor()}>Difficulty: {questions[currentQuestion].difficulty}</span>
          <span className="badge badge-lg">Total Correct: {correctAnswers}/{currentQuestion + (questionAnswered ? 1 : 0)}</span>

        </div>
        <h1 className="text-xl mb-12">{questions[currentQuestion].category}</h1>
        <QuestionCard
          question={questions[currentQuestion].question}
          correct_answer={questions[currentQuestion].correct_answer}
          type={questions[currentQuestion].type}
          difficulty={questions[currentQuestion].difficulty}
          answers={questions[currentQuestion].answers}
          onAnswer={onAnswer}/>

        {
          questionAnswered && (
          currentQuestion === questions.length - 1 ?
            <div className="flex gap-4">
              <input className="btn btn-primary mt-8" type={"button"} onClick={restartGame} value={'Restart'}/>
              <input className="btn btn-outline btn-primary mt-8" type={"button"} onClick={endGame} value={'Back To Setup'}/>
            </div>
            :
          <input className="btn btn-primary mt-8" type={"button"} onClick={nextQuestion} value={'Next Question'}/>
          )
        }

        {/*{*/}
        {/*  questionAnswered &&*/}
        {/*}*/}
      </main>
    </>
  );

}

type LoaderData = { questions: Question[] } & { category: string | null }
