import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";

//react-split from npm
import Split from "react-split";

//nanoid from npm
import { nanoid } from "nanoid";

export default function App() {
  //lazy state initialization　=> useStateのあとにfunctionで
  const [notes, setNotes] = React.useState(
    () => JSON.parse(localStorage.getItem("note")) || []
  );

  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    //try to reorder
    setNotes((oldNotes) => {
        //put recently edited note at top
        const newArray = [];
        for(let i = 0; i < oldNotes.length; i++){
            const oldNote = oldNotes[i]
            if(oldNote.id === currentNoteId){
                newArray.unshift({...oldNote, body: text})
            }else{
                newArray.push(oldNote)
            }
        }
        return newArray;
    });

// unable to automatically put at top version
//   setNotes((oldNotes) => 
//   oldNotes.map((oldNote) => {
//     return oldNote.id === currentNoteId
//       ? { ...oldNote, body: text }
//       : oldNote;
//   })
// );
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }


  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter((item)=> item.id !== noteId))
    };




  React.useEffect(() => {
    localStorage.setItem("note", JSON.stringify(notes));
  }, [notes]);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
