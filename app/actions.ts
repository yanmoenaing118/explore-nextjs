"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  const body = {
    id: Math.random(),
    title: formData.get("title"),
    content: formData.get("content"),
  };
  console.log(body)
  const post = fetch("http://localhost:8080/api/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });
//   revalidatePath("/posts");

  redirect("/posts");
};
