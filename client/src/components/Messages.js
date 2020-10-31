import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

import '../css/messages.css';

class Messages extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: ''};

  //   this.handleChange = this.handleChange.bind(this)
  // };

  render() {
    return (
      <ScrollToBottom className="messages">
        {this.props.messages.map((message, i) => <div key={i}><Message message={message} name={this.props.name}/></div>)}
      </ScrollToBottom>
    )
  }
}

// const Messages = ({ messages, name }) => (
//   <ScrollToBottom className="messages">
//     {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
//   </ScrollToBottom>
// );

export default Messages;