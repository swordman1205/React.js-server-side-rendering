import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components/LinkArr.css';

class LinkArr extends Component {
    showMark(){
        if (this.props.checked == true){
            return (
                <i className="icon-c flaticon-check" />
            )
        }
        else return null
    }
    render() {
        return (
            <Link to={this.props.chref} onClick={this.props.click} className={this.props.className}>
                <i className="icon flaticon-arrow-pointing-to-right" />
                <div className="c-link">
                    {this.props.children}
                    {this.showMark()}
                </div>
            </Link>
        )
    }
}
export default LinkArr;
