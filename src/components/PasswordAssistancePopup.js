import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import styles from '../styles/components/PasswordAssistancePopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore')
@observer

class PasswordAssistancePopup extends Component {
    constructor(props){
        super(props);
    }

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.viewerStore.hidePasswordAssistance();
        this.bodyClass(false)
    };

    handleEmailChange = e => this.props.authStore.setRecoveryEmail(e.target.value);

    render() {
        if (this.props.viewerStore.isPasswordAssistance){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <div className="w-popup-content">
                            <h3 className="h3-popup">Asistencia de contraseña</h3>
                            <p className="p-popup">Escribe el correo electrónico que utilizaste para
                                registrarte y te ayudaremos a renovar tu contraseña.</p>

                            <form action="" className="fotm1">
                                <div className="form-item">
                                    <input onChange={this.handleEmailChange} type="email" className="" placeholder="E-mail / Correo Electrónico"/>
                                </div>
                            </form>

                            <Link onClick={(e)=>{e.preventDefault(); this.props.authStore.sendRecoveryMail();}} to="#" className="btn3 btn3-bott-mob">Continuar</Link>

                            <p className="p-popup">¿Has cambiado o has olvidado el correo electrónico que utilizaste para registrarte?</p>
                            <p>Escríbenos a <span className="color1 td1">comunidad@nuevasevas.com</span> para ayudarte a recuperar tu cuenta.</p>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default PasswordAssistancePopup;

