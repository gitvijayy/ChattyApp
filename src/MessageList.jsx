import React, { Component } from 'react';
//import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const style = { color: this.props.message.color }
    let str = this.props.message.content;
    const regex = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/igm;
    let m = regex.exec(str)
    let imgSrc;
    let imgStyle;
    if (m) {
      //console.log(m[0])
      str = str.replace(m[0], "")
      imgSrc = m[0];

      imgStyle = { height: "100%", width: "60%" }
      //console.log(str)
    }





    return (

      <div className="message">
        <span style={style} className="message-username">{this.props.message.username}</span>
        {/* /<span className="message-content">{this.props.message.content} */}
        <span className="message-content">{str}
          <br />
          {imgSrc && <img style={imgStyle} src={imgSrc} />}
        </span>
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