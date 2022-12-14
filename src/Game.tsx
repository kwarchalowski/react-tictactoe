import { useEffect, useState } from "react";
import Square from "./Square";

type Scores = {
    [key: string]: number
}

/* player icons:
    X: 🥦
    O: 🍅 */

const INITIAL_GAME_STATE = ["","","","","","","","",""]
const INITIAL_SCORES: Scores = { "🥦": 0, "🍅": 0};
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function Game() {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [currentPlayer, setCurrentPlayer] = useState("🥦");
    const [scores, setScores] = useState(INITIAL_SCORES);

    useEffect(() => {

        const storedScores = localStorage.getItem("scores");
        if (storedScores) {
            setScores(JSON.parse(storedScores));
        }
    }, [])

    useEffect(() => {
        if (gameState === INITIAL_GAME_STATE) {
            return;
        }

        checkForWinner();
    }, [gameState]);

    const resetBoard = () => setGameState(INITIAL_GAME_STATE);

    const handleResetScore = () => {
        
        if(!window.confirm("Do you really want to reset all scores?")) {
            return;
        }

        const storedScores = localStorage.getItem("scores");
        if (storedScores) {
            setScores(INITIAL_SCORES);
            localStorage.removeItem("scores");
        }
        resetBoard();
    }

    const handleWin = () => {
        window.alert(`Congrats player ${currentPlayer}! You are the winner!`);

        const newPlayerScore = scores[currentPlayer] + 1;
        const newScores = {...scores};
        newScores[currentPlayer] = newPlayerScore;
        setScores(newScores);
        localStorage.setItem("scores", JSON.stringify(newScores));

        resetBoard();
    }

    const handleDraw = () => {
        window.alert("The game ended in a draw");
        resetBoard();
    }

    const checkForWinner = () => {
        let roundWon = false;

        for (let i = 0; i < WINNING_COMBOS.length; i++) {
            const winCombo = WINNING_COMBOS[i];

            let a = gameState[winCombo[0]];
            let b = gameState[winCombo[1]];
            let c = gameState[winCombo[2]];
            
            if ([a, b, c].includes("")) {
                continue
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            setTimeout(() => handleWin(), 10);
            return;
        }

        if (!gameState.includes("")) {
            setTimeout(() => handleDraw(), 10);
            return;
        }

        changePlayer();
    }

    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === "🥦" ? "🍅" : "🥦")
    }

    const handleCellClick = (event: any) => {
        console.log("cell clicked!", event.target.getAttribute("data-cell-index"));

        const cellIndex = Number(event.target.getAttribute("data-cell-index"))
        const currentValue = gameState[cellIndex];

        if(currentValue) {
            return;
        }

        const newValues = [...gameState];
        newValues[cellIndex] = currentPlayer;
        setGameState(newValues);
    };

    return ( 
        <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-zinc-500 to-zinc-700">
            <h1 className="text-center text-5xl mb-4 font-display text-white">
                Tic-tac-toe
            </h1>
            <div className="mx-auto mt-12">
                <div className="grid grid-cols-3 gap-3 mx-auto w-96">
                    {gameState.map((player, index) => (
                        <Square key={index}
                        onClick={handleCellClick}
                        {...{ index,  player }}/>
                    ))}
                </div>
                <div className="mx-auto w-96 text-xl text-serif mt-6">
                    <p className="text-white text-center mt-5"><span>{currentPlayer}'s turn!</span></p>
                    <hr className="m-4 opacity-75"/>

                    {/* score table */}
                    <table className="table-auto mx-auto w-96 text-xl my-4">
                        <thead className="text-center bg-zinc-800 text-zinc-200 border border-zinc-500">
                            <tr>
                            <th><p className="my-2">Player</p></th>
                            <th><p className="my-2">Wins</p></th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-gray-800 text-zinc-200">
                            <tr className="h-10">
                            <td>🥦</td>
                            <td><span>{scores["🥦"]}</span></td>
                            </tr>
                            <tr className="h-12">
                            <td>🍅</td>
                            <td><span>{scores["🍅"]}</span></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div className="mx-auto w-96 mt-8 text-center">
                    <hr className="mx-24 my-8 border-red-700 opacity-50"/>
                    <button className="bg-red-500 hover:bg-zinc-200
                                       text-black font-semibold hover:text-red-700
                                       py-2 px-4
                                       border border-red-500 hover:border-red-700 
                                       border-opacity-100 hover:border-opacity-10
                                       rounded"
                            onClick={handleResetScore}>
                    RESET SCORES
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Game;