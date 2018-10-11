import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import FBAuth from '../components/FBAuth';
import styles from '../styles/components/LoginPopup.css';


@inject('viewerStore', 'authStore')
@observer
class LoginPopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            agree: false
        }
    }

    hideLogin = (e) => {
        this.props.viewerStore.hideLogin();
        this.props.viewerStore.bodyClass(false);
    };
    hideLogin2 = (e) => {
        e.preventDefault();
        this.props.viewerStore.hideLogin();
        this.props.viewerStore.setRegisterStep(1);
        this.props.viewerStore.setRegisterPopup(true);
    };

    showError() {
        if (this.props.authStore.error) {
            return (
                <div className="c-error">{this.props.authStore.error}</div>
            )
        }
    };

    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.authStore.login()
            .then(() => {
                if (!this.props.authStore.error){
                    this.hideLogin();
                }
            });
    };

    render() {
        if (this.props.viewerStore.isLoginShow) {
            this.props.viewerStore.bodyClass(true);
            return (
                <div onClick={this.hideLogin} className={`c-popup-cover ${this.props.viewerStore.isLoginShow ? 'block2' : ''}`}>
                    <div className="popup-login" onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    e.stopPropagation()
                }}>
                        <div className="controls-center-pop">
                            <span onClick={this.hideLogin} className="flaticon-cancel btn-close3"/>
                            <h3 className="h3-login">
                                Ingresa a tu cuenta personal
                            </h3>

                            <div className="lf-text c-fb">
                                <FBAuth />
                            </div>
                            <div className="lf-text">
                                O conéctate con tu correo electrónico:
                            </div>

                            <form action="" className="fotm1 login-form">
                                <div className="form-item">
                                    <input onChange={this.handleEmailChange} type="email" className="" placeholder="E-mail / Correo Electrónico"/>
                                </div>
                                <div className="form-item">
                                    <input onChange={this.handlePasswordChange} type="password" className="" placeholder="Contraseña"/>
                                </div>
                                <div className="form-item">
                                </div>
                            </form>
                            {this.showError()}
                            <a onClick={this.handleSubmitForm} href="#" className="btn3">iniciar sesión</a>
                            <div className="lf-text3">¿Olvidaste tu contraseña? <Link onClick={(e)=>{e.preventDefault(); this.props.viewerStore.showPasswordAssistance();}} to="#" className="link4">Renuévala Aquí</Link></div>
                        </div>
                        <div className="c-lp-bott">
                            <div className="lf-text2">
                                ¿Eres nueva y no tienes cuenta?
                            </div>
                            <Link to="/register-step1" onClick={this.hideLogin2} className="btn4">Regístrate Aquí</Link>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default LoginPopup;
