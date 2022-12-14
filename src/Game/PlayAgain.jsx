import React from "react";

export default function PlayAgain(props) {
    return (
        <div className="game-done">
            <div className="message" style={{ color: props.gameStatus === "lost" ? "red" : "green" }}>
                {props.gameStatus === "lost" ? "Game Over" : "Nice"}
            </div>
            <button onClick={() => props.startNewGame()}>Play Again</button>
        </div>
    );
}
