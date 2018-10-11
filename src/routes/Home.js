import React, { Component } from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import Golink from '../components/Golink';
import Table1 from '../components/Table1';
import Gobutton from '../components/Gobutton';
import Title1 from '../components/Title1';
import NewsRow from '../components/NewsRow';
import VideoRow from '../components/VideoRow';
import ProgramItem from '../components/ProgramItem';
import ReviewItem from '../components/ReviewItem';
import ExpertBanner from '../components/ExpertBanner';
import TopBanner from '../components/TopBanner';
import Banner3 from '../components/Banner3';
import BannerMember from '../components/BannerMember';
import PaginationNewUrl from '../components/PaginationNewUrl';
import MetaTags from 'react-meta-tags';
import {inject, observer} from 'mobx-react';

import styles from '../styles/routes/Home.css';

let scrollToComponent;

@inject('viewerStore', 'themeStore', 'blogStore', 'programStore', 'authStore', 'paymentStore')
@observer

class Home extends React.Component {
    constructor(props){
        super(props);
        let slugTheme = "";
        let slugSubTheme = "";
        let slug = this.props.match.params.theme;
        let subSlug = this.props.match.params.subtheme;
        let page = 1;
        this.props.viewerStore.setPagesCount(1, 'forum');
        if(slug!=undefined){
            if (subSlug == undefined) { // only Theme
                if (slug.indexOf("_") == -1){
                    slugTheme =  slug;
                } else {
                    slugTheme =  slug.substring(0, slug.indexOf("_"));
                    page = slug.substring(1+slug.indexOf("_"));
                }
            } else { // Theme and subTheme
                slugTheme =  slug;
                if (subSlug.indexOf("_") == -1){
                    slugSubTheme = subSlug;
                } else {
                    slugSubTheme =  subSlug.substring(0, subSlug.indexOf("_"));
                    page = subSlug.substring(1+subSlug.indexOf("_"));
                }
            }
        }

        this.props.themeStore.setCurrentTheme(slugTheme, "");
        this.props.themeStore.setSubTheme(slugSubTheme);
        this.props.themeStore.pullRecipeSlug();
        this.props.viewerStore.updatePageData(page, "forum");
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
        location.reload();
    };
    componentDidMount(){
        // recovery password
        let recoveryToken = this.props.viewerStore.getParameterByName('token');
        if(recoveryToken){
            this.props.authStore.setRecoveryToken(recoveryToken);
            this.props.viewerStore.showCreateNewPassword();
        }

        // confirm email
        let confirmToken = this.props.viewerStore.getParameterByName('confirm_token');
        if(confirmToken){
            this.props.authStore.checkEmailConfirmation(confirmToken);
        }

        // paypal answer
        if(this.props.viewerStore.getParameterByName('tx')){
            let tx = this.props.viewerStore.getParameterByName('tx');
            window.localStorage.setItem('tx', tx);
        }

        scrollToComponent = require('react-scroll-to-component');
        
        window.onpopstate = this.onBackButtonEvent;
        // After PayPal
        if(window.localStorage.getItem('tx')){
            window.localStorage.removeItem('justRegister');
            this.props.paymentStore.payPalAfter(window.localStorage.getItem('tx'));
        } else

        // After PayU
        if(window.localStorage.getItem('transaction_id')){
            window.localStorage.removeItem('justRegister');
            this.props.paymentStore.payUafter(window.localStorage.getItem('transaction_id'));
        }
    }

    componentDidUpdate(){
        if(window.location.hash){
            let hashBuf = window.location.hash;
            let hash = hashBuf.substring(1+hashBuf.indexOf("#"));
            scrollToComponent(
                this.refs[hash],
                {
                    offset: 0,
                    align: 'top',
                    duration: 1000
                }
            )
        }
    }
    scrollToForo(){
        scrollToComponent(
            this.refs.foro,
            {
                offset: 0,
                align: 'top',
                duration: 1000
            }
        )
    }
    getBanner(){
        if(!this.props.viewerStore.token) {
            return (
                <div className="c-cont2">
                    <h3 className="h3-2 text-center" dangerouslySetInnerHTML={{__html: this.props.themeStore.bubbleBanner.bubble_account_text}}></h3>
                    <div className="c-glink">
                        <Golink chref={this.props.viewerStore.registerPage}

                                prevent={true}
                                type={"link"}
                                ctarget={"_blank"}
                                size="gl1">
                                {this.props.themeStore.bubbleBanner.bubble_account_link_text}
                        </Golink>
                    </div>
                </div>
            )
        } else {
            return (<span></span>)
        }
    }

