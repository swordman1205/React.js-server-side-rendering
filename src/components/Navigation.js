import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import MainMenu from '../components/MainMenu';
import SearchInput from '../components/SearchInput';
import Avatar from 'react-avatar';
import { inject, observer } from 'mobx-react';
import styles from '../styles/components/Navigation.css';

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'discussionStore', 'programStore')
@withRouter
@observer

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state = ({
            showDDown: false,
            showPopup: false,
            email: this.props.authStore.values.email,
            password: this.props.authStore.values.password
        });
    }
    componentDidMount() {
        const token = this.props.viewerStore.token || window.localStorage.getItem('jwt');
        if(token){
            this.props.userStore.pullUser();
        }
        console.log(process.env.NODE_ENV);
        let d = new Date().getTime();
        window.userRefId = d.toString() + Math.floor((Math.random() * 10000000000000) + 1).toString();
        this.props.authStore.setUserRef(window.userRefId);
        window.fbAsyncInit = function() {
            //SDK loaded, initialize it
             FB.init({
                appId      : CONFIG.fb.appId,
                xfbml      : true,
                version    : 'v3.0'
            });
            //JS SDK initialized, now you can use it
            FB.XFBML.parse();
        };

        //load the JavaScript SDK
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id; js.async=true;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        let freeProgramToken = window.localStorage.getItem('freeProgramToken');
        if(freeProgramToken){
            window.localStorage.removeItem('freeProgramToken');
            this.props.programStore.addFreeProgram(freeProgramToken);
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            email: nextProps.authStore.values.email,
            password: nextProps.authStore.values.password
        });
    }

    showLogin = (e) => {
        e.preventDefault();
        this.props.viewerStore.showLogin();
    };

    logout = (e) => {
        e.preventDefault();
        this.props.authStore.logout();
        this.setState({
            showDDown: false
        });
    };

    showMobileNav = (e) => {
        e.preventDefault();
        this.props.viewerStore.showMobileNav();
    };

    goHome = (e) => {
        e.preventDefault();
        this.props.themeStore.setCurrentTheme("", "Salud");
        this.props.viewerStore.setHomePageData("", "Salud");
        this.props.history.push("/");
    };

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass2(param);
    };

    showDD = () => {
        if(this.state.showDDown){
            return (
                <div className="c-dd-menu" onClick={()=>{this.setState({showDDown:false})}}>
                    <ul className="dd-menu" onClick={(e)=>{e.stopPropagation(); e.preventDefault();}}>
                        <li><Link to="/editar-perfil" onClick={()=>{this.setState({showDDown:false})}}>Perfil</Link></li>
                        <li><a onClick={this.logout} href="#"><i className="flaticon-logout" /> Salir De Mi Cuenta</a></li>
                    </ul>
                </div>
            );
        }
    };

    beginSearch() {
        if (typeof document === 'undefined') return;
        this.props.discussionStore.setSearchText(document.getElementById("search3").value);
        this.props.viewerStore.updatePageData("1", "search");
        this.props.history.push("/busqueda");
        this.props.viewerStore.setShowMobileProfilePopup(false);
    };

    handleKeyDown = e => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            this.props.discussionStore.setSearchText(e.target.value);
            this.props.viewerStore.updatePageData("1", "search");
            this.props.history.push("/busqueda");
        }
    };



    showUserPanel() {
        if(this.props.userStore.currentUser){
            return (
                <a onClick={(e)=>{this.setState({showDDown:!this.state.showDDown}); e.preventDefault();}} href="#" className="c-user-info">
                    <span className="c-avatar">
                        <Avatar size={30} name={this.props.userStore.currentUser.username?this.props.userStore.currentUser.username.split(' ')[0]:""} round={true} src={this.props.userStore.currentUser.avatar} textSizeRatio={1.75} />
                    </span>
                    {this.props.userStore.currentUser.username}
                    <i className="flaticon-arrows login-arrow" />
                </a>
            )
        } else {
            if(this.props.userStore.inProgressUser){
                return (<div className="loading">Cargando...</div>)
            } else {
                return (
                    <a onClick={this.showLogin} href="#" className="c-user-info">
                        <i className="i-user flaticon-social"/>
                        Iniciar sesión
                    </a>
                )
            }
        }
    };

    showUserMobPanel() {
        if(this.props.userStore.currentUser){
            return (
                <a onClick={(e)=>{this.props.viewerStore.setShowMobileProfilePopup(true); e.preventDefault();}} href="#" className="c-user-info">
                    <span className="c-avatar">
                        <Avatar size={30} name={this.props.userStore.currentUser.username?this.props.userStore.currentUser.username.split(' ')[0]:""} round={true} src={this.props.userStore.currentUser.avatar} textSizeRatio={1.75} />
                    </span>

                    <i className="flaticon-arrows login-arrow" />
                </a>
            )
        } else {
            if(this.props.userStore.inProgressUser){
                return (<div>Cargando...</div>)
            } else {
                return (
                    <a onClick={this.showLogin} href="#" className="user-btn flaticon-social"/>
                )
            }
        }
    };

    showMobileHeader(){
        return(
            <div className="c-mob-header">
                <a onClick={this.showMobileNav} href="#" className="hamb-btn flaticon-menu-button"/>
                <a href="#" onClick={this.goHome} className="mob-logo" />
                {this.showUserMobPanel()}
            </div>
        )
    }

    render() {
        if (this.props.location.pathname.match(/^\/checkout/)) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {this.showMobileHeader()}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                {/* --------------- DESKTOP ----------- */}
                                <div className="c-header">
                                    <a href="#" onClick={this.goHome} className="logo"/>
                                    <div className="c-right">
                                        <div className="c-right-row bott1">
                                            {this.showUserPanel()}
                                            {this.showDD()}
                                        </div>

                                        <div className="c-right-row">
                                            <MainMenu />
                                            <SearchInput mainNav={true}/>

                                        </div>
                                    </div>
                                </div>
                                {this.showMobileHeader()}

                            </div>
                        </div>
                    </div>
                   {/* {this.showPopup()}*/}
                </div>
            );
        }
    }
}
Navigation.contextTypes = {
    router: PropTypes.object
};
export default Navigation;
