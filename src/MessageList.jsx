import React, { Component } from 'react';
//import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const style = { color: this.props.message.color }
    let str = this.props.message.content;
    const regex = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/igm;
    //let m = regex.exec(str)
    let m = str.match(regex)
    //let imgSrc;
    let images;
    console.log(m)
    if (m) {
      images = m.map(src => {
        str = str.replace(src, "")
        console.log("src", src)
        //imgSrc = src;
        let imgStyle = { height: "100%", width: "60%" }
        return (
          <div key={src}>
            <br />
            <img style={imgStyle} src={src} />
            <br />
          </div>
        )
      })
    }

    return (

      <div className="message">
        <span style={style} className="message-username">{this.props.message.username}</span>
        {/* /<span className="message-content">{this.props.message.content} */}
        <span style={{ display: "flex", flexDirection: "column" }} className="message-content">{str}

          {images}

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