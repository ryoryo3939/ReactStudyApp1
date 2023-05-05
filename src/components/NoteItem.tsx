import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

interface NoteItemProps {
    id: string
    content: string
    index: number
    moveNote: (dragIndex: number, hoverIndex: number) => void
    deleteNote: (id: string) => void
}

const NoteItem: React.FC<NoteItemProps> = ({ id, content, index, moveNote, deleteNote }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'note',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const [, drop] = useDrop(() => ({
        accept: 'note',
        hover(item: { id: string; index: number }, monitor) {
            if (item.index === index) {
                return
            }

            moveNote(item.index, index)
            item.index = index
        },
    }))

    return (
        <li
            ref={(node) => drag(drop(node))}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            {content}
            <button onClick={() => deleteNote(id)}>削除</button>
        </li>
    );
};

export default NoteItem