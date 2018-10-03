import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

const WAIT_INTERVAL = 500;
const ENTER_KEY = 13;

export default class SearchInput extends Component {
    constructor(props) {
        super();

        this.state = {
            value: props.value
        };
    }

    componentWillMount() {
        this.timer = null;
    }

    handleChange = e => {
        clearTimeout(this.timer);

        this.setState({ value: e.target.value.toLowerCase() });

        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
    }

    handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
            this.triggerChange();
        }
    }

    triggerChange = () => {
        const { value } = this.state;

        this.props.onChange(value);
    }

    render() {
        const { className, placeholder } = this.props;

        return (
            <Input
                className={className}
                value={this.state.value}
                placeholder={placeholder}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
            />
        );
    }
}