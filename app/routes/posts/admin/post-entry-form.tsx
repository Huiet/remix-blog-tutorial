import { Form } from "@remix-run/react";
import { PostActionData } from "~/routes/posts/admin/new";
import { Post } from "@prisma/client";

type Props = {
  formErrors: PostActionData;
  post?: Post;
  isUpdating: boolean;
}

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export function PostEntryForm(props: Props) {
  //const { formErrors, isUpdating, post } = props;
  // const { formErrors, post } = props;
  // const [isUpdating, setIsUpdating] = useState(props.isUpdating)
  // useEffect(() => {
  //   setIsUpdating(props.isUpdating);
  // }, [props.isUpdating])
// const [post, setPost] = useState(props.post);
  // useEffect(() => {
  //   setPost(props.post);
  // }, [props.post]);

  const { formErrors, isUpdating, post } = props;


  return (
    <Form method="post">
      <fieldset disabled={isUpdating}>
        <p>
          <label>
            Post Title:{" "}
            {formErrors?.title ? (
              <em className="text-red-600">{formErrors.title}</em>
            ) : null}
            <span key={post?.title}>
              <input
                type="text"
                name="title"
                defaultValue={post?.title}
                className={inputClassName}
              />
            </span>
          </label>
        </p>
        <p>
          <label>
            Post Slug:{" "}
            {formErrors?.slug ? (
              <em className="text-red-600">{formErrors.slug}</em>
            ) : null}
            <span key={post?.slug}>
            <input
              type="text"
              name="slug"
              defaultValue={post?.slug}
              className={inputClassName}
            />
            </span>
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
          <span key={post?.markdown}>
          <textarea
            id="markdown"
            rows={20}
            name="markdown"
            defaultValue={post?.markdown}
            className={`${inputClassName} font-mono`}
          />
          </span>
        </p>
        <p className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
          >
            {
              props.isUpdating ?
                post ? "Updating..." : "Creating..."
                : post ? "Update Post" : "Create Post"}
          </button>
        </p>
      </fieldset>
    </Form>

  );

}

