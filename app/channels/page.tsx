"use client";

import useChannel from "@/feature/channel/useChannels";
import React from "react";

const Channels = () => {
  const { isPending, isError, channels } = useChannel();
  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Something went wrong:</div>;
  return (
    Array.isArray(channels) &&
    channels.map((c) => (
      <div key={c.id} className="text-2xl mb-3">
        {c.title}
      </div>
    ))
  );
};

export default function page() {
  return (
    <>
      <Channels />
    </>
  );
}
