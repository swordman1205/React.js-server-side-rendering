import React, {Component} from 'react';
import styles from '../styles/components/DeleteDiscussionPopup.css';
import {inject, observer} from 'mobx-react';
import {Route, withRouter} from 'react-router-dom';
@withRouter

@inject('viewerStore', 'threadStore')
@observer

class DeleteDiscussionPopup extends Component {

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.threadStore.setDeleteThreadPopup(false);
        this.bodyClass(false);
    }

    render() {
        if (this.props.threadStore.deleteThreadPopup){
            {this.bodyClass(true)}

            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup-dd" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <h3>¿Estas segura que deseas borrar esta discusión?</h3>
                        <div className="c-dd-btns">
                            <span className="btn15"
                                  onClick={()=>{
                                  this.props.threadStore.deleteThread();
                                  this.props.history.push("/");
                                  this.hidePopup();
                                  }}>
                                SÍ, borrar.
                            </span>
                            <span className="btn15" onClick={()=>{this.hidePopup();}}>NO, CONSERVAR ESTA DISCUSIÓN.</span>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default DeleteDiscussionPopup;