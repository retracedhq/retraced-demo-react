import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as util from 'util';
import RetracedEventsBrowser from "retraced-logs-viewer";

const url = `http://localhost:3030/api/viewertoken?team_id=my_savvy_end_customer`;

// render the events browser
function render(token) {
  ReactDOM.render(
    <RetracedEventsBrowser auditLogToken={token}/>,
    document.getElementById('root')
  );
}

// render an error
function renderError(err) {
  ReactDOM.render(
    <div>Could not initialize Audit Log: {util.inspect(err)}</div>,
    document.getElementById('root')
  );
}

// get the token, then use it to render the browser
fetch(url, {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
}).then(resp => {
  resp.json().then(body => {
    render(body.token);
  }).catch(renderError);
}).catch(renderError);
