import React, { Component } from 'react';
import styles from '../styles/components/ReviewItem.css';

class ReviewItem extends Component {
  render() {
      return (
          <div className="c-rev">
              <div className="userFace" style={{backgroundImage: 'url('+this.props.imageUrl+')'}} />
              <div className="orange-label2">
                  {this.props.userName}
              </div>
              <p className="p-rew">
                  {this.props.text}
              </p>
          </div>
      );
  }
}

export default ReviewItem;
