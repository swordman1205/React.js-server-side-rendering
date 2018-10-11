import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Route, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Pagination.css';

@withRouter

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore', 'blogStore', 'threadStore')
@observer

class Pagination extends Component {
    constructor(props){
        super(props);
    }
    prevItem(){
        if(this.props.viewerStore.currPage!=1){
            return(
                <li id="prev" className="pag-left sel"><Link onClick={()=>{this.props.viewerStore.updatePageData(this.props.viewerStore.currPage-1, this.props.type);}} to={this.props.location.pathname+"?p="+(this.props.viewerStore.currPage-1)}><i className="flaticon-arrow-pointing-to-right left"></i></Link></li>
            )
        }
    }
    firstItem(){
        if(this.props.viewerStore.currPage!=1){
            return(
                <li id="first"><Link onClick={()=>{this.props.viewerStore.updatePageData(1, this.props.type);}} to={this.props.location.pathname+"?p=1"}>1</Link></li>
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
                <li id="left1"><Link onClick={()=>{this.props.viewerStore.updatePageData(this.props.viewerStore.currPage-1, this.props.type);}} to={this.props.location.pathname+"?p="+(this.props.viewerStore.currPage-1)}>{this.props.viewerStore.currPage-1}</Link></li>
            )
        }
    }
    left2(){
        var bodyWidth = typeof document === 'undefined' ? 0 : document.body.clientWidth;
        if (bodyWidth > 1199) {
            if((this.props.viewerStore.currPage-2)>1){
                return(
                    <li id="left2"><Link onClick={()=>{this.props.viewerStore.updatePageData(this.props.viewerStore.currPage-2, this.props.type);}} to={this.props.location.pathname+"?p="+(this.props.viewerStore.currPage-2)}>{this.props.viewerStore.currPage-2}</Link></li>
                )
            }
        }
        else return null
    }
    right1(){
        if((parseInt(this.props.viewerStore.currPage)+1)<this.props.viewerStore.pagesCount){
            return(
                <li id="right1"><Link onClick={()=>{this.props.viewerStore.updatePageData(parseInt(this.props.viewerStore.currPage)+1, this.props.type);}} to={this.props.location.pathname+"?p="+((parseInt(this.props.viewerStore.currPage))+1)}>{(parseInt(this.props.viewerStore.currPage))+1}</Link></li>
            )
        }
    }
    right2(){
        var bodyWidth = typeof document === 'undefined' ? 0 : document.body.clientWidth;
        if (bodyWidth > 1199) {
            if ((parseInt(this.props.viewerStore.currPage) + 2) < this.props.viewerStore.pagesCount) {
                return (
                    <li id="right2"><Link
                        onClick={()=>{this.props.viewerStore.updatePageData(parseInt(this.props.viewerStore.currPage)+2, this.props.type);}}
                        to={this.props.location.pathname+"?p="+(parseInt(this.props.viewerStore.currPage)+2)}>{(parseInt(this.props.viewerStore.currPage) + 2)}</Link>
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
                <li id="end"><Link onClick={()=>{this.props.viewerStore.updatePageData(this.props.viewerStore.pagesCount, this.props.type);}} to={this.props.location.pathname+"?p="+(this.props.viewerStore.pagesCount)}>{this.props.viewerStore.pagesCount}</Link></li>
            )
        }
    }
    nextItem(){
        if(this.props.viewerStore.currPage!=this.props.viewerStore.pagesCount){
            return(
                <li id="next" className="pag-right sel"><Link onClick={()=>{this.props.viewerStore.updatePageData(parseInt(this.props.viewerStore.currPage)+1, this.props.type);}} to={this.props.location.pathname+"?p="+(this.props.viewerStore.currPage+1)}><i className="flaticon-arrow-pointing-to-right"></i></Link></li>
            )
        }
    }
    render() {
        if(this.props.viewerStore.pagesCount>1){
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

export default Pagination;
