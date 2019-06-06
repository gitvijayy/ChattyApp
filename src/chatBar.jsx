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
    if (e.key === "Enter" && e.target.value) {
      this.props.onKeyDown(this.state)
      this.setState({ content: "" })
    }
  }

  render() {



    return (
      <footer className="chatbar">

        <input onChange={this.onChange} name="username"
          className="chatbar-username" placeholder="Your Name (Optional)"
          defaultValue={this.props.currentUser.name} />

        <input name="content" onChange={this.onChange}
          onKeyDown={this.keyDown} className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content} />

      </footer>
    );
  }
}




export default Chatbar;
