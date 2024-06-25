import { cookies } from "next/headers";
import HomePage from "./components/home/HomePage";
import delay from "./utils/delay";

export default function Page() {
  cookies();
  return (
    <div>
      <HomePage />
    </div>
  );
}
