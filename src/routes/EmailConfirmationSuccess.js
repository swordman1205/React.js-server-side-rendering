import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/EmailConfirmationSuccess.css';

class EmailConfirmationSuccess extends Component {
    showMetaData(){
        let vTitle = "Email confirmación exitosa";
        let vDescription = "Email confirmación exitosa";

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
                <TopBanner type="small">¡Tu Regalo de Bienvenida está Listo!</TopBanner>
                <div className="container top1 ecs">
                    <p>Gracias por confirmar tu e-mail.</p>
                    <p>Tu Regalo de Bienvenida ya se encuentra activado en la zona de: Programas.</p>
                    <p>Siempre que te encuentres conectada a tu cuenta puedes acceder a tu regalo, presionando o haciendo click en la palabra
                        PROGRAMAS en tu Menú Superior:</p>
                    <div className="menu-img-w mob-hide">
                        <div className="menu-img">
                            <div className="selector">
                                <div className="left-arr"></div>
                                <div className="right-arr"></div>
                            </div>
                        </div>
                    </div>
                    <div className="menu-mob-img desk-hide">
                        <div className="selector-mob">
                            <div className="left-arr-mob"></div>
                            <div className="right-arr-mob"></div>
                        </div>
                    </div>
                    <Link to="/programas" className="btn1">Ir a Programa & Ver mi Regalo</Link>
                    <p className="top1">¡Eres oficialmente parte de nuestra comunidad!</p>
                    <p>Gracias por tu confianza, <br/>
                        Nuevas Evas.</p>
                </div>
            </div>
        );
    }
}

export default EmailConfirmationSuccess;



