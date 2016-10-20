//Load with Babel
import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import _ from "lodash";


// Define a component:
var Quiz = React.createClass({
    propTypes: { //Validation
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        return _.extend({
            bgClass: 'neutral',
            showContinue: false
        }, this.props.data.selectGame());
    },
    handleBookSelected: function(title){
        var isCorrect = this.state.checkAnswer(title);
        this.setState({
            bgClass: isCorrect ? 'pass': 'fail',
            showContinue: isCorrect
        })
    },
    handleContinue: function(){
        this.setState(this.getInitialState());
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.author.imageUrl} className="authorimage col-md-3" />
                    </div>
                    <div className="col-md-7">
                        {this.state.books.map(function(b, i){
                            return <Book key={i} title={b} onBookSelected={this.handleBookSelected}/>
                        }, this)}
                    </div>
                    <div className={"col-md-1 " + this.state.bgClass}></div>
                </div>
                {this.state.showContinue ? (
                    <div className="row">
                        <div className="col-md-12">
                            <input onClick={this.handleContinue} type="button" className="btn btn-primary pull-right" value="Continue"/>
                        </div>
                    </div>) : <span/>
                }
            </div>
        )
    }
});

var Book = React.createClass({
    propTypes: { //Validation
        title: React.PropTypes.string.isRequired
    },
    handleClick: function(){
        this.props.onBookSelected(this.props.title);
    },
    render: function(){
        return (
            <div onClick={this.handleClick} className="answer">
                <h4>{this.props.title}</h4>
            </div>
        )
    }

});

var data = [
    {
        name: 'Mark Twain',
        imageUrl: 'src/images/authors/marktwain.jpg',
        books: ['The adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'src/images/authors/josephconrad.png',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'src/images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'src/images/authors/stephenking.png',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    }
];

data.selectGame = function(){
    var books = _.shuffle(this.reduce(function(p, c, i){
        return p.concat(c.books);
    } ,[])).slice(0, 4);

    var answer = books[_.random(books.length-1)];

    return {
        books: books,
        author: _.find(this, function (author) {
            return author.books.some(function (title) {
                return title === answer;
            });
        }),

        checkAnswer: function (title) {
            return this.author.books.some(function (t) {
                return t === title;
            });
        }
    };
};


// Render a component to the browser:
ReactDOM.render(
    <Quiz data={data}/>,  // What to render (an instance of the Main component)
    document.getElementById('app') // Where to render it
);


