import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Magnifier from '../components/Magnifier';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/EmailConfirmation.css';

class EmailConfirmation extends Component {
    constructor(props){
        super(props);
        this.state = ({
            emailConf: true
        });
    }

    showMetaData(){
        let vTitle = "Email de confirmación";
        let vDescription = "Email de confirmación";

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
                <TopBanner type="small">{this.state.emailConf?'¡Ya casí eres un miembro! Completa tu registro.':'¡Sólo falta 1 paso! Completa tu registro para recibir acceso a tu producto.'}</TopBanner>
                <div className="container top1 e-conf">
                    <h3 className="h3-1">Último Paso</h3>
                    <p>Visita el correo electrónico que usaste para registrarte, busca el mensaje de Nuevas Evas en tu bandeja principal.
                        También puede estar en la bandeja de promociones, spam o correo no deseado.</p>

                    <Magnifier/>

                    <p className="mob-p2">Abre nuestro mensaje, ahí dentro encontrarás un link de color azul. Dale click o Presiona sobre este link para
                        confirmar y activar tu cuenta.</p>

                    <div className="c-mail">
                        <div className="g-mail"><a href="http://gmail.com" className="link3"><img src="./images/gmail-icon.png"/>ir a gmail</a></div>
                        <div className="g-mail"><a href="http://hotmail.com" className="link3"><img src="./images/hotmail-icon.png"/>ir a hotmail</a></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmailConfirmation;
