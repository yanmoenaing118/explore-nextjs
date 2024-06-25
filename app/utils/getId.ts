import delay from "./delay";

export default async function getId() {
  await delay(5000);
  return "some-id";
}
