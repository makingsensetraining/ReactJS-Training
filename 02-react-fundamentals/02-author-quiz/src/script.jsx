//Load with Babel
import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";


// Define a component:
var Quiz = React.createClass({
    propTypes: { //Validation
        books: React.PropTypes.array.isRequired
    },
    render: function() {
        return (
            <div>
                {
                    this.props.books.map(function(b, i){
                        return <Book key={i} title={b} />
                    })
                }
            </div>
        )
    }
});

var Book = React.createClass({
    propTypes: { //Validation
        title: React.PropTypes.string.isRequired
    },
    render: function(){
        return (
            <div>
                <h4>{this.props.title}</h4>
            </div>
        )
    }

});


// Render a component to the browser:
ReactDOM.render(
    <Quiz books={['The Lord of the Rings', 'The super book']}/>,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);


