import React from "react";
import Digit from "./Digit";
import LeftComponent from "./LeftComponent";
import { CreateArray, SumArray } from "./Utils";
import useGameStateManager from "./UseGameStateManager";
import "./Game.css";

// state management works in function component that is setState doent work in clickHandler.
export default function Game(props) {
    const totalNumbers = 9;
    const { score,
        secondsLeft,
        starCount,
        availableNumbers,
        candidiateNumbers,
        gameStatus,
        setGameState } = useGameStateManager(totalNumbers);

    function GetNumberStatus(number) {
        var status = "";
        if (!availableNumbers.includes(number)) {
            status = "used"; // used = green
        }
        else {
            if (candidiateNumbers.includes(number)) {
                // sum of candidates array should be less of equal to number of stars which would mean the 'number' is a possible candidate.
                const wrongCandidates = SumArray(candidiateNumbers) > starCount;
                status = wrongCandidates ? "wrong" : // red
                    "candidate"; // blue
            }
            else {
                status = "available"; // gray
            }
        }
        // console.log("[" + counter++ + "]GetNumberStatus [exit]: number=" + number + " Status=" + status);
        return status;
    }

    /* Handles when a number is clicked on the UI.
        When the number is used (green), we dont do anything.
        When the number is available (gray), then we add it in the candidate array.
    */
    function OnNumberClick(number, status) {

        // used = green
        if (gameStatus !== "active" || status === "used") {
            return;
        }

        // available = gray
        const newCandidates = status === "available" ? // gray
            candidiateNumbers.concat(number) : // if given number is available then add this in candidateNumbers array and return a new array newCandidates.
            candidiateNumbers.filter(cn => cn !== number); // if given number is not available then this number is removed from candidates array. This is so that the number can be made available. 

        setGameState(newCandidates);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>

            <div className="body">
                <div className="left">
                    <LeftComponent totalStars={starCount} gameStatus={gameStatus} startNewGame={props.startNewGame} />
                </div>
                <div className="right">
                    {
                        CreateArray(1, totalNumbers).map(number =>
                            <Digit key={number}
                                digit={number}
                                numberStatus={GetNumberStatus(number)}
                                onNumberClick={OnNumberClick} />
                        )}

                </div>
            </div>
            <div className="timer">
                Time left: {secondsLeft}
            </div>
            <div className="timer">Your score: {score}</div>
        </div>
    );
}