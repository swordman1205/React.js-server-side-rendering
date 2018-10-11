import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/Gobutton.css';

class GobuttonPayment extends Component {
    clickHandler(e) {
        if(this.props.prevent) {
            e.preventDefault();
        }
        this.props.click();
    }

    showHint(){
        if(this.props.hint){
            return (
                <div className="c-hint">
                    <div className="arrow" />
                    {this.props.hint}
                </div>
            )
        }
    }

    showBtn(){
        return (
            <a
                href={this.props.chref}
                className="c-btn"
                target={this.props.ctarget?this.props.ctarget:"_self"}
                onClick={(e)=>this.clickHandler(e)}
            >
                <div className="c-top" style={{paddingLeft: this.props.padd?this.props.padd:'', paddingRight:this.props.padd?this.props.padd:'' }}>
                    {this.props.children}
                    <i className="icon flaticon-arrow-pointing-to-right" />
                </div>
                <div className="c-bott">
                    <span className="bott-text">{this.props.subtitle?this.props.subtitle:"Presiona Aquí"}</span>
                </div>
            </a>
        )

    }

  render() {
      let cStyle = {
          minWidth: this.props.minWidth?this.props.minWidth:"15px"
      };
      return (
          <div className={"c-container c-mob-btn1 "+this.props.newClass} style={cStyle}>
              {this.showHint()}
              {this.showBtn()}
          </div>
      );
  }
}

export default GobuttonPayment;
