import { useState } from "react";

import Square from "./Square";

const INITIAL_GAME_STATE = ["X","X","O","","","","","",""]

function Game() {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    return ( 
        <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-blue-500 to-cyan-500">
            <h1 className="text-center text-5xl mb-4 font-display text-white">
                Tic Tac Toe Game
            </h1>
            <div>
                <div className="grid grid-cols-3 gap-3 mx-auto w-96">
                    {INITIAL_GAME_STATE.map((player, index) => (
                        <Square key={index}>
                            {player}
                        </Square>
                    ))}
                </div>
                <div>Scores Goes Here</div>
            </div>
        </div>
    );
}

export default Game;