import React, {Component} from 'react';
import TopBanner from '../components/TopBanner';
import SidebarDirectory from '../components/SidebarDirectory';
import Comments from '../components/Comments';
import BreadCrumbs from '../components/BreadCrumbs';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/DirectoryPostOnline.css';
import {inject, observer} from 'mobx-react';

@inject('directoriesStore', 'userStore')
@observer

class DirectoryPostOnline extends Component {
    constructor(props) {
        super(props);
        this.props.directoriesStore.setCategorySlug(this.props.match.params.categorySlug);
        let businessSlug = "";
        let businessURL = this.props.match.params.businessSlug;
        if(businessURL!=undefined){
            if (businessURL.indexOf("-") != -1){
                businessSlug = businessURL.substring(1+businessURL.indexOf("-"));
            } else {
                businessSlug = "";
            }
        }
        this.props.directoriesStore.setBusinessSlug(businessSlug);
        this.props.directoriesStore.pullBusiness();
        this.props.directoriesStore.pullCategoryInfo();
    }

    showMetaData(){
        let vTitle = "Nuevas Evas";
        let vDescription = "Nuevas Evas";

        if(this.props.directoriesStore.Business.id) {
            vTitle = this.props.directoriesStore.Business.title+", "+this.props.directoriesStore.CategoryInfo.title+" - Nuevas Evas";
            vDescription = this.props.directoriesStore.Business.meta_description || "Nuevas Evas";
        }

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        let bc=[];
        let category = this.props.directoriesStore.categorySlug;
        let business = this.props.directoriesStore.businessSlug;
        bc.push({"text":"Directorio de Internet", "link":"/directorio"});
        bc.push({"text":`${this.props.directoriesStore.CategoryInfo.title}`, "link":`/directorio/online/${category}`});
        bc.push({"text":`${this.props.directoriesStore.Business.title}`, "link":`/directorio/local/${category}/${business}}`});
        let imgUrl = this.props.directoriesStore.Business.image_url?this.props.directoriesStore.Business.image_url:"/images/no-program.png";
        return (
            <div className="page directory">
                {this.showMetaData()}
                <TopBanner type="small">Directorio Saludable</TopBanner>
                <div className="container blog top1">
                    <div className="row">
                        <div className="col-md-7 directory-post">
                            <BreadCrumbs data={bc}  />
                            <h3 className="h3-8 mob-hide leftalign">{this.props.directoriesStore.Business.title}</h3>
                            <div className="c-dp-top">
                                <ul className="dp-text-unit">
                                    <li>
                                        {this.props.directoriesStore.Business.website?<i className="flaticon-earth blue-icon" />:''}
                                        <a href={this.props.directoriesStore.Business.website} target="_blank">{this.props.directoriesStore.Business.website}</a>
                                    </li>
                                    <li>
                                        {this.props.directoriesStore.Business.facebook_url?<i className="flaticon-facebook-logo blue-icon" />:''}
                                        <a href={`${this.props.directoriesStore.Business.facebook_url}`} target="_blank">{this.props.directoriesStore.Business.facebook_url}</a>
                                    </li>
                                    <li>
                                        {this.props.directoriesStore.Business.phone?<i className="flaticon-phone-receiver green-icon" />:''}
                                        {this.props.directoriesStore.Business.phone}
                                    </li>
                                </ul>
                                <div className="dp-image" style={{backgroundImage: `url(${ imgUrl })`}}></div>
                                <h3 className="h3-dp-mobile desk-hide mob-bott-new1">{this.props.directoriesStore.Business.title}</h3>
                            </div>
                            <p className="dp-mobile-top dp-mobile-bottom" dangerouslySetInnerHTML={{__html: this.props.directoriesStore.Business.text}} />
                            <Comments type="directory"/>
                            <div className="offset-bott1"/>
                        </div>
                        <SidebarDirectory />
                    </div>
                </div>
            </div>
        );
    }
}

export default DirectoryPostOnline;

