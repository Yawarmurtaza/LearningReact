import React, { useState } from "react";
import Game from "./Game";


export default function GameApp() {
    const [gameId, setGameId] = useState(1);
    function startNewGame(){
        setGameId(gameId + 1);
    }
    return (
        <>
            <Game key={gameId} startNewGame={startNewGame} />
        </>
    );

}