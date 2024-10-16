"use client";

import axiosClient from "@/lib/axios-client";
import axios from "axios";
import { useEffect } from "react";

export default function SignIn() {
  const handleSignIn = () => {
    const data = {
      user: {
        email: "khchow@gatech.edu.croucher.staging",
        // "email": "yikaitan@croucher.org.hk",
        // "email": "aaronliu@mit.edu.croucher.staging",
        // "email": "ymn.dev.coder@gmail.com",
        password: "123456",
      },
    };

    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .post(
    //     "https://scholarss.croucher.org.hk/d/api/users/sign_in?module=scholar-portal",
    //     data,
    //     {
    //       // withCredentials: true,
    //       headers: {
    //         "Content-Type": "application/json",
    //         // "Access-Control-Allow-Credentials": true,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     const xApiKey = `["${res.data._s}",["${res.data._k}", "${res.data._d}"]]`;
    //     // getProfile(xApiKey)
    //     getProfile();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const getProfile = () => {
    axios
      .get("/api/auth", {
        // withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in</button>
    </div>
  );
}
