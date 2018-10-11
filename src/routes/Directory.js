import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import {Link} from 'react-router-dom';
import styles from '../styles/routes/Directory.css';
import {inject, observer} from 'mobx-react';
import MetaTags from 'react-meta-tags';

@inject('directoriesStore')
@observer

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            showCityListDiv: false
        });
        this.props.directoriesStore.setCategoriesListOnline(true);
        this.props.directoriesStore.pullSearchCityList();
        this.props.directoriesStore.pullCountriesList();
        this.props.directoriesStore.pullSuggestedCities();
        this.props.directoriesStore.pullDirectoryCategoriesList();

    }

    handleSearchCityChange = e => {
        this.props.directoriesStore.setSearchField(e.target.value);
        this.props.directoriesStore.pullSearchCityList();
        this.setState({showCityListDiv: true});


    };

    showSearchCityList(){
        return this.props.directoriesStore.SearchCityList.map(item =>
            <Link key={item.id} to={`/directorio/local/${item.country_slug}/${item.city_slug}`}>{item.name}</Link>
        );
    }

    showCityList() {
        if ((this.props.directoriesStore.SearchCityList.length > 0) && (this.props.directoriesStore.searchField.length > 0)){
            return (
                <div id="cl-div" className={(this.state.showCityListDiv)?"city-list":"no-dislay-cl"}>{this.showSearchCityList()}</div>
            )
        }
        else return null
    }

    showCountriesList(){
        if(this.props.directoriesStore.inProgressCL){
            return (<div className="spinner" />)
        }
        else {
            if(this.props.directoriesStore.CountriesList.length){
                return this.props.directoriesStore.CountriesList.map(item =>
                    <li key={item.id} className="col-lg-6"><Link to={`directorio/local/${item.slug}`}><img src={item.flag_image}/> {item.name}</Link></li>
                );
            }
            else {
                return (
                    <div className="no-data">¡La información no existe!</div>
                )
            }
        }
    }

    showSuggestedCities(){
        if(this.props.directoriesStore.inProgressSCi){
            return (<div className="spinner" />)
        }
        else {
            if(this.props.directoriesStore.SuggestedCities.length){
                return this.props.directoriesStore.SuggestedCities.map(item =>
                    <li key={item.id} className="col-lg-6"><a href={`directorio/local/${item.country_slug}/${item.city_slug}`}>{item.name}</a></li>
                );
            }
            else {
                return (
                    <div className="no-data">¡La información no existe!</div>
                )
            }
        }
    }

    showDirectoryCategoriesList(){
        if(this.props.directoriesStore.inProgressDCL){
            return (<div className="spinner" />)
        }
        else {
            if(this.props.directoriesStore.DirectoryCategoriesList.length){
                return this.props.directoriesStore.DirectoryCategoriesList.map(item =>
                    <li key={item.id}><Link to={`directorio/online/${item.slug}`}>{item.name}</Link></li>
                );
            }
            else {
                return (
                    <div className="no-data">¡La información no existe!</div>
                )
            }
        }
    }

    showMetaData(){
        let vTitle = "Directorio Saludable - Nuevas Evas";
        let vDescription = "En el directorio saludable de Nuevas Evas puedes encontrar locales físicos y sitios web de habla hispana que ofrecen productos, actividades y servicios que son saludables, naturales, orgánicos y ecológicos. Restaurantes saludables, tiendas online, ferias orgánicas, centros de terapias y más.";

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page" >
                {this.showMetaData()}
                <TopBanner type="small">Directorio Saludable</TopBanner>
                <div className="container" onClick={()=>this.setState({showCityListDiv: false})}>
                    <div className="my-row top-blog">
                        <div className="left50">
                            <h2 className="h2-direct d2">
                                <i className="flaticon-pin" /> Directorio Local
                            </h2>
                            <p className="p1">
                                Locales físicos en tu ciudad ofreciendo productos, actividades o
                                servicios que son saludables, naturales, orgánicos y/o ecológicos.
                            </p>
                            <p className="p1 d-top1">
                                Busca tu país o ciudad para ver las categorías disponibles cerca a ti.
                            </p>
                            <div className="d-search-title">
                                Busca en tu ciudad
                            </div>
                            <div className="c-search-d">
                                <input
                                    onChange={this.handleSearchCityChange}
                                    className="search-input-d"
                                    type="text"
                                    placeholder="Escribe el nombre de tu ciudad"
                                />
                                <a className="btn-search-d" href="#">
                                    <i className="i-search-d flaticon-magnifying-glass-browser" />
                                </a>
                                {this.showCityList()}
                            </div>


                            <div className="c-module top1 top-n1">
                                <Title1 isGoLink={false}>países Sugeridos</Title1>

                                <ul className="row cat-menu-location">
                                    {this.showCountriesList()}
                                </ul>
                                <Title1 isGoLink={false}>CIudades Sugeridas</Title1>
                                <ul className="row ul-direct-mob cat-menu2">
                                    {this.showSuggestedCities()}
                                </ul>
                            </div>
                        </div>


                        <div className="right50">
                            <h2 className="h2-direct">
                                <i className="flaticon-globe" /> Directorio de Internet
                            </h2>
                            <p className="p1">
                                Tiendas y marcas en internet que ofrecen productos saludables,
                                naturales, orgánicos y/o ecológicos a países de habla hispana (América Latina y España).
                            </p>
                            <p className="p1 d-top1">
                                Selecciona una categoría de tu interés para empezar.
                            </p>
                            <div className="top1">
                                <Title1 isGoLink={false} >Categorías</Title1>
                                <ul className="cat-menu2">
                                    {this.showDirectoryCategoriesList()}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="c-direct-bottom">
                        <h3 className="h3-direct">Inscríbete en el Directorio</h3>
                        <p className="p1 text-center">
                            Para inscribirte en el directorio, debes enviarnos un mensaje a través de nuestro Formulario de Contacto. Indicando el nombre de tu empresa, el servicio o producto que brindas, tu página web y/o página de Facebook, un correo de contacto y un número de whatsapp al cual podemos contactarte.
                        </p>
                        <div className="c-btn-direct">
                            <a href="/contacto" className="btn1 btn-direct fs-14">Acceder al Formulario de Contacto</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Directory;
