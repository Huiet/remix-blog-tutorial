import { Form } from "@remix-run/react";
import { PostActionData } from "~/routes/posts/admin/new";
import { Post } from "@prisma/client";
import { useEffect, useState } from "react";

type Props = {
  formErrors: PostActionData;
  post?: Post;
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export function PostEntryForm(props: Props) {
  console.log('rerender', props);
  const { formErrors} = props;
  const [post, setPost] = useState(props.post);
  useEffect(() => { setPost(props.post) }, [props.post]);
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          {formErrors?.title ? (
            <em className="text-red-600">{formErrors.title}</em>
          ) : null}
          <input
            type="text"
            name="title"
            defaultValue={post?.title}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          {formErrors?.slug ? (
            <em className="text-red-600">{formErrors.slug}</em>
          ) : null}
          <input
            type="text"
            name="slug"
            defaultValue={post?.slug}
            className={inputClassName}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: {""}
          {formErrors?.markdown ? (
            <em className="text-red-600">
              {formErrors.markdown}
            </em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={post?.markdown}
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          {post ? 'Update Post' : 'Create Post'}
        </button>
      </p>
    </Form>

  );

}

