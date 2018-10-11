import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/Title1.css';

class Title1 extends Component {
    showLink(){
        if(this.props.chref){
            if(this.props.type!="link"){
                return(
                    <a
                        href={this.props.chref}
                        className="go-link go-link-title"
                        target={this.props.ctarget?this.props.ctarget:"_self"}
                    >
                        <span className="">Ver más</span><i className="icon flaticon-arrow-pointing-to-right" />
                    </a>
                )
            } else {
                return(
                    <Link to={this.props.chref} className="go-link go-link-title">
                        <span className="">Ver más</span><i className="icon flaticon-arrow-pointing-to-right" />
                    </Link>
                )
            }
        }
    }

    render() {
        let noApper = this.props.noupper?"no-upper":"";
        return (
            <h4 className="title1">
                <div className={(this.props.submenu)?"main-text-sub":"main-text "+noApper}>
                    {this.props.children}
                </div>
                {this.showLink()}
            </h4>
        );
    }
}

export default Title1;
