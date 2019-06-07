import React, { Component } from 'react';
import Chatbar from './chatBar.jsx';
import Message from './Message.jsx';
import { getRandomColor } from './util.js';
import { runInThisContext } from 'vm';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: { name: 'Anonymous', color: '' },
      messages: [],
      totalUsers: 0
    }

  }

  onKeyDown = (data, type) => {
    let newMessage;

    if (type === 'notification') {
      newMessage = {
        type: type,
        username: data,
        content: `${this.state.currentUser.name} changed name to ${data}`
      }
      // to change username to the new name and update color if no color has been set for the user yet
      let currentUser = this.state.currentUser
      currentUser.name = data
      currentUser.color = !currentUser.color ? getRandomColor() : currentUser.color
      this.setState({
        currentUser: currentUser
      })
      this.socket.send(JSON.stringify(newMessage));
      return;
    }

    newMessage = {
      type: type,
      username: this.state.currentUser.name,
      content: data,
      color: this.state.currentUser.color
    };

    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = function (event) {
      console.log('Socket Open')
    }

    this.socket.onmessage = (message) => {
      message = JSON.parse(message.data);
      if (message.type === 'count') {
        this.setState({
          totalUsers: message.count
        })
        return;
      }

      this.setState({ messages: [...this.state.messages, message] })
    }
  }

  render() {

    const { currentUser, messages, totalUsers } = this.state
    const userOnline = totalUsers === 1 ? 'Its Just you Bud 😐' : totalUsers + ' - Bats Active'

    return (
      <div>

        <nav className='navbar'>
          <img className='navbar-img' />
          <a href='/' className='navbar-brand'>Batroom</a>
          <h3 className='users'>{userOnline}</h3>
        </nav>

        <Message messages={messages} color={currentUser.color} />
        <Chatbar onKeyDown={this.onKeyDown} currentUser={currentUser} />

      </div>
    );
  }

}
export default App;
