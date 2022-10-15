import React from "react";
import { CreateArray } from "./Utils";
import DisplaySingleStar from "./DisplaySingleStar";

export default function DisplayStars(props) {
  return (
    <>
      {CreateArray(1, props.totalStars).map((startId) => (
        <DisplaySingleStar key={startId} />
      ))}
    </>
  );
}
