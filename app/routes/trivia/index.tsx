import { Form, Link, useLoaderData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { z } from "zod";
import { useState } from "react";

export const loader = async () => {
  const jsonResponse = await (await fetch("https://opentdb.com/api_category.php")).json();
  return json<LoaderData>({ categories: [{ name: 'Any', id: 'any' }, ...jsonResponse.trivia_categories ]});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const category = formData.get('category');
  const count = formData.get('count');
  const difficulty = formData.get('difficulty')
  return redirect("/trivia/" + category + '?count='+count + (difficulty ? `&difficulty=${difficulty}`: ''));
};


export default function Trivia() {
  const { categories } = useLoaderData<LoaderData>();
  const onError = true;
  const [count, setCount] = useState(10);


  // restrict count between 1 and 50 to comply with the api
  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount(
      event.target.value && event.target.valueAsNumber > 0
        ? (event.target.valueAsNumber <= 50 ? event.target.valueAsNumber : 50)
        : 1)
  }

  return (
    <main className="flex justify-center mt-8">
      <Form method={"post"}>
        <div className="flex-col gap-4">
          <h1 className="text-xl text-center mb-8">Trivia</h1>
          <label className="block text-lg mb-3" htmlFor="category">Choose Your Category</label>
          <select name="category" className="select select-primary">
            {
              categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))
            }
          </select>

          <label className="block text-lg mb-3 mt-4"
                 htmlFor="count">
            Question count:
          </label>
          <input className={"input input-accent mb-4"}
                 name="count"
                 type='number'
                 value={count}
                 onChange={handleCountChange}
            />

          <label className="block text-lg mb-3" htmlFor="difficulty">Difficulty</label>
          <select name="difficulty" className="select select-primary">
              <option value={undefined}>Any</option>
              <option value={'easy'}>Easy</option>
              <option value={'medium'}>Medium</option>
              <option value={'hard'}>Hard</option>
          </select>

        </div>

        <button className={"btn btn-primary mt-8"} type={"submit"}>Launch</button>
      </Form>
    </main>
  );
}


const CategorySchema = z.object({
  id: z.number(),
  name: z.string()
});
const categroiesSchema = z.array(CategorySchema);
export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof categroiesSchema>;


const QuestionSchema = z.object({
  category: z.string(),
  type: z.union([z.literal('multiple'), z.literal('boolean')]),
  difficulty: z.union([z.literal('easy'),z.literal('medium'), z.literal('hard')]),
  question: z.string(),
  correct_answer: z.string(),
  incorrect_answers: z.array(z.string()),
  answers: z.array(z.string())
})

export type Question = z.infer<typeof QuestionSchema>;


export type LoaderData = {
  categories: Categories
}
