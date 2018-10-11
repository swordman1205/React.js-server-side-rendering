import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MainMenu from '../components/MainMenu';
import SearchInput from '../components/SearchInput';
import { inject, observer } from 'mobx-react';
import styles from '../styles/components/MobileNavigation.css';

@inject('viewerStore', 'userStore')
@observer

class MobileNavigation extends Component {
    hideMobileNav = (e) => {
        e.preventDefault();
        this.props.viewerStore.hideMobileNav();
        this.props.viewerStore.bodyClass(false);
    };

    showLogin = (e) => {
        e.preventDefault();
        this.props.viewerStore.showLogin();
    };

    render() {
        if (this.props.viewerStore.isMobileNavShow) {
            this.props.viewerStore.bodyClass(true);
            return (
                <div onClick={this.hideMobileNav}
                     className={`popup-cover ${this.props.viewerStore.isMobileNavShow ? 'block1': ''}`}>
                    <div className="my-popup">
                        <div className="c-top-popup">
                            <span onClick={()=>{this.setState({showMenu1: "none1"})}}
                                  className="flaticon-cancel btn-close3 btn-close5"/>
                            <a href="#" className="logo-popup"/>
                        </div>
                        <MainMenu />
                        <div className="controls-center">
                             <SearchInput />
                            {this.props.userStore.currentUser ? '' :
                                <span onClick={this.showLogin} className="btn3 cu-btn-mob">iniciar sesión</span>}
                            <Link to="/contacto" className="btn4">Contáctanos</Link>
                        </div>
                    </div>
                </div>
            );
        }
        else return null
    }
}
export default MobileNavigation;
