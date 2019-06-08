import React, { Component } from 'react';
import Chatbar from './chatBar.jsx';
import Message from './Message.jsx';
import { getRandomColor } from './util.js';
//import { runInThisContext } from 'vm';
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentUser: { name: '', color: getRandomColor() },
      messages: [],
      totalUsers: 0
    }
  }

  onKeyDown = (e, type) => {

    const { name, color } = this.state.currentUser
    let userName = name ? name : 'Anonymous'

    let newMessage = {
      type: type, username: userName, color: color
    };

    if (type === 'notification') {
      newMessage.content = `${userName} changed name to ${e.target.value}`
      this.setState({ currentUser: { name: e.target.value, color: color } })
    }

    if (type === 'message') {
      newMessage.content = e.target.value
      e.target.value = ''
    }

    this.socket.send(JSON.stringify(newMessage));

  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {

    this.scrollToBottom();

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
      <div >

        <nav className='navbar'>
          <img className='navbar-img' />
          <a href='/' className='navbar-brand'>Batroom</a>
          <h3 className='users'>{userOnline}</h3>
        </nav>

        <Message messages={messages} />
        {/* empty div to scroll to bottom */}
        <div ref={(el) => { this.messagesEnd = el; }}> </div>
        <Chatbar onKeyDown={this.onKeyDown} currentUser={currentUser} />

      </div>
    );
  }
}
export default App;
