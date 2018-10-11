import React, {Component} from 'react';
import Golink from '../components/Golink';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Banner1.css';

@inject('viewerStore')
@observer

class Banner1 extends Component {
    showRegLink(){
        if(!this.props.viewerStore.token){
            return (
                <Golink click={()=>this.props.viewerStore.setRegisterPopup(true)} prevent={true} chref={this.props.viewerStore.registerPage} type={"lindddk"}>Crear una cuenta</Golink>
            )
        }
    }
    render() {
        return (
            <div className="c-banner1">
                <div className="c-b1-tob">
                    <div className="banner1-logo"></div>
                    <h3 className="h3-9">Libérate de tus enfermedades,
                        aprendiendo a utilizar tus
                        alimentos como medicina.
                    </h3>
                </div>
                <div className="c-b1-bott">
                    Una comunidad de mujeres con <Link to="/#programs" className="light-text">Programas de
                    Alimentación</Link> Gratis, <Link to="/#foro" className="light-text">Foros de Salud</Link> y el apoyo
                    de nuestras Expertas. {this.showRegLink()}
                </div>
            </div>
        );
    }
}

export default Banner1;
