import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import Image from "../../../shared/components/Image/Image";
import Button from "../../../shared/components/Button/Button";
import Input from "../../../shared/components/Input/Input";
import NoteComments from "../../components/NoteComments/NoteComments";
import Backdrop from "../../../shared/components/Backdrop/Backdrop";
import Spinner from "../../../shared/components/Spinner/Spinner";
import "./Note.css";
import { NavLink } from "react-router-dom";

const Note = (props) => {
  const history = useHistory();
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [note, setNote] = useState();
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);
  const [worning, setWorning] = useState(false);
  const [successStatus, setSuccessStatus] = useState('');
  const [userActions, setUserActions] = useState({favorable: true, markable:true});

  useEffect(() => {
    const getNote = async () => {
      const response = await fetch(
        `http://localhost:5000/api/notes/note/${props.location.state.id}`
      );
      const responseData = await response.json();
      setNote(responseData.note);
      console.log(responseData);
      if(responseData.note.likes.indexOf(props.userInfo.userId) > -1){
        setUserActions(prevActions => {
          return {...prevActions, favorable:false}
        });
      }
      if(responseData.note.markings.indexOf(props.userInfo.userId) > -1){
        setUserActions(prevActions => {
          return {...prevActions, markable:false}
        });
      }
    };
    getNote();
  }, []);

  const changeCommentsVisible = () => setCommentsVisible(prevVisible => !prevVisible);


  const inputHandler = event => setComment(event.target.value);


  const updatePostHandler = async type => {
    const userId = props.userInfo.userId;
    let data;
    if(type === 'likes'){
      data={likes: '', userId};
    }else if( type === 'markings'){
      data={markings:'', userId};
    }else{
      data={comments: '', comment, userId};
    };

    const response = await fetch(`http://localhost:5000/api/notes/update-note/${props.location.state.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    if(responseData.note){
      if(type === 'likes'){
        if(note[type].indexOf(props.userInfo.userId) > -1) return;
        setUserActions(prevActions => {
          return {...prevActions, favorable:false};
        });
        let updateLikes = note.likes;
        updateLikes.push(userId);
        setNote(prevNote => {
          return {...prevNote, likes: updateLikes}
        });
      }else if(type === 'markings'){
        if(note[type].indexOf(props.userInfo.userId) > -1) return;
        setUserActions(prevActions => {
          return {...prevActions, markable:false};
        });
        let updateMarkings = note.markings;
        updateMarkings.push(userId)
        setNote(prevNote => {
          return {...prevNote, markings: updateMarkings}
        });
      }else{
        note.comments.push({
          user:{
            name: props.userInfo.name,
            image: props.userInfo.image
          },
          date: new Date().toLocaleString(),
          comment
        });
        setWorning(true);
        setSuccess(true);
        setSuccessStatus('Your note has been saved successfully.');
        setTimeout(()=>setWorning(false),4000);
      };
    }else{
      if(type === 'comments'){
        setWorning(true);
        setSuccess(false);
        setSuccessStatus('Unexpected error occured please try again.');
        setTimeout(()=>setWorning(false),4000);
      };
    };
  };

  const deletePost = async() => {
    const response = await fetch(`http://localhost:5000/api/notes/delete-note/${props.location.state.id}`,{
      method:'DELETE'
    });
    if(response.status === 200) history.push('/notes');
  };

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
                {note.creator.name}
                <span className="note-created-date">{new Date(note.createdAt).toLocaleString()}</span>
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <Button onClick={changeCommentsVisible} className="info-outline">
                <i class="fa fa-comment-o"></i>
                <span>{note.comments.length}</span>
              </Button>
              <Button 
                onClick={() => updatePostHandler('likes')} 
                className={userActions.favorable ? 'info-outline': 'info'}>
                <i className="fa fa-heart-o"></i>
                <span>{note.likes.length}</span>
              </Button>
              <Button 
                onClick={() => updatePostHandler('markings')} 
                className={userActions.markable ? 'info-outline': 'info'}>
                <i class="fa fa-bookmark-o"></i>
                <span>{note.markings.length}</span>
              </Button>
              {note.creator._id === props.userInfo.userId && (
                <Button className="yellow-outline">
                  <NavLink className="nav-update" to="/update-note">
                    Update
                  </NavLink>
                </Button>
              )}
              {note.creator._id === props.userInfo.userId && (
                <Button onClick={deletePost} className="danger-outline">Delete</Button>
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
                {note.keywords.map((item, index) => (
                  <span key={index} className="note-keyword">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="line"></div>
          {worning && <p className={success ? 'success-text' : 'un-success-text'}>{successStatus}</p>}
          <div className="note-comment-container">
            <p className="note-footer-title">Add comment</p>
            <Input value={comment} onChange={inputHandler} className="comment full" placeholder="write something..." />
            <Button onClick={()=> updatePostHandler('comments')} className="success">Submit</Button>
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
