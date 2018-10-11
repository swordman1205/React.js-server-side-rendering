import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Gobutton from '../components/Gobutton';
import ReviewItem from '../components/ReviewItem';
import MetaTags from 'react-meta-tags';
import { ShareButtons } from 'react-share';

import styles from '../styles/routes/NuevasVisitor.css';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'themeStore')
@observer

class NuevasVisitor extends Component {
    constructor(props) {
        super(props);
        this.props.themeStore.pullThemesList();
        this.props.themeStore.pullTestimonials();
    }

    showThemesList(colNumber){
        let buf = [];
        if(this.props.themeStore.ThemesList.length) {
            let count = 0;
            let start = 0;
            if (colNumber==1){
                count = Math.ceil(this.props.themeStore.ThemesList.length/2);
            } else {
                count = Math.floor(this.props.themeStore.ThemesList.length);
                start = Math.ceil(this.props.themeStore.ThemesList.length/2);
            }
            for(let i=start; i<count; ++i){
                buf.push(<li key={this.props.themeStore.ThemesList[i].id}><Link to={`/${this.props.themeStore.ThemesList[i].slug}`} className="link1 col-lg-6 b6-col1">{this.props.themeStore.ThemesList[i].name}</Link></li>);
            }
           return buf;
        }
        else return null
    }

    showStories(){
        if(this.props.themeStore.testimonialsList.length > 0){
            return this.props.themeStore.testimonialsList.map(item =>
                <ReviewItem
                    key={item.id}
                    imageUrl={item.image?item.image:"./images/temp/u1.png"}
                    userName={item.username}
                    text={item.content}
                />
            );
        } else {
            return (
                <div className="no-data">¡La información no existe!</div>
            );
        }
    }

    showRegisterBtn(){
        if(!this.props.viewerStore.token) {
            return (
                <div className="text-center s-top2 visitor-button-1">
                    <Gobutton
                        chref={this.props.viewerStore.registerPage}
                        type={"link"}
                        minWidth="360px"
                        click={()=>this.props.viewerStore.setRegisterPopup(true)}
                        prevent={true}
                    >Únete a Nuestra Comunidad
                    </Gobutton>
                </div>
            )
        }
        else return null
    }

