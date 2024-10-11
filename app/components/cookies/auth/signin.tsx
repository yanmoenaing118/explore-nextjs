"use client";

import axiosClient from "@/lib/axios-client";
import { useEffect } from "react";

export default function SignIn() {
  const handleSignIn = () => {
    const data = {
      username: "yanm",
      password: "xxxx",
    };

    axiosClient
      .post("/api/signin", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axiosClient
      .get("/api/posts", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div>
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}
