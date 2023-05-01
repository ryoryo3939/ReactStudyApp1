import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from "../components/Header";
import SortButton from "../components/SortButton";


interface Note {
    id: string
    content: string
    createdAt: number
}

function HomePage() {
    const [notes, setNotes] = useState<Note[]>([])
    const [newNote, setNewNote] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

    const addNote = () => {
        if (newNote.trim() !== '') {
            const note: Note = {
                id: uuidv4(),
                content: newNote,
                createdAt: Date.now(),
            }
            setNotes([...notes, note])
            setNewNote('')
        }
    }

    const sortNotes = (notes: Note[], order: "asc" | "desc"): Note[] => {
        return notes.sort((a, b) =>
            order === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
        )
    }

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    }

    const deleteNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id))
    }

    return (
        <div className="App">
            <Header />
            <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="新しいメモを入力..."
            />
            <button onClick={addNote}>メモ追加</button>
            <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
            <ul>
                {sortNotes(notes, sortOrder).map((note) => (
                    <li key={note.id}>
                        {note.content}
                        <button onClick={() => deleteNote(note.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage
