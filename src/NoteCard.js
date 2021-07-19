import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "./firebase.js";
import "./NoteCard.css";

function NoteCard(props) {
  const [editmode, setEditmode] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  const userid = firebaseApp.auth().currentUser.uid;
  const db = firebaseApp.database();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });
  const day = today.getDate();

  const newDate = month + " " + day + ", " + year;

  const id = props.id;
  const date = props.date;
  console.log(props.id);

  const noteRef = db.ref("notes/" + userid);

  function editNote() {
    setEditmode(true);
  }

  function deleteNote() {
    noteRef.child(id).remove();
    window.location.reload();
  }

  function saveNote() {
    const notes = db.ref().child("notes/" + userid + "/" + id);
    notes.update({
      date: newDate,
      title: title,
      body: body,
    });

    window.location.reload();
  }

  function cancelNote() {
    setEditmode(false);
  }

  if (editmode) {
    return (
      <div className="notecard__container">
        <textarea
          className="notecard__title__textarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength="50"
        ></textarea>
        <hr className="notecard__divider"></hr>
        <textarea
          className="notecard__body__textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength="400"
        ></textarea>
        <div className="save__cancel__buttons">
          <button onClick={saveNote} className="save__button">
            Save
          </button>
          <button onClick={cancelNote} className="cancel__button">
            Cancel
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="notecard__container">
        <div className="notecard__title">{title}</div>
        <hr className="notecard__divider"></hr>
        <div className="notecard__body">{body}</div>
        <div className="notecard__date">Last Update: {date}</div>
        <div className="edit__delete__buttons">
          <button onClick={editNote} className="edit__button">
            Edit
          </button>
          <button onClick={deleteNote} className="delete__button">
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default NoteCard;
