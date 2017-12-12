import React, {Component} from 'react';
import "isomorphic-fetch";
import './App.css';
import * as autoBind from "react-autobind";
import RetracedEventsBrowser from "retraced-logs-viewer";

class App extends Component {
  constructor(props) {
    super(props);
    this.team_id = this.props.team_id
    autoBind(this);
  }

  componentWillMount() {
    const url = `http://localhost:3030/api/viewertoken?team_id=${this.props.team_id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then(resp => {
      resp.json().then(body => {
        console.log("got json", body);
        this.setState({
          token: body.token,
          host: body.host,
        })
      }).catch(console.error);
    }).catch(console.error)
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        {this.state && this.state.token ? (
        <RetracedEventsBrowser auditLogToken={(this.state && this.state.token) || ""} /> ) : <div/>}
      </div>
    );
  }
}

export default App;
