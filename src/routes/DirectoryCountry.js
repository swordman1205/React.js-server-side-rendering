import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import SidebarDirectory from '../components/SidebarDirectory';
import Title1 from '../components/Title1';
import ServiceRow from '../components/ServiceRow';
import {Link} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/DirectoryCountry.css';
import {inject, observer} from 'mobx-react';

@inject('directoriesStore', 'viewerStore', 'themeStore')
@observer

class DirectoryCountry extends Component {
    constructor(props) {
        super(props);
        this.props.directoriesStore.setCountrySlug(this.props.match.params.countrySlug);
        this.props.directoriesStore.pullCountryCitiesList();
        this.props.directoriesStore.pullCountryInfo();
        this.props.directoriesStore.pullCountryRecentBusinesses();
    }

    showCountryCitiesList(){
        let citylink= `/directorio/local/${this.props.directoriesStore.countrySlug}/`;
        if(this.props.directoriesStore.inProgressCCL){
            return (<div className="spinner" />)
        } else {
            if(this.props.directoriesStore.CountryCitiesList.length) {
                return this.props.directoriesStore.CountryCitiesList.map(item =>
                    <li key={item.id}><Link to={citylink+item.slug}>{item.name}</Link></li>
                );
            }
            else return (
                <div className="no-data">¡La información no existe!</div>
            )
        }
    }

    showCountryRecentBusinesses(){
        if(this.props.directoriesStore.inProgressCoRB){
            return (<div className="spinner" />)
        } else {
            if(this.props.directoriesStore.CountryRecentBusinesses.length) {
                return this.props.directoriesStore.CountryRecentBusinesses.map(item =>
                    <ServiceRow
                        key={item.id}
                        itemUrl={`${this.props.directoriesStore.countrySlug}/${item.city_slug}/${item.category_slug}/${item.id}-${item.biz_slug}`}
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
        if(this.props.directoriesStore.CountryInfo.id) {
            vTitle = this.props.directoriesStore.CountryInfo.name+" tratamientos y remedios naturales  - Nuevas Evas";
            vDescription = "En el directorio saludable de  "+this.props.directoriesStore.CountryInfo.name+"  de Nuevas Evas puedes encontrar restaurantes, tiendas, ferias, hoteles, y centros que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos y ecológicos, amigables con vegetarianos y veganos. ";
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
            <div className="page directory">
                {this.showMetaData()}
                <TopBanner type="small">Directorio Saludable</TopBanner>
                <div className="container blog top1">
                    <div className="row">
                        <div className="col-md-7">
                            <h3 className="h3-8 leftalign"><img className="country-flag" src={this.props.directoriesStore.CountryInfo.flag_image}/> {this.props.directoriesStore.CountryInfo.name}</h3>
                            <p className="p-directory">Selecciona tu categoría de interés para descubrir las actividades, lugares y los servicios saludables, naturales, orgánicos y/o ecológicos en {this.props.directoriesStore.CountryInfo.name}.</p>

                            {/* unit 1 */}
                            <div className="c-module top1 top1m2">
                                <Title1 isGoLink={false}>Selecciona Tu Ciudad</Title1>
                                <ul className="cat-menu2">
                                    {this.showCountryCitiesList()}
                                </ul>
                            </div>

                            {/* unit 2 */}
                            <div className="c-module top2 top1m bott4">
                                <Title1 isGoLink={false}>Recientemente Agregados</Title1>
                                {this.showCountryRecentBusinesses()}
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

export default DirectoryCountry;

