import React, { Component } from 'react';
import Golink from '../components/Golink';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import MetaTags from 'react-meta-tags';

import {Link} from 'react-router-dom';
import styles from '../styles/routes/Confirmation.css';

class Confirmation extends Component {

    showMetaData(){
        let vTitle = "Confirmación";
        let vDescription = "Confirmación";

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
               <TopBanner type="small">¡Felicitaciones y Bienvenida a nuestra Comunidad!</TopBanner>
               <div className="container top1 conf">
                   <div className="row">
                       <div className="col-md-6">
                            <p className="p3 center-mob">
                                Estoy muy contenta de que hayas decidido unirte a Nuevas Evas. Aquí te
                                ayudaremos a liberarte de tus enfermedades y disfrutar de un cuerpo
                                completamente sano. Haz preguntas a nuestros expertos y conoce mujeres
                                como tú en nuestro <span><Golink>Foro</Golink></span> Aprende cómo curar tus enfermedades con
                                nuestros <span><Golink>Programas Gratis</Golink></span></p>

                           <div className="col-md-6 conf-banner-mob">
                               <div className="banner4">
                                   <div className="ab-logo3" />
                               </div>

                               <div className="logo-row">
                                   <div className="conf-logo conf-logo1"/>
                                   <div className="conf-logo conf-logo2"/>
                                   <div className="conf-logo conf-logo3"/>
                               </div>

                           </div>

                           <div className="top2">
                               <Title1 isGoLink={false} >¡Recibe tus regalos!</Title1>
                           </div>
                           <p className="p3 top8">Todas las semanas enviamos un correo con un regalo que puede ser desde un vídeo interesante hasta un artículo o una deliciosa receta. Si no quieres perder tu regalo,
                               sigue este paso.</p>

                           <ul>
                               <li><div className="circle-num">1</div>
                                   <h4>Agréganos a tu Libro de Direcciones en tu correo electrónico. Presiona el link azul de abajo:</h4>
                               </li>
                           </ul>
                           <div className="mail-chimp">
                               <img src="./images/temp/mail-chimp.png"/>
                           </div>
                       </div>

                       <div className="col-md-6 conf-banner">
                           <div className="banner4">
                               <div className="ab-logo3" />
                           </div>

                           <div className="logo-row">
                               <div className="conf-logo conf-logo1"/>
                               <div className="conf-logo conf-logo2"/>
                               <div className="conf-logo conf-logo3"/>
                           </div>
                       </div>

                       <div className="col-md-12 c-row-2">
                           <div className="tagline">
                               <i className="flaticon2-signs" />
                               <p className="light-text p3">Una vez que hayas agregado a Nuevas Evas en tus contactos, envíanos un correo a comunidad@nuevasevas.com diciendo: Ya he agregado a
                               Nuevas Evas a mis contactos. Por favor enviar receta.</p>
                           </div>

                           <div className="title-long"><Title1 isGoLink={false} >Explora Nuestra Web y Aprovecha bien tus herramientas</Title1></div>
                           <div className="title-short"><Title1 isGoLink={false} >Explora Nuestra Web</Title1></div>

                           <ul>
                               <li><div className="circle-num">1</div>
                                   <div><h4>Conversa, Pregunta y Haz amigas en el Foro</h4>
                                       <p className="p3">Nuestros Foros te permiten comunicarte y conectarte con mujeres que sufren las mismas enfermedades que tú y con nuestras expertas de Nutrición completamente GRATIS. Visítanos diariamente para ver y leer las conversaciones nuevas y no seas tímida. ¡Queremos
                                           conocerte! <Golink>Preséntate aquí</Golink></p>
                                   </div>
                               </li>

                               <li><div className="circle-num">2</div>
                                   <div><h4>Sana tu cuerpo con nuestros Programas</h4>
                                       <p className="p3"> Cura tu enfermedad con nuestros Programas GRATIS. Selecciona la enfermedad de tu interés para sanar:</p>
                                       <div className="c-conf-prog">

                                               <ul className="">
                                                   <li><Link to="#" className="link1">Anemia</Link></li>
                                                   <li><Link to="#" className="link1">Artritis Reumatoide</Link></li>
                                                   <li><Link to="#" className="link1">Bajar de Peso</Link></li>

                                               </ul>

                                               <ul className="">
                                                   <li><Link to="#" className="link1">Diabetes & Prediabetes</Link></li>
                                                   <li><Link to="#" className="link1">Fibromialgia</Link></li>
                                                   <li><Link to="#" className="link1">Colesterol Alto</Link></li>
                                               </ul>

                                       </div>
                                   </div>
                               </li>

                               <li><div className="circle-num">3</div>
                                   <div><h4>Actualízate en el Blog</h4>
                                       <p className="p3">Artículos cargados de información interesante, recetas, vídeos y una enciclopedia medicinal <span><Golink>Conoce el Blog aquí</Golink></span></p>
                                   </div>
                               </li>

                               <li><div className="circle-num">4</div>
                                   <div><h4>Directorios de Salud</h4>
                                       <p className="p3">Dos directorios distintos para ti: Un <span><Golink>Directorio Local</Golink></span> que contiene actividades, servicios y productos naturales, ecológicos y orgánicos en tu ciudad. Un <span><Golink>Directorio de Internet</Golink></span> con tiendas online que ofrecen productos saludables.</p>
                                   </div>
                               </li>

                               <li><div className="circle-num">5</div>
                                   <div><h4>Conócenos Íntimamente en Vídeos y Aprende:</h4>
                                       <p className="p3">Si lo tuyo no es la lectura, disfruta de nuestros vídeos con información interesante que nunca nadie ha compartido contigo pero que uno debe conocer para curar. Inscríbete en nuestro <span><Golink>Canal de YouTube aquí</Golink></span></p>
                                       <img className="fb-img" src="./images/temp/youtube3.png"/>
                                   </div>
                               </li>

                               <li><div className="circle-num">6</div>
                                   <div><h4>Seamos amigas en Facebook</h4>
                                       <p className="p3">¿Usas Facebook? Dale Me Gusta a nuestra página, síguenos y recibe toditos nuestros posts. </p>
                                   </div>
                               </li>
                               <div className="fb-block">
                                   <img className="fb-img" src="./images/temp/fb-panel2.png"/>

                                   <p className="p3">Finalmente, si quieres conocer nuestra raíz y el por qué de esta bella comunidad, visita nuestra página: <span><Golink>Las Nuevas Evas</Golink></span></p>

                                   <p className="light-text tagline2 p3">¡Es un placer conocerte, bienvenida a nuestra gran familia!</p>

                                   <h2 className="h2-2">Alejandra Abarca</h2>
                                   <p className="p3">Experta de Alimentación Saludable, Fundadora de Nuevas Evas, Cabeza del Equipo de Nutrición.</p>
                               </div>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}

export default Confirmation;

