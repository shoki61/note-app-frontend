import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import Image from "../../../shared/components/Image/Image";
import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Input/Input";
import NoteComments from "../../components/NoteComments/NoteComments";
import Backdrop from "../../../shared/components/Backdrop/Backdrop";
import Spinner from "../../../shared/components/Spinner/Spinner";
import "./Note.css";
import { NavLink } from "react-router-dom";

const Note = (props) => {
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [note, setNote] = useState();

  useEffect(() => {
    const getNote = async () => {
      const response = await fetch(
        `http://localhost:5000/api/notes/note/${props.location.state.id}`
      );
      const responseData = await response.json();
      setNote(responseData.note);
      console.log(responseData.note);
    };
    getNote();
  }, []);

  const changeCommentsVisible = () =>
    setCommentsVisible((prevVisible) => !prevVisible);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {note ? (
        <div className="note-container">
          <div className="note-creator">
            <div className="center">
              <div className="note-create-avatar">
                {note.creator.image ? (
                  <Image src={note.creator.image} alt={note.creator.name} />
                ) : (
                  <Image
                    src={require("../../../users/image/defaultImg.png").default}
                  />
                )}
              </div>
              <p className="note-creator-name">
                {note.creator.name}{" "}
                <span className="note-created-date">{note.createdAt}</span>
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <Button onClick={changeCommentsVisible} className="info-outline">
                <i class="fa fa-comment-o"></i>
                <span>{note.commends.length}</span>
              </Button>
              <Button className="info-outline">
                <i className="fa fa-heart-o"></i>
                <span>{note.likes}</span>
              </Button>
              <Button className="info-outline">
                <i class="fa fa-bookmark-o"></i>
                <span>{note.markings}</span>
              </Button>
              {note.creator._id === props.userInfo.userId && (
                <Button className="yellow-outline">
                  <NavLink className="nav-update" to="/update-note">
                    Update
                  </NavLink>
                </Button>
              )}
              {note.creator._id === props.userInfo.userId && (
                <Button className="danger-outline">Delete</Button>
              )}
              {note.creator._id !== props.userInfo.userId && props.userInfo.isLoggedIn && <Button className="black-outline">Follow</Button>}
            </div>
          </div>
          <div className="note-content">
            <p className="note-title">{note.title}</p>
            <div className="note-image">
              {note.image && <Image src={note.image} alt={note.title} />}
            </div>
            <p className="note-description">{note.description}</p>
            <div>
              <p className="note-keywords-title">Keywords</p>
              <div className="note-keywords">
                {note.keywords.map((item) => (
                  <span className="note-keyword">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="line"></div>

          <div className="note-comment-container">
            <p className="note-footer-title">Add comment</p>
            <Input className="comment full" placeholder="write something..." />
            <Button className="success">Submit</Button>
          </div>
          {commentsVisible && (
            <Fragment>
              <NoteComments data={note.comments} onClose={changeCommentsVisible} />
              <Backdrop onClose={changeCommentsVisible} />
            </Fragment>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer,
  };
};

export default connect(mapStateToProps)(Note);
