import React, {Component} from 'react';
import styles from '../styles/components/EditTitlePopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'threadStore')
@observer

class EditTitlePopup extends Component {

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.threadStore.setEditTitlePopup(false);
        this.bodyClass(false);
    }

    render() {
        if (this.props.threadStore.editTitlePopup){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup-edit-title" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <h3>¿Estás segura que quieres guardar los cambios en ese título?</h3>
                        <div className="c-etp-btns">
                            <span className="btn15" onClick={()=>{this.props.threadStore.sendEditedTitle(); this.props.threadStore.setEditTitle(false); this.hidePopup();}}>SÍ, Guardar cambios.</span>
                            <span className="btn15" onClick={()=>{this.hidePopup(); this.props.threadStore.setEditTitle(false); this.props.threadStore.pullDiscussion()}}>NO, CONSERVAR TÍTULO ORIGINAL.</span>
                        </div>
                    </div>
                </div>
            );
        }
        else return null

    }
}
export default EditTitlePopup;

