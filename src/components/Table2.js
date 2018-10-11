import React, { Component } from 'react';
import Avatar from 'react-avatar';
import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Table2.css';

@withRouter
@inject('viewerStore', 'themeStore')
@observer


class Table2 extends Component {
    constructor(props){
        super(props);
        this.state = {logoSize: 270};
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
    updateDimensions() {
        let pageWidth = typeof document === 'undefined' ? 0 : document.body.clientWidth;
         if (pageWidth < 1199){
            this.setState({logoSize: 35});
        }
        else {
            this.setState({logoSize: 50});
        }
    }
    renderListRow(){
        let i=0;
        let ForoList = this.props.themeStore.ForoList;
        if (this.props.sidebar){
            ForoList = this.props.themeStore.ForoList2;
        }

        return ForoList.map(item =>
            <li key={i++} onClick={()=>{this.props.history.push("/comunidad/"+item.thread_id+"-"+item.thread_slug);}}>
                <div className="c-list-inner2">
                    <Avatar className={"avatar2"} size={this.state.logoSize} name={item.username.split(' ')[0]} round={true} src={item.avatar_url} />
                    <div>
                        <div className="list-content2">
                            {item.thread_title}
                        </div>
                        <div className="short-description">{item.short_text}...</div>
                    </div>
                </div>
                <ul className="list-panel2">
                    <li><i className="flaticon-calendar" /> {item.publish_date}</li>
                    <li><i className="flaticon-eye" /> {item.views_count}</li>
                    <li><i className="flaticon-comments" /> {item.comments_count}</li>
                    <li>{item.username}</li>
                </ul>
            </li>
        );
    }

    renderTable(){
        return (
            <ul className="table2">
                {this.renderListRow()}
            </ul>
        );
    }

    render() {
        return (
            <div className="">
                {this.renderTable()}
            </div>
        );
    }
}

export default Table2;
