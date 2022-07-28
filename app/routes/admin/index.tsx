import { Link } from "@remix-run/react";


export default function AdminIndex() {
  return (
    <>
      <div className="flex justify-center gap-4">
        <Link to="new" className="text-blue-600 underline">
          Create a New Post
        </Link>
        <Link to="edit-post" className="text-blue-600 underline">
          Edit Existing Post
        </Link>
      </div>

    </>
  );
}
