const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)
  
  if(!duplicateNote) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log(chalk.bgGreen('New note added!'))
  } else {
    console.log(chalk.bgRed('Note title taken!'))
  }
}

const removeNotes = (title) => {
  const notes = loadNotes()
  const newNotes = notes.filter(note => note.title !== title)
  saveNotes(newNotes)
  if(notes.length > newNotes.length) {
    console.log(chalk.bgGreen('The title has been removed'))
  } else {
    console.log(chalk.bgRed('The title does not exist'))
  }
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)
  
  if(note) {
    console.log(chalk.green.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.bgCyan('Your notes'))
  notes.forEach(note => console.log(note.title))
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
  try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON  = dataBuffer.toString()
      return JSON.parse(dataJSON)
  } catch (e) {
      return []
  }
}

module.exports = {
  addNote,
  removeNotes,
  listNotes,
  readNote
}
