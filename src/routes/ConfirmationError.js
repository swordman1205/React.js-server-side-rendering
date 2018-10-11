import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import {Link} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/ConfirmationError.css';

class ConfirmationError extends Component {
    showMetaData(){
        let vTitle = "Error de confirmación";
        let vDescription = "Error de confirmación";

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }
    render() {
        return (
            <div className="page">
                {this.showMetaData()}
                <TopBanner type="small">Ha ocurrido un error</TopBanner>
                <div className="container conf-err">
                    <i className="flaticon-cancel" />
                    <div>
                        <p>Lo sentimos, el link que has recibido está roto.</p>
                        <p>Escríbenos a <Link to="#" className="link2">comunidad@nuevasevas.com</Link> para completar tu registro o mándanos un mensaje a través del área de <Link to="/contact" className="link2"> Contacto</Link> para resolver este problema.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmationError;


