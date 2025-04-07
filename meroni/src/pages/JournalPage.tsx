import { useState, useEffect } from 'react'
import { db, JournalEntry } from '../utils/db'

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [text, setText] = useState('')

  const addEntry = async () => {
    await db.journal.add({ content: text, date: new Date().toISOString() })
    setText('')
    loadEntries()
  }

  const loadEntries = async () => {
    const allEntries = await db.journal.toArray()
    setEntries(allEntries)
  }

  useEffect(() => {
    loadEntries()
  }, [])

  return (
    <div>
      <h1>Journal</h1>
      <textarea value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addEntry}>Save</button>

      <ul>
        {entries.map(entry => (
          <li key={entry.id}>{entry.content} — {entry.date}</li>
        ))}
      </ul>
    </div>
  )
}
