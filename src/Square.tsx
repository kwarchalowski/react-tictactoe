type Props = {
    index: number
    onClick(event: any): void
    player?: string;
}

function Square({ index, onClick, player }: Props) {
    const scale = player ? "scale-100" : "scale-0"
    const textColor = player === "🥦" ? "text-lime-400" : "text-sky-400"
    const hoverStyle = "transition duration-700 hover:scale-110 transform"

    return(
        <div
        data-cell-index={index}
        className={`h-32 border-solid border-2 border-zinc-400 rounded font-display text-6xl text-center flex justify-center items-center cursor-pointer ${hoverStyle} bg-zinc-700 prevent-select`}
        {...{ onClick }}
        >
            <span
            data-cell-index={index}
            className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}>{player}</span> 
        </div>
    );
}

export default Square;