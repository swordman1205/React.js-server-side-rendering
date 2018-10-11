import React, {Component} from 'react';
import styles from '../styles/components/EraseConfirmationPopup.css';
import {inject, observer} from 'mobx-react';
import {Route, withRouter} from 'react-router-dom';
@withRouter

@inject('viewerStore', 'threadStore')
@observer

class EraseConfirmationPopup extends Component {

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.threadStore.setDeletePostPopup(false);
        this.bodyClass(false);
    }

    goToPreviousPage(){
        let page = this.props.viewerStore.getParameterByName('p');
        if (page > 1){
            if (this.props.threadStore.dataLength - this.props.viewerStore.threadLimit*(page - 1) == 1){
                this.props.history.push("/comunidad/"+this.props.threadStore.currentThreadId+"-"+this.props.threadStore.currentThreadSlug + "/?p=" + (this.props.viewerStore.currPage - 1))
            }
        }

    }

    render() {
        if (this.props.threadStore.deletePostPopup){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup-erase-conf" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <h3>¿Estás segura que deseas borrar este post?</h3>
                        <div className="c-ecp-btns">
                            <span className="btn15"
                                  onClick={()=>{
                                  this.props.threadStore.deleteThreadPost(this.props.threadStore.deletePostNumber);
                                  this.props.threadStore.setWisEdit('');
                                  this.goToPreviousPage();
                                  this.hidePopup();
                                  }}>
                                SÍ, borrar.
                            </span>
                            <span className="btn15" onClick={()=>{this.hidePopup(); this.props.discussionStore.setWysiwygText(''); this.props.threadStore.setWisEdit('');}}>No, conservar post.</span>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default EraseConfirmationPopup;
