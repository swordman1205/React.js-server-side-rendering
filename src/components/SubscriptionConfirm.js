import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/SubscriptionConfirm.css';

@inject('userStore')
@withRouter
@observer

class SubscriptionConfirm extends Component {
    constructor (props){
        super(props);
        this.state = ({showBox: true});
    }
    confirmEmail=(e)=>{
        e.preventDefault();
        this.props.userStore.confirm();
    };
    render() {
        if (!this.props.location.pathname.match(/^\/confirmar-suscripcion/))  {
            if (this.props.userStore.currentUser) {
                if (this.props.userStore.currentUser.token && !this.props.userStore.currentUser.confirmed && this.state.showBox) {
                    return (
                        <div className="confirm-msg">
                            <div className="confirm-msg-text">
                                <i className="flaticon-gift"/>
                                <p>Recuerda confirmar tu suscripción y recibe un delicioso postre de regalo. &nbsp;
                                    <Link onClick={this.confirmEmail} to="/confirmar-suscripcion">Confirmar </Link>
                                </p>
                            </div>
                            <i onClick={(e) => {
                                this.setState({showBox: false})
                            }} className="flaticon-cancel cancel-btn"/>
                        </div>
                    );
                } else {
                    return (<div></div>);
                }
            } else {
                return (<div></div>);
            }
        }
        else {
            return (<div></div>)
        }
    }
}

export default SubscriptionConfirm;
