import React from 'react'

interface SortButtonProps {
    sortOrder: "asc" | "desc"
    toggleSortOrder: () => void;
}

const SortButton: React.FC<SortButtonProps> = ({ sortOrder, toggleSortOrder }) => {
    return (
        <button onClick={toggleSortOrder}>
            ソート順: {sortOrder === "asc" ? "昇順" : "降順"}
        </button>
    )
}

export default SortButton
