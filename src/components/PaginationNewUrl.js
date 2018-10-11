import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Route, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Pagination.css';

let scrollToComponent;

@withRouter

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore', 'blogStore', 'threadStore')
@observer

class PaginationNewUrl extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount () {
        scrollToComponent = require('react-scroll-to-component');
    }
    getPathName(){
        let pathName = this.props.location.pathname;
        if (pathName == "/"){
            pathName = pathName + "alimentacion-saludable";
        }
        if (pathName.indexOf("_") == -1){
            return pathName;
        } else {
            return pathName.substring(0, pathName.indexOf("_"));
        }
    }
    scrolTop(){
        if(this.props.noscroll){
            this.props.viewerStore.setScrollTop(false);
            this.props.scrollForo();
        }
    }
    prevItem(){
        if(this.props.viewerStore.currPage!=1){
            return(
                <li id="prev" className="pag-left sel"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(this.props.viewerStore.currPage-1, this.props.type);}} to={this.getPathName()+"_"+(this.props.viewerStore.currPage-1)}><i className="flaticon-arrow-pointing-to-right left"></i></Link></li>
            )
        }
    }
    firstItem(){
        if(this.props.viewerStore.currPage!=1){
            return(
                <li id="first"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(1, this.props.type);}} to={this.getPathName()+"_1"}>1</Link></li>
            )
        }
    }
    leftDots(){
        if((this.props.viewerStore.currPage-2)>1){
            return(
                <li id="left-dots"><span>...</span></li>
            )
        }
    }
    left1(){
        if((this.props.viewerStore.currPage-1)>1){
            return(
                <li id="left1"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(this.props.viewerStore.currPage-1, this.props.type);}} to={this.getPathName()+"_"+(this.props.viewerStore.currPage-1)}>{this.props.viewerStore.currPage-1}</Link></li>
            )
        }
    }
    left2(){
        var bodyWidth = typeof document === 'undefined' ? 0 : document.body.clientWidth;
        if (bodyWidth > 1199) {
            if((this.props.viewerStore.currPage-2)>1){
                return(
                    <li id="left2"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(this.props.viewerStore.currPage-2, this.props.type);}} to={this.getPathName()+"_"+(this.props.viewerStore.currPage-2)}>{this.props.viewerStore.currPage-2}</Link></li>
                )
            }
        }
        else return null
    }

    right1(){
        if((parseInt(this.props.viewerStore.currPage)+1)<this.props.viewerStore.pagesCount){
            return(
                <li id="right1"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(parseInt(this.props.viewerStore.currPage)+1, this.props.type);}} to={this.getPathName()+"_"+((parseInt(this.props.viewerStore.currPage))+1)}>{(parseInt(this.props.viewerStore.currPage))+1}</Link></li>
            )
        }
    }

    right2(){
        var bodyWidth = typeof document === 'undefined' ? 0 : document.body.clientWidth;
        if (bodyWidth > 1199) {
            if ((parseInt(this.props.viewerStore.currPage) + 2) < this.props.viewerStore.pagesCount) {
                return (
                    <li id="right2"><Link
                        onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(parseInt(this.props.viewerStore.currPage)+2, this.props.type);}}
                        to={this.getPathName()+"_"+(parseInt(this.props.viewerStore.currPage)+2)}>{(parseInt(this.props.viewerStore.currPage) + 2)}</Link>
                    </li>
                )
            }
        }
        else return null
    }

    rightDots(){
        if((parseInt(this.props.viewerStore.currPage)+2)<this.props.viewerStore.pagesCount){
            return(
                <li id="right-dots"><span>...</span></li>
            )
        }
    }
    endItem(){
        if(this.props.viewerStore.currPage!=this.props.viewerStore.pagesCount){
            return(
                <li id="end"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(this.props.viewerStore.pagesCount, this.props.type);}} to={this.getPathName()+"_"+(this.props.viewerStore.pagesCount)}>{this.props.viewerStore.pagesCount}</Link></li>
            )
        }
    }
    nextItem(){
        if(this.props.viewerStore.currPage!=this.props.viewerStore.pagesCount){
            return(
                <li id="next" className="pag-right sel"><Link onClick={()=>{this.scrolTop(); this.props.viewerStore.updatePageData(parseInt(this.props.viewerStore.currPage)+1, this.props.type);}} to={this.getPathName()+"_"+(this.props.viewerStore.currPage+1)}><i className="flaticon-arrow-pointing-to-right"></i></Link></li>
            )
        }
    }
    showContent(){
        if(this.props.viewerStore.inProgressPag){
            return <div>Loading...</div>
        } else {
            if(+this.props.viewerStore.pagesCount>1){
                return (
                    <ul className={this.props.color?'my-pagination dark':'my-pagination'}>
                        {this.prevItem()}
                        {this.firstItem()}
                        {this.leftDots()}
                        {this.left2()}
                        {this.left1()}
                        <li className="active"><span>{this.props.viewerStore.currPage}</span></li>
                        {this.right1()}
                        {this.right2()}
                        {this.rightDots()}
                        {this.endItem()}
                        {this.nextItem()}
                    </ul>
                );
            }   else {
                return null;
            }
        }
    }
    render() {
        return(this.showContent())
    }
}

export default PaginationNewUrl;
