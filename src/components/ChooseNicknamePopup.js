import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/components/ChooseNicknamePopup.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'authStore')
@observer

class ChooseNicknamePopup extends Component {
    constructor(props){
        super(props);
    }
    goToStep2(e) {
        this.props.viewerStore.setRegisterStep(2);
        this.props.viewerStore.setRegisterPopup(true);
        e.preventDefault();
    }
    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };

    hidePopup(e){
        this.props.viewerStore.hideChooseNicknamePopup();
        this.goToStep2(e);
        this.bodyClass(false);
    };

    render() {
        if (this.props.viewerStore.isChooseNicknamePopup){
            {this.bodyClass(true)}
            return (
                <div className="c-popup-cover" onClick={(e)=>{this.hidePopup(e)}}>
                    <div className="c-popup" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close">
                            <span onClick={(e)=>{this.hidePopup(e)}} className="flaticon-cancel btn-close3"/>
                        </div>
                        <div className="w-popup-content cnp">
                            <h3>Elige tu apodo para <br/>
                                la comunidad:</h3>
                            <div className="c-nickname">
                                <div>Sugerencia de apodo</div>
                                <div>{this.props.authStore.tempUserNickname}</div>
                            </div>
                            <p>O crea tu apodo:</p>

                            <form action="" className="fotm1">
                                <div className="form-item">
                                    <input maxLength="16" onChange={(e)=>{this.props.authStore.setInputUserNickname(e.target.value)}} type="text" className="" placeholder="Escribe aquí tu apodo"/>
                                </div>
                            </form>
                            <p className="s-text">Máximo 16 caracteres.<br/>
                            Este nombre es público y permanente.</p>
                            <Link onClick={(e)=>{this.goToStep2(e)}} to="#" className="btn3">Aprobar</Link>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default ChooseNicknamePopup;


