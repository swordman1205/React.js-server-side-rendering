import React, {Component} from 'react';
import FacebookProvider, { Login } from 'react-facebook';

import styles from '../styles/components/FBAuth.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'userStore', 'threadStore', 'authStore')
@observer

class FBAuth extends Component {
    constructor(props){
        super(props);
        this.state = ({
            appId: CONFIG.fb.appId,
        });
    }

    handleResponse = (data) => {
        this.props.authStore.fbLogin(data);
        this.props.viewerStore.hideAllPopups();
    };

    handleError = (error) => {
        console.log(error);
    };

    render() {
        return(
            <div>
                <FacebookProvider appId={this.state.appId}>
                    <Login
                        scope="email"
                        onResponse={this.handleResponse}
                        onError={this.handleError}
                    >
                        <div className="btn-facebook">
                            <i className="flaticon-facebook-logo" />
                            {this.props.viewerStore.showRegisterPopup?"Registrame con Facebook":"Inicia sesión con Facebook"}
                        </div>
                    </Login>
                </FacebookProvider>
            </div>
        );
    }
}

export default FBAuth;
