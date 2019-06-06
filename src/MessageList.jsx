import React, { Component } from 'react';
//import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const style = { color: this.props.message.color }
    return (

      <div className="message">
        <span style={style} className="message-username">{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>

    );
  }
}




export default MessageList;




// {/* <body>
//   <nav class="navbar">
//     <a href="/" class="navbar-brand">Chatty</a>
//   </nav>


// </body> */}