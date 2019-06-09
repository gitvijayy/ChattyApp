import React from 'react';

export default function Chatbar(props) {

  const { currentUser, onKeyDown } = props

  return (
    <footer className='chatbar'>

      <input
        className='chatbar-username'
        name='username'
        onBlur={(e) => { (e.target.value != currentUser) ? onKeyDown(e, 'notification') : null }}
        placeholder='Your Name (Optional)'
      />

      <input
        className='chatbar-message'
        name='content'
        placeholder='Type a message and hit ENTER'
        onKeyDown={(e) => { (e.key === 'Enter' && e.target.value) ? onKeyDown(e, 'message') : null }}
      />

    </footer>
  );

}