    showForoHeader(){
        if(this.props.viewerStore.token){
            return(
                <div ref="foro" className="c-foro-header">
                    <div className="c-f-foro-title">
                        <h3 className="foro-title">
                            Comunidad de {this.props.themeStore.currentThemeName}
                        </h3>
                        <Link to="/nueva-conversacion" className="btn1 btn-foro"><i className="flaticon-edit" />CREAR DISCUSIÓN AQUÍ</Link>
                    </div>
                </div>
            );
        } else {
            return(
                <div ref="foro" className="c-cont3">
                    <h3 className="h3-9 bott2 mob-hide">
                        Recibe Soporte de Cientos de Mujeres y <br/>
                        Especialistas en la Comunidad de <span className="light-text">{this.props.themeStore.currentThemeName}</span>
                    </h3>
                    <h3 className="h3-9 bott2 desk-hide">
                        Recibe Soporte de Cientos de<br/>
                        Mujeres y Especialistas en la<br/>
                        Comunidad de {this.props.themeStore.currentThemeName}
                    </h3>
                </div>
            );
        }
    }

    showForoFooter(){
        if(!this.props.viewerStore.token){
            return(
                <div className="text-center c1m">
                    <Gobutton
                        chref={this.props.viewerStore.registerPage}
                        click={()=>this.props.viewerStore.setRegisterPopup(true)}
                        prevent={true}
                        type={"link"}
                        minWidth="360px">
                        Únete al foro de salud
                    </Gobutton>
                </div>
            );
        } else {
            return (
                <div className="text-center c-green-button">
                    <Link to="/nueva-conversacion" className="green-button gb2">
                        <i className="flaticon-edit" /> Crear nueva discusión AQUÍ
                    </Link>
                </div>
            );
        }
    }

    showArticles(){
        let i=0;
        if(this.props.blogStore.RecentArticles.length > 0){
            return this.props.blogStore.RecentArticles.map(item =>
                <NewsRow key={i++}
                    id={item.id}
                    imageUrl={item.image?item.image:"./images/temp/n3.png"}
                    text={item.title}
                    date={item.publish_date}
                    social={true}
                    type={"link"}
                    themeSlug={item.theme_slug?item.theme_slug:"theme-slug"}
                    tagSlug={item.tag_slug?item.tag_slug:"tag-slug"}
                    slug={item.slug}
                />
            );
        } else {
            return (
              <div className="no-data">¡La información no existe!</div>
            );
        }
    }

    showReceipts(){
        let i=0;
        if(this.props.blogStore.RecentReceipts.length > 0){
            return this.props.blogStore.RecentReceipts.map(item =>
                <NewsRow key={i++}
                         id={item.id}
                         imageUrl={item.image?item.image:"./images/temp/n1.png"}
                         text={item.title}
                         date={item.publish_date}
                         social={true}
                         type={"link"}
                         themeSlug={item.theme_slug?item.theme_slug:"theme-slug"}
                         tagSlug={item.tag_slug?item.tag_slug:"tag-slug"}
                         slug={item.slug}
                />
            );
        } else {
            return (
                <div className="no-data">¡La información no existe!</div>
            );
        }
    }

    showPrograms(){
        return this.props.programStore.ProgramsList.map(item =>
            <ProgramItem pdata={item} key={item.id} />
        );
    }

    showVideos(){
        if(this.props.blogStore.RecentVideos.length > 0){
            return this.props.blogStore.RecentVideos.map(item =>
                <VideoRow
                    key={item.id}
                    imageUrl={item.image?item.image:"./images/temp/y1.png"}
                    text={item.title}
                    date={item.publish_date}
                    chref={item.video_url}
                    ctarget={"_blank"}
                />
            );
        } else {
            return (
                <div className="no-data">¡La información no existe!</div>
            );
        }
    }

    FAQ(){
        let i=0;
        if(this.props.themeStore.FAQ.length > 0){
            return this.props.themeStore.FAQ.map(item =>
                <li key={i++}>{item}</li>
            );
        } else {
            return (
                <div className="no-data">¡La información no existe!</div>
            );
        }
    }


    showStories(){
        if(this.props.themeStore.storiesList.length > 0){
            return this.props.themeStore.storiesList.map(item =>
                <ReviewItem
                    key={item.id}
                    imageUrl={item.image?item.image:"/images/no-avatar.png"}
                    userName={item.username}
                    text={item.content}
                />
            );
        } else {
            return (
                <div className="no-data">¡La información no existe!</div>
            );
        }
    }

    showFAQmodule(){
        if(!this.props.viewerStore.token){
            return(
                <div className="c3">
                    <div className="container">
                        <h3 className="h3-3">Resuelve Todas tus Preguntas con <span className="under-text">Nuestros Expertos</span></h3>
                        <div className="row top1 top1m">
                            <div className="col-lg-7">
                                <h3 className="h3-2 h3-2m">
                                    Preguntas Comunes:
                                </h3>
                                <ul className="list-exp top3">
                                    {this.FAQ()}
                                </ul>
                            </div>
                            <div className="col-lg-5">
                                <ExpertBanner type="home" />
                            </div>
                        </div>

                        <div className="text-center c1 btn-w">
                            <Gobutton
                                chref={this.props.viewerStore.registerPage}
                                type={"link"}
                                minWidth="360px"
                                click={()=>this.props.viewerStore.setRegisterPopup(true)}
                                prevent={true}
                            >
                                REGÍSTRATE GRATIS<br/> EN NUESTRA COMUNIDAD
                            </Gobutton>
                        </div>

                    </div>
                </div>
            );
        }
    }

    showReviewsModule(){
        if(!this.props.viewerStore.token){
            return (
                <div className="c2">
                    <div className="container">
                        <h3 className="h3-3">Tu Historia es Única, ¡Queremos Conocerla!</h3>
                        <div className="c-items">
                            {this.showStories()}
                        </div>

                        <h3 className="h3-5">¿Qué estás esperando? ¡Únete a <span className="under-text">nuestra comunidad</span>, sana y comparte tu historia!</h3>
                        <div className="text-center c1">
                            <Gobutton
                                chref={this.props.viewerStore.registerPage}
                                type={"link"}
                                minWidth="360px"
                                newClass="gbtn1"
                                click={()=>this.props.viewerStore.setRegisterPopup(true)}
                                prevent={true}
                            >
                                REGÍSTRATE Y CONOCE <br/> MÁS HISTORIAS
                            </Gobutton>
                        </div>
                    </div>
                </div>
            )
        }
    };

    handleTabClick = (slug, name) => {
        return e => {
            this.setState({homeMemberDD: false});
            this.props.viewerStore.setHomePageData(slug, name);
        }
    };

    handleSubThemeClick = (slug) => {
        return e => {
            this.props.themeStore.setSubTheme(slug);
        }
    };

    showForumThemas(){
        return this.props.themeStore.ThemesListForo.map(item =>
            <li key={item.id}>
                <Link
                    className={((this.props.themeStore.currentTheme==item.slug) || (item.slug=="alimentacion-saludable" && this.props.themeStore.currentTheme==""))?"active":""}
                    onClick={this.handleTabClick(item.slug, item.name)}
                    to={"/"+item.slug}>{item.name}
                </Link>
            </li>
        );
    };

    showForumThemasMenu(){
        if(!this.props.themeStore.currentTheme){
            return (
                <div>
                    <div className="forum-title">
                        ELIGE UN TEMA
                    </div>
                    <ul className="ha-col">
                        {this.showForumThemas()}
                    </ul>
                </div>
            )
        }
    };

    showForumSubThemas(){
        var theme = this.props.themeStore.currentTheme==""?"alimentacion-saludable":this.props.themeStore.currentTheme;
        return this.props.themeStore.subThemesList.map(item =>
            <li key={item.id}>
                <Link
                    className={this.props.themeStore.currentSubTheme==item.slug?"active":""}
                    onClick={this.handleSubThemeClick(item.slug)}
                    to={"/"+theme+"/"+item.slug}>
                    {item.name}
                </Link>
            </li>
        );
    };

    showMemberBannersHome() {
        if(this.props.viewerStore.token) {
            if (this.props.themeStore.currentTheme == "") {
                return (
                    <div className="bott1-ho">
                        <ExpertBanner type="home-side"/>
                        <div className="c-module top4">
                            <BannerMember linkText={this.props.themeStore.memberBanner.link_text}
                                          linkURL={this.props.themeStore.memberBanner.link_url}
                                          titleText={this.props.themeStore.memberBanner.banner_text}
                                          linkRef={this.refs.programs}/>
                        </div>
                    </div>
                )
            }
        }
    }

    showMemberBannersTheme() {
        if(this.props.viewerStore.token) {
            if (this.props.themeStore.currentTheme != "") {
                return (
                    <div className="top4 ">
                        <ExpertBanner type="home-side"/>
                        <div className="c-module top4">
                            <BannerMember linkText={this.props.themeStore.memberBanner.link_text}
                                          linkURL={this.props.themeStore.memberBanner.link_url}
                                          titleText={this.props.themeStore.memberBanner.banner_text}
                                          linkRef={this.refs.programs}/>
                        </div>
                    </div>
                )
            }
        }
    }

    showSocialMenu() {
        return (
            <div>
                <h3 className="h3-4">¡Comparte esta página con las personas que amas!</h3>

                <ul className="social-list sl-horizontal">
                    <li key="1">
                        <a href="https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"  target="_blank"><i className="flaticon-youtube"/></a>
                    </li>
                    <li key="2">
                        <a href="https://www.facebook.com/NuevasEvas/" target="_blank"><i className="flaticon-facebook-logo"/></a>
                    </li>
                    <li key="3">
                        <a href="https://wa.me/+51973586834" target="_blank"><i className="flaticon-whatsapp-logo"/></a>
                    </li>
                    <li key="4">
                        <a href="https://www.instagram.com/nuevasevas_rawveganperu/" target="_blank"><i className="flaticon-instagram-logo" /></a>
                    </li>
                    <li key="5">
                        <a href="https://twitter.com/nuevasevas?lang=en" target="_blank"><i className="flaticon-twitter-logo-silhouette" target="_blank"/></a>
                    </li>
                </ul>
            </div>
        )
    }

    showSocialMenuDesktop(){
        if(this.props.viewerStore.token){
            return (
                <div className="mob-hide">
                    {this.showSocialMenu()}
                </div>
            )
        } else {
            return null
        }
    }

    showSocialMenuMobile(){
        if(this.props.viewerStore.token){
            return (
                <div className="desk-hide home-mob-social">
                    {this.showSocialMenu()}
                </div>
            )
        } else {
            return null
        }
    }

    showProgramsUnit(){
        if(this.props.programStore.ProgramsList.length){
            return (
                <div id="programs" name="programs" ref="programs" className="c2 top1">
                    <div className="container">
                        <h3 className="h3-3">Soluciones & Tratamientos Naturales</h3>
                        <div className="c-items">
                            {this.showPrograms()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    showMetaData(){
        let vTitle = "";
        let vDescription = "";

        if (this.props.themeStore.currentSubTheme == ""){ // Without Subtheme
            // ----------------- Home
            if(this.props.themeStore.currentTheme == "" || this.props.themeStore.currentTheme == "alimentacion-saludable"){
                // with pagination
                if(this.props.viewerStore.currPage > 1){
                    vTitle = "Página "+this.props.viewerStore.currPage+ " - alimentación-saludable, tratamientos y medicina natural - Nuevas Evas";
                    vDescription = 'Página '+this.props.viewerStore.currPage+'. Nuevas Evas es una comunidad donde las mujeres aprenden a curar enfermedades utilizando sus alimentos como medicina natural, con el apoyo de expertos de salud. Encuentra: Tratamientos naturales, remedios, recetas saludables, consejos de alimentación saludable, vídeos y artículos de salud.';
                }
                    else
                // without pagination
                {
                    vTitle = "Nuevas Evas - Tratamientos naturales y alimentación saludable";
                    vDescription = "Nuevas Evas es una comunidad donde las mujeres aprenden a curar enfermedades utilizando sus alimentos como medicina natural, con el apoyo de expertos de salud. Encuentra: Tratamientos naturales, remedios, recetas saludables, consejos de alimentación saludable, vídeos y artículos de salud.";
                }
            } else { // -------------------- Theme
                // with pagination
                if(this.props.viewerStore.currPage > 1){
                    vTitle = "Página "+this.props.viewerStore.currPage+" - "+this.props.themeStore.currentThemeName+", tratamientos y remedios naturales - Nuevas Evas";
                    vDescription = this.props.themeStore.currentThemeName === 'Salud' ? '{{theme}}' : "Página "+this.props.viewerStore.currPage+". "+this.props.themeStore.currentThemeMetaDesc;
                }
                else
                // without pagination
                {
                    vTitle = this.props.themeStore.currentThemeName+", tratamientos y remedios naturales - Nuevas Evas";
                    vDescription = this.props.themeStore.currentThemeMetaDesc || '{{theme}}';
                }
            }
        } else { // -----------------  Subtheme
            // with pagination
            if(this.props.viewerStore.currPage > 1){
                vTitle = "Página "+this.props.viewerStore.currPage+" y alimentación-saludable, tratamientos y medicina natural - Nuevas Evas";
                vDescription = !this.props.themeStore.currentSubThemeName ? '{{theme}}' : "Página "+this.props.viewerStore.currPage+", "+this.props.themeStore.currentSubThemeName+". Nuevas Evas es una comunidad donde aprendes cómo cuidar tu salud utilizando los alimentos como medicina natural, recibe el apoyo de especialistas de nutrición. Comparte consejos de salud con otras mujeres.";
            }
            else
            // without pagination
            {
                vTitle = this.props.themeStore.currentSubThemeName+" y alimentación-saludable, tratamientos y medicina natural - Nuevas Evas";
                vDescription = !this.props.themeStore.currentSubThemeName ? '{{theme}}' : this.props.themeStore.currentSubThemeName+" y alimentación-saludable. Nuevas Evas es una comunidad donde aprendes cómo cuidar tu salud utilizando los alimentos como medicina natural, recibe el apoyo de especialistas de nutrición. Comparte consejos de salud con otras mujeres.";
            }
        }
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    showPagination(){
        if(this.props.viewerStore.pagesCount>1) {
            return (
                <PaginationNewUrl noscroll={true} scrollForo={()=>this.scrollToForo()} type={"forum"}/>
            )
        } else {
            return null
        }
    }

/* -------------------- RENDER --------------------- */
    render() {
        return (
            <div className="page home">
                {this.showMetaData()}

                <TopBanner type={this.props.viewerStore.token?"xsmall":"big"} linkRef={this.refs.programs} >
                    {this.props.themeStore.topBanner.banner_text?this.props.themeStore.topBanner.banner_text:'(Sin texto)'}
                </TopBanner>
                <div className="container top1 top1-n1">
                    <div className="row">

                        {/* MAIN CONTENT */}
                        <div className="col-md-7">
                            {/* Greeteng Banner -------------- */}
                            <Banner3 linkRef={this.refs.programs} />

                            {/* Buble Banner ----------------- */}
                            {this.getBanner()}

                            {/* Foro ------------------------- */}
                            {this.showForoHeader()}
                            {this.showForumThemasMenu()}

                            <div className="forum-title">
                                SUBTEMAS: {this.props.themeStore.currentTheme?this.props.themeStore.currentThemeName:'GENERAL'}
                            </div>
                            <ul className="ha-col">
                                {this.showForumSubThemas()}
                            </ul>
                            {/* Forum Content -------------------- */}
                            <Table1 />
                            {this.showPagination()}
                            {this.showForoFooter()}
                        </div>


                        {/* RIGHT SIDEBAR */}
                        <div className="col-md-5">
                            <div className="c-offset1">
                                {this.showMemberBannersHome()}

                                {/* unit 5 */}
                                <div className="c-module">
                                    <Title1 chref={"/blog/"+this.props.themeStore.currentTheme}>Artículos {this.props.themeStore.currentTheme==""?" Recientes":this.props.themeStore.currentThemeName}</Title1>
                                    {this.showArticles()}

                                    <div className="top6 top6m text-center">
                                        <Golink chref="/blog" type="link" size="gl2">Ver más</Golink>
                                    </div>
                                </div>

                                {/* unit 6 */}
                                <div className="c-module top4">
                                    <Title1 chref={this.props.themeStore.currentTheme==""?"":"/blog/"+this.props.themeStore.currentTheme+"/"+this.props.themeStore.recipeSlug}>Recetas {this.props.themeStore.currentTheme==""?" Recientes":this.props.themeStore.currentThemeName}</Title1>
                                    {this.showReceipts()}

                                    <div className="top6 top6m text-center">
                                        <Golink hide={this.props.themeStore.currentTheme==""} chref={this.props.themeStore.currentTheme==""?"":"/blog"} type="link" size="gl2">Ver más</Golink>
                                    </div>
                                </div>
                                {this.showMemberBannersTheme()}


                                {/* unit 7 */}
                                <div className="c-module top4">
                                    <Title1 ctarget={"_blank"} chref={"https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"}>VÍDEOS {this.props.themeStore.currentTheme==0?" Recientes":this.props.themeStore.currentThemeName}</Title1>
                                    <div className="c-videos">
                                        {this.showVideos()}
                                    </div>
                                    <div className="top6 top6m text-center">
                                        <Golink chref="/blog" size="gl2">Ver más</Golink>
                                    </div>
                                </div>
                                {/*{this.showSocialMenuDesktop()}*/}
                            </div>

                        </div>

                    </div>
                </div>

                {/* PROGRAM UNIT ---------------------------------------------> */}
                {this.showProgramsUnit()}

                {/* EXPERTS UNIT ---------------------------------------------> */}
                {this.showFAQmodule()}

                {/* REVIEWS UNIT ---------------------------------------------> */}
                {this.showReviewsModule()}
                {/*{this.showSocialMenuMobile()}*/}
            </div>
        );
    }
}

export default  Home;
