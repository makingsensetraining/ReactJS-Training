//Load with Babel
import React from "react";
import ReactDOM from "react-dom";


// Component Definition
var StarsFrame = React.createClass({
   render: function(){
       var stars = [];
       for (var i = 0; i < this.props.numbersOfStars; i++){
            stars.push(
                <span key={i} className="glyphicon glyphicon-star"></span>
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
                <span key={i} onClick={props.unselectNumber.bind(null, i)}>
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
            selectNumber = this.props.selectNumber,
            selectedNumbers = this.props.selectedNumbers;
        for (var i=1; i <= 9; i++){
            className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
            numbers.push(
                <div key={i} className={className} onClick={selectNumber.bind(null, i)}>{i}</div>
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
    selectNumber: function(clickedNumber){
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
            this.setState(
                { selectedNumbers: this.state.selectedNumbers.concat(clickedNumber)}
            )
        }
    },
    unselectNumber: function(clickedNumber){
        var selectedNumbers = this.state.selectedNumbers,
            indexOfNumber = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(indexOfNumber, 1);

        this.setState({
            selectedNumbers: selectedNumbers
        })
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
                    <AnswerFrame selectedNumbers={selectedNumbers}
                                 unselectNumber={this.unselectNumber}/>
                </div>

                <NumbersFrame selectedNumbers={selectedNumbers}
                              selectNumber={this.selectNumber} />
            </div>
        )
    }
});


// Render a component to the browser:
ReactDOM.render(
    <Game />,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);