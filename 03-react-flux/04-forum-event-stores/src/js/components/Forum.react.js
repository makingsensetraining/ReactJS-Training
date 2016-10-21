var Forum = React.createClass({

    getInitialState: function(){
        return {
            allAnswers: ForumStore.getAnswers()
        }
    },

    componentDidMount: function(){
        ForumStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function(){
        ForumStore.removeListener(this._onChange);
    },

    render: function(){

        return (
            <div>
                <ForumHeader />

                <div className="container">
                    <ForumQuestion />
                    <hr />
                    <ForumAnswers allAnswers={ this.state.allAnswers } />
                    <hr />
                    <h4>Add and answer</h4>
                    <ForumAddAnswerBox onAddAnswer={ this._onAddAnswer } />
                </div>
            </div>
        )
    },

    _onChange: function(){
        this.setState({
            allAnswers: ForumStore.getAnswers()
        });
    },

    _onAddAnswer: function(answerText){
        ForumActions.addNewAnswer(answerText);
    }
});