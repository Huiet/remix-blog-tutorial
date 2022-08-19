import { Form } from "@remix-run/react";
import { PostActionData } from "~/routes/admin/new";
import { Post } from "@prisma/client";

type Props = {
  formErrors: PostActionData;
  post?: Post;
  transitionState: string; // 'idle', 'loading', 'submitting'
}

const inputClassName = "input input-primary input-bordered w-full max-w-xs";

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

  const { formErrors, transitionState, post } = props;


  return (
    <>
      {/*if you wanted to show loading*/}
      {/*{transitionState && transitionState === 'loading' ? <div><LoadingContent /></div> :*/}

      <Form method="post">
        <fieldset disabled={transitionState !== "idle"}
                  className="w-5/6 mx-auto">


          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="title">
              <span className="label-text">Post Title</span>
              {formErrors?.title ? (
                <em className="label-text-alt text-red-600">{formErrors.title}</em>
              ) : null}
              {/*<span className="label-text-alt">Alt label</span>*/}
            </label>
            <input
              id="title"
              type="text"
              placeholder="Your Post Title"
              name="title"
              defaultValue={post?.title}
              className={inputClassName} />
          </div>


          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="slug">
              <span className="label-text">Slug</span>
              {formErrors?.title ? (
                <em className="label-text-alt text-red-600">{formErrors.slug}</em>
              ) : null}
            </label>
            <input
              id="slug"
              type="text"
              placeholder="Your Slug for the URL"
              name="slug"
              defaultValue={post?.slug}
              className={inputClassName} />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="markdown">
              <span className="label-text">Markdown</span>
              {
                formErrors?.markdown ?
                  <em className="label-text-alt text-red-600">
                    {formErrors.markdown}
                  </em>
                  : null
              }
            </label>
            <textarea
              id="markdown"
              rows={15}
              name="markdown"
              defaultValue={post?.markdown}
              className={`textarea textarea-primary w-full`}>
              </textarea>
          </div>

          <p className="text-right mt-8 mb-20">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
            >
              {
                props.transitionState === "submitting" ?
                  post ? "Updating..." : "Creating..."
                  : post ? "Update Post" : "Create Post"}
            </button>
          </p>
        </fieldset>
      </Form>
    </>
  );

}

