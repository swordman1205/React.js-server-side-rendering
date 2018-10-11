import React, {Component} from 'react';
import styles from '../styles/components/PasswordConfirmationPopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore')
@observer

class PasswordConfirmationPopup extends Component {
    constructor(props){
        super(props);
    }

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.viewerStore.hidePasswordConfirmation();
        this.bodyClass(false)
    }

    render() {
        if (this.props.viewerStore.isPasswordConfirmation){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup c-pcp" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}}
                                  className="flaticon-cancel btn-close3"/>
                        </div>
                        <div className="w-popup-content pc-popup">
                            <h3 className="h3-popup">Asistencia de contraseña</h3>

                            <h4 className="color1"><i className="flaticon-check-box"/> Listo</h4>

                            <p>Revisa tu correo electrónico ahora mismo.</p>
                            <p className="p-popup">Hemos enviado un mensaje a <span className="color1">{this.props.authStore.recoveryEmail}</span> con un link que te permitirá crear una nueva contraseña.</p>
                            <p>¡Te esperamos!<br/> Nuevas Evas</p>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default PasswordConfirmationPopup;
