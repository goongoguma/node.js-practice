const fs = require('fs')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title === title)

  if(!duplicateNotes.length) {
    notes.push({
      title,
      body
    })
    saveNotes(notes)
    console.log('New note added!')
  } else {
    console.log('Note title taken!')
  }
}

[{"title":"t","body":"b"},{"title":"List","body":"buying coffee"},{"title":"test","body":"yes it is"}]

const removeNote = (title) => {
  // title = "List"
  const notes = loadNotes()
  const newNotes = notes.filter(note => note.title !== title)
  // [ { title: 't', body: 'b' }, { title: 'test', body: 'yes it is' } ]
  saveNotes(newNotes)
  if(notes.length > newNotes.length) {
    console.log('The title has been removed')
  } else {
    console.log('The title does not exist')
  }
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
  getNotes,
  addNote,
  removeNote
}