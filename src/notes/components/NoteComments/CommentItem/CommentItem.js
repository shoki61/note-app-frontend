import React from "react";

import "./CommentItem.css";
import Image from "../../../../shared/components/Image/Image";

const CommentItem = (props) => {
  return (
    <div className="comment-item-container">
      <div className='center comment-item-header'>
        <div className="comment-item-avatar">
          {props.userImage || props.user 
            ? <Image src={`http://localhost:5000/${props.user ? props.user.image : props.userImage}`} alt={props.userName} /> 
            : <p className='avatar-name font-15'>{props.user ? props.user.name.charAt(0).toUpperCase() : props.userName.charAt(0).toUpperCase()}</p>
          }
        </div>
        <div>
            <div className='user-name-container'>
              <p className='comment-item-name'>{props.user ? props.user.name : props.userName}</p>
              <div className='user-info-container'>
                <div className='user-info'>
                  <div className='user-info-avatar mr-1'>
                    {props.userImage 
                      ? <Image src={props.userImage} alt={props.userName} /> 
                      : <p className='avatar-name font-15'>{props.userName.charAt(0).toUpperCase()}</p>
                    }
                  </div>
                  <p style={{fontWeight:500}} className='comment-item-name font-20'>{props.userName}</p>
                </div>
              </div>
            </div>
            <p className='comment-item-date'>{props.date}</p>
        </div>
      </div>
      <div className='comment-item-content'>
          <p className='comment-item-comment'>{props.comment}</p>
      </div>
      {
        !props.user && <p className='deleted-acount'>account deleted</p>
      }
    </div>
  );
};

export default CommentItem;
