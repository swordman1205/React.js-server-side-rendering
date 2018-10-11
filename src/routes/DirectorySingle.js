import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import SidebarDirectory from '../components/SidebarDirectory';
import Title1 from '../components/Title1';
import ServiceRow from '../components/ServiceRow';
import {Link} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/DirectorySingle.css';
import {inject, observer} from 'mobx-react';

@inject('directoriesStore', 'viewerStore')
@observer

class DirectorySingle extends Component {
    constructor(props) {
        super(props);
        this.props.directoriesStore.setCountrySlug(this.props.match.params.countrySlug);
        this.props.directoriesStore.setCitySlug(this.props.match.params.citySlug);
        this.props.directoriesStore.setCategoriesListOnline(false);

        this.props.directoriesStore.pullCountryInfo();
        this.props.directoriesStore.pullCityInfo();
        this.props.directoriesStore.pullCityRecentBusinesses();
        this.props.directoriesStore.pullDirectoryCategoriesList();
    }

    showCategoriesList(){
        if(this.props.directoriesStore.inProgressCatL){
            return (<div className="spinner" />)
        } else {
            if(this.props.directoriesStore.DirectoryCategoriesList.length) {
                return this.props.directoriesStore.DirectoryCategoriesList.map(item =>
                    <li key={item.id}><Link to={`${this.props.directoriesStore.citySlug}/${item.slug}`}>{item.name}</Link></li>
                );
        }

    }}

    showCityRecentBusinesses(){
        if(this.props.directoriesStore.inProgressCiRB){
            return (<div className="spinner" />)
        }
        else {
            if(this.props.directoriesStore.CityRecentBusinesses.length) {
                return this.props.directoriesStore.CityRecentBusinesses.map(item =>
                    <ServiceRow
                        key={item.id}
                        itemUrl={`${this.props.directoriesStore.citySlug}/${item.category_slug}/${item.id}-${item.biz_slug}`}
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
        if(this.props.directoriesStore.CityInfo.id) {
            vTitle = this.props.directoriesStore.CityInfo.name+", "+this.props.directoriesStore.CountryInfo.name+" - Directorio Saludable - Nuevas Evas";
            vDescription = "En el directorio saludable de "+this.props.directoriesStore.CityInfo.name+", "+this.props.directoriesStore.CountryInfo.name+" de Nuevas Evas puedes encontrar restaurantes, tiendas, ferias, hoteles, y centros que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos, ecológicos, amigables con vegetarianos y veganos. ";
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
            <div className="page directory directory-single">
                {this.showMetaData()}
                <TopBanner type="small">Directorio Saludable</TopBanner>
                <div className="container blog top1">
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className="h3-8 leftalign"><img className="country-flag" src={this.props.directoriesStore.CountryInfo.flag_image}/> {this.props.directoriesStore.CountryInfo.name}: {this.props.directoriesStore.CityInfo.name}</h3>
                            <p className="p-directory">Selecciona tu categoría de interés para descubrir las actividades, lugares y los servicios saludables, naturales, orgánicos y/o ecológicos en {this.props.directoriesStore.CityInfo.name}.</p>

                            {/* unit 1 */}
                            <div className="c-module top1 top1m2">
                                <Title1 isGoLink={false}>Categorías</Title1>

                                <ul className="cat-menu2">
                                    {this.showCategoriesList()}
                                </ul>

                            </div>

                            {/* unit 2 */}
                            <div className="c-module top2 top1m bott4">
                                <Title1 isGoLink={false}>Recientemente Agregados</Title1>

                                {this.showCityRecentBusinesses()}

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

export default DirectorySingle;
