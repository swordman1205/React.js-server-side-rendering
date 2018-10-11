import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import SidebarDirectory from '../components/SidebarDirectory';
import Pagination from '../components/Pagination';
import Title1 from '../components/Title1';
import ServiceRow from '../components/ServiceRow';
import MetaTags from 'react-meta-tags';

import styles from '../styles/routes/DirectoryCategory.css';
import {inject, observer} from 'mobx-react';

@inject('directoriesStore', 'viewerStore')
@observer

class DirectoryCategory extends Component {

    constructor(props) {
        super(props);
        this.props.directoriesStore.setCountrySlug(this.props.match.params.countrySlug);
        this.props.directoriesStore.setCitySlug(this.props.match.params.citySlug);
        this.props.directoriesStore.setCategorySlug(this.props.match.params.categorySlug);
        this.props.directoriesStore.setDirectoryIsOnline(false);
        let page = this.props.viewerStore.getParameterByName('p');
        this.props.viewerStore.updatePageData(page, "directory");
        this.props.directoriesStore.pullCountryInfo();
        this.props.directoriesStore.pullCityInfo();
        this.props.directoriesStore.pullCategoryInfo();
        this.props.directoriesStore.pullBusinessesList();
    }

    showBusinesses(){
        if(this.props.directoriesStore.inProgressBL){
            return (<div className="spinner" />)
        } else {
            if (this.props.directoriesStore.BusinessesList.length){
                let i=0;

                return this.props.directoriesStore.BusinessesList.map(item =>
                    <ServiceRow
                        key={i++}
                        itemUrl={`/directorio/local/${this.props.directoriesStore.countrySlug}/${this.props.directoriesStore.citySlug}/${this.props.directoriesStore.categorySlug}/${item.id}-${item.slug}`}
                        imageUrl={item.image_url ? item.image_url : "/images/no-program.png"}
                        title={item.title}
                        text={item.short_text}
                        address={item.address}
                        social={false}
                    />
                )
            }
            else return (
                <div className="no-data">¡La información no existe!</div>
            )

        }
    }

    showMetaData(){
        let vTitle = "Nuevas Evas";
        let vDescription = "Nuevas Evas";

        if(this.props.directoriesStore.CategoryInfo.id) {
            vTitle = this.props.directoriesStore.CategoryInfo.title+", "+this.props.directoriesStore.CityInfo.name+", "+this.props.directoriesStore.CountryInfo.name+" - Directorio Saludable - Nuevas Evas";
            vDescription = "En el directorio saludable de "+this.props.directoriesStore.CityInfo.name+", "+this.props.directoriesStore.CountryInfo.name+" de Nuevas Evas puedes encontrar "+this.props.directoriesStore.CategoryInfo.title+" que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos, ecológicos, amigables con vegetarianos y veganos.";
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
            <div className="page directory directory-category">
                {this.showMetaData()}
                <TopBanner type="small">Directorio Saludable</TopBanner>
                <div className="container blog top1">
                    <div className="row">
                        <div className="col-md-7">

                            {/* unit 2 */}
                            <div className="c-module top2 top1m">
                                <Title1 noupper={true} isGoLink={false}><img className="country-flag" src={this.props.directoriesStore.CountryInfo.flag_image}/> {this.props.directoriesStore.CategoryInfo.title}: {this.props.directoriesStore.CityInfo.name}</Title1>

                                {this.showBusinesses()}

                                <div className="top1"><Pagination type={"directory"}  /></div>

                                <div className="directory-add">
                                    <a href="/contacto" className="btn6">Inscribirme en el Directorio</a>
                                </div>
                            </div>
                        </div>
                        <SidebarDirectory />
                    </div>
                </div>
            </div>
        );
    }
}

export default DirectoryCategory;


