import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/Golink.css';

class Golink extends Component {
    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler(e) {
        if(this.props.prevent) {
            e.preventDefault();
        }
        this.props.click();
    }

    render() {
        if(!this.props.hide) {
            if (this.props.type != 'link') {
                return (
                    <a
                        href={this.props.chref ? this.props.chref : "#"}
                        target={this.props.ctarget ? this.props.ctarget : "_self"}
                        onClick={(e)=>this.clickHandler(e)} className={"go-link " + this.props.size}
                    >
                        <span className={this.props.treatmentLink?"l1 underline treatment-link-text":"l1 underline"}>
                            {this.props.children}
                        </span>
                        {this.props.treatmentLink?'':<i className="icon flaticon-arrow-pointing-to-right"/>}
                    </a>
                );
            } else {
                return (
                    <Link
                        to={this.props.chref ? this.props.chref : "/"}
                        onClick={(e)=>this.clickHandler(e)} className={"go-link " + this.props.size}
                    >
                        <span className="underline">
                            {this.props.children}
                        </span>
                        <i className="icon flaticon-arrow-pointing-to-right"/>
                    </Link>
                );
            }
        } else {
            return (
                <span></span>
            )
        }
    }
}

export default Golink;
