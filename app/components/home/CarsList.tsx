import delay from "@/app/utils/delay";


export default async function CarsList() {
  await delay(2000);

  return (
    <div>
      <h1>Cars List: delay(2000)</h1>
    </div>
  );
}
