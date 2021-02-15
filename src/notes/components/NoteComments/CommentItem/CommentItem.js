import React from "react";

import "./CommentItem.css";
import Image from "../../../../shared/components/Image/Image";

const CommentItem = (props) => {
  return (
    <div className="comment-item-container">
      <div className='center comment-item-header'>
        <div className="comment-item-avatar">
          <Image src={props.avatar} alt={props.name} />
        </div>
        <div>
            <p className='comment-item-name'>{props.name}</p>
            <p className='comment-item-date'>{props.date}</p>
        </div>
      </div>
      <div className='comment-item-content'>
          <p className='comment-item-comment'>{props.comment}</p>
      </div>
    </div>
  );
};

export default CommentItem;
