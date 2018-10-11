import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/CreateNewPasswordPopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore')
@observer

class CreateNewPasswordPopup extends Component {
    constructor(props){
        super(props);
        this.state = ({
            password: '',
            confirmPassword: ''
        });
    }

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(){
        this.props.viewerStore.hideCreateNewPassword();
        this.bodyClass(false);
    }

    handlePasswordChange = e => this.setState({password: e.target.value});
    handleConfirmPasswordChange = e => this.setState({confirmPassword: e.target.value});

    showError() {
        if (this.props.authStore.recoveryError) {
            return (
                <div className="c-error">{this.props.authStore.recoveryError}</div>
            )
        }
    };

    render() {
        if (this.props.viewerStore.isCreateNewPassword){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={()=>{this.hidePopup()}}>
                    <div className="c-popup mh11" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <div className="w-popup-content cnp-popup">
                            <h3 className="h3-popup h3-popup-bott-mob">Crear una nueva contraseña</h3>
                            <p className="p-popup">Te preguntaremos esta contraseña<br/> cada vez que inicies nuevamente tu sesión.</p>

                            <form action="" className="fotm1">
                                <div className="form-item">
                                    <input onChange={this.handlePasswordChange} type="password" className="" placeholder="Nueva contraseña"/>
                                </div>
                                <div className="form-item">
                                    <input onChange={this.handleConfirmPasswordChange} type="password" className="" placeholder="Confirma tu contraseña - vuelve a escribirla"/>
                                </div>
                            </form>
                            {this.showError()}
                            <Link onClick={(e)=>{e.preventDefault(); this.props.authStore.changePassword(this.state.password, this.state.confirmPassword); }} to="#" className="btn1 mw11">Guardar cambios</Link>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default CreateNewPasswordPopup;


