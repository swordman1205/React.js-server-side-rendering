import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import Magnifier from '../components/Magnifier';
import { Link } from 'react-router-dom';
import styles from '../styles/routes/ConfirmAfterSubscription.css';
import {inject, observer} from 'mobx-react';
import MetaTags from 'react-meta-tags';

@inject('paymentStore')
@observer
class ConfirmAfterSubscription extends Component {

    showMetaData(){
        let vTitle = "Confirmacion despues de susbcripción";
        let vDescription = "Confirmacion despues de susbcripción";

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
                <TopBanner type="small">¡Bienvenida! Ya eres parte de nuestra comunidad.</TopBanner>
                <div className="container top1 cas">
                    <p>Empieza a disfrutar de tu membresía: </p>

                    <ul>
                        <li>
                            <div className="li-line">
                                <div className="circle-num">1</div>
                                <p>Haz tus preguntas a nuestros Especialistas y/o conversa con otras Mujeres</p>
                                <Link to="/#foro" className="btn7 display-desk">Ir al Foro</Link>
                            </div>
                            <Link to="/" className="btn7 display-mob">Ir al Foro</Link>
                        </li>
                        <li>
                            <div className="li-line">
                                <div className="circle-num">2</div>
                                <p>Haz tus preguntas a nuestros Especialistas y/o conversa con otras Mujeres</p>
                                <Link to="/programas" className="btn7 display-desk"><span>ver programas Gratis</span></Link>
                            </div>
                            <Link to="/programas" className="btn7 display-mob"><span>ver programas Gratis</span></Link>
                        </li>
                        <li>
                            <div className="li-line">
                                <div className="circle-num">3</div>
                                <p>Actualízate con conocimiento científico de Alimentación Saludable </p>
                                <Link to="/blog" className="btn7 display-desk">visitar el blog</Link>
                            </div>
                            <Link to="/blog" className="btn7 display-mob">visitar el blog</Link>
                        </li>
                        <li>
                            <div className="li-line">
                                <div className="circle-num">4</div>
                                <p>Suscríbete a nuestro canal de YouTube, conoce a nuestra especialista y Aprende con Vídeos</p>
                                <a href="https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"  target="_blank" className="btn-subscribe display-desk"> <i className="flaticon-youtube"/><div>Subscribe</div></a>
                            </div>
                            <a href="https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"  target="_blank" className="btn-subscribe display-mob-flex"> <i className="flaticon-youtube"/><div>Subscribe</div></a>
                        </li>
                        <li >
                            <div className="li-line">
                                <div className="circle-num">5</div>
                                <p>Dale like a Facebook y ¡recibe nuestras Noticias de Salud!</p>
                                <a href="https://www.facebook.com/NuevasEvas/"  target="_blank" className="btn-like display-desk"><i className="flaticon2-signs"/><div>Like</div></a>
                            </div>
                            <a href="https://www.facebook.com/NuevasEvas/"  target="_blank" className="btn-like display-mob-flex"><i className="flaticon2-signs"/><div>Like</div></a>
                        </li>
                    </ul>


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
                        <div className="g-mail"><a href="http://gmail.com" className="link3"><img src="./images/gmail-icon.png"/>ir a gmail</a></div>
                        <div className="g-mail"><a href="http://hotmail.com" className="link3"><img src="./images/hotmail-icon.png"/>ir a hotmail</a></div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ConfirmAfterSubscription;
