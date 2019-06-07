import React, { Component } from 'react';
//import App from './App.jsx';
class Chatbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content: "",
      username: this.props.currentUser.name
    }
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  keyDown = (e) => {
    //user name change 
    if (e.target.name === "username"
      && this.props.currentUser.name !== e.target.value
      && this.state.username !== "Anonymous") {
      this.props.onKeyDown(this.state.username, "notification")
      return;
    }
    //new messages
    if (e.key === "Enter" && e.target.value) {
      this.props.onKeyDown(this.state.content, "message")
      this.setState({ content: "" })
    }

  }

  render() {

    const { content, username } = this.state

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="username" onBlur={this.keyDown}
          placeholder="Your Name (Optional)"
          defaultValue={username === "Anonymous" ? "" : username}
          onChange={this.onChange}
        />
        <input
          className="chatbar-message"
          name="content"
          placeholder="Type a message and hit ENTER"
          value={content}
          onChange={this.onChange}
          onKeyDown={this.keyDown}
        />
      </footer>
    );
  }

}

export default Chatbar;
