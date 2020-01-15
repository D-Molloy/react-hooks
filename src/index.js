import React from 'react';
import ReactDOM from 'react-dom';
// import App from "./AppClass";
// import App from "./AppFunction";
// import App from "./Login";
// import App from "./Register";
import Todo from './Todo/Todo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Todo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
