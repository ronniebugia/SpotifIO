import React from 'react';

import '../css/input.css';

class Input extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {value: ''};

  //   this.handleChange = this.handleChange.bind(this)
  // };

  render() {
    return (
      <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={this.props.message}
        onChange={({ target: { value } }) => this.prop.setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? this.prop.sendMessage(event) : null}
      />
      <button className="sendButton" onClick={e => this.prop.sendMessage(e)}>Send</button>
    </form>
    )
  }
}

// const Input = ({ setMessage, sendMessage, message }) => (
//   <form className="form">
//     <input
//       className="input"
//       type="text"
//       placeholder="Type a message..."
//       value={this.promp.message}
//       onChange={({ target: { value } }) => setMessage(value)}
//       onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
//     />
//     <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
//   </form>
// )

export default Input;