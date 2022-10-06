function Game() {
    return ( 
        <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-blue-500 to-cyan-500">
            <h1 className="text-center text-5xl mb-4 font-display text-white">
                Tic Tac Toe Game
            </h1>
            <div>
                <div>Board Goes Here</div>
                <div>Scores Goes Here</div>
            </div>
        </div>
    );
}

export default Game;