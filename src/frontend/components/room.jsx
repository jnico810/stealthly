import React from "react";
import $ from "jquery";

class Room extends React.Component {

  constructor(props){
    super(props);
    this.state = {socket: null, message:"", log:[] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if (this.props.code && this.props.code.length > 0){
      const socket = io(`/${this.props.code}`);
      this._setupSocket(socket);
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.code && nextProps.code.length > 0){
      const socket = io(`/${nextProps.code}`);
      this._setupSocket(socket);
    }
  }

  _setupSocket(socket) {
    socket.on('chat message', (msg, nickname) => {
      const newLog = this.state.log;
      newLog.push({user: nickname, msg: msg});
      socket.emit('log chat message', newLog);
      this.setState({log:newLog});
    });
    this.setState({ socket: socket });
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.state.socket.emit('chat message', this.state.message, this.props.nickname);
    this.setState({ message:'' });
    return false;
  }

  render(){
    window.state = this.state;
    if (this.props.error){
      return(
        <div className="room">
          <h3>{ this.props.error }</h3>
        </div>
      );
    }else {
      return (
        <div>
          <div className="page-header text-center">
            <h1> Room: { this.props.code }</h1>
            <p> Share your code with your friends and have a ball! </p>
          </div>
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-0 text-center">
            </div>

            <form className="col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-0 text-center chat" onSubmit={ this.handleSubmit }>
              <div className="form-group">
                <div className="input-group">
                  <input className= "form-control" type="text" value={this.state.message} onChange={this.handleChange} />
                  <span className="input-group-btn">
                    <button type="submit" value="Submit" className="btn btn-default">Send</button>
                  </span>
                </div>
              </div>
              <ul id="messages" className="list-group text-left">
                { this.state.log.map(function(msg, idx){
                    return <li className="list-group-item chat-item"key={ idx }><strong>{ msg.user }</strong> : { msg.msg }</li>;
                  }) }
              </ul>
            </form>



          </div>

        </div>
      );
    }
  }
}

export default Room;
