import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from '../components/Header'
import SortButton from '../components/SortButton'
import NoteList from '../components/modal/NoteList'
import '../Style.css'


interface Note {
    id: string
    title: string
    content: string
    createdAt: number
}

function HomePage() {
    const [notes, setNotes] = useState<Note[]>([])
    const [newTitle, setNewTitle] = useState<string>('')
    const [newContent, setNewContent] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const [isOpen, setIsOpen] = useState(false)
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    const addNote = () => {
        if (newTitle.trim() !== '' && newContent.trim() !== '') {
            const note: Note = {
                id: uuidv4(),
                title: newTitle,
                content: newContent,
                createdAt: Date.now(),
            }
            setNotes([...notes, note])
            setNewTitle('')
            setNewContent('')
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
        setNotes(notes.filter((note) => note.id !== id));
    }

    const openModal = (note: Note) => {
        setSelectedNote(note)
        setIsOpen(true)
    }

    const closeModal = () => {
        setSelectedNote(null)
        setIsOpen(false)
    }

    return (
        <div className="App">
            <Header />
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="新しいタイトルを入力..."
            />
            <input
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="新しいメモの内容を入力..."
            />
            <button onClick={addNote}>メモ追加</button>
            <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
            <ul>
                {sortNotes(notes, sortOrder).map((note) => (
                    <li key={note.id}>
                        <span onClick={() => openModal(note)}>{note.title}</span>
                        <button onClick={() => deleteNote(note.id)}>削除</button>
                    </li>
                ))}
            </ul>
            {selectedNote && (
                <NoteList
                    show={isOpen}
                    onClose={closeModal}
                    title={selectedNote.title}
                    content={selectedNote.content}
                />
            )}
        </div>
    )
}

export default HomePage