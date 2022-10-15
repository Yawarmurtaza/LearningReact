import React from "react";

export default function PlayAgain(props){
    return(
        <div className="game-done">
            <button onClick={() => {props.resetGame()}}>Play Again</button>
        </div>
    );
}
