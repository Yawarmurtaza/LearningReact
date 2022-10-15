import React from "react";
import DisplayStars from "./DisplayStars";
import PlayAgain from "./PlayAgain";

export default function LeftComponent(props) {
  return (
    <>
      {props.isGameOver ? (
        <PlayAgain resetGame={props.resetGame}/>
      ) : (
        <DisplayStars totalStars={props.totalStars} />
      )}
    </>
  );
}
