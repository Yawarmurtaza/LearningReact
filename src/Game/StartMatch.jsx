import React from "react";
import Digit from "./Digit";
import DisplayStars from "./DisplayStars";
import "./Game.css";
import { GenerateRandom, CreateArray, SumArray} from "./Utils";

export default class StartMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            "starCount": GenerateRandom(1, 9),

            // keeps the numbers that are not used yet. We will be removing numbers from this array as the game progresses.
            "availableNumbers": CreateArray(1, 9),

            // numbers that can make up the total.
            "candidiateNumbers": [2,8]            
        };        
    }

    onNumberClick(number, status){
        console.log(number + " - " + status);
        if(status === "used"){
            return;
        }

        const newCandidates = this.state.candidiateNumbers.concat(number);

    }

    numberStatus(number){
        console.log(this.state.starCount);

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

    numberCount = 9;
   

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
}