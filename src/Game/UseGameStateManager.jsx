import { useEffect, useState } from "react";
import { GenerateRandom, CreateArray, SumArray, RandomSumIn } from "./Utils";

export default function useGameStateManager(totalNumbers) {
    const [score, setScore] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(10);
    const [starCount, setStarCount] = useState(GenerateRandom(1, totalNumbers));

    // All the numbers that are available to select from. Numbers are from 1-9. 
    const [availableNumbers, setAvailableNumbers] = useState(CreateArray(1, totalNumbers));

    // holds the numbers that user clicks. This array is cleared (emptyed) once sum of this array matched the star count.
    const [candidiateNumbers, setCandidiateNumbers] = useState([]);
    const gameStatus = availableNumbers.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

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

    function setGameState(newCandidates) {
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
            setScore(score + 1);

        } else {
            // when we have the sum of candidate numbers not equal to the star count, we add new number (number) in the candidate array.
            // we only empty candidate array when we find the sum matching with star count.
            setCandidiateNumbers(newCandidates);
        }
    }

    return {
        score,
        secondsLeft,
        starCount,
        availableNumbers,
        candidiateNumbers,
        gameStatus,
        setGameState
    };
}