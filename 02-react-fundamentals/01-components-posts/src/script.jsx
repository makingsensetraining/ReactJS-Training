//Load with Babel
import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

var post = {
    title: 'React',
    content: 'This is a test',
    comments: ['Great work here', 'This is awesome', 'Learning ReactJS', 'Starting to love it']
};

// Define a component:
var Post = React.createClass({
    render: function() {
        return (
            <div>
                <h1>{this.props.data.title}</h1>
                <p>{this.props.data.content}</p>
                <h2>Comments</h2>

                {this.props.data.comments.map(function(comment, i){
                    return <Comment key={i} content={comment} />
                })}

            </div>
        )
    }
});

var Comment = React.createClass({
    render: function(){
        return <div>{this.props.content}</div>;
    }

});


// Render a component to the browser:
ReactDOM.render(
    <Post data={post}/>,  // What to render (an instance of the Main component)
    document.getElementById('container') // Where to render it
);


