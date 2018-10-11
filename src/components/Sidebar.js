import React, {Component} from 'react';
import Golink from '../components/Golink';
import Gobutton from '../components/Gobutton';
import Title1 from '../components/Title1';
import Table2 from '../components/Table2';
import NewsRow from '../components/NewsRow';
import VideoRow from '../components/VideoRow';
import ProgramItem from '../components/ProgramItem';
import ExpertBanner from '../components/ExpertBanner';
import Banner1 from '../components/Banner1';
import CategoriesMenu from '../components/CategoriesMenu';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Sidebar.css';

@inject('viewerStore', 'themeStore', 'blogStore', 'programStore')
@observer

class Sidebar extends Component {
    constructor(props){
        super(props);
    }
    showCategoriesMenu(){
        if(this.props.categories) {
            return (
                <div className="c-module u2">
                    <Title1 isGoLink={true}>categorías</Title1>
                    <CategoriesMenu />
                </div>
            )
        }
    }

    showProgram(){
        return (
            <div className="c-module top4 sidebar-mob-program u5">
                <Title1 isGoLink={false}>Soluciones & Tratamientos Naturales</Title1>
                <div className="c-sidebar-program">
                    <h3 className="h3-3">Soluciones & Tratamientos Naturales</h3>
                    <ProgramItem pdata={this.props.programStore.ProgramsList[0]} />
                </div>
            </div>
        )
    }

    showArticles(){
        if(this.props.blogStore.inProgressRA){
            return (<div className="spinner" />)
        } else {
            let i = 0;
            if (this.props.blogStore.RecentArticles.length != 0) {
                return this.props.blogStore.RecentArticles.map(item =>
                    <NewsRow key={i++}
                             id={item.id}
                             imageUrl={item.image ? item.image : "./images/temp/n3.png"}
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
    }

    showReceipts(){
        if(this.props.blogStore.inProgressRR){
            return (<div className="spinner" />)
        } else {
            let i = 0;
            if (this.props.blogStore.RecentReceipts.length != 0) {
                return this.props.blogStore.RecentReceipts.map(item =>
                    <NewsRow key={i++}
                             id={item.id}
                             imageUrl={item.image ? item.image : "./images/temp/n3.png"}
                             text={item.title}
                             date={item.publish_date}
                             social={true}
                             type={"link"}
                             themeSlug={item.theme_slug?item.theme_slug:"theme-slug"}
                             tagSlug={"recetas"}
                             slug={item.slug}
                    />
                );
            } else {
                return (
                    <div className="no-data">¡La información no existe!</div>
                );
            }
        }
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

    showForoHeader(){
        if (this.props.themeStore.ForoList2.length) {
            return (
                <div className="s-top2 mob-hide">
                    Recibe Soporte de Cientos de Mujeres y Especialistas en el <span
                    className="light-text">Comunidad de {this.props.themeStore.currentTheme != "" ? this.props.themeStore.currentThemeName : "Salud"}:</span>
                </div>
            )
        } else {
            return null;
        }
    }

    showForoFooter(){
        if(!this.props.viewerStore.token){
            return(
                <div className="text-center s-top1">
                    <Gobutton
                        chref={this.props.viewerStore.registerPage}
                        type={"link"}
                        minWidth="360px"
                        click={()=>this.props.viewerStore.setRegisterPopup(true)}
                        prevent={true}
                    >
                        Únete al foro de {this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:"Salud"}
                    </Gobutton>
                </div>
            );
        } else {
            if (this.props.themeStore.ForoList2.length){
                return (
                    <div className="text-center c5">
                        <Golink type={"link"} chref={"/"} ctarget="_blank" size="gl2">Ver más</Golink>
                    </div>
                );
            } else {
                return(
                    <div className="no-data">¡La información no existe!</div>
                )
            }
        }
    }

    showRegisterBtn(){
        if(!this.props.viewerStore.token) {
            return (
                <div className="text-center s-top2">
                    <Gobutton
                        chref={this.props.viewerStore.registerPage}
                        type={"link"}
                        minWidth="360px"
                        click={()=>this.props.viewerStore.setRegisterPopup(true)}
                        prevent={true}
                        >
                        Únete a Nuestra Comunidad
                    </Gobutton>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="col-md-5 sidebar sidebar-offset-bott">
                <div className="c-offset1 c-order">

                    {/* unit 1 */}
                    <div className="u1">
                        <Banner1 />
                    </div>

                    {/* unit 2 */}
                    {this.showCategoriesMenu()}

                    <div className="c-module u3">
                        <Title1 type={"link"} chref={"/blog/"+this.props.themeStore.currentTheme}>Artículos {this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:"RECIENTES"}</Title1>
                        {this.showArticles()}

                        <div className="top6 top6m text-center">
                            <Golink chref="/blog" type="link" size="gl2">Ver más</Golink>
                        </div>
                    </div>

                    {/* unit 4 */}
                    <div className="c-module top4 u4">
                        <Title1 chref={"/blog/"+this.props.themeStore.currentTheme}>Recetas {this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:"RECIENTES"}</Title1>
                        {this.showReceipts()}
                        <div className="top6 top6m text-center">
                            <Golink chref="/blog" type="link" size="gl2">Ver más</Golink>
                        </div>
                    </div>

                    {/* unit 5 */}
                    {this.props.programStore.ProgramsList.length>0&&this.props.themeStore.currentTheme!=""?this.showProgram():""}

                    {/* unit 6 FORO */}
                    <div className="c-module top4 u6">
                        <Title1 isGoLink={false}>COMUNIDAD DE <span className="upper">{this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:"Salud"}</span></Title1>
                        {this.showForoHeader()}
                        <Table2 sidebar={true}/>
                        {this.showForoFooter()}
                    </div>

                    {/* unit 7 */}
                    <div className="c-module top4 u7">
                        <Title1 ctarget={"_blank"} chref={"https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"}>VÍDEOS {this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:"RECIENTES"}</Title1>
                        <div className="c-videos">
                            {this.showVideos()}
                        </div>
                        <div className="top6 top6m text-center">
                            <Golink  ctarget={"_blank"}  chref={"https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"} size="gl2">Ver más</Golink>
                        </div>
                    </div>

                    {/* unit 8 */}
                    <div className="c-module top4 u8">
                        <Title1 isGoLink={false}>Nuestra Especialista</Title1>
                        <div className=" s-top2">
                            <ExpertBanner type="side" />
                        </div>
                        {this.showRegisterBtn()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
