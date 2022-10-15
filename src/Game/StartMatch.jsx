import React, { useState } from "react";
import Digit from "./Digit";
import DisplayStars from "./DisplayStars";
import "./Game.css";
import LeftComponent from "./LeftComponent";
import { GenerateRandom, CreateArray, SumArray, RandomSumIn } from "./Utils";

// state management works in function component that is setState doent work in clickHandler.
export default function StartMatch() {
    const totalNumbers = 9;
    const [starCount, setStarCount] = useState(GenerateRandom(1, totalNumbers));
    const [availableNumbers, setAvailableNumbers] = useState(CreateArray(1, totalNumbers));
    const [candidiateNumbers, setCandidiateNumbers] = useState([]);
    const isGameOver = availableNumbers.length == 0;

    function numberStatus(number) {
        if (!availableNumbers.includes(number)) {
            return "used";
        }
        if (candidiateNumbers.includes(number)) {
            // sum of candidates array should be less of equal to number of stars which would mean the 'number' is a possible candidate.
            const wrongCandidates = SumArray(candidiateNumbers) > starCount;
            return wrongCandidates ? "wrong" : "candidate";
        }
        return "available";
    }

    function onNumberClick(number, status) {        

        // used = green
        if (status === "used") {
            return;
        }

        // available = gray
        const newCandidates = status === "available" ? 
        candidiateNumbers.concat(number) : // if given number is available then add this in candidateNumbers array and return a new array newCandidates.
        candidiateNumbers.filter(cn => cn != number); // if given number is not available then this number should be removed from candidates array. This is so that the number can be made available. 

        if (SumArray(newCandidates) !== starCount) {           
            setCandidiateNumbers(newCandidates);
        } else {
            // we have a correct pick!
            const newAvailableNums = availableNumbers.filter(n => !newCandidates.includes(n));
            setStarCount(RandomSumIn(newAvailableNums, 9)); // redraw number of stars that are playable.
            setAvailableNumbers(newAvailableNums);
            setCandidiateNumbers([]);
        }
    }

    function resetGame(){
        setStarCount(GenerateRandom(1, totalNumbers));
        setAvailableNumbers(CreateArray(1, totalNumbers));
        setCandidiateNumbers([]);
    }

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>

            <div className="body">
                <div className="left">
                    <LeftComponent totalStars={starCount} isGameOver={isGameOver} resetGame={resetGame}/>
                </div>
                <div className="right">
                    {
                        CreateArray(1, totalNumbers).map(number =>
                            <Digit key={number}
                                digit={number}
                                numberStatus={numberStatus(number)}
                                onNumberClick={onNumberClick} />
                        )}

                </div>
            </div>
        </div>
    );
}