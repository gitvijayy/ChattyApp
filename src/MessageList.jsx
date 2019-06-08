import React from 'react';

export default function MessageList(props) {
  const { message } = props
  const userColor = { background: message.color }
  //to check if the given message has any image string
  const regex = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/igm;
  let images = null;
  let messageString = message.content;
  let url = messageString.match(regex)
  if (url) {
    images = url.map(src => {
      messageString = messageString.replace(src, '')
      let imgStyle = { height: '100%', width: '60%' }
      return (
        <div key={src} >
          <a href={src} target='_blank'><img style={imgStyle} src={src} /></a>
        </div>
      )
    })
  }

  return (
    <div className='message'>
      <span style={userColor} className='message-username'>{message.username}</span>
      <span className='message-content'>{messageString}{images}</span>
    </div>
  );
}

