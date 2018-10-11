import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Route, withRouter} from 'react-router-dom';
import Avatar from 'react-avatar';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Profile.css';

@withRouter

@inject('authStore', 'userStore', 'viewerStore', 'threadStore')
@observer

class Profile extends Component {
    showPopup(e){
        e.preventDefault();
        // Current user is author - go to edit-profile
       if(this.props.userStore.currentUser && (this.props.author.user_id==this.props.userStore.currentUser.user_id)){
           this.props.history.push('/editar-perfil');
       // Guest or user not author - show popup
       } else {
           this.props.threadStore.setCurrentAuthor(this.props.author);
           this.props.viewerStore.showProfilePopup();
       }
    }
    showAvatar(){
        let bodyWidth = typeof document === 'undefined' ? 0 : document.body.clientWidth;
        let sizeAva = 130;
        if (bodyWidth > 1199){
            sizeAva = 130;
        } else {
            sizeAva = 60;
        }
        if(this.props.avatar){
            return <div className="fm-img" style={{backgroundImage: this.props.avatar?"url("+this.props.avatar+")":"url(/images/temp/u4.png)"}}/>
        } else {
            return <Avatar className={"fm-img"} size={sizeAva} name={this.props.username.split(' ')[0]} round={false} src={this.props.avatar} />;
        }
    }
    render() {

        return (

            <div className="fm-1 fmp">
                <div className="c-user-short1">
                    <Link onClick={(e)=>{this.showPopup(e);}} to={this.props.profileUrl}>
                        {this.showAvatar()}
                    </Link>
                    <div className="p-mob">
                        <Link
                            to={this.props.profileUrl}
                            onClick={(e)=>{this.showPopup(e);}}
                        >
                            <div className="fm-profile">{this.props.username}</div>
                        </Link>
                        <div className={this.props.badge?"nuevas-badge":"nuevas-member"}>{this.props.status}</div>
                        <p className="desk-hide">Miembro:  {this.props.regDate}</p>
                    </div>
                </div>
                <div className="fm-social">
                    <div className="fm-likes">
                        <i className="flaticon2-signs"></i><span>{this.props.likesC}</span>
                    </div>
                    <div className="fm-likes">
                        <i className="flaticon-comments"></i><Link to={this.props.commentsUrl}>{this.props.commentsC}</Link>
                    </div>
                </div>
                <p className="mob-hide">Miembro:  {this.props.regDate}</p>
            </div>
        )
    }
}

export default Profile;


