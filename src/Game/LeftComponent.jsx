import React from "react";
import DisplayStars from "./DisplayStars";
import PlayAgain from "./PlayAgain";

export default function LeftComponent(props) {
  return (
    <>
      {
        props.gameStatus !== "active" ?
          <PlayAgain startNewGame={props.startNewGame} gameStatus={props.gameStatus} /> : // when the game is not active.
          <DisplayStars totalStars={props.totalStars} /> // when the game is active.
      }
    </>
  );
}
