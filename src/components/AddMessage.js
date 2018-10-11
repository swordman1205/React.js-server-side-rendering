import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Route, withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import WysiwygE from '../components/WysiwygE';
import styles from '../styles/components/AddMessage.css';
import Profile from '../components/Profile';

@withRouter
@inject('authStore', 'userStore', 'discussionStore', 'threadStore', 'viewerStore')
@observer

class AddMessage extends Component {
    sendPost = (e) =>{
        let wisiwygText = this.props.discussionStore.wysiwygText;
        let text = wisiwygText.replace(/[\n\r]/g, '') ;

        if (wisiwygText=='' || text == "<p></p>") {
            e.preventDefault();
            this.props.discussionStore.setValidationMessage(true);
        } else {
            this.props.discussionStore.setValidationMessage(false);
            if (!this.props.threadStore.isEditPost) {
                this.props.threadStore.sendNewPost();
                let page = 1+(Math.floor(this.props.viewerStore.totalCount/this.props.viewerStore.threadLimit));
                let urlPage = '/'+this.props.threadStore.currentThreadId+'-'+this.props.threadStore.currentThreadSlug+'_'+page;
                this.props.viewerStore.updatePageData(page, "thread");
                this.props.history.push("/comunidad"+urlPage);
            } else {
                this.props.threadStore.sendEditedPost();
                this.props.history.push("/comunidad/" +this.props.threadStore.currentThreadId+"-"+this.props.threadStore.currentThreadSlug + "/?p=" + this.props.viewerStore.currPage + "#post" + this.props.threadStore.editPostId);
                this.props.threadStore.clearWW();
                e.preventDefault();
            }
        }
    };

    showQuoteMsg(){
        if(this.props.threadStore.quoteText){
            return(
                <div className="quote-msg">
                    <div className="quote-msg-text">
                        <div dangerouslySetInnerHTML={{__html: this.props.threadStore.quoteText ? this.props.threadStore.quoteText : ""}} />
                    </div>
                    <i onClick={()=>{this.props.threadStore.setQuote("0", "")}} className="flaticon-cancel cancel-btn" />
                </div>
            )
        }
    }

    showValidationMessage(){
        if(this.props.discussionStore.validationMessage){
            return (
                <div className="am-error">
                    <div className="error-msg">
                        <i className="flaticon-warning"/>
                        <p>Por favor llene todos los campos requeridos </p>
                    </div>
                </div>
            )
        }
        else return null
    }

    showEditor(){
        if(this.props.threadStore.inProgressTP){
            return(
                <div className="am-2 c-editor">
                   <div className="spinner" />
                </div>
            )
        } else {
            return(
                <div className="am-2 c-editor">
                    {this.showQuoteMsg()}
                    <WysiwygE newPost={true} />
                    <Link onClick={this.sendPost} to="#" className="btn11 marg-bott-btn1">Responder</Link>
                    {this.showValidationMessage()}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="am">
                <Profile
                    author={this.props.userStore.currentUser}
                    avatar={this.props.avatar}
                    realname={this.props.realname}
                    username={this.props.username}
                    profileUrl={this.props.profileUrl}
                    badge={this.props.badge}
                    status={this.props.status}
                    likesC={this.props.likesC}
                    commentsC={this.props.commentsC}
                    commentsUrl={this.props.commentsUrl}
                    regDate={this.props.regDate}
                />
                {this.showEditor()}
            </div>
        )
    }
}

export default AddMessage;


