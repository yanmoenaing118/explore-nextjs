import delay from "@/app/utils/delay";

export default async function LatestNews() {
  await delay(3000);

  return (
    <div>
      <h1>Latest News: delay(3000)</h1>
    </div>
  );
}
