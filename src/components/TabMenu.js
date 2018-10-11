import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/TabMenu.css';
@inject('viewerStore', 'themeStore', 'blogStore', 'programStore')
@observer
class TabMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            homeMemberDD: false
        };
    }

    componentDidMount () {
        this.props.themeStore.pullThemesList();
        this.props.themeStore.pullThemesListForo();
        this.props.themeStore.pullSubThemesList(this.props.themeStore.currentTheme);

        // for all
        this.props.blogStore.pullRecentArticles();
        this.props.blogStore.pullRecentReceipts();
        this.props.programStore.pullProgram();
        this.props.blogStore.pullRecentVideos();
        this.props.themeStore.pullFAQ();
        this.props.themeStore.pullStories();
        this.props.themeStore.pullTopBanner();

        // for visitor
        const token = this.props.viewerStore.token || window.localStorage.getItem('jwt');
        if (!token){
            this.props.themeStore.pullGreetingBanner();
            this.props.themeStore.pullBubbleBanner();
        } else {
            // for member
            this.props.themeStore.pullMemberBanner();
        }
    }

    handleTabClick = (slug, name) => {
        return e => {
            this.setState({homeMemberDD: false});
            this.props.viewerStore.setHomePageData(slug, name);
        }
    };

    showTabs(){
        return this.props.themeStore.ThemesList.map(item =>
            <li key={item.id}>
                <Link
                    className={this.props.themeStore.currentTheme==item.slug?"activeTab":""}
                    onClick={this.handleTabClick(item.slug, item.name)}
                    to={"/"+item.slug}>{item.name} <i className="flaticon-arrow-pointing-to-right"/>
                </Link>
            </li>
        );
    }

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass2(param);
    };

    hideHomeMemberDD(){
        this.setState({homeMemberDD: false});
        this.bodyClass(false)
    };

    homeMemberDD() {
        if(this.state.homeMemberDD) {
            this.bodyClass(true);
            return (
                <div className="dd-cover" onClick={(e)=>{this.hideHomeMemberDD()}}>
                    <div className="home-member-dd" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close2">
                            <span onClick={()=>{this.hideHomeMemberDD()}}
                                  className="flaticon-cancel btn-close3"/>
                        </div>
                        <ul className="popup-mob-menu">
                            {this.showTabs()}
                        </ul>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="w-tab-menu">
                <div className="c-tab-menu">
                    <ul className="tab-menu">
                        {this.showTabs()}
                    </ul>
                    <div onClick={()=>{this.setState({homeMemberDD: true})}} className="mob-select">
                        <div className="tab-select">
                            {this.props.themeStore.currentTheme!=""?this.props.themeStore.currentThemeName:'Selecciona tu enfermedad'}
                            <i className="flaticon-arrows i-sel"/>
                        </div>
                    </div>
                </div>
                {this.homeMemberDD()}
            </div>
        );
    }
}

export default TabMenu;
