import React, { Component } from 'react';
import Chatbar from './chatBar.jsx';
import Message from './Message.jsx';
import { generateRandomId } from "./util.js";
import { runInThisContext } from 'vm';
import { getRandomColor } from "./randomColor.js";
//impthis.socketServer from ('ws').Server;
//import Main from './components/Main.jsx';


class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentUser: { name: "", color: "" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      totalUsers: 0
    }

    this.socket = new WebSocket("ws://localhost:3001");

  }

  onKeyDown = (e) => {

    // let str = e.content;
    // const regex = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/igm;
    // let m = regex.exec(str)

    // if (m) {
    //   console.log(m[0])
    //   str = str.replace(m[0], "")
    //   console.log(str)
    // }


    let newMessage = [{ type: "message", username: e.username ? e.username : "Anonymous", content: e.content, color: this.state.currentUser.color }];
    if (e.username !== this.state.currentUser.name) {
      newMessage.push({
        type: "notification", username: e.username,
        content: `${this.state.currentUser.name ? this.state.currentUser.name : "Anonymous"} changed his name to ${e.username}`
      })

      // if (!this.state.currentUser.color) {
      //   console.log("in")
      //   console.log(getRandomColor())
      //   this.setState({ currentUser: { name: e.username, color: getRandomColor() } })
      // }
      // let color = getRandomColor()
      // console.log(color)
      // this.setState({
      //   currentUser: {
      //     name: e.username, color: this.state.currentUser.color ?
      //       this.state.currentUser.color : color
      //   }
      // })

      if (!this.state.currentUser.color) {
        let color = getRandomColor()
        console.log(color)


        this.setState({
          currentUser: {
            name: e.username, color: color
          }
        })
        newMessage[0].color = color
      }






    }

    console.log(this.state.currentUser)
    this.socket.send(JSON.stringify(newMessage));
  }


  componentDidMount() {

    this.socket.onopen = function (event) {
      console.log("Socket open")
    }

    this.socket.onmessage = (message) => {
      message = JSON.parse(message.data);
      console.log(message)
      if (message.type === "count") {
        console.log(message);
        this.setState({
          totalUsers: message.count
        })
        return;
      }


      let messages = this.state.messages;
      //console.log(messages)
      if (message.length === 2) {
        messages = messages.concat(message[1])
      }


      // if (messages.length > 0) {
      messages = messages.concat(message[0])
      // } else {
      //   messages = message[0]
      // }

      //console.log(messages);
      this.setState({ messages: messages })
    }

  }

  render() {
    const { content, currentUser, messages, totalUsers } = this.state
    //console.log(messages)

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h5>{totalUsers}</h5>
        </nav>
        <Message messages={messages} color={currentUser.color} />
        <Chatbar onKeyDown={this.onKeyDown}
          currentUser={currentUser}
          messages={messages}
          content={content} />
      </div>
    );
  }

}
export default App;


 // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages })
    // }, 3000);
