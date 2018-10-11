import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import NewSearchResult from '../components/NewSearchResult';
import Pagination from '../components/Pagination';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/PostsHistory.css';

import {inject, observer} from 'mobx-react';
@inject('userStore', 'discussionStore', 'viewerStore')
@observer

class PostsHistory extends Component {
    constructor(props){
        super(props);
        let userId = this.props.match.params.userId;
        this.props.discussionStore.setUserId(userId);
        let page = this.props.viewerStore.getParameterByName('p');
        this.props.viewerStore.updatePageData(page, "history");
    };

    showPosts(){
        let i = 0;
        return this.props.discussionStore.userPosts.map(item=>
        <li key={i++}>
            <NewSearchResult
                discussion={true}
                title={item.thread_title}
                avatar={item.avatar}
                firstLetter={item.username.charAt(0)}
                date={item.publish_date}
                threadSlug={item.thread_slug}
            >

                {item.short_text}
            </NewSearchResult>
        </li>
        )
    }

    showMetaData(){
        let vTitle = "Historial de usuario";
        let vDescription = "Historial de usuario";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page posts-history">
                {this.showMetaData()}
                <TopBanner type="small">Historial de Posts</TopBanner>
                <div className="container top4 bott3">
                    <Title1 noupper={true} isGoLink={false}>{this.props.discussionStore.userPosts[0]?this.props.discussionStore.userPosts[0].username:''}</Title1>
                    <ul className="c-user-posts">
                        {this.showPosts()}
                    </ul>
                    <Pagination type={"history"}/>
                </div>
            </div>
        )
    }
}
export default PostsHistory;

