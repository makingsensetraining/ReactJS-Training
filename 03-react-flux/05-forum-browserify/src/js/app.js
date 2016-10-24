var React = require('react');
var ReactDOM = require('react-dom');
var Forum = require('./components/Forum.react');

ReactDOM.render(
    React.createElement(Forum, null),
    document.getElementById('forum')
);