//Load with Babel
import React from "react";
import ReactDOM from "react-dom";

//Copied from: https://gist.github.com/samerbuna/aa1f011a6e42d6deba46
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
        var combinationSum = 0;
        for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

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
    test: function(){
        console.log('test')
    },
    render: function(){
        var disabled, button, correct = this.props.correct;

        switch(correct){
            case true:
                button = (
                    <button className="btn btn-success btn-lg"
                        onClick={this.props.acceptAnswer}>
                        <span className="glyphicon glyphicon-ok"></span>
                    </button>
                );
                break;
            case false:
                button = (
                    <button className="btn btn-danger btn-lg">
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                );
                break;
            default:
                disabled = (this.props.selectedNumbers.length === 0);
                button = (
                    <button className="btn btn-primary btn-lg" disabled={disabled}
                            onClick={this.props.checkAnswer}>
                        =
                    </button>
                );
        }

        return (
            <div id="button-frame">
                {button}
                <br /><br />
                <button className="btn btn-warning btn-xs" onClick={this.props.redraw}
                        disabled={this.props.redraws === 0}>
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;
                    {this.props.redraws}
                </button>

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
            usedNumbers = this.props.usedNumbers,
            selectedNumbers = this.props.selectedNumbers;
        for (var i=1; i <= 9; i++){
            className = "number selected-" + (selectedNumbers.indexOf(i)>=0);
            className += " used-" + (usedNumbers.indexOf(i)>=0);
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

var DoneFrame = React.createClass({
   render: function(){
       return (
           <div className="well text-center">
               <h2>{this.props.doneStatus}</h2>
               <button className="btn btn-default"
                       onClick={this.props.resetGame}>Play again</button>
           </div>
       );
   }
});

var Game = React.createClass({
    getInitialState: function(){
        return {
            numbersOfStars: this.randomNumber(),
            selectedNumbers: [],
            usedNumbers: [],
            redraws: 5,
            correct: null,
            doneStatus: null
        }
    },
    resetGame: function(){
      this.replaceState(this.getInitialState());
    },
    randomNumber: function(){
      return Math.floor(Math.random()*9) + 1
    },
    selectNumber: function(clickedNumber){
        if (this.state.selectedNumbers.indexOf(clickedNumber) < 0){
            this.setState({
                    selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
                    correct: null
                });
        }
    },
    unselectNumber: function(clickedNumber){
        var selectedNumbers = this.state.selectedNumbers,
            indexOfNumber = selectedNumbers.indexOf(clickedNumber);

        selectedNumbers.splice(indexOfNumber, 1);

        this.setState({
            selectedNumbers: selectedNumbers,
            correct: null
        })
    },
    sumOfSelectedNumbers: function(){
          return this.state.selectedNumbers.reduce(function(p, n){
              return p+n;
          }, 0)
    },
    checkAnswer: function(){
        var correct = (this.state.numbersOfStars === this.sumOfSelectedNumbers());
        this.setState({ correct: correct })
    },
    acceptAnswer: function(){
        var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
        this.setState({
            selectedNumbers: [],
            usedNumbers: usedNumbers,
            correct: null,
            numbersOfStars: this.randomNumber()
        }, function(){
            this.updateDoneStatus();
        })
    },
    redraw: function(){
        if (this.state.redraws > 0) {
            this.setState({
                numbersOfStars: this.randomNumber(),
                correct: null,
                selectedNumbers: [],
                redraws: this.state.redraws - 1
            }, function(){
                this.updateDoneStatus();
            })
        }
    },
    possibleSolutions: function(){
        var numberOfStars = this.state.numbersOfStars,
            possibleNumbers = [],
            usedNumbers = this.state.usedNumbers;

        for (var i=1; i<=9; i++){
            if (usedNumbers.indexOf(i) < 0){
                possibleNumbers.push(i);
            }
        }

        return possibleCombinationSum(possibleNumbers, numberOfStars);
    },
    updateDoneStatus: function(){
        if (this.state.usedNumbers.length === 9){
            this.setState({ doneStatus: 'Done. Nice!'});
            return;
        }

        if (this.state.redraws === 0 && !this.possibleSolutions()){
            this.setState({ doneStatus: 'Game Over!'});
        }
    },
    render: function(){
        var selectedNumbers = this.state.selectedNumbers,
            usedNumbers = this.state.usedNumbers,
            numbersOfStars = this.state.numbersOfStars,
            redraws = this.state.redraws,
            correct = this.state.correct,
            doneStatus = this.state.doneStatus,
            bottomFrame;

        if (doneStatus){
            bottomFrame = <DoneFrame doneStatus={doneStatus}
                                     resetGame={this.resetGame} />;
        } else {
            bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers}
                                        usedNumbers={usedNumbers}
                                        selectNumber={this.selectNumber} />;
        }

        return (
            <div id="game">
                <h2>Play Nine</h2>
                <hr />
                <div className="clearfix">
                    <StarsFrame numbersOfStars={numbersOfStars}/>
                    <ButtonFrame selectedNumbers={selectedNumbers}
                                 correct={correct}
                                 redraws={redraws}
                                 checkAnswer={this.checkAnswer}
                                 acceptAnswer={this.acceptAnswer}
                                 redraw={this.redraw}/>
                    <AnswerFrame selectedNumbers={selectedNumbers}
                                 unselectNumber={this.unselectNumber}/>
                </div>

                {bottomFrame}

            </div>
        )
    }
});


// Render a component to the browser:
ReactDOM.render(
    <Game />,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);