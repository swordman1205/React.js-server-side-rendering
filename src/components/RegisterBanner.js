import React, {Component} from 'react';
import styles from '../styles/components/RegisterBanner.css';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'threadStore')
@observer

class RegisterBanner extends Component {
    render() {
        if(!this.props.viewerStore.token && !this.props.hide && this.props.threadStore.currentThreadData){
            if (this.props.threadStore.currentThreadData.posts){
                if (this.props.threadStore.currentThreadData.posts.length > 2 || !this.props.color){
                    return (
                        <div className="register-banner" style={{backgroundColor:(this.props.color)?'#f7ecdc':'#fff'}}>
                            <h3>¡Regístrate para preguntar y responder!</h3>
                            <div className="register-btn2">
                                <div className="btn5" onClick={()=>this.props.viewerStore.setRegisterPopup(true)}>Presiona aquí Para REGISTRARTE</div>
                            </div>
                        </div>
                    );
                } else return null
            } else return null
        }
        else return null
    }
}
export default RegisterBanner;

