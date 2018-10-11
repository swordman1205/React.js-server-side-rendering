import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Golink from '../components/Golink';
import Avatar from 'react-avatar';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Table1.css';

@withRouter
@inject('viewerStore', 'themeStore')
@observer

class Table1 extends Component {
    constructor(props){
        super(props);
    }

    renderTable(){
        let buff=[];
        let i=0;
        buff = this.props.themeStore.ForoList.map(item =>
            <tr key={i++} onClick={()=>{this.props.history.push("/comunidad/"+item.thread_id+"-"+item.thread_slug);}}>
                <td className="cell-width1">
                    <Avatar size={50} name={item.username.split(' ')[0]} round={true} src={item.avatar_url} />
                </td>
                <td className="cell-width2">
                    <div className="text1">{item.thread_title.substring(0,70)}{item.thread_title.length>70?"...":""}</div>
                    <div className="">{item.short_text}... <i className="flaticon-arrow-pointing-to-right ic-arrow"/></div>
                    <div className="color1">{item.sub_theme_name}</div>
                </td>
                <td>{item.views_count}</td>
                <td>{item.comments_count}</td>
                <td className="text-right cell-width3">
                    <div className="color1">{item.username}</div>
                    <div className="">{item.publish_date}</div>
                </td>
            </tr>
        );
        if(!this.props.themeStore.inProgressForum){
            return (
                <table className="table1">
                    <thead>
                    <tr>
                        <th/>
                        <th/>
                        <th><i className="flaticon-eye" /></th>
                        <th><i className="flaticon-comments" /></th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                        {buff.length?buff:"No hay artículos"}
                    </tbody>
                </table>
            );
        } else {
            return (<div className="spinner" />);
        }
    }

    renderMobileList(){
        let buff=[];
        let i=0;
        buff = this.props.themeStore.ForoList.map(item =>
            <li key={i++} onClick={()=>{this.props.history.push("/comunidad/"+item.thread_id+"-"+item.thread_slug);}}>
                <div className="c-list-inner">
                    <Avatar className="avatar" size={35} name={item.username.split(' ')[0]} round={true} src={item.avatar_url} />
                    <div className="list-content">
                        <div className="lc-title">
                            {item.thread_title.substring(0,70)}{item.thread_title.length>70?"...":""}
                        </div>
                        <div className="lc-text">
                            {item.short_text.substring(0,80)}{item.short_text.length>80?"...":""}
                            &nbsp;
                            <Golink size={"gl5"} click={(e)=>{e.preventDefault();}}>Ver más</Golink>
                        </div>
                        <div className="color1">{item.sub_theme_name}</div>

                    </div>
                </div>
                <ul className="list-panel">
                    <li><i className="flaticon-calendar" /> {item.publish_date}</li>
                    <li><i className="flaticon-eye" /> {item.views_count}</li>
                    <li><i className="flaticon-comments" /> {item.comments_count}</li>
                    <li className="color1">{item.username}</li>
                </ul>
            </li>
        );
        return (
            <ul className="mob-list1">
                {buff}
            </ul>
        );
    }

    render() {
        return (
            <div className="">
                {this.renderTable()}
                {this.renderMobileList()}
            </div>
        );
  }
}

export default Table1;
