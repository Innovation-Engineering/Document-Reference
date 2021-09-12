const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');



class ChangeColor extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { color : '#4cb96b' };
    }

    getClick()
    {
        if (this.state.color === '#4cb96b')
            this.setState({ color : '#aaa' });
        else
            this.setState({ color : '#4cb96b' });
    }

    render()
    {
        return <h1 style = { this.state }
                   onClick = {this.getClick.bind(this)}>
            {this.props.title} < /h1>
    }
}