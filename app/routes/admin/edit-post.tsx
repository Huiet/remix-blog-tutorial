import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import { json, LoaderFunction } from "@remix-run/node";


type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() });
};


export default function EditPost() {
  const { posts } = useLoaderData<typeof loader>() as LoaderData;

  return (
    <>
      <h1 className="flex justify-center my-5 text-lg">Existing Posts</h1>
      <div className="flex justify-center gap-4">

        <ul className="max-content">
          {posts.map((post) => (
            <li key={post.slug}>
              <div className="flex-wrap sm:flex justify-between gap-x-8">
                <Link
                  to={post.slug}
                  className="flex-wrap text-blue-600 underline max-w-[90%] sm:max-w-md"
                >
                  {post.title}
                </Link>
                <div>{new Date(post.updatedAt).toLocaleDateString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
