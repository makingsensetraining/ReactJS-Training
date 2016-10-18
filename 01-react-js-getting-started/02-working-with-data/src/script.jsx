//Load with Babel
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";

//Load with Webpack
// var $ = require("jquery"); //Load with Webpack
// var React = require('react');
// var ReactDOM = require('react-dom');

// Define a component:
var Card = React.createClass({
    getInitialState: function(){
        return {};
    },
    componentDidMount: function(){
        var component = this;
        $.get("http://api.github.com/users/" + this.props.login, function(data){
            component.setState(data);
        });
    },
    render: function(){
        return (
           <div>
               <img src={this.state.avatar_url} width="80"/>
               <h3>{this.state.name}</h3>
               <hr/>
           </div>
        )
    }
});

var Form = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        var loginInput = ReactDOM.findDOMNode(this.refs.login);
        // Add the card here
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="github login" ref="login" />
                <button>Add</button>
            </form>
        )
    }
});

var Main = React.createClass({
    getInitialState: function(){
      return {logins: []}
    },
    addCard: function(loginToAdd){
        this.setState({logins: this.state.logins.concat(loginToAdd)});
    },
    render: function() {
        var cards = this.state.logins.map(function(login, i){
            return (<Card login={login} key={i} />);
        });
        return (
            <div>
                <Form addCard={this.addCard}/>
                {cards}
            </div>
        )
    }
});


// Render a component to the browser:
ReactDOM.render(
    <Main />,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);


