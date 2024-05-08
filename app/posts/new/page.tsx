import { createPost } from "@/app/actions";
import React from "react";

export default function page() {
  return (
    <div>
      <form action={createPost}>
        <div>
          <input type="text" placeholder="Title" name="title" />
        </div>
        <div>
          <input type="text" placeholder="Description" name="content" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
