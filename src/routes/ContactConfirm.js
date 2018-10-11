import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/ContactConfirm.css';
import {inject, observer} from 'mobx-react';

@inject('contactsStore', 'directoriesStore', 'userStore')
@observer

class ContactConfirm extends Component {

    constructor(props) {
        super(props);

    }

    showMetaData(){
        let vTitle = "Confirmación de contacto";
        let vDescription = "Confirmación de contacto";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }


    render() {
        return (
            <div className="page contact-confirm">
                <TopBanner type="small">Contáctanos</TopBanner>
                {this.showMetaData()}
                <div className="container top1  bott3">
                    <div className="row">
                        <div className="col-md-6">
                           <p>Tu mensaje ha sido enviado con éxito.</p>
                           <p>Gracias por contactarnos, estamos aquí para apoyarte. </p>
                           <p>Te responderemos en un plazo máximo de 48 horas o antes si es posible.  </p>

                            <h4 className="top1 h4-2">Mientras tanto puedes explorar nuestro:</h4>
                            <ul className="cat-menu2">
                                <li ><a href="/blog" className="link1">Blog de Salud</a></li>
                                <li ><a href="/#foro" className="link1">Foro Nuevas Evas</a></li>
                                <li ><a href="/directorio" className="link1">Directorio Saludable</a></li>
                                <li ><a href="https://www.facebook.com/NuevasEvas/" className="link1">Facebook</a></li>
                                <li ><a href="https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA" className="link1">YouTube</a></li>
                            </ul>
                            <a href="/" className="btn3">Ir al home</a>
                        </div>

                        <div className="col-md-6">
                            <div className="alejandra-banner2">
                                <div className="alehandra3" />
                                <div className="ab-logo2" />
                                <div className="ab-border" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactConfirm;
