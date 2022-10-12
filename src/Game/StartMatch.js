import React, { useState } from "react";
import { useIsRTL } from "react-bootstrap/esm/ThemeProvider";
import "./Game.css";
import { GenerateRandom, CreateArray, SumArray, RandomSumIn } from "./Utils";

export default class StartMatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = { "starCount": GenerateRandom(1, 9) };
    }

    numberCount = 9;
    colors = {
        available: 'lightgray',
        used: 'lightgreen',
        wrong: 'lightcoral',
        candidate: 'deepskyblue',
    };

    render() {



        return (
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {
                            CreateArray(1, this.state.starCount).map(startId => <div key={startId} className="star" />)
                        }
                    </div>
                    <div className="right">
                        {
                            CreateArray(1, this.numberCount).map(count => <button key={count} className="number">{count}</button>)
                        }

                    </div>
                </div>
                <div className="timer">Time Remaining: 10</div>
            </div>
        );
    }
}