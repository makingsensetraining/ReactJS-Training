var ForumHeader = React.createClass({

    render: function(){

        console.log(this.props.allAnswers);

        return React.createElement(
                "nav", {
                    className: 'navbar-default'
            },
            React.createElement(
                "div", {
                    className: 'container-fluid'
                },
                React.createElement(
                    "div", {
                        className: 'navbar-header'
                    },
                    React.createElement(
                        "a", {
                            className: 'navbar-brand',
                            href: '#'
                        },
                        "React Forum"
                    )
                )
            )
        )
    }
});