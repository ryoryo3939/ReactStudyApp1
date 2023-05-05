import React from 'react'

interface NoteListProps {
    show: boolean
    onClose: () => void
    title: string
    content: string
}

const NoteList: React.FC<NoteListProps> = ({ show, onClose, title, content }) => {
    if (!show) {
        return null
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={onClose}>閉じる</button>
            </div>
        </div>
    )
}

export default NoteList