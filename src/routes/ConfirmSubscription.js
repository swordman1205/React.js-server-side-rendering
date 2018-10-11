import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Magnifier from '../components/Magnifier';
import MetaTags from 'react-meta-tags';
import { Link } from 'react-router-dom';
import styles from '../styles/routes/ConfirmSubscription.css';

class ConfirmSubscription extends Component {
    showMetaData(){
        let vTitle = "Confirmar suscripcion";
        let vDescription = "Confirmar suscripción de usuario.";

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
                <TopBanner type="small">Confirma tu suscripción y recibe tu Regalo de Bienvenida</TopBanner>
                <div className="container top1 cs">
                    <div className="cs-c-b1">
                        <div className="cs-c-b1-text">
                            <p>¿Te gustaría recibir un vídeo privado de un Delicioso Postre Saludable?</p>
                            <p>Visita el correo electrónico que usaste para registrare, busca el mensaje que dice
                            “Confirmación & Regalo” de Nuevas Evas en tu bandeja principal. También puede estar en la bandeja de promociones, spam o de correo no deseado. </p>
                        </div>
                        <div className="cs-c-b1-img">
                            <div className="add-img2 w-icon">
                                <i className="flaticon-gift"/>
                            </div>
                        </div>
                    </div>

                    <div className="c-magnifier"><Magnifier/></div>

                    <p className="pp-p">Abre nuestro mensaje, ahí dentro encontrarás un link de color azul. Dale click o Presiona sobre este link para confirmar tu cuenta
                        y este link automáticamente te llevará a tu vídeo privado y receta de ¡nuestro delicioso postre!</p>

                    <div className="c-mail">
                        <div className="g-mail"><a href="http://gmail.com" className="link3"><img src="./images/gmail-icon.png"/>ir a gmail</a></div>
                        <div className="g-mail"><a href="http://hotmail.com" className="link3"><img src="./images/hotmail-icon.png"/>ir a hotmail</a></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmSubscription;
