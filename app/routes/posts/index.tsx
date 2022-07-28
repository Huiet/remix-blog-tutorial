import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/post.server";


type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>
}

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <main className="flex justify-center mt-8">
      <div className="flex-col gap-4">


      <h1 className="text-lg">Posts</h1>

      <ul>
        { posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </main>
  )
}

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts()
  })
}
