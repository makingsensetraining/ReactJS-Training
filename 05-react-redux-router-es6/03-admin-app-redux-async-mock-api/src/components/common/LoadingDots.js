import React, {Component, PropTypes} from 'react';

class LoadingDots extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { frame: 1 };
        const spanProps = Object.assign({}, props);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                frame: this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        let dots = this.state.frame % (this.props.dots + 1);
        let text = '';
        while (dots > 0) {
            text += '.';
            dots--;
        }
        return <span {...this.spanProps}>{text}&nbsp; </span>;
    }
}

LoadingDots.defaultProps = {
    interval: 300,
    dots: 3
};

LoadingDots.propTypes = {
    dots: PropTypes.number,
    interval: PropTypes.number
};

export default LoadingDots;
