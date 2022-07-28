import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getPost, Post, updatePost } from "~/models/post.server";
import { PostActionData } from "~/routes/admin/new";
import { useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { PostEntryForm } from "~/routes/admin/post-entry-form";


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

  await updatePost({ title, slug, markdown });

  return redirect("/posts/admin/"+slug);
};

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);
  return json<LoaderData>({ post });
};

export default function EditPost() {
  const errors = useActionData();
  const { post } = useLoaderData<typeof loader>() as LoaderData;
  const transition = useTransition(); // for showing loading

  return(
    <>
    <PostEntryForm formErrors={errors} post={post} transitionState={transition.state}/>
    </>
  );
}
