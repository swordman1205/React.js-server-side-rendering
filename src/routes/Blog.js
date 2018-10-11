import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import BlogRow from '../components/BlogRow';
import TopBanner from '../components/TopBanner';
import Sidebar from '../components/Sidebar';
import PaginationNewUrl from '../components/PaginationNewUrl';
import Golink from '../components/Golink';
import MetaTags from 'react-meta-tags';
import {inject, observer} from 'mobx-react';

import styles from '../styles/routes/Blog.css';
@withRouter

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore', 'blogStore')
@observer
class Blog extends React.Component {
    constructor(props){
        super(props);
        let page = 1;
        let tag;
        let category;

        if (this.props.match.url.indexOf("_") != -1){
            let urlBuff = this.props.match.url;
            page = urlBuff.substring(1+urlBuff.indexOf("_"));
        }

        if (this.props.match.params.category == undefined) { // without Theme
            category = undefined;
        } else {
            let categoryBuf = this.props.match.params.category;
            if(categoryBuf.indexOf("_") != -1) {
                category = categoryBuf.substring(0, categoryBuf.indexOf("_"));
            } else {
                category = this.props.match.params.category;
            }
        }

        if (this.props.match.params.tag == undefined) { // without Theme
            tag = undefined;
        } else {
            let tagBuf = this.props.match.params.tag;
            if(tagBuf.indexOf("_") != -1){
                tag =  tagBuf.substring(0, tagBuf.indexOf("_"));
            } else {
                tag = this.props.match.params.tag;
            }
        }

        this.props.blogStore.pullCategories();
        this.props.themeStore.setCurrentTheme(category, "");
        this.props.blogStore.setTag(tag);
        this.props.viewerStore.updatePageData(page, "blog");
    }

    showPosts(){
        if(this.props.blogStore.inProgressBA){
            return (<div className="spinner" />)
        } else {
            if(this.props.blogStore.BlogArticles.length!=0){
                return this.props.blogStore.BlogArticles.map(item =>

                    <BlogRow
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        imageUrl={item.image}
                        social={true}
                        text={item.short_text}
                        date={item.publish_date}
                        tags={item.tags}
                        theme={item.theme_name}
                        themeSlug={item.theme_slug?item.theme_slug:"theme-slug"}
                        tagSlug={item.tag_slug?item.tag_slug:"tag-slug"}
                        slug={item.slug}
                    />
                );
            } else {
                return (<div className="no-data">Sin datos</div>);
            }
        }
    }

    showMetaData(){
        let vTitle = "";
        let vDescription = "";

        if(this.props.themeStore.currentTheme) {
            if (this.props.viewerStore.currPage > 1){
                vTitle = "Blog de "+this.props.themeStore.currentThemeName+" tratamientos y remedios naturales Pagina  "+this.props.viewerStore.currPage+" - Nuevas Evas";
                vDescription = this.props.themeStore.currentThemeMetaDesc;
            } else {
                vTitle = "Blog de "+this.props.themeStore.currentThemeName+" tratamientos y remedios naturales  - Nuevas Evas";
                vDescription = this.props.themeStore.currentThemeMetaDesc+ " Pagina numero "+this.props.themeStore.currentTheme+".";
            }

        } else {
            if (this.props.viewerStore.currPage > 1){
                vTitle = "Blog de tratamientos naturales y alimentación saludable - Pagina "+this.props.viewerStore.currPage+" - Nuevas Evas";
                vDescription = "El blog de Nuevas Evas contiene tratamientos naturales, remedios caseros y recetas saludables para curar enfermedades. Artículos, vídeos y noticias de alimentación saludable y medicina natural. Pagina numero "+this.props.viewerStore.currPage+".";
            } else {
                vTitle = "Blog de tratamientos naturales y alimentación saludable - Nuevas Evas";
                vDescription = "El blog de Nuevas Evas contiene tratamientos naturales, remedios caseros y recetas saludables para curar enfermedades. Artículos, vídeos y noticias de alimentación saludable y medicina natural.";
            }
        }

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page">
                {this.showMetaData()}
                <TopBanner type="small">Blog de Tratamientos & Remedios Naturales {this.props.themeStore.currentTheme?"Para":""} <span className="under-text">{this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:''}</span></TopBanner>
                <div className="container blog top1 top-blog">
                    <div className="row">
                        <div className="col-md-7">
                            {/* unit 1 */}
                            {this.showPosts()}
                            <div className="top6 top6m text-center">
                                <Golink size="gl2">Ver más</Golink>
                            </div>
                            <PaginationNewUrl type={"blog"}  />
                        </div>
                        <Sidebar categories={true} program={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Blog;
