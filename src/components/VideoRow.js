import React, { Component } from 'react';
import styles from '../styles/components/VideoRow.css';

class VideoRow extends Component {
  render() {
    return (
        <a
            href={this.props.chref?this.props.chref:"#"}
            target={this.props.ctarget?this.props.ctarget:"_self"}
            className="video-item"
        >
            <div href="#" className="video" style={{backgroundImage: 'url('+this.props.imageUrl+')'}} >
                <span className="under-tube">
                    <i className="flaticon-youtube tube" />
                </span>
                <div className="video-cover" />
            </div>
            <p className="v-text">{this.props.text} <span className="video-date">{this.props.date}</span></p>
        </a>
    );
  }
}

export default VideoRow;
