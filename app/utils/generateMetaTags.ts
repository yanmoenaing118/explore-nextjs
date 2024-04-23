import exp from "constants";
import { Metadata } from "next";

export type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateServerSideMeta = (props: Props): Metadata => {
  console.log(props.params);
  console.log(props.searchParams)
  return {
    title: "tst",
  };
};
