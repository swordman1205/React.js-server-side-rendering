import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/AccessProductPopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore')
@observer

class AccessProductPopup extends Component {

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup() {
        if (typeof window === 'undefined') return;
        window.localStorage.removeItem('tx');
        window.localStorage.removeItem('transaction_id');
        this.props.viewerStore.hideAfterPaymentPopup();
        this.bodyClass(false);
    }

    render() {
        if (this.props.viewerStore.isAfterPaymentPopup){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover app-popup-mob after-buy-popup" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup c-app-popup" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <div className="w-popup-content app-popup">
                             <h3 className="ap-popup-h3">Pago exitoso</h3>
                            <h4>Para recibir tu compra, elige una opción:</h4>
                            <div className="register-btn3">
                                <div className="btn5" onClick={()=>this.props.viewerStore.setRegisterPopup(true)}>¿Eres Nueva? ¡Regístrate!</div>
                            </div>
                        </div>
                        <div className="app-bottom">
                            <h3>¿Ya tienes una cuenta?</h3>
                            <Link to="#" className="btn2 btn2-plus" onClick={()=>this.props.viewerStore.showLogin()}>Inicia sesión Aquí</Link>
                        </div>
                    </div>
                </div>
            );
        }
        else return null

    }
}
export default AccessProductPopup;
