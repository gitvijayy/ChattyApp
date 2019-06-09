import React, { Component, useState, useEffect, useMemo, useRef } from 'react';
import Chatbar from './chatBar.jsx';
import Message from './Message.jsx';
import { getRandomColor } from './util.js';


const socket = new WebSocket('ws://localhost:3001');

export default function App() {

  const [userName, setUser] = useState('')
  const [color, setColor] = useState(getRandomColor())
  const [messages, setMessages] = useState([])
  const [totalUsers, setCount] = useState(0)

  useEffect(() => {
    document.getElementById("scrollToBottom").scrollIntoView({ behavior: "smooth" });
  })

  socket.onmessage = (message) => {
    message = JSON.parse(message.data);
    message.type === 'count' ? setCount(message.count) : setMessages([...messages, message])
  }

  const onKeyDown = (e, type) => {

    let user = userName ? userName : 'Anonymous'
    let newMessage = { type: type, username: user, color: color };

    if (type === 'notification') {
      newMessage.content = `${user} changed name to ${e.target.value}`
      setUser(e.target.value)
    }

    if (type === 'message') {
      newMessage.content = e.target.value
      e.target.value = ''
    }

    socket.send(JSON.stringify(newMessage));

  }

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
      {/* ref={(el) => { messagesEnd = el; }} */}
      <div id="scrollToBottom"> </div>
      <Chatbar onKeyDown={onKeyDown} currentUser={userName} />

    </div >
  );
}

