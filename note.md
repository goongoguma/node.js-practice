## 14. Removing a Note

### Challenge 1 : Setup command option and function

1. Setup the remove command to take a required "--title" option
  ```js
    yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
  })
  ```
2. Create and export a removeNote function from notes.js
  ```js
    module.exports = {
    getNotes,
    addNote,
    removeNote
  }
  ```
3. Call removeNote in remove command handler
  ```js
    yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
      }
    },
    handler: (argv) => notes.removeNote(argv.title) 
  })
  ```
4. Have removeNote log the title of the note to be removed
  ```js
    const removeNote = (title) => {
    console.log(title)
  }
  ```
5. Test your work using node app.js remove --title="some title"
  ```js
  node app.js remove --title="Some title" // Some title
  ```

### Challenge 2 : Wire up removeNote

1. Load existing notes
2. Use array filter method to remove the matching note (if any)
3. Save the newly created array
4. Test your work with a title that exists and a title that does not exist
  ```js
    const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)
      saveNotes(newNotes)
  }
  ```

### Challenge 3 : Use chalk to provide useful logs for remove

1. If a note is removed, print 'Nice removed!' with a grenn background
2. If no note is removed, print 'No note found!' with a red background

  ```js
    const removeNote = (title) => {
    const notes = loadNotes()
    const newNotes = notes.filter(note => note.title !== title)
    saveNotes(newNotes)
    if(notes.length > newNotes.length) {
      console.log(chalk.green.inverse('Note removed!'))
    } else {
      console.log(chalk.red.inverse('No note found!'))
    }
  }
  ```