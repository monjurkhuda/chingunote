import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "./firebase.js";
import NoteCard from "./NoteCard.js";
import "./Notes.css";

function Notes() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notesObj, setNotesObj] = useState({});
  const [notesArray, setNotesArray] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const day = today.getDate();

  const date = month + " " + day + ", " + year;

  const userEmail = firebaseApp.auth().currentUser.email;
  const userid = firebaseApp.auth().currentUser.uid;

  const db = firebaseApp.database();

  useEffect(() => {
    const readNotes = db.ref("notes/" + userid);

    readNotes.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childData);
        setNotesArray((oldArray) => [
          ...oldArray,
          { key: childKey, childData },
        ]);
        console.log(notesArray);
      });
    });
  }, []);

  console.log("notesArray: ", notesArray);

  function submitNote() {
    const notes = db.ref().child("notes/" + userid);
    notes.push({
      date: date,
      title: title,
      body: body,
    });

    window.location.reload();
  }

  console.log("notesObj: ", notesObj);
  console.log("notesArray: ", notesArray);

  return (
    <div className="notes__container">
      <div className="title">Monjur Chingu Journal</div>
      <hr className="note__divider"></hr>
      <div className="username__signout">
        <div className="username">{`Hello, ${userEmail}!`}</div>
        <div>
          <button
            className="signout__button"
            onClick={() => firebaseApp.auth().signOut()}
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="notes__title__body">
        <textarea
          cols="40"
          rows="2"
          maxLength="50"
          className="notes__title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <textarea
          cols="40"
          rows="5"
          maxLength="400"
          className="notes__body"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button onClick={submitNote} className="submit__button">
          Submit
        </button>
      </div>

      <div className="notecards">
        {notesArray.map((notelist) => {
          return (
            <NoteCard
              id={notelist.key}
              date={notelist.childData.date}
              title={notelist.childData.title}
              body={notelist.childData.body}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
