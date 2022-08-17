import { useActionData, useLoaderData, useTransition } from "@remix-run/react";

import { json, LoaderFunction } from "@remix-run/node";
import { Categories, Category, Question } from "~/routes/trivia/index";
import QuestionCard from "~/components/Question";
import { useState } from "react";

// https://opentdb.com/api.php?amount=10
// https://opentdb.com/api.php?amount=10&category=11

export const loader: LoaderFunction = async ({ request, params }) => {
  const categories = (await (await fetch("https://opentdb.com/api_category.php")).json()).trivia_categories;
  const id = categories.find((x: Category) => x.name === params.category)?.id;
  const url = new URL(request.url);
  const count = parseInt(url.searchParams.get("count") || "1");
  const apiCount = count > 50 ? 50 : count <= 0 ? 1 : count;

  let apiUrl = `https://opentdb.com/api.php?amount=${apiCount}`;
  if (id) apiUrl += `&category=${id}`;
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

  const onAnswer = (correct: boolean) => {
    if (correct) setCorrectAnswers(correctAnswers + 1);
    setCurrentQuestion(currentQuestion + 1);
    // todo: deal with end of questions
  }

  return (
    <>
      <main className="grid place-items-center mt-8">
        <h1 className="text-xl mb-12">{questions[currentQuestion].category}</h1>
        <QuestionCard
          question={questions[currentQuestion].question}
          correct_answer={questions[currentQuestion].correct_answer}
          incorrect_answers={questions[currentQuestion].incorrect_answers}
          type={questions[currentQuestion].type}
          difficulty={questions[currentQuestion].difficulty}
          answers={questions[currentQuestion].answers}
          onAnswer={onAnswer}/>
      </main>
    </>
  );

}

type LoaderData = { questions: Question[] } & { category: string | null }
