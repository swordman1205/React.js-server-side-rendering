import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import PaginationNewUrl from '../components/PaginationNewUrl';
import Title1 from '../components/Title1';
import ForumMessage from '../components/ForumMessage';
import AddMessage from '../components/AddMessage';
import BottomMenu from '../components/BottomMenu';
import RegisterBanner from '../components/RegisterBanner';
import LikesPopup from '../components/LikesPopup';
import {Link} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/Thread.css';

import {inject, observer} from 'mobx-react';

let scrollToComponent;

@inject('viewerStore', 'userStore', 'threadStore', 'themeStore')
@observer

class Thread extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            admin: true,
            edit_theme: false
        };
    };

    componentDidMount () {
        scrollToComponent = require('react-scroll-to-component');
        let slug = this.props.match.params.threadSlug;
        let page = 1;
        let slugThread = "";
        let idThread = 0;
        if(slug!=undefined){
            if (slug.indexOf("-") == -1) {
                slugThread = "";
            } else {
                if (slug.indexOf("_") == -1){
                    slugThread = slug.substring(1+slug.indexOf("-"));
                } else {
                    slugThread = slug.substring(1+slug.indexOf("-"), slug.indexOf("_"));
                    page = slug.substring(1+slug.indexOf("_"));
                }
            }
        } else {
            slugThread =  "";
        }

        if (slug.indexOf("-") == -1){
            idThread = 0;
        } else {
            idThread =  slug.substring(0, slug.indexOf("-"));
        }

        this.props.threadStore.setCurrentThread(slugThread);
        this.props.threadStore.setCurrentThreadId(idThread);
        this.props.viewerStore.updatePageData(page, "thread");
        this.props.threadStore.setEditTitle(false)
    }

    componentDidUpdate(){
        if (window.location.hash){
            scrollToComponent(
                this.refs[window.location.hash.substr(1)],
                {
                    offset: 0,
                    align: 'top',
                    duration: 1000
                }
            )
        }
    }

    showEditTitleValidation(){
        if (this.props.threadStore.threadSubThemeEdited){
            this.props.threadStore.setEditTitlePopup(true);
            this.props.threadStore.setEditTitleValidation(false)
        }
        else (this.props.threadStore.setEditTitleValidation(true))
    }

    showEditBtns(){
        if (this.props.threadStore.editTitle){
            return (
                <span className="btn8 ta-btn8" onClick={ ()=>{this.showEditTitleValidation()}}>Guardar</span>
            )
        }
        else {
            return (
                <span className="btn8 ta-btn8" onClick={()=>{this.props.threadStore.setEditTitle(true); this.props.themeStore.pullSubThemesList(this.props.threadStore.threadThemeEdited)}}>Editar Título y Tema</span>
            )
        }
    }

    showDeleteThreadPopup(){
        if (this.props.threadStore.currentThreadData){
            if (this.props.threadStore.currentThreadData.posts.length > 0){
                return(this.props.threadStore.setDeleteThreadValidation(true))
            }
            else {
                return(this.props.threadStore.setDeleteThreadPopup(true))
            }
        }
    }


    showAdminButtons(){
        if (this.props.userStore.currentUser){
            if (this.props.userStore.currentUser.is_admin)
            return (
                <div className="c-ta-btn8">
                    {this.showEditBtns()}
                    <span className="btn9 ta-btn8" onClick={()=>this.showDeleteThreadPopup()}>Borrar Discusión</span>
                </div>
            );
            else return null
        }
        else return null
    };

    /* Wysiwyg here -------------------------- */
    showAddMessage(){
        if(this.props.viewerStore.token && this.props.userStore.currentUser){
            return(
                <AddMessage
                    avatar={this.props.userStore.currentUser.avatar}
                    realname={this.props.userStore.currentUser.realname}
                    username={this.props.userStore.currentUser.username}
                    profileUrl="/editar-perfil"
                    badge={this.props.userStore.currentUser.yellow_label}
                    status={this.props.userStore.currentUser.role}
                    likesC={this.props.userStore.currentUser.likes_count}
                    commentsC={this.props.userStore.currentUser.posts_count}
                    commentsUrl={"/historial-posts/"+this.props.userStore.currentUser.user_id}
                    regDate={this.props.userStore.currentUser.register_date}
                />
            )
        }
    }

    handleThemeChange = (e) => {
        this.props.threadStore.setTitleEdited(e.target.value);
    };

    editTheme(){
        if (this.props.threadStore.editTitle){
            return(
                <div className="form-item2">
                    <input type="text" placeholder="Cual es el mejor remedio para la artritis" onChange={this.handleThemeChange} value={this.props.threadStore.titleEdited?this.props.threadStore.titleEdited:''}/>
                </div>
            )
        }
        else {
            return(
                <span className="ta-top-p">{this.props.threadStore.currentThreadData?this.props.threadStore.currentThreadData.title:""}</span>
            )
        }
    }

    showThemesList(){
        if (this.props.themeStore.ThemesList){
            let i=0;
            return this.props.themeStore.ThemesList.map(item=>
                <option key={i++} value={item.slug} name={item.name}>{item.name}</option>
            )
        }
        else return null
    }

    showSubThemesList(){
        if (this.props.themeStore.subThemesList){
            let i=0;
            return this.props.themeStore.subThemesList.map(item=>
                <option key={i++} value={item.slug} name={item.name}>{item.name}</option>
            )
        }
        else return null
    }

    handleEditedThemeChange = e => {
        if(e.target.value!=0){
            this.props.threadStore.setThreadThemeEdited(e.target.value);
            this.props.themeStore.pullSubThemesList(e.target.value);
            this.props.threadStore.setThreadSubThemeEdited('');
        } else {
            this.props.threadStore.setThreadThemeEdited("");
        }
    };

    handleEditedSubThemeChange = e => {
        if(e.target.value!=0){
            this.props.threadStore.setThreadSubThemeEdited(e.target.value);
        } else {
            this.props.threadStore.setThreadSubThemeEdited("");
        }
    };

    editThemeSelect(){
        if (this.props.threadStore.editTitle){
            return(
                <div className="c-ta-sel">
                    <div className="cu-sel ta-sel">
                        <select onChange={this.handleEditedThemeChange} value={this.props.threadStore.threadThemeEdited?this.props.threadStore.threadThemeEdited:''}>
                            {this.showThemesList()}
                        </select>
                    </div>
                    <div className={this.props.threadStore.editTitleValidation?"cu-sel ta-sel2 error-field":"cu-sel ta-sel2"}>
                        <select onChange={this.handleEditedSubThemeChange}
                                value={this.props.threadStore.threadSubThemeEdited?this.props.threadStore.threadSubThemeEdited:''}>
                            <option value='0'>Seleccionar Otro Sub-Tema</option>
                            {this.showSubThemesList()}
                        </select>
                    </div>
                </div>
            )
        }
        else return null

    }
    showPosts(){

        if(this.props.threadStore.currentThreadData){
                if (this.props.threadStore.currentThreadData.posts){
                    let i=0;
                    let itemsCount = this.props.threadStore.currentThreadData.posts.length;
                    let showItem = 1;
                    if (itemsCount>1){
                        showItem = 2;
                    }
                    return this.props.threadStore.currentThreadData.posts.map(item=>
                        <div className="c-fmi" ref={"post"+item.id}>
                            <ForumMessage
                                key={++i}
                                postNumber={item.id}
                                postNumberN={item.post_number}
                                author={item.author}
                                authorId={item.author.user_id}
                                avatar={item.author.avatar}
                                realname={item.author.realname}
                                username={item.author.username}
                                profileUrl=""
                                status={item.author.role}
                                likesC={item.author.likes_count}
                                commentsC={item.author.posts_count}
                                commentsUrl={"/historial-posts/"+item.author.user_id}
                                regDate={item.author.register_date}
                                tagline={item.author.signature}
                                likesU={item.likes[0]?item.likes[0].username:""}
                                likesUC={item.likes.length}
                                publishDate={item.publish_date}
                                quoteA={item.quote.author_username?item.quote.author_username:""}
                                quote={item.quote.short_text?item.quote.short_text:""}
                                canEdit={item.can_edit}
                            >
                                {item.text}
                            </ForumMessage>
                            <RegisterBanner hide={i!=showItem}/>
                        </div>
                    )
                } else {
                    return (<div>No Posts</div>)
                }
            } else {
                return (<div>No Posts</div>)
            }
    }

    showSubtemasList(){
        let i=0;
        return this.props.themeStore.subThemesList.map(item =>
            <li key={i++}>
                <Link
                    className={this.props.themeStore.currentTheme==item.slug?"active":""}
                    to={"/"+this.props.threadStore.ctdThemeSlug+"/"+item.slug}>
                    {item.name}
                </Link>
            </li>
        );
    }

    showValidationMessage(){
        if (this.props.threadStore.deleteThreadValidation){
            return (
                <div className="error-msg error-msg2">
                    <i className="flaticon-warning"/>
                    <p>Validación necesaria: La discusión no puede ser borrada si contiene posts.</p>
                </div>
            )
        }
    }
    actionForVisitor = (e) => {
        if(!this.props.viewerStore.token) {
            e.preventDefault();
            this.props.viewerStore.setRegisterPopup(true);
        }
    };

    showMetaData(){
        let vTitle = "";
        let vDescription = "";

        if(this.props.threadStore.currentThreadData){
            if(this.props.viewerStore.currPage > 1){
                vTitle = "Página "+this.props.viewerStore.currPage+" "+this.props.threadStore.currentThreadData.title+", comunidad - Nuevas Evas";
                vDescription = "Página "+this.props.viewerStore.currPage+", "+this.props.threadStore.currentThreadData.title+". Nuevas Evas es una comunidad para aprender cómo tratar y curar "+this.props.threadStore.ctdThemeName+" utilizando tratamientos y medicina natural."
            } else {
                vTitle = this.props.threadStore.currentThreadData.title+", comunidad - Nuevas Evas";
                vDescription = this.props.threadStore.currentThreadData.title+". Nuevas Evas es una comunidad para aprender cómo tratar y curar "+this.props.threadStore.ctdThemeName+" utilizando tratamientos y medicina natural."
            }

        }
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    showBottPagination(){
        let bgPagination = true;
        if(this.props.threadStore.currentThreadData){
           if (this.props.threadStore.currentThreadData.posts == 4){
               bgPagination = false;
           } else {
               bgPagination = true;
           }
        }
        return (
            <div className={bgPagination?"":"pg-bg"}>
                <PaginationNewUrl color={bgPagination} type={"thread"}  />
            </div>
        )
    }

    render() {
        return (
            <div className="page thread">
                {this.showMetaData()}
                <LikesPopup />
                <TopBanner type="small-text" subtext="Haz preguntas, recibe respuestas de nuestros Especialistas de Salud y comunidad de Mujeres. Comparte tus consejos.">
                    Comunidad de {this.props.threadStore.ctdThemeName}
                </TopBanner>
                <form className="fotm1">
                    <div className="container ta top3n">
                        {this.showValidationMessage()}
                        <div className="ta-b1">
                            <Link to={"/"+this.props.threadStore.ctdThemeSlug+"/"+this.props.threadStore.ctdSubThemeSlug} className="ta-link">{this.props.threadStore.ctdSubThemeName}</Link>
                            {this.editTheme()}
                        </div>
                        <div className="ta-b1-2">
                            {this.editThemeSelect()}
                            {this.showAdminButtons()}
                        </div>
                    </div>
                </form>

                <div className="ta-b-c">
                    {/* Pagination ------------------------------- */}
                    <PaginationNewUrl color={true} type={"thread"}  />
                    <div className="c-forum-items">
                        {this.showPosts()}
                    </div>

                    {/* Pagination ------------------------------- */}
                    {this.showBottPagination()}

                    <div ref="edit">
                        {this.showAddMessage()}
                    </div>

                    <RegisterBanner color={true}/>
                </div>

                <div className="container ta top1">
                    <div className="ta-b4">
                        <div className="ta-b4-1">
                            <Title1>Más sobre la {this.props.threadStore.ctdThemeName}</Title1>
                            <ul className="ta-col">
                                {this.showSubtemasList()}
                            </ul>
                        </div>
                        <div className="ta-b4-2">
                            <div className="forum-banner">
                                <h3>¿Tienes una pregunta?</h3>
                                <p>
                                    Yo puedo ayudarte.
                                </p>
                                <div className="c-forum-bottom">
                                    <div className="forum-pict"/>
                                    <div className="forum-text">
                                        <p>Alejandra Abarca</p>
                                        <p className="forum-text-exp">Experta de Alimentación Saludable.</p>
                                        <Link onClick={this.actionForVisitor} to="/nueva-conversacion" className="btn12"><i className="flaticon-edit"/>Hacer Pregunta</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BottomMenu/>
            </div>
        );
    }
}

export default Thread;



