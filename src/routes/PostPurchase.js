import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Magnifier from '../components/Magnifier';
import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/PostPurchase.css';

class PostPurchase extends Component {
    showMetaData(){
        let vTitle = "Post compra";
        let vDescription = "Post compra";
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
                <TopBanner type="small">¡Felicitaciones, tu compra ha sido exitosa!</TopBanner>
                <div className="container top1 pp">
                    <p>Tu producto ya se encuentra activado en la zona de: Programas.</p>
                    <p>Siempre que te encuentres conectada a tu cuenta, puedes acceder a tu(s) productos, presionando o haciendo click en la palabra PROGRAMAS en tu Menú Superior:</p>
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
                    <Link to="/programas" className="btn1">Ir a Programa & Ver mi producto</Link>
                    <p className="top1">¡Te estamos esperando!</p>
                    <p>Gracias por tu confianza, <br/>
                        Nuevas Evas.</p>
                    <h2 className="h2-1">P.D. ¡Hay un regalo de bienvenida esperándote!</h2>
                    <p>¿Te gustaría recibir un vídeo privado de un Delicioso Postre Saludable?</p>
                    <p>Visita el correo electrónico que usaste para registrarte, busca el mensaje que dice “Confirmación & Regalo” de Nuevas Evas en
                        tu bandeja principal. También puede estar en la bandeja de promociones, spam o de correo no deseado. </p>
                    <div className="c-magnifier"><Magnifier/></div>
                    <p className="pp-p">Abre nuestro mensaje, ahí dentro encontrarás un link de color azul. Dale click o Presiona sobre este link para confirmar tu cuenta
                        y este link automáticamente te llevará a tu vídeo privado y receta de ¡nuestro delicioso postre!</p>
                    <div className="c-mail">
                        <div className="g-mail"><a href="http://gmail.com" className="link3"><img src="/images/gmail-icon.png"/>ir a gmail</a></div>
                        <div className="g-mail"><a href="http://hotmail.com" className="link3"><img src="/images/hotmail-icon.png"/>ir a hotmail</a></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostPurchase;


