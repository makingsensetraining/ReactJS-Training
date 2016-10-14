//Load with Babel
import React from "react";
import ReactDOM from "react-dom";

// Define a component:
var Button = React.createClass({
    localHandleClick: function(){
        this.props.localHandleClick(this.props.increment);
    },
    render: function(){
        return (
            <button onClick={this.localHandleClick}>+{this.props.increment}</button>
        )
    }
});

var Result = React.createClass({
    render: function() {
        return (
            <div>{this.props.localCounter}</div>
        )
    }
});

var Main = React.createClass({
    getInitialState: function(){
        return { counter: 0 };
    },
    handleClick: function(increment){
        this.setState({ counter: this.state.counter+increment });
    },
    render: function() {
        return (
            <div>
                <Button localHandleClick={this.handleClick} increment={1}/>
                <Button localHandleClick={this.handleClick} increment={5}/>
                <Button localHandleClick={this.handleClick} increment={10}/>
                <Button localHandleClick={this.handleClick} increment={100}/>
                <Result localCounter={this.state.counter}/>
            </div>
        )
    }
});


// Render a component to the browser:
ReactDOM.render(
    <Main />,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);


