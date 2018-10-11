import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/BreadCrumbs.css';

class BreadCrumbs extends Component {
    renderLink(data){
        if(data.link){
            return (<Link to={data.link}>{data.text}</Link>)
        } else {
            return (<span>{data.text}</span>)
        }
    }
    renderItem(data, key){
        return(
            <li key={key}>{this.renderLink(data)}</li>
        )
    }
    showItems(){
        let buff=[];
        for(let key in this.props.data){
            buff.push(this.renderItem(this.props.data[key], key));
        }
        return buff;
    }
    render() {
        return (
            <ul className="bread-crumbs" style={{margin:(this.props.noMarg)?0:''}}>
                {this.showItems()}
            </ul>
        );
    }
}

export default BreadCrumbs;
