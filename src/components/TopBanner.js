import React, {Component} from 'react';
import { withRouter } from 'react-router';
import TabMenu from '../components/TabMenu';
import Golink from '../components/Golink';
import SubscriptionConfirm from '../components/SubscriptionConfirm';
import styles from '../styles/components/TopBanner.css';

import {inject, observer} from 'mobx-react';

let scrollToComponent;

@inject('viewerStore')
@withRouter
@observer

class TopBanner extends Component {

    componentDidMount = () => {
        scrollToComponent = require('react-scroll-to-component');
    }

    showRegBtn(){
        if(!this.props.viewerStore.token){
            return (
                <div className="register-btn"><div className="btn5" onClick={()=>this.props.viewerStore.setRegisterPopup(true)}>Regístrate aquí</div></div>
            )
        }
    }

    showBannerContent(){
        if(this.props.type == "big") {
            return (
                <div className="col-lg-12">
                    <h1 className="h1-1 desk-hide">
                        Libérate de tus enfermedades, <br/>
                        aprendiendo a
                        utilizar <span className="under-text"> tus alimentos </span> <br/> como medicina.
                    </h1>
                    <div className="c-inner-top-banner">
                        <div className="c-image-banner">
                            <div className="shape-round"/>
                            <div className="alejandra1"/>
                        </div>
                        <div className="">
                            <h1 className="h1-1 top1 mob-hide" dangerouslySetInnerHTML={{__html: this.props.children}}>
                                {/*Libérate de tus enfermedades,
                                aprendiendo a <br />
                                utilizar <span className="under-text"> tus alimentos </span> como medicina.*/}
                            </h1>
                            <h4 className="h4-1 top2">
                                <span className="mob-bold1">Alejandra Abarca</span> <span
                                className="mob-hide">-</span> Experta de
                                Alimentación Saludable.
                            </h4>
                        </div>

                        <TabMenu />
                    </div>
                </div>
            )
        }

        if(this.props.type == "small") {
            return (
                <div className="col-lg-12">
                    <div className="c-text-banner">
                        <h1 className="h1-1">
                            {this.props.children}
                        </h1>
                    </div>
                </div>
            )
        }

        if(this.props.type == "small-text") {
            return (
                <div className="col-lg-12">
                    <div className="c-text-banner">
                        <h1 className="h1-1">
                            {this.props.children}
                        </h1>
                        <p className="p-subtext">{this.props.subtext}</p>
                        {this.showRegBtn()}
                    </div>
                </div>
            )
        }

        if(this.props.type == "xsmall") {
            return (
                <div className="col-lg-12">
                    <div className="c-inner-top-banner">
                        <div className="c-text-banner2">
                            <h2 className="h2-3"  dangerouslySetInnerHTML={{__html: this.props.children}}>
                            </h2>
                            <Golink size="gl1"
                                    prevent = {true}
                                    click={(e)=>{
                                        scrollToComponent(
                                            this.props.linkRef,
                                            {
                                                offset: 0,
                                                align: 'top',
                                                duration: 1000
                                            }
                                        );}
                                    }
                            >
                                Encontrar mi Programa
                            </Golink>
                        </div>
                        <TabMenu />
                    </div>
                </div>
            )
        }
    }
    showConfirm(){
        if(!this.props.location.pathname.match(/^\/checkout/)){
            return (
                <SubscriptionConfirm />
            )
        }
    }
    render() {
        return (
            <div>
                <div className="top-banner">
                    <div className="container">
                        <div className="row">
                            {this.showBannerContent()}
                        </div>
                    </div>
                </div>
                <div className="container sc-msg-top">
                    {this.showConfirm()}
                </div>
            </div>
        );
    }
}

export default TopBanner;
