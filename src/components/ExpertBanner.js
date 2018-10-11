import React, {Component} from 'react';
import styles from '../styles/components/ExpertBanner.css';

class ExpertBanner extends Component {
    showTitle(){
        if(this.props.type=="home")
        return (
            <h3 className="h3-2 h3-2m2">
                Regístrate, pregunta y te responderemos:
            </h3>
        )
    }
    showText(){
        if(this.props.type=="side")
        return (
            <p>
                Conéctate conmigo a través de los <a href="/#foro" className="lu-text">Foros Gratuitos</a> y <a href="/#programs" className="lu-text">Programas de Alimentación</a> en nuestra comunidad.
                Si sientes que llegó el momento de SANAR: ¡Estoy
                lista para ayudarte!
            </p>
        )
    }
    showBanner(){
        return (
            <div className={this.props.type=="home-side"?"expert-banner":"expert-banner top3"}>
                <p>
                    “Quiero apoyarte a tomar decisiones que acaben con
                    tu dolor y preocupaciones.
                </p>
                <p>
                    Que beneficien completamente tu salud y te regalen
                    el bienestar y la felicidad que mereces.”
                </p>
                {this.showText()}
                <div className="c-exp-bottom">
                    <div className="exp-pict"/>
                    <div className="exp-text mob-hide">
                        Experta de Alimentación
                        Saludable. <br/>
                        <span className="bold-mob">Fundadora Nuevas Evas</span> <br/>
                        y Cabeza Del Equipo de <br/>
                        Nutrición.
                    </div>

                    <div className="exp-text desk-hide">
                        Experta de Alimentación
                        Saludable. <span className="bold-mob">Fundadora Nuevas Evas</span> y <br/>
                        Cabeza Del Equipo <br/>
                        de Nutrición.
                    </div>
                </div>
                <div className="exp-panel">
                    - Alejandra Abarca
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="">
                {this.showTitle()}
                {this.showBanner()}
            </div>
        );
    }
}

export default ExpertBanner;
