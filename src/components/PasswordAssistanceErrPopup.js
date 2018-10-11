import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/PasswordAssistanceErrPopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore')
@observer

class PasswordAssistanceErrPopup extends Component {
    constructor(props){
        super(props);
    }

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.viewerStore.hidePasswordAssistanceErr();
        this.bodyClass(false)
    }

    render() {
        if (this.props.viewerStore.isPasswordAssistanceErr){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}}
                                  className="flaticon-cancel btn-close3"/>
                        </div>
                        <div className="w-popup-content">
                            <h3 className="h3-popup">Asistencia de contraseña</h3>
                            <div className="errorMessage3">
                                <i className="flaticon-cancel" />
                                <p>No existe ninguna cuenta registrada con el correo
                                    electrónico que utilizaste.</p>
                            </div>

                            <div className="popup-btn3">
                                <Link
                                    onClick={(e)=>{e.preventDefault(); this.props.viewerStore.showPasswordAssistance();}}
                                    to="#"
                                    className="btn2">
                                    ingresar otro e-mail
                                </Link>
                            </div>

                            <p className="p-popup">¿Has cambiado o has olvidado el correo electrónico que utilizaste para registrarte?</p>
                            <p>Escríbenos a <span className="color1">comunidad@nuevasevas.com</span> para ayudarte a recuperar tu cuenta.</p>
                        </div>
                    </div>
                </div>
            );
        }
        else return null

    }
}
export default PasswordAssistanceErrPopup;


