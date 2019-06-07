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
      currentUser: { name: "", color: "" },
      messages: [],
      totalUsers: 0
    }
    this.socket = new WebSocket("ws://localhost:3001");
  }

  onKeyDown = (e) => {

    let newMessage = [{ type: "message", username: e.username ? e.username : "Anonymous", content: e.content, color: this.state.currentUser.color }];
    if (e.username !== this.state.currentUser.name) {
      newMessage.push({
        type: "notification", username: e.username,
        content: `${this.state.currentUser.name ? this.state.currentUser.name : "Anonymous"} changed his name to ${e.username}`
      })

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
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {

    this.socket.onopen = function (event) {
      console.log("Socket open")
    }

    this.socket.onmessage = (message) => {
      message = JSON.parse(message.data);


      if (message.type === "count") {
        console.log(message);
        this.setState({
          totalUsers: message.count
        })
        return;
      }
      let messages = this.state.messages;

      if (message.length === 2) {
        messages = messages.concat(message[1])
      }

      messages = messages.concat(message[0])
      this.setState({ messages: messages })
    }
  }

  render() {
    const { content, currentUser, messages, totalUsers } = this.state
    const userOnline = totalUsers === 1 ? "Its Just you Bud" : totalUsers + " Users Online"


    return (
      <div>

        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 style={{ float: "right", fontWeight: "bold", paddingTop: "7px" }}>{userOnline}</h3>
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
