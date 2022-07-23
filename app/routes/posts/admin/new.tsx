import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { createPost } from "~/models/post.server";
import invariant from "tiny-invariant";
import { PostEntryForm } from "~/routes/posts/admin/post-entry-form";

export type PostActionData =
  | {
  title: null | string;
  slug: null | string;
  markdown: null | string;
}
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };

  const hasErrors = Object.values(errors).some(
    (errorMessage) => errorMessage
  );
  if (hasErrors) {
    return json<PostActionData>(errors);
  }

  invariant(
    typeof title === "string",
    "title must be a string"
  );
  invariant(
    typeof slug === "string",
    "slug must be a string"
  );
  invariant(
    typeof markdown === "string",
    "markdown must be a string"
  );

  await createPost({ title, slug, markdown });

  return redirect("/posts/admin/"+slug);
};




const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPost() {
  const errors = useActionData();

  return (
    <PostEntryForm formErrors={errors} />
  );
}
