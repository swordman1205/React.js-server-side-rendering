import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import NewSearchResult from '../components/NewSearchResult';
import SearchInput from '../components/SearchInput';
import Pagination from '../components/Pagination';
import MetaTags from 'react-meta-tags';

import styles from '../styles/routes/NewSearch.css';

import {inject, observer} from 'mobx-react';

@inject('userStore', 'discussionStore', 'viewerStore')
@observer

class NewSearch extends Component {
    constructor(props){
        super(props);
        this.props.viewerStore.updatePageData("1", "search");
    }

    showBlogSearchResults(){
        if(this.props.discussionStore.inProgressSearch){
            return (<div className="spinner" />)
        }
        else {
            if (this.props.discussionStore.blogSearchResults.length > 0){
                let i = 0;
                return this.props.discussionStore.blogSearchResults.map(item=>
                    <li key={i++}>
                        <NewSearchResult
                            discussion={false}
                            title={item.title}
                            date={item.publish_date}
                            themeSlug={item.theme_name}
                            postSlug={item.slug}
                            postId={item.id}
                        >
                            {item.short_text}
                        </NewSearchResult>
                    </li>
                )
            }
            else return (
                <div className="no-data">¡La información no existe!</div>
            )
        }
    }

    showDiscussionSearchResults(){
        if(this.props.discussionStore.inProgressSearch){
            return (<div className="spinner" />)
        }
        else {
            if (this.props.discussionStore.discussionSearchResults.length > 0){
            let i = 0;
            return this.props.discussionStore.discussionSearchResults.map(item=>
                <li key={i++}>
                    <NewSearchResult
                        discussion={true}
                        title={item.thread_title}
                        avatar={item.avatar}
                        firstLetter={item.username.charAt(0)}
                        date={item.publish_date}
                        threadSlug={item.thread_slug}
                        threadId={item.id}
                        authorId={item.user_id}
                    >
                        {item.short_text}
                    </NewSearchResult>
                </li>
            )
            }
            else return (
                <div className="no-data">¡La información no existe!</div>
            )
        }
    }

    showMetaData(){
        let vTitle = "";
        let vDescription = "";

        if(this.props.viewerStore.searchVal) {
            vTitle = this.props.viewerStore.searchVal+" - Nuevas Evas";
            vDescription = this.props.viewerStore.searchVal+" buscar en  Nuevas Evas, un sitio web especializado en tratamientos naturales, alimentación saludable, remedios, recetas y consejos de alimentación saludable, además de vídeos y artículos de salud.";
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
            <div className="page n-search">
                {this.showMetaData()}
                <TopBanner type="small">Resultados de Búsqueda</TopBanner>
                <div className="container top4 bott3">
                    <SearchInput/>
                    <Title1 noupper={true} isGoLink={false}>Blog de Tratamientos & Remedios Naturales</Title1>
                    <ul className="search-results-ul">
                       {this.showBlogSearchResults()}
                    </ul>
                    <div className="top4">
                        <Title1 noupper={true} isGoLink={false}>Discusiones de la Comunidad</Title1>
                    </div>
                    <ul className="search-results-ul">
                        {this.showDiscussionSearchResults()}
                    </ul>
                    <Pagination type={"search"}/>
                </div>
            </div>
        )
    }
}
export default NewSearch;
