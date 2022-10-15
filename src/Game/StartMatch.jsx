import React, { useState } from "react";
import Digit from "./Digit";
import DisplayStars from "./DisplayStars";
import "./Game.css";
import { GenerateRandom, CreateArray, SumArray, RandomSumIn } from "./Utils";

export default function StartMatch() {
    const totalNumbers = 9;
    const [starCount, setStarCount] = useState(GenerateRandom(1, totalNumbers));
    const [availableNumbers, setAvailableNumbers] = useState(CreateArray(1, totalNumbers));
    const [candidiateNumbers, setCandidiateNumbers] = useState([]);

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

        if (status === "used") {
            return;
        }

         const newCandidates = status === "available" ? candidiateNumbers.concat(number) : candidiateNumbers.filter(cn => cn != number);
        //const newCandidates = this.setState({ "candidiateNumbers": [...this.state.candidiateNumbers, number] });

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

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>

            <div className="body">
                <div className="left">
                    <DisplayStars totalStars={starCount} />
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