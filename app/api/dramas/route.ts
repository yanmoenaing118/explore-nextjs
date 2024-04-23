const dramas = [
  {
    title: "Title One",
    description: "This is description",
    country: "Korea",
  },
];

export async function GET() {
  return Response.json(dramas);
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log("request body", body);
  dramas.push(body);
  return Response.json({
    message: "created drama",
    body
  });
}
