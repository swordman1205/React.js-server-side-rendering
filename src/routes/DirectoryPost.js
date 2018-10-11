import React, {Component} from 'react';
import TopBanner from '../components/TopBanner';
import SidebarDirectory from '../components/SidebarDirectory';
import Comments from '../components/Comments';
import BreadCrumbs from '../components/BreadCrumbs';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/DirectoryPost.css';
import {inject, observer} from 'mobx-react';

@inject('directoriesStore', 'userStore')
@observer


class DirectoryPost extends Component {
    constructor(props) {
        super(props);
        this.props.directoriesStore.setCountrySlug(this.props.match.params.countrySlug);
        this.props.directoriesStore.setCitySlug(this.props.match.params.citySlug);
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
        this.props.directoriesStore.pullCityInfo();
        this.props.directoriesStore.pullCountryInfo();
        this.props.directoriesStore.pullCategoryInfo();
        this.props.directoriesStore.pullBusiness();
    }

    showMetaData(){
        let vTitle = "Nuevas Evas";
        let vDescription = "Nuevas Evas";

        if(this.props.directoriesStore.Business.id) {
            vTitle = this.props.directoriesStore.Business.title+", "+this.props.directoriesStore.CategoryInfo.title+", "+this.props.directoriesStore.CityInfo.name+" - "+this.props.directoriesStore.CountryInfo.name+" - Nuevas Evas";
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
        let country = this.props.directoriesStore.countrySlug;
        let city = this.props.directoriesStore.citySlug;
        let category = this.props.directoriesStore.categorySlug;
        let business = this.props.directoriesStore.businessSlug;
        bc.push({"text":"Directorio Local", "link":"/directorio"});
        bc.push({"text":`${this.props.directoriesStore.CityInfo.name}`, "link":`/directorio/local/${country}/${city}`});
        bc.push({"text":`${this.props.directoriesStore.CategoryInfo.title}`, "link":`/directorio/local/${country}/${city}/${category}`});
        bc.push({"text":`${this.props.directoriesStore.Business.title}`, "link":`/directorio/local/${country}/${city}/${category}/${business}}`});
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
                                        {this.props.directoriesStore.Business.address?<i className="flaticon-pin blue-icon" />:''}
                                        <a href={"https://www.google.com/maps/search/"+this.props.directoriesStore.Business.address} target="_blank">{this.props.directoriesStore.Business.address}</a>
                                    </li>
                                    <li>
                                        {this.props.directoriesStore.Business.work_time?<i className="flaticon-clock-circular-outline green-icon" />:''}
                                        {this.props.directoriesStore.Business.work_time}
                                    </li>
                                    <li>
                                        {this.props.directoriesStore.Business.facebook_url?<i className="flaticon-facebook-logo blue-icon" />:''}
                                        <a href={this.props.directoriesStore.Business.facebook_url} target="_blank">{this.props.directoriesStore.Business.facebook_url}</a>
                                    </li>
                                    <li>
                                        {this.props.directoriesStore.Business.phone?<i className="flaticon-phone-receiver green-icon" />:''}
                                        {this.props.directoriesStore.Business.phone}
                                    </li>
                                </ul>
                                <div className="dp-image" style={{backgroundImage: `url(${ imgUrl })`}}></div>
                                <h3 className="h3-dp-mobile desk-hide">{this.props.directoriesStore.Business.title}</h3>
                            </div>
                            <p className="dp-mobile-top dp-mobile-bottom" dangerouslySetInnerHTML={{__html: this.props.directoriesStore.Business.text ? this.props.directoriesStore.Business.text : ""}} />
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

export default DirectoryPost;
