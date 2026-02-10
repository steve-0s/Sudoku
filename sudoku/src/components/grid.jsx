import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Grid = ({ board, puzzle, selected, setSelected, handleInput }) => {
    const { theme } = useTheme();

    return (
        <div className="flex justify-center">
            <div className={`grid grid-cols-9 border-2 ${theme.boardBorder} ${theme.card} shadow-lg rounded-sm overflow-hidden`}>
                {board.map((row, rIdx) => {
                    return row.map((cell, cIdx) => {
                        const isPrefilled = puzzle[rIdx][cIdx] !== 0;

                        // Calculate borders for 3x3 subgrids
                        const isRightEdge = cIdx === 8;
                        const isBottomEdge = rIdx === 8;
                        const isRightBlockEdge = (cIdx + 1) % 3 === 0;
                        const isBottomBlockEdge = (rIdx + 1) % 3 === 0;

                        const borderRight = isRightEdge
                            ? ""
                            : isRightBlockEdge
                                ? `border-r-4 ${theme.cell.borderBold}`
                                : `border-r ${theme.cell.border}`;

                        const borderBottom = isBottomEdge
                            ? ""
                            : isBottomBlockEdge
                                ? `border-b-4 ${theme.cell.borderBold}`
                                : `border-b ${theme.cell.border}`;

                        let cellStyle = theme.cell.base;
                        if (isPrefilled) {
                            cellStyle = theme.cell.prefilled;
                        } else if (selected && selected.rIdx === rIdx && selected.cIdx === cIdx) {
                            cellStyle = theme.cell.selected;
                        } else if (selected && (
                            selected.rIdx === rIdx ||
                            selected.cIdx === cIdx ||
                            (Math.floor(selected.rIdx / 3) === Math.floor(rIdx / 3) && Math.floor(selected.cIdx / 3) === Math.floor(cIdx / 3))
                        )) {
                            cellStyle = theme.cell.highlighted;
                        }

                        return (
                            <div
                                key={`${rIdx}-${cIdx}`}
                                className={`w-14 h-14 shrink-0 flex items-center justify-center ${borderRight} ${borderBottom}`}
                            >
                                <input
                                    type="text"
                                    maxLength={1}
                                    style={{ lineHeight: '3.5rem' }}
                                    className={`w-full h-full text-center text-2xl font-semibold outline-none ${cellStyle}
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

