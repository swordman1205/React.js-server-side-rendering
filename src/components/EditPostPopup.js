import React, {Component} from 'react';
import styles from '../styles/components/EditPostPopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'threadStore')
@observer

class EditPostPopup extends Component {
    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.threadStore.setEditPostPopup(false);
        this.bodyClass(false);
    }

    render() {
        if (this.props.threadStore.editPostPopup){
            {this.bodyClass(true)}

            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup-edit-post" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <h3>¿Estás segura que quieres guardar los cambios en este post?</h3>
                        <div className="c-epp-btns">
                            <span className="btn15" onClick={()=>{this.props.threadStore.sendEditedPost();this.props.threadStore.setWisEdit('');this.hidePopup();}}>SÍ, Guardar cambios.</span>
                            <span className="btn15" onClick={()=>{this.hidePopup(); this.props.discussionStore.setWysiwygText(''); this.props.threadStore.setWisEdit(''); }}>NO, CONSERVAR POST ORIGINAL.</span>

                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default EditPostPopup;