    showCuText(){
        const {
            FacebookShareButton,
            TwitterShareButton,
            WhatsappShareButton,
            PinterestShareButton
        } = ShareButtons;
        let newURL = typeof window === 'undefined' ? '' : window.location.protocol + "//" + window.location.host + "/las-nuevas-evas";

        if(!this.props.viewerStore.token){
            return (<h3 className="h3-5">Aprende a Utilizar tus Alimentos como <span className="under-text">Medicina</span>.</h3>)
        }
        else {
            return (
                <div>
                <h3 className="h3-5">¿Te gusta nuestra historia? ¡Compártela, más mujeres <span className="under-text">necesitan enterarse</span>!</h3>
                    <div className="c-social-icons2">
                        <div>Compartir en:</div>
                        <ul className="social-icons2">
                            <li>
                                <FacebookShareButton className={"flaticon-facebook-logo"} url={newURL} />
                            </li>
                            <li>
                                <TwitterShareButton className="flaticon-twitter-logo-silhouette" url={newURL} />
                            </li>
                            <li>
                                <WhatsappShareButton className="flaticon-whatsapp-logo" url={newURL} title="nuevas evas" />
                            </li>
                            <li>
                                <PinterestShareButton className="flaticon-pinterest" url={newURL} media={"https://nuevas-evas.clevercrew.io/foro/styles/flatawesomeplus/xenforo/logo.png"} description={"LAS NUEVAS EVAS"} />
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    showMetaData(){
        let vTitle = "Quiénes somos - Nuevas Evas";
        let vDescription = "Somos una comunidad de mujeres donde aprenderás a utilizar tus alimentos como medicina y liberarte de tus enfermedades. Conoce nuestra historia y cómo podemos ayudarte.";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page about">
                {this.showMetaData()}
                <div className="container top1">
                    <div className="c-nv-banner1">
                        <h2>“Que <span className="under-text">tu medicina</span> sea tu alimento y el alimento <span className="under-text">tu medicina</span>.”</h2>
                    </div>
                    <div>
                        <h3 className="light-text marg-new2">Esto lo sabía tu abuela e ¡Hipócrates!</h3>
                    </div>
                    <div className="c-block prl-20-small">
                        <div className="c-img">
                            <img src="./images/v1.png"/>
                        </div>
                        <div className="c-text c4">
                            <p className="lh1">
                                En el pasado, las mujeres sabíamos cómo utilizar nuestro alimento para curar nuestro cuerpo, pasábamos este
                                conocimiento de mujer a mujer de generación en
                                generación.
                            </p>
                        </div>
                    </div>

                    <div className="c-b2">
                        <h3 className="light-text">Con el pasar de los años ...</h3>
                        <p className="p-small lh1 marg-new1">Este rol ha quedado en otras manos y este conocimiento se ha perdido.</p>
                    </div>

                    <div className="c-b3">
                        <h3 className="light-text top3 marg-new3">¿El resultado?</h3>
                    </div>

                    <div className="c-block c-block-align">
                        <div className="c-text">
                            <ul className="nv-list">
                                <li className="nv-list-item">
                                    <i className="flaticon-cancel-button nv-icon" />
                                    <p className="p-small2">
                                        Millones de mujeres sufren de enfermedades relacionadas con su alimentación, cargando con malestares y dolores. Sin saber qué hacer para sanar.
                                    </p>
                                </li>
                                <li className="nv-list-item">
                                    <i className="flaticon-cancel-button nv-icon" />
                                    <p className="p-small2">
                                        Muchas mujeres confiesan que se sienten perdidas cuando se trata de nutrición y no conocen hasta qué punto, sus comidas pueden mejorar o empeorar su salud.
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="c-img image-fix1">
                            <img className="img-v2" src="./images/v2.png"/>
                        </div>

                    </div>
                    <div className="c-b3">
                        <h3 className="light-text top3">Es tiempo de recuperar el control</h3>
                    </div>
                    <div className="c-block marg11">

                        <div className="c-img">
                            <img className="img-v3" src="./images/v3.png"/>
                        </div>
                        <div className="c-text c4">
                            <ul className="nv-list">
                                <li className="nv-list-item">
                                    <i className="flaticon-sad nv-icon nv-icon2" />
                                    <p className="p-small2">
                                        Sabemos que los medicamentos ya no son suficientes y que tarde o temprano le cobran una factura muy alta a nuestro cuerpo.
                                    </p>
                                </li>
                                <li className="nv-list-item">
                                    <i className="flaticon-sad nv-icon nv-icon2" />
                                    <p className="p-small2">
                                        Hoy, que la mujer empieza a tener una voz en el mundo, es nuestra misión unirnos para practicar y difundir que ¨el alimento es nuestra MEJOR medicina¨.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="c-b4">
                        <div className="w-b4 w-b4-n">
                        <div className="c-block ">
                            <div className="c-img">
                                <img className="img-v4" src="./images/v4.png"/>
                            </div>
                            <div className="c-text ">
                                <div className="c-text-h2"><h2 className="h2-1">Así se fundó Nuevas Evas</h2></div>
                                <p className="p-big">
                                    Somos una Comunidad de Mujeres donde aprenderás a Utilizar tus Alimentos como Medicina para curar tus
                                    enfermedades y compartir este conocimientos con las personas que amas.
                                </p>

                            </div>
                        </div>

                        <div className="c-block c-block-m">
                            <div className="c-text c-text-m c-text-n1">
                                <p className="b4-p1 b4-p1-n">
                                    “Mi misión es enseñarte a usar tus alimentos inteligentemente para que seas
                                    autosuficiente, para que puedas sanar tu propio cuerpo y dejar de depender
                                    de medicamentos.
                                </p>
                                <p className="b4-p2 b4-p1-n">
                                    Quiero que seas una mujer con un mensaje valioso para compartir, que tenga
                                    un impacto positivo e inspirador en todos aquellos que te rodean.”
                                </p>
                                <p className="b4-sign b4-sign-n">
                                    Alejandra Abarca,<br/>
                                    Fundadora Nuevas Evas y<br/>
                                    Experta de Alimentación Saludable.<br/>
                                </p>
                                <div className="p-bg"/>
                            </div>

                            <div className="b4-c-img-2">
                                <div className="b4-w-img-2">
                                    <img className="img-4"  src="./images/4.png"/>
                                    <img className="img-4m"  src="./images/4m.png"/>
                                </div>
                                <div className="c-logo">
                                    <div className="c-logo-row">
                                        <img className="nv-logo logo1"  src="./images/logo-graff.png"/>
                                        <img className="nv-logo logo2" src="./images/logo-melbourne.png"/>
                                        <img className="nv-logo logo3" src="./images/logo-cocina.png"/>
                                    </div>
                                    <p className="col-md-12 p-xsmall">Graduada en The University of Melbourne, Australia, The Graff Academy of Health Science, Estados Unidos. Master Escuela de Cocina Vegetariana de AM, España.</p>
                                </div>
                            </div>
                            </div>

                        </div>

                    </div>

                    <div className="c4">
                        <div className="container">
                            <div className="row top1 top1m">
                                <div className="col-lg-6 border-right">
                                    <h3 className="c4-h2 upper">
                                        <i className="flaticon-check-box nv-icon nv-icon3" />Sanar
                                    </h3>
                                    <ul className="nv-list2 top3">
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Cura tu cuerpo, dolores y enfermedades.</div></li>
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />¡Rápidamente! Resultados en menos de 2 semanas</div></li>
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Aplicando nuestros Tratamientos Naturales y Programas de Alimentación Gratuitos.</div></li>
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Con apoyo incondicional de nuestra Comunidad (especialistas + mujeres) en nuestro Foro Saludable.</div></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6">
                                    <h3 className="c4-h2 upper">
                                        <i className="flaticon-check-box nv-icon nv-icon3" />Transmitir
                                    </h3>
                                    <ul className="nv-list2 top3">
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Un estillo de Alimentación Superior, Flexible y Delicioso.</div></li>
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Tu propia historia de éxito, sé un ejemplo para el resto.</div></li>
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Ayuda a prevenir enfermedades en aquellos que amas con nuestros consejos.</div></li>
                                        <li><div className="nv-list-item2"><i className="flaticon-check-mark nv-icon nv-icon3" />Comparte una comunidad que inspira a cultivar el bienestar del cuerpo.</div></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="c-b5">
                        <h3 className="light-text h3bott1">Filosofía de curación</h3>
                        <div className="b5-row">
                        <div className=" b5-col-1">
                            <img className="img-v5"  src="./images/v5.png"/>
                        </div>
                        <div className="b5-col-2">
                            <p>Si hay un tipo de Alimentos que le dan un giro de 360 grados a tu Salud son: Alimentos
                            con Alta Capacidad de Curación. Estos alimentos tienen 3 características: Alimentos
                            Verdaderos, de origen Vegetal, y que contienen Vida.</p>
                            <img className="img-m"  src="./images/v5.png"/>
                            <p>Estos alimentos eliminan tus dolores más rápido que cualquier medicamento convencional y
                            logran recuperar completamente tu salud sin efectos secundarios.</p>
                            <img className="img-m"  src="./images/v7.png"/>
                            <p>Sin importar que tan verde o “saludable” sea tu alimentación, si no estás integrando este tipo
                                de alimentos, tu oportunidad de sanar es prácticamente nula.</p>
                        </div>
                        <div className="b5-col-3">
                            <img className="img-v7"  src="./images/v7.png"/>
                        </div>
                        </div>
                    </div>

                    <div className="c-b5 top3 m-15-small">
                        <h3 className="light-text ">¿Puedo comer otros alimentos?</h3>
                        <div className="b5-row">
                            <div className=" b5-col-1">
                                <img className="img-v8"  src="./images/v8.png"/>
                            </div>
                            <div className="b5-col-2">
                                <h3 className="h3-7">Claro que sí, en la flexibilidad está el éxito.</h3>

                                <p>Nuestros programas de Alimentación se especializan en enseñarte cómo integrar
                                    Alimentos con Alta Capacidad de Curación para sanar completamente tu cuerpo y darle
                                    un verdadero RESET. </p>
                                <img className="img-m"  src="./images/v8.png"/>

                                <p>Una vez que tu cuerpo esté como nuevo, libre de dolencias y en su peso correcto,
                                    te enseñamos como reintegrar todo tipo de comidas y las tácticas más eficientes
                                    para preservar tu salud.</p>

                                <img className="img-m"  src="./images/v6.png"/>
                            </div>
                            <div className="b5-col-3">
                                <img className="img-v6"  src="./images/v6.png"/>
                            </div>
                        </div>
                    </div>

                    <div className="c-b6">
                        <div className="w-b6 desk-fix1">
                            <h3>¿Por dónde empezar?</h3>
                            <p className="top3">Selecciona el tema con el cual te identificas y ¡Únete a nuestros programas GRATIS
                                para aprender como sanar junto a cientos de otras mujeres! </p>
                            <div className="c-cat-menu2">
                                <ul className="cat-menu2 pl-35-small">
                                    {this.showThemesList(1)}
                                </ul>
                                <ul className="cat-menu2 pl-35-small">
                                    {this.showThemesList(2)}
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="c-b7 top3 text-center">
                        <h3>¿Dónde nos puedes encontrar?</h3>
                        <h3 className="h3-7 top3">Aquí mismo. ¡Somos una <span className="under-text">Comunidad Online</span>!</h3>
                        <div className="">
                            <img className="img-v9"  src="./images/v9.png"/>
                        </div>
                        <p>Eso quiere decir que estamos disponibles SIEMPRE PARA TI. Sólo necesitas conectarte a
                                    internet para encontrarnos.
                        </p>
                        <p>¡¡Guárdanos en tus Favoritos... pásale la página a una amiga... no nos pierdas!!</p>
                        {this.showRegisterBtn()}
                    </div>



                    <div className="c-b4 pt-20-small">
                        <div className="w-b4">
                            <h3 className="h3-3">Mujeres Felices</h3>
                            <div className="c-items">
                                {this.showStories()}
                            </div>
                            {this.showCuText()}
                            <div className="bott3 bott3-margin">{this.showRegisterBtn()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NuevasVisitor;



