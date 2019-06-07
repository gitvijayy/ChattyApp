import React from 'react';
import MessageList from './MessageList.jsx';


const Message = (props) => {

  const messages = props.messages.map(message => {
    return (
      message.type === 'message'
        ?
        < MessageList key={message.id} message={message} color={props.color} />
        :
        <div key={message.id} className='message system'>
          {message.content}
        </div>
    )
  })
  return (
    <main className='messages'>
      {messages}
    </main>
  );
}

export default Message
