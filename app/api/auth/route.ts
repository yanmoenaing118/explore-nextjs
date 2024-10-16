export async function POST() {
  const data = {
    user: {
      email: "khchow@gatech.edu.croucher.staging",
      // "email": "yikaitan@croucher.org.hk",
      // "email": "aaronliu@mit.edu.croucher.staging",
      // "email": "ymn.dev.coder@gmail.com",
      password: "123456",
    },
  };

  const res = await fetch(
    "https://scholarss.croucher.org.hk/d/api/users/sign_in?module=scholar-portal",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  console.log("response ", res);
  return Response.json({
    messg: "t",
  });
}

export async function GET(req: Request) {
  const cookies = req.headers.get("Cookie");

  console.log("----req", cookies);

  const res = await fetch(
    "https://scholarss.croucher.org.hk/api/scholar/profile",

    {
      headers: {
        ...req.headers,
        "Content-Tpye": "application/json",
      },
      credentials: "include",
    }
  );
  //   const data = await res.json();

  console.log(res);

  return Response.json({ test: "ms" });
}
