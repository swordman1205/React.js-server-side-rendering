import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/LikesPopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore', 'threadStore')
@observer

class LikesPopup extends Component {
    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.viewerStore.hideLikesPopup();
        this.bodyClass(false);
    }
    showLikesUsers(){
        return this.props.threadStore.likesUsersList.map(item =>
            <li><Link to="#">{item.username}</Link></li>
        );
    }
    render() {
        if (this.props.viewerStore.isLikesPopup){
            {this.bodyClass(true)}

            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup-likes" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close4"/>
                        </div>
                        <div className="likes-popup">
                            <ul>
                               {this.showLikesUsers()}
                            </ul>
                        </div>

                    </div>
                </div>
            );
        }
        else return null

    }
}
export default LikesPopup;



