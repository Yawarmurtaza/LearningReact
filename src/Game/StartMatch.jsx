import React, { useState } from "react";
import Digit from "./Digit";
import DisplayStars from "./DisplayStars";
import "./Game.css";
import { GenerateRandom, CreateArray, SumArray, RandomSumIn } from "./Utils";

export default function StartMatch(props) {
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

         const newCandidates = candidiateNumbers.concat(number);
        //const newCandidates = this.setState({ "candidiateNumbers": [...this.state.candidiateNumbers, number] });

        if (SumArray(newCandidates) !== starCount) {
            // this.setState({"setCandidiateNumbers" : newCandidates});
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

/*
export default class StartMatch extends React.Component {
    numberCount = 9;
    constructor(props) {
        super(props);
        this.state = { 
            "starCount": GenerateRandom(1, 9),

            // keeps the numbers that are not used yet. We will be removing numbers from this array as the game progresses.
            "availableNumbers": CreateArray(1, 9),

            // numbers that can make up the total.
            "candidiateNumbers": [2,5]            
        };        

        // we have to bind the method so that we can use state...
        this.onNumberClick = this.onNumberClick.bind(this);
    }

    onNumberClick(number, status){
        console.log(number + " - " + status);
        if(status === "used"){
            return;
        }

        const newCandidates = this.state.candidiateNumbers.concat(number);
        if(SumArray(newCandidates) !== this.state.starCount){
            this.setState({"candidiateNumbers" : newCandidates});
        }else{

        }


    }

    numberStatus(number){
        
        if(!this.state.availableNumbers.includes(number)){
            return "used";
        }
        if(this.state.candidiateNumbers.includes(number)){
            // sum of candidates array should be less of equal to number of stars which would mean the 'number' is a possible candidate.
            const wrongCandidates = SumArray(this.state.candidiateNumbers) > this.state.starCount;
            return wrongCandidates ? "wrong" : "candidate";
        }
        return "available";

    }

    
   

    render() {
        return (
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">                        
                        <DisplayStars totalStars={this.state.starCount} />
                    </div>
                    <div className="right">
                        { CreateArray(1, this.numberCount).map(digit => 
                            <Digit 
                                key={digit} 
                                digit={digit}
                                numberStatus={this.numberStatus(digit)}
                                onNumberClick={this.onNumberClick}                                
                            />
                        ) }
                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        );
    }
}*/