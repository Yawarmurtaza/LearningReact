import React from "react";
import { GetColour } from "./Utils";

export default class Digit extends React.Component {
    
    constructor(props) {
        super(props);
    }

    DigitClickHandler(number, status){
        
        this.props.onNumberClick(number, status);
    }
    
    render(){
        return (
            <button 
                className="number" 
                onClick={this.DigitClickHandler(this.props.digit, this.props.numberStatus)}
                style={{background: GetColour(this.props.numberStatus)}}
                >
                {this.props.digit}
            </button>
        );
    }
}