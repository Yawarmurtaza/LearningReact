import React from "react";
import { GetColour } from "./Utils";

export default function Digit(props) {

    function DigitClickHandler(number, status) {
        props.onNumberClick(number, status);
    }


    return (
        <button
            className="number"
            onClick={() => props.onNumberClick(props.digit, props.numberStatus)} // notice here the call to the function passed in from parent component.
            style={{ background: GetColour(props.numberStatus) }}
        >
            {props.digit}
        </button>
    );

}