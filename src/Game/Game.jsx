import React, { useEffect, useState } from "react";
import Digit from "./Digit";
import "./Game.css";
import LeftComponent from "./LeftComponent";
import { GenerateRandom, CreateArray, SumArray, RandomSumIn } from "./Utils";

// state management works in function component that is setState doent work in clickHandler.
export default function Game(props) {
    const totalNumbers = 9;
    var counter = 0;
    const [secondsLeft, setSecondsLeft] = useState(10);
    const [starCount, setStarCount] = useState(GenerateRandom(1, totalNumbers));

    // All the numbers that are available to select from. Numbers are from 1-9. 
    const [availableNumbers, setAvailableNumbers] = useState(CreateArray(1, totalNumbers));

    // holds the numbers that user clicks. This array is cleared (emptyed) once sum of this array matched the star count.
    const [candidiateNumbers, setCandidiateNumbers] = useState([]);
    const gameStatus = availableNumbers.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";


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
    function onNumberClick(number, status) {

        // used = green
        if (gameStatus !== "active" || status === "used") {
            return;
        }

        // available = gray
        const newCandidates = status === "available" ? // gray
            candidiateNumbers.concat(number) : // if given number is available then add this in candidateNumbers array and return a new array newCandidates.
            candidiateNumbers.filter(cn => cn !== number); // if given number is not available then this number is removed from candidates array. This is so that the number can be made available. 

        if (SumArray(newCandidates) === starCount) {

            // we have a correct candidate array sum matching with star count.
            // we need to redraw another round of stars and the count of stars would be that we havent not yet completed.
            // newCandidates array contains all the numbers that sum upto the star count. Star count = 5, newCandidate arry = 2 & 3
            // the availableNums array must not have those numbers (2 and 3). newAvailableNums = [1,4,5,6,7,8,9]. Len = 7
            const newAvailableNums = availableNumbers.filter(n => !newCandidates.includes(n));

            // the start count must not repeat the same number and it must be random.
            setStarCount(RandomSumIn(newAvailableNums, 9)); // redraw number of stars that are playable.

            // updating the available numbers with new array which doesnt contain previouly used numbers, 2 & 3 in this case.
            setAvailableNumbers(newAvailableNums);

            // no candidate numbers for new star count.
            setCandidiateNumbers([]);

        } else {
            // when we have the sum of candidate numbers not equal to the star count, we add new number (number) in the candidate array.
            // we only empty candidate array when we find the sum matching with star count.
            setCandidiateNumbers(newCandidates);
        }
    }

    /*
    function resetGame() {
        
        setStarCount(GenerateRandom(1, totalNumbers));
        setAvailableNumbers(CreateArray(1, totalNumbers));
        setCandidiateNumbers([]);
        setSecondsLeft(10);
    }
    */
    useEffect(() => {
        // every time the owner component (StartMatch in this case) renders itself, this method is triggered by useEffect. Each time we click on a number, (this method) useEffect will be executed.
        // setting state in this method will cause owner component(StartMatch) to render, useEffect will continue to run as setSecondsLeft method will update the state. This is a loop!!!
        // console.log("useEffect method has triggered!")
        var timerId = 0;
        if (secondsLeft > 0 && gameStatus === "active") {
            timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000); // every second, StartMatch component renders!
        }

        return () => clearTimeout(timerId);
    });

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
                                onNumberClick={onNumberClick} />
                        )}

                </div>
            </div>
            <div className="timer">
                Time left: {secondsLeft}
            </div>
        </div>
    );
}