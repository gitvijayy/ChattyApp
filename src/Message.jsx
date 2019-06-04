import React, { Component } from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {

  render() {

    const messages = this.props.messages.map(message => {
      return (
        < MessageList key={message.id} message={message} />
      )
    })
    return (

      <main className="messages">

        {messages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
     </div>
      </main>
    );
  }
}




export default Message;




{/* <body>
  
  

</body> */}