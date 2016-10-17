//Load with Babel
import React from "react";
import ReactDOM from "react-dom";


// Component Definition
var StarsFrame = React.createClass({
   render: function(){
       var stars = [];
       for (var i = 0; i < this.props.numbersOfStars; i++){
            stars.push(
                <span className="glyphicon glyphicon-star"></span>
            )
       }

       return (
           <div id="stars-frame">
               <div className="well">
                   {stars}
               </div>
           </div>
       )
   }
});

var ButtonFrame = React.createClass({
    render: function(){
        var disabled;
        disabled = (this.props.selectedNumbers.length === 0);
        return (
            <div id="button-frame">
                <button className="btn btn-primary btn-lg" disabled={disabled}>=</button>
            </div>
        )
    }
});

var AnswerFrame = React.createClass({
    render: function(){
        var props = this.props;

        var selectedNumbers = props.selectedNumbers.map(function(i){
            return (
                <span>
                    {i}
                </span>
            )
        });

        return (
            <div id="answer-frame">
                <div className="well">
                    {selectedNumbers}
                </div>
            </div>
        )
    }
});

var NumbersFrame = React.createClass({
    render: function(){
        var numbers = [], className,
            clickNumber = this.props.clickNumber,
            selectedNumbers = this.props.selectedNumbers;
        for (var i=1; i <= 9; i++){
            className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
            numbers.push(
                <div className={className} onClick={clickNumber.bind(null, i)}>{i}</div>
            );
        }
        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        )
    }
});

var Game = React.createClass({
    getInitialState: function(){
        return {
            numbersOfStars: Math.floor(Math.random()*9) + 1,
            selectedNumbers: []
        }
    },
    clickNumber: function(clickedNumber){
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
            this.setState(
                { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)}
            )
        }
    },
    render: function(){
        var selectedNumbers = this.state.selectedNumbers,
            numbersOfStars = this.state.numbersOfStars;

        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr />
                <div className="clearfix">
                    <StarsFrame numbersOfStars={numbersOfStars}/>
                    <ButtonFrame selectedNumbers={selectedNumbers}/>
                    <AnswerFrame selectedNumbers={selectedNumbers}/>
                </div>

                <NumbersFrame selectedNumbers={selectedNumbers}
                              clickNumber={this.clickNumber} />
            </div>
        )
    }
});


// Render a component to the browser:
ReactDOM.render(
    <Game />,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);