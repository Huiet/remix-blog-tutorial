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

  //
  // console.log('qs', questions);
  // // const apiCount = count ? (count > 50 ? 50 : count <= 0: 1 : count : 1;
  // console.log('count', count);
  console.log("cat", params.category);
  return json<LoaderData>({ category: params.category || null, questions: questions });
};


export default function TriviaCategory() {
  const { category, questions } = useLoaderData<LoaderData>();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  console.log("mmhmm", category, questions);


  const handleQuestionUpdate = (value) => {
    setCurrentQuestion(value);
  };

  return (
    <>
      <main className="grid place-items-center mt-8">
        <h1 className="text-xl mb-12">{questions[currentQuestion].category}</h1>
        <QuestionCard
          question={questions[currentQuestion].question}
          correct_answer={questions[currentQuestion].correct_answer}
          incorrect_answers={questions[currentQuestion].incorrect_answers}
          type={questions[currentQuestion].type}
          difficulty={questions[currentQuestion].difficulty} />
      </main>
    </>
  );

}


// {
//   questions.map(x =>
// ("foo");
// )
//   questions.map(question => (
//     // <QuestionCard {...question} />
//     <QuestionCard
//       question={question.question}
//       correct_answer={question.correct_answer}
//       incorrect_answers={question.incorrect_answers}
//       type={question.type}
//       difficulty={question.difficulty} />
//   ))
// }

type LoaderData = { questions: Question[] } & { category: string | null }
