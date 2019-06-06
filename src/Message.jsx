import React, { Component } from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {

  render() {

    const messages = this.props.messages.map(message => {
      return (
        message.type === "message" ?
          < MessageList key={message.id} message={message} /> :
          <div key={message.id} className="message system">
            {message.content}
          </div>

      )
    })
    return (

      <main className="messages">

        {messages}

      </main>
    );
  }
}




export default Message;




{/* <body>
  
  

</body> */}