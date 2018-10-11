import React, {Component} from 'react';
import TopBanner from '../components/TopBanner';
import Sidebar from '../components/Sidebar';
import {Link, withRouter} from 'react-router-dom';
import InfoPanelBlog from '../components/InfoPanelBlog';
import Title1 from '../components/Title1';
import Banner3 from '../components/Banner3';
import Comments from '../components/Comments';
import NewsRow from '../components/NewsRow';
import BreadCrumbs from '../components/BreadCrumbs';
import {inject, observer} from 'mobx-react';
import { ShareButtons, ShareCounts, generateShareIcon} from 'react-share';
import MetaTags from 'react-meta-tags';

import styles from '../styles/routes/BlogPost.css';

@withRouter
@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore', 'blogStore')
@observer


class BlogPost extends Component {
    constructor(props){
        super(props);
        let slug = "";
        let postURL = this.props.match.params.postSlug;
        if(postURL!=undefined){
            if (postURL.indexOf("-") != -1){
                slug = postURL.substring(1+postURL.indexOf("-"));
            } else {
                slug = "";
            }
        }
        this.updatePage(slug);
        this.props.themeStore.pullGreetingBanner();
    }

    componentWillReceiveProps(nextProps){
        let slug = "";
        let postURL = nextProps.match.params.postSlug;
        if(postURL!=undefined){
            if (postURL.indexOf("-") != -1){
                slug = postURL.substring(1+postURL.indexOf("-"));
            } else {
                slug = "";
            }
        }
        this.updatePage(slug);
        let fbCount=0;
        let pintCount=0;
        let totalCount=0;
        var fbCountDiv = document.getElementById('fb-count');
        var pintCountDiv = document.getElementById('pint-count');
        if(fbCountDiv && pintCountDiv){
            fbCount = parseInt(fbCountDiv.innerHTML);
            pintCount = parseInt(pintCountDiv.innerHTML);
            this.totalCount=fbCount+pintCount;
        }
    }

    componentWillUpdate(){
        let fbCount=0;
        let pintCount=0;
        let totalCount=0;
        var fbCountDiv = document.getElementById('fb-count');
        var pintCountDiv = document.getElementById('pint-count');
        if(fbCountDiv && pintCountDiv){
            fbCount = parseInt(fbCountDiv.innerHTML);
            pintCount = parseInt(pintCountDiv.innerHTML);
            this.totalCount=fbCount+pintCount;
        }
    }

    updatePage(postSlug){
        this.props.blogStore.setCurrPost(postSlug);
        this.props.blogStore.pullPost(postSlug);
        this.props.blogStore.setTag("");
        this.props.blogStore.pullCategories();
        this.props.blogStore.updateSidebar();
    }

    showTop(){
        if(this.props.blogStore.inProgressPost){
            return (<div className="spinner" />)
        } else {
            return (
                <div className="c-order">
                    <h2 className="h2-1">{this.props.blogStore.currPost.title?this.props.blogStore.currPost.title:""}</h2>
                    <InfoPanelBlog
                        pos="new-line"
                        mSocials={"m-socials"}
                        shareLink={"/blog/"+this.props.blogStore.currPost.id+"-"+this.props.blogStore.currPost.slug}
                        shareImg={this.props.blogStore.currPost.image?this.props.blogStore.currPost.image:(typeof window === 'undefined' ? '' : window.location.protocol + "//" + window.location.host +"/images/banner-logo.png")}
                        themeName={this.props.blogStore.currPost.category_name}
                        tags={this.props.blogStore.currPost.tags}
                        publishDate={this.props.blogStore.currPost.publish_date}
                        authorName={this.props.blogStore.currPost.author_name}
                        themeSlug={this.props.blogStore.currPost.category_slug}
                    />
                </div>
            );
        }
    }

    showImage(){
        if(this.props.blogStore.inProgressPost){
            return (<div className="spinner" />)
        } else {
            return (
                <img className="single-image" src={this.props.blogStore.currPost.image?this.props.blogStore.currPost.image:"/images/temp/blog-post.jpg"} alt=""/>
            );
        }
    }

    showContent(){
        if(this.props.blogStore.inProgressPost){
            return (<div className="spinner" />)
        } else {
            return (
                <div
                    dangerouslySetInnerHTML={{__html: this.props.blogStore.currPost.text ? this.props.blogStore.currPost.text : ""}}/>
            );
        }
    }

    showSourceLinks(){
        if(this.props.blogStore.inProgressPost){
            return (<div className="spinner" />)
        } else {
            if(this.props.blogStore.currPost.source_links.length>0){
                return this.props.blogStore.currPost.source_links.map(item=>
                    <li className="c-source" dangerouslySetInnerHTML={{__html: item ? item : ""}} />
                );
            } else {
                return (<div className="no-data">Sin datos</div>);
            }
        }
    }

    showRecommendedVideos(){
        let i=0;
        return this.props.blogStore.recPosts.map(item=>

            <NewsRow
                key={i++}
                id={item.id}
                imageUrl={item.image ? item.image : "./images/temp/n3.png"}
                text={item.title}
                date={item.publish_date}
                social={!!this.props.viewerStore.token}
                type={"link"}
                themeSlug={item.theme_slug?item.theme_slug:"theme-slug"}
                tagSlug={item.tag_slug?item.tag_slug:"tag-slug"}
                slug={item.slug}
            />
        )
    }

    showMetaData(){
        let vTitle = "";
        let vDescription = "";

        if(this.props.blogStore.currPost.title){
            vTitle = this.props.blogStore.currPost.title+ " - Nuevas Evas";
            vDescription = this.props.blogStore.currPost.meta_description;
        }

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    showSourceLinksModule(){
        if(this.props.blogStore.currPost.source_links){
        if(this.props.blogStore.currPost.source_links.length>0) {
            return (
                <div>
                    <Title1 isGoLink={false}><i className="flaticon-web-link"/> Referencias CIENTÍFICAS</Title1>
                    <ul className="list2">
                        {this.showSourceLinks()}
                    </ul>
                </div>
            )
        } else return null;
        } else return null;
    }
    render() {
        const {
            FacebookShareCount,
            PinterestShareCount
        } = ShareCounts;

        const {
            FacebookShareButton,
            PinterestShareButton
            } = ShareButtons;

        let shareUrl = typeof window === 'undefined' ? '' : window.location.protocol + "//" + window.location.host+"/blog/"+this.props.blogStore.currPost.id+"-"+this.props.blogStore.currPost.slug;

        let bc=[];
        bc.push({"text":"Blog", "link":"/blog"});
        bc.push({"text":this.props.themeStore.currentThemeName, "link":"/blog/"+this.props.themeStore.currentTheme});
        bc.push({"text":"7 Super Alimentos para reducir el Ardor en tus manos"});
        return (
            <div className="page">
                {this.showMetaData()}
                <TopBanner type="small">Blog de Tratamientos &<br/> Remedios Naturales Para <span className="under-text">{this.props.themeStore.currentThemeName}</span></TopBanner>
                <div className="container blog top1">
                    <div className="row">
                        <div className="col-md-7 blog-post">
                            <BreadCrumbs data={bc}  />
                            {this.showTop()}
                            {this.showImage()}
                            <div className="c-order">
                                <div className="c-post c-wysiwyg">
                                    {this.showContent()}
                                </div>
                                {this.showSourceLinksModule()}

                                <div className="social-bar">
                                    <div className="sb-title">Comparte este artículo en:</div>
                                    <ul className="c-sb-items">
                                        <li className="it-share">
                                            <div className="share-count">{this.totalCount}</div>
                                            <div className="share-desk">shares</div>
                                        </li>
                                        <FacebookShareButton url={shareUrl}>
                                            <li className="it-fb">

                                                <i className="flaticon-facebook-logo" />
                                                <div className="it-desk" >
                                                    <FacebookShareCount url={shareUrl}>
                                                        {shareCount => (<span id="fb-count">{shareCount}</span>)}
                                                    </FacebookShareCount>
                                                </div>
                                            </li>
                                        </FacebookShareButton>

                                        <PinterestShareButton url={shareUrl} media={this.props.blogStore.currPost.image?this.props.blogStore.currPost.image:(typeof window === 'undefined' ? '' : window.location.protocol + "//" + window.location.host + "/images/temp/blog-post.jpg")}>
                                            <li className="it-pr">
                                                <i className="flaticon-pinterest" />
                                                <div className="it-desk">
                                                    <PinterestShareCount url={shareUrl}>
                                                        {shareCount => (<span id="pint-count">{shareCount}</span>)}
                                                    </PinterestShareCount>
                                                </div>
                                            </li>
                                        </PinterestShareButton>
                                    </ul>
                                </div>
                                <Banner3 />
                                <Comments type={"post"} />
                                <div className="offset-bott1">
                                <Title1 isGoLink={false}>Artículos RECOMENDADOS</Title1>
                                    {this.showRecommendedVideos()}
                                </div>
                            </div>
                        </div>
                        <Sidebar categories={true} program={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogPost;
