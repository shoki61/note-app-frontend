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


  let userId;
  let image;
  let name;
  if(props.userRdcr.userInfo){
    userId = props.userRdcr.userInfo._id;
    image = props.userRdcr.userInfo.image;
    name = props.userRdcr.userInfo.name; 
  }

  useEffect(() => {
    const getNote = async () => {
      const response = await fetch(
        `http://localhost:5000/api/notes/note/${props.location.state.id}`
      );
      const responseData = await response.json();
      setNote(responseData.note);
      if(responseData.note.likes.indexOf(userId) > -1){
        setUserActions(prevActions => {
          return {...prevActions, favorable:false}
        });
      }
      if(responseData.note.markings.indexOf(userId) > -1){
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
    if(props.userRdcr.userInfo){
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
          if(note[type].indexOf(userId) > -1) return;
          setUserActions(prevActions => {
            return {...prevActions, favorable:false};
          });
          let updateLikes = note.likes;
          updateLikes.push(userId);
          setNote(prevNote => {
            return {...prevNote, likes: updateLikes}
          });
        }else if(type === 'markings'){
          if(note[type].indexOf(userId) > -1) return;
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
            name,
            image,
            user: props.userRdcr.userInfo,
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
    }else if(type === 'comments'){
      setWorning(true);
      setSuccess(false);
      setSuccessStatus('Please login first');
      setTimeout(()=>setWorning(false),4000);
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
              <NavLink to={{pathname:'/profile', state: {id: note.creator._id}}}>
              <div className="note-create-avatar">
                {note.creator.image ? (
                  <Image src={`http://localhost:5000/${note.creator.image}`} alt={note.creator.name} />
                ) : (
                  <p className='avatar-name font-20'>{note.creator.name.charAt(0).toUpperCase()}</p>
                )}
              </div>
              </NavLink>
              <p className="note-creator-name">
                {note.creator.name}
                <span className="note-created-date">{new Date(note.createdAt).toLocaleString()}</span>
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <Button onClick={changeCommentsVisible} className="info-outline">
                <i className="fa fa-comment-o"></i>
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
                <i className="fa fa-bookmark-o"></i>
                <span>{note.markings.length}</span>
              </Button>
              {note.creator._id === userId && (
                <Button className="yellow-outline">
                  <NavLink className="nav-update" to={{pathname:'/update-note', state:{note}}}>
                    Update
                  </NavLink>
                </Button>
              )}
              {note.creator._id === userId && (
                <Button onClick={deletePost} className="danger-outline">Delete</Button>
              )}
            </div>
          </div>
          <div className="note-content">
            <p className="note-title">{note.title}</p>
            <div className="note-image">
              {note.image && <Image src={`http://localhost:5000/${note.image}`} alt={note.title} />}
            </div>
            <p className="note-description">{note.description}</p>
            {note.keywords.length > 0 &&
              <div>
                <p className="note-keywords-title">Keywords</p>
                <div className="note-keywords">
                  {note.keywords.map((item, index) => (
                    <span key={index} className="note-keyword">{item}</span>
                  ))}
                </div>
              </div>
            }
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
    userRdcr: state.userReducer,
  };
};

export default connect(mapStateToProps)(Note);
