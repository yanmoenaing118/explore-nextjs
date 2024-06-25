import delay from "@/app/utils/delay";
import { getPosts } from "@/app/utils/getPosts";
import React from "react";

const DetailInfo: React.FC<{ id: string }> = async ({ id }) => {
  const myDetailId = await getPosts("details");
  return (
    <div>
      <h1>
        DETAILs - <br />
        {JSON.stringify(myDetailId)}
      </h1>
    </div>
  );
};

export default DetailInfo;
