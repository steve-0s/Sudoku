const Grid = ({ board, puzzle, selected, setSelected, handleInput }) => {

    return (
        <div className="flex justify-center mt-8">
            <div className="grid grid-cols-9 border-2 border-black bg-white shadow-xl">
                {board.map((row, rIdx) => {
                    return row.map((cell, cIdx) => {
                        const isPrefilled = puzzle[rIdx][cIdx] !== 0;

                        // Calculate borders for 3x3 subgrids
                        const borderRight = (cIdx + 1) % 3 === 0 && cIdx !== 8 ? "border-r-2 border-r-black" : "border-r border-r-gray-300";
                        const borderBottom = (rIdx + 1) % 3 === 0 && rIdx !== 8 ? "border-b-2 border-b-black" : "border-b border-b-gray-300";

                        return (
                            <div
                                key={`${rIdx}-${cIdx}`}
                                className={`w-12 h-12 flex items-center justify-center ${borderRight} ${borderBottom}`}
                            >
                                <input
                                    type="text"
                                    maxLength={1}
                                    className={`w-full h-full text-center text-xl font-medium outline-none 
                                        ${isPrefilled ? 'bg-gray-100 text-gray-800 font-bold' :
                                            (selected && selected.rIdx === rIdx && selected.cIdx === cIdx) ? 'bg-indigo-200 text-indigo-700 font-bold shadow-inner' :
                                                (selected && (
                                                    selected.rIdx === rIdx ||
                                                    selected.cIdx === cIdx ||
                                                    (Math.floor(selected.rIdx / 3) === Math.floor(rIdx / 3) && Math.floor(selected.cIdx / 3) === Math.floor(cIdx / 3))
                                                )) ? 'bg-indigo-50 text-indigo-600' : 'text-indigo-600 hover:bg-slate-50 focus:bg-indigo-50'}
                                        transition-colors duration-200 cursor-pointer caret-transparent selection:bg-transparent`}
                                    value={cell === null ? "" : cell}
                                    readOnly={isPrefilled}
                                    onClick={() => { setSelected({ rIdx, cIdx }) }}
                                    onChange={(e) => { handleInput(rIdx, cIdx, e.target.value) }}
                                    onFocus={() => { setSelected({ rIdx, cIdx }) }}
                                />
                            </div>
                        )
                    })
                })}
            </div>
        </div>
    )
}

export default Grid;