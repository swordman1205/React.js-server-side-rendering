import React, {Component} from 'react';
import Title1 from '../components/Title1';
import Avatar from 'react-avatar';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Comments.css';

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore')
@observer

class Comments extends Component {
    constructor(props){
        super(props);
    }
    handleTextChange = e => {this.props.viewerStore.setCommentAreaText(e.target.value);};
    showReplay(item){
        if(item.reply!=null){
            return (
                <div className={"comment-li comment-offset"}>
                    <div className="comment-main-content">
                        <div className="avatar2 avatar2-comment avatar-offset1 nuevas-avatar"></div>
                        <div className="comment-list-text">
                            <div className="clt-name">Nuevas Evas</div>
                            <div className="clt-text">{item.reply}</div>
                        </div>
                    </div>
                    <ul className="comment-list-panel">
                        <li><i className="flaticon-calendar" /> {item.reply_date}</li>
                    </ul>
                </div>
            )
        }
    }
    renderComment(){
        let i=0;
        return this.props.viewerStore.CommentsList.map(item =>
            <li className={item.reply?"":"bord-bott-no"} key={i++}>
                <div className={item.reply?"comment-li bord-bott-yes":"comment-li"}>
                    <div className="comment-main-content">
                        <Avatar className={"avatar-offset1"} size={50} name={item.author_name.split(' ')[0]} round={true} src={item.author_avatar} />
                        <div className="comment-list-text">
                            <div className="clt-name">{item.author_name}</div>
                            <div className="clt-text">{item.comment_text}</div>
                        </div>
                    </div>
                    <ul className="comment-list-panel">
                        <li><i className="flaticon-calendar" />{item.publish_date}</li>
                    </ul>
                </div>
                {this.showReplay(item)}
            </li>
        )
    }
    renderCommentsList(){
        return (
            <ul className="comments-list">
                {this.renderComment()}
            </ul>
        );
    }

    render() {
        if(this.props.viewerStore.CommentsObjectSlug!=""){
            return (
                <div className="c-comments">
                    <Title1 isGoLink={false}><i className="flaticon-comments" /> Comentarios</Title1>
                    <div className="c-area">
                        <Avatar className="u-avatar" size={50} name={this.props.userStore.currentUser?this.props.userStore.currentUser.username.split(' ')[0]:""} round={true} src={this.props.userStore.currentUser?this.props.userStore.currentUser.avatar:""} />
                        <textarea onChange={this.handleTextChange} value={this.props.viewerStore.CommentAreaText} className="cu-textarea" placeholder={this.props.userStore.currentUser?"Escribe tu comentario aquí ...":"Para comentar, conéctate o regístrate..."} />
                    </div>
                    <a href="#" onClick={(e)=>{e.preventDefault(); this.props.viewerStore.addComment(this.props.type?this.props.type:"lesson");}} className="btn1 bp-btn"><i className="flaticon-edit" />{this.props.userStore.currentUser?"Enviar Comentario":"conéctate o crea una cuenta"}</a>
                    <div className="clearfix" />
                    <div className="">
                        {this.renderCommentsList()}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Comments;
