import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Profile from '../components/Profile';
import {Route, withRouter} from 'react-router-dom';
import WysiwygE from '../components/WysiwygE';

import {inject, observer} from 'mobx-react';

import styles from '../styles/components/ForumMessage.css';

@withRouter

@inject('authStore', 'userStore', 'viewerStore', 'threadStore', 'discussionStore')
@observer

class ForumMessage extends Component {

    constructor(props){
        super(props);
        this.state = {
            admin: false,
            edit_decline: false
        };
    };

    showAdminBtns(){
        if(this.props.userStore.currentUser){
            if (this.props.userStore.currentUser.is_admin){
                return(
                    <div className="c-btns-1">
                        <span className="btn8" onClick={()=>{this.props.threadStore.setWisEdit(this.props.postNumber); this.props.threadStore.setAdminEditorText(this.props.postNumber, this.props.children);}}>Editar</span>
                        <span className="btn9" onClick={()=>{this.props.threadStore.setDeletePostPopup(true); this.props.threadStore.setDeletePostNumber(this.props.postNumber)}}>Borrar</span>
                    </div>
                )
            }

        }
        else return null
    }

    showAdminEditBtns(){
        if(this.props.userStore.currentUser) {
            if (this.props.userStore.currentUser.is_admin) {
                return (
                    <div className="c-btns-3">
                        <span className="btn8" onClick={()=>this.props.threadStore.setEditPostPopup(true)}>Guardar</span>
                        <span className="btn9" onClick={()=>{this.props.threadStore.setDeletePostPopup(true); this.props.threadStore.setDeletePostNumber(this.props.postNumber)}}>Borrar</span>
                    </div>
                )
            }
        }
        else return null
    }

    showEditMessage(postId){
        if(postId==this.props.threadStore.editPostId && !this.props.threadStore.isEditPost){
            return(
                <div id="testhide" className="edit-message">
                    <div className="edit-msg-arrow"/>
                    Ya pasaron más de 15 minutos, no es posible editar
                    ni borrar tu mensaje.
                </div>
            )
        }
    }

    showUserEditBtn(){
        if(this.props.userStore.currentUser) {
            if (!this.props.userStore.currentUser.is_admin) {
                if (this.props.authorId == (this.props.userStore.currentUser ? this.props.userStore.currentUser.user_id : "")) {
                    return (
                        <div className="edit-btn">
                            {this.showEditMessage(this.props.postNumber)}
                            <span className="responder-btn responder-btn2"
                                onClick={(e) => {
                               this.props.threadStore.checkCanEdit(this.props.postNumber, this.props.children);
                               /*if(this.props.threadStore.isEditPost){
                                   this.props.history.push("/thread/" + this.props.threadStore.currentThreadSlug + "/?p=" + this.props.viewerStore.currPage + "#edit");
                               }*/
                                e.preventDefault();
                            }}
                            >
                                Editar
                            </span>
                        </div>
                    )
                }
            }
        }
    }

    showResponder(){
        if(this.props.authorId != (this.props.userStore.currentUser ? this.props.userStore.currentUser.user_id : "")) {
            return (
                <Link
                    className={"responder-link"}
                    onClick={(e) => {
                        this.props.threadStore.setQuote(this.props.postNumber, this.props.children);
                    }}
                    to={"/comunidad/" + this.props.threadStore.currentThreadId + "-" + this.props.threadStore.currentThreadSlug + "/#edit"}>
                    Responder
                </Link>
            )
        }
    }

    showMemberBtns(){
        if(this.props.viewerStore.token){
            return (
                <div className="c-btns-2">
                    <Link
                        onClick={(e)=>{this.props.threadStore.toggleLike(this.props.postNumber); e.preventDefault();}}
                        to="#"
                        className="btn8 btn10">
                            <i className="flaticon2-signs"/>
                            Me gusta
                    </Link>
                    {this.showResponder()}
                    {this.showUserEditBtn()}
                </div>
            )
        } else return (<div></div>)
    }

    showUserEditBtns(){
        if(this.props.userStore.currentUser) {
            if (!this.props.userStore.currentUser.is_admin) {
                return (
                    <span className="responder-btn"
                          onClick={()=>{this.props.threadStore.sendEditedPost();this.props.threadStore.setWisEdit('');}}>Guardar</span>
                )
            }
        }
    }

    showPostText(){
        /* Show Wysiwyg Editor ------------------- */
        if (this.props.postNumber == this.props.threadStore.wisEdit){
            if(this.props.userStore.currentUser){
                return (
                    <div className="message-block2 c-editor2">
                        <WysiwygE adminEditPost={this.props.userStore.currentUser.is_admin?true:false} userEditPost={this.props.userStore.currentUser.is_admin?false:true}/>

                        <div className="c-btns-3">
                            {this.showAdminEditBtns()}
                            {this.showUserEditBtns()}
                            {/*<Link to="#" className="r-btn">Responder</Link>*/}
                            <span className="responder-btn" onClick={()=>{this.props.discussionStore.setWysiwygText('');this.props.threadStore.setWisEdit('');}}>Cancelar</span>
                        </div>
                    </div>
                )
            }
        }
        else

        /* Show REGULAR Post ------------------- !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        {
            return (
                <div>
                    <div className="msg-arrow-desk"/>
                    <div className="msg-arrow-mob"/>
                    <div className="message-block">
                        <div className={this.props.quote?"quote":"hide-block"}>
                            <div className={this.props.quote?"quote-a":"hide-block"}>{this.props.quoteA} said: <i className="flaticon-arrow-pointing-to-right"/></div>
                            <div dangerouslySetInnerHTML={{__html: this.props.quote ? this.props.quote : ""}} />
                        </div>
                        <div dangerouslySetInnerHTML={{__html: this.props.children ? this.props.children : ""}} />
                        <p className="bottom-text">{this.props.tagline}</p>
                        <div className="c-panel">
                            {this.showLikes()}
                            <div className="c-btns">
                                {this.showAdminBtns()}
                                {this.showMemberBtns()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    /* Likes --------------------- */
    showLikes(){
        if(this.props.likesUC==1){
            return (
                <div className="c-likes">
                    <i className="flaticon2-signs"/>
                    <Link to="#">{this.props.likesU}</Link>
                </div>
            )
        } else if(this.props.likesUC>1) {
            return(
                <div className="c-likes">
                    <i className="flaticon2-signs"/>
                    <Link to="#">{this.props.likesU}</Link><span> y </span>
                    <Link onClick={(e)=>{this.props.threadStore.getUsersLikes(this.props.postNumber); e.preventDefault();}} to="#">{this.props.likesUC-1} personas más</Link>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    render() {
        return (
            <div className="fm">
                <Profile
                    author={this.props.author}
                    avatar={this.props.avatar}
                    realname={this.props.realname}
                    username={this.props.username}
                    profileUrl={this.props.profileUrl}
                    badge={this.props.author.yellow_label}
                    status={this.props.status}
                    likesC={this.props.likesC}
                    commentsC={this.props.commentsC}
                    commentsUrl={this.props.commentsUrl}
                    regDate={this.props.regDate}
                />
                <div className="fm-2">
                    {this.showPostText()}
                    <div className="post-info">
                        <div className="post-number">#{this.props.postNumberN}</div>
                        <div>{this.props.publishDate}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForumMessage;

