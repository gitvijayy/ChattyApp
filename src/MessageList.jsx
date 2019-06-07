import React from 'react';

const MessageList = (props) => {

  const userColor = { background: props.message.color }

  //to check if the given message has any image string
  const regex = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/igm;
  let images;
  let messageString = props.message.content;
  let m = messageString.match(regex)

  if (m) {
    images = m.map(src => {
      messageString = messageString.replace(src, "")
      let imgStyle = { height: "100%", width: "60%" }
      return (
        <div key={src} >
          <a href={src} target="_blank"><img style={imgStyle} src={src} /></a>
        </div>
      )
    })
  }

  return (
    <div className="message">
      <span style={userColor} className="message-username">{props.message.username}</span>
      <span className="message-content">{messageString}
        {images}
      </span>
    </div>
  );
}

export default MessageList;
