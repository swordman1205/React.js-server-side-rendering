import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'react-avatar';
import styles from '../styles/components/NewProfilePopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore', 'threadStore')
@observer

class NewProfilePopup extends Component {
    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.viewerStore.hideProfilePopup();
        this.bodyClass(false);
    }
    showAvatar(){
        if(this.props.threadStore.currentAuthor.avatar){
            return <div className="npp-img" style={{backgroundImage: this.props.threadStore.currentAuthor.avatar?"url("+this.props.threadStore.currentAuthor.avatar+")":"url(/images/temp/u4.png)"}}/>
        } else {
            return <Avatar className={"npp-img"} size={240} name={this.props.threadStore.currentAuthor.realname.split(' ')[0]} round={false} src={this.props.threadStore.currentAuthor.avatar} />;
        }
    }
    render() {
        if (this.props.viewerStore.isProfilePopup){
            {this.bodyClass(true)}

            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup-profile" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close4"/>
                        </div>
                        <div className="new-profile-popup">
                            <div className="npp-b1">
                                    {this.showAvatar()}
                                <div className="npp-member">
                                    <div >Miembro desde: </div>
                                    <div>{this.props.threadStore.currentAuthor.register_date}</div>
                                </div>
                                <p>{this.props.threadStore.currentAuthor.signature}</p>
                                <div className="npp-btn"><Link onClick={()=>{this.hidePopup()}} to={"/historial-posts/"+this.props.threadStore.currentAuthor.user_id} className="btn1 desk-hide">VER COMENTARIOS PASADOS</Link></div>
                            </div>
                            <div className="npp-b2">
                                <div className="npp-profile">{this.props.threadStore.currentAuthor.realname}</div>
                                <div className="c-npp-likes">
                                    <div className="npp-likes">
                                        <i className="flaticon2-signs"></i><span>{this.props.threadStore.currentAuthor.likes_count}</span>
                                    </div>
                                    <div className="npp-likes">
                                        <i className="flaticon-comments"></i><Link onClick={()=>{this.hidePopup()}} to={"/historial-posts/"+this.props.threadStore.currentAuthor.user_id}>{this.props.threadStore.currentAuthor.posts_count}</Link>
                                    </div>
                                </div>
                                <div className="c-badge">
                                    <div className={this.props.threadStore.currentAuthor.yellow_label?"nuevas-badge2":"nuevas-member2"}>{this.props.threadStore.currentAuthor.role}</div>
                                </div>
                                <div className="npp-info">
                                    <p>País: {this.props.threadStore.currentAuthor.country?this.props.threadStore.currentAuthor.country:"sin datos"}</p>
                                    <p>Intereses: {this.props.threadStore.currentAuthor.interests?this.props.threadStore.currentAuthor.interests:"sin datos"}</p>
                                    <p>{this.props.threadStore.currentAuthor.birthday?"Cumpleaños: "+this.props.threadStore.currentAuthor.birthday:""}</p>
                                    <p>{this.props.threadStore.currentAuthor.age?"Edad: "+this.props.threadStore.currentAuthor.age+" años":""}</p>
                                </div>
                                <div className="npp-btn"><Link onClick={()=>{this.hidePopup()}} to={"/historial-posts/"+this.props.threadStore.currentAuthor.user_id} className="btn1 mob-hide">VER COMENTARIOS PASADOS</Link></div>

                            </div>

                        </div>

                    </div>
                </div>
            );
        }
        else return null
    }
}
export default NewProfilePopup;
