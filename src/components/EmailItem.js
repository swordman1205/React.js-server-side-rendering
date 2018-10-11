import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/EmailItem.css';

class EmailItem extends Component {
    render() {
        return (
            <div className="gmail-list-item ">
                <div className="c-gmail-icons"></div>
                <div className="sender-name">{this.props.sender}</div>
                <div className="c-gmail-inbox "></div>
                <div className={(this.props.blurred)?"messageName messageNameBlur":"messageName"}>{this.props.message_title}</div>
                <div className={(this.props.blurred)?"messageText messageTextBlur":"messageText"}>{this.props.message_text}</div>
            </div>
        );
    }
}

export default EmailItem;
