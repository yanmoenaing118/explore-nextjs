import axiosClient from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type Channel = {
  id: string;
  title: string;
  content: string;
};

type ChannelResponse = Channel[];

const getChannels = async (): Promise<ChannelResponse> => {
  const data = (await axiosClient.get("/api/posts")) as ChannelResponse;
  return data;
};

export default function useChannel() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["channels"],
    queryFn: getChannels,
  });

  return {
    isError,
    isPending,
    channels: data,
  };
}
