import { cookies } from "next/headers"

export const getPosts = async (from: string = "") => {
    console.log('from ', from);
    const headers = new Headers();
    headers.append("x-api-key", cookies().get("vercel")?.value || "");
    
    const res = await fetch(process.env.API_URL + "/posts", {
        headers
    });

    return await res.json();
}