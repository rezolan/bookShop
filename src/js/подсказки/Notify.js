import React, {Component} from 'react';

export default class Notify extends Component {
    render() {
        return <div className="notify">Successfully added post "{this.props.title}"!</div>
    }
}