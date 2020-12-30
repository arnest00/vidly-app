import React from 'react';

const LikeBtn = (props) => {
  let classes = 'fa fa-heart';
  if (!props.liked) classes += '-o';
  
  return (
    <i
      style={{ cursor: 'pointer' }}
      className={classes}
      onClick = {props.onClick}
    ></i>
  );
};

export default LikeBtn;