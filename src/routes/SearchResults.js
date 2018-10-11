import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import Golink from '../components/Golink';
import {Link} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/SearchResults.css';

class SearchResults extends Component {
    showMetaData(){
        let vTitle = "Resultados de búsqueda";
        let vDescription = "Resultados de búsqueda";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page search-results">
                {this.showMetaData()}
                <TopBanner type="small">Resultados de Búsqueda</TopBanner>
                <div className="container top1 bott3">
                    <Title1 isGoLink={false}>Blog de Tratamientos & Remedios Naturales</Title1>
                    <Link to="#"><h4 className="top4">7 Super Alimentos Para Reducir el ARDOR en tus Articulaciones</h4></Link>
                    <Link to="#"><p>Trabaja directamente con nuestra especialista y un <span className="color1">Programa</span> Personalizado ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum sapien vitaemuio ornare accumsan. Cras condimentum libero sem, at pharetra quam aliquam in um massa urna, laoreet ac imperdiet id, ullamcorper id eros quod aliquamun... <Golink chref="#" size="gl2" className="show-mob">Ver más</Golink></p></Link>
                    <Link to="#"><h4 className="top4">Super <span className="color1">Programa</span> para reducir el ardor en los manos</h4></Link>
                    <Link to="#"><p>Trabaja directamente con nuestra especialista y un <span className="color1">Programa</span> ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum sapien vitaemuio ornare estiam accumsan. Cras condimentum libero sem, at pharetra quam aliquam in um massa urna, laoreet ac <span className="color1">Programa</span> id, ullamcorper id eros quod aliquamun... <Golink chref="#" size="gl2" className="show-mob">Ver más</Golink></p></Link>
                    <Link to="#"><h4 className="top4">7 Super Alimentos Para Reducir el ARDOR en tus Articulaciones</h4></Link>
                    <Link to="#"><p>Trabaja directamente con nuestra especialista y un <span className="color1">Programa</span> Personalizado ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum sapien vitaemuio ornare accumsan. Cras condimentum libero sem, at pharetra quam aliquam in um massa urna, laoreet ac imperdiet id, ullamcorper id eros quod aliquamun... <Golink chref="#" size="gl2" className="show-mob">Ver más</Golink></p></Link>
                    <Link to="#"><h4 className="top4">Super <span className="color1">Programa</span> para reducir el ardor en los manos</h4></Link>
                    <Link to="#"><p>Trabaja directamente con nuestra especialista y un <span className="color1">Programa</span> ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum sapien vitaemuio ornare estiam accumsan. Cras condimentum libero sem, at pharetra quam aliquam in um massa urna, laoreet ac <span className="color1">Programa</span> id, ullamcorper id eros quod aliquamun... <Golink chref="#" size="gl2" className="show-mob">Ver más</Golink></p></Link>
                    <Link to="#"><h4 className="top4">7 Super Alimentos Para Reducir el ARDOR en tus Articulaciones</h4></Link>
                    <Link to="#"><p>Trabaja directamente con nuestra especialista y un <span className="color1">Programa</span> Personalizado ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum sapien vitaemuio ornare accumsan. Cras condimentum libero sem, at pharetra quam aliquam in um massa urna, laoreet ac imperdiet id, ullamcorper id eros quod aliquamun... <Golink chref="#" size="gl2" className="show-mob">Ver más</Golink></p></Link>
                    <Link to="#"><h4 className="top4">Super <span className="color1">Programa</span> para reducir el ardor en los manos</h4></Link>
                    <Link to="#"><p>Trabaja directamente con nuestra especialista y un <span className="color1">Programa</span> ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum sapien vitaemuio ornare estiam accumsan. Cras condimentum libero sem, at pharetra quam aliquam in um massa urna, laoreet ac <span className="color1">Programa</span> id, ullamcorper id eros quod aliquamun... <Golink chref="#" size="gl2" className="show-mob">Ver más</Golink></p></Link>

                </div>
            </div>
        )
    }
}
export default SearchResults;