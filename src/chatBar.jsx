import React, { Component } from 'react';
//import App from './App.jsx';

class Chatbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      content: ""
    }


  }
  onChange = (event) => {
    this.setState({ content: event.target.value })
  }

  keyDown = (e) => {
    if (e.key === "Enter" && e.target.value) {
      this.props.onKeyDown(e)
      this.setState({ content: "" })
    }
  }

  render() {



    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
        <input onChange={this.onChange} onKeyDown={this.keyDown} className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} />
      </footer>
    );
  }
}




export default Chatbar;
