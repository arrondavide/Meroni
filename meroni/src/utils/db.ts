import Dexie, { Table } from 'dexie'

export interface JournalEntry {
  id?: number
  content: string
  date: string
}

class MeroniDB extends Dexie {
  journal!: Table<JournalEntry>

  constructor() {
    super('meroniDB')
    this.version(1).stores({
      journal: '++id, date'
    })
  }
}

export const db = new MeroniDB()
