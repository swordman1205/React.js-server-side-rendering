import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import RegisterPopup from '../components/RegisterPopup';
import PasswordAssistancePopup from '../components/PasswordAssistancePopup';
import PasswordConfirmationPopup from '../components/PasswordConfirmationPopup';
import PasswordAssistanceErrPopup from '../components/PasswordAssistanceErrPopup';
import CreateNewPasswordPopup from '../components/CreateNewPasswordPopup';
import AccessProductPopup from '../components/AccessProductPopup';
import NewProfilePopup from '../components/NewProfilePopup';
import ChooseNicknamePopup from '../components/ChooseNicknamePopup';
import EditTitlePopup from '../components/EditTitlePopup';
import EditPostPopup from '../components/EditPostPopup';
import EraseConfirmationPopup from '../components/EraseConfirmationPopup';
import DeleteDiscussionPopup from '../components/DeleteDiscussionPopup';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Footer.css';

@inject('viewerStore', 'themeStore')
@withRouter
@observer

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {fbWidth: 270};
    }

    updateDimensions() {
        var fbWidthN = document.body.clientWidth;
        if (fbWidthN < 540){
            this.setState({fbWidth: (fbWidthN - 40)});
        }
        else if (fbWidthN < 1199 && fbWidthN > 540){
            this.setState({fbWidth: 500});
        }
        else {
            this.setState({fbWidth: 270});
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

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

    showPopup = () => {
        if(this.props.viewerStore.showMobileProfilePopup){
            this.props.viewerStore.bodyClass2(true);
            return (
                <div className="popup-cover3" onClick={()=>{this.props.viewerStore.setShowMobileProfilePopup(false); this.props.viewerStore.bodyClass2(true);}}>
                    <div className="popup-menu" onClick={(e)=>{e.stopPropagation()}}>
                        <div onClick={()=>{this.props.viewerStore.setShowMobileProfilePopup(false); this.props.viewerStore.bodyClass2(false);}} className="c-top-popup">
                            <span className="flaticon-cancel btn-close3 btn-close5" />
                            <Link to="/" className="logo-popup" />
                        </div>
                        <ul className="c-menu">
                            <li><Link to="/editar-perfil" onClick={()=>{this.props.viewerStore.setShowMobileProfilePopup(false);}}>Perfil <i className="flaticon-arrow-pointing-to-right" /></Link></li>
                            <li><a onClick={this.logout} href="#"> Salir De Mi Cuenta <i className="flaticon-logout" /></a></li>
                        </ul>
                        <div className="controls-center">
                            <div className="c-search">
                                <input
                                    className="search-input"
                                    type="text"
                                    placeholder={this.props.mainNav?'':"Busca recetas, artículos, etc."}
                                    onClick={(e)=>{e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); e.stopPropagation()}}
                                    onKeyDown={this.handleKeyDown}
                                    id="search3"
                                />
                                <a className="btn-search" href="#" onClick={(e)=> {this.beginSearch(); e.preventDefault()}}>
                                    <i className="i-search flaticon-magnifying-glass-browser" />
                                </a>
                            </div>
                            <Link to="/contacto" onClick={()=>{this.props.viewerStore.setShowMobileProfilePopup(false);}} className="btn4">Contáctanos</Link>

                            <p>¡Comparte esta página!</p>

                            <ul className="social-icons">
                                <li>
                                    <a href="https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"  target="_blank"><i className="flaticon-youtube"/></a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/NuevasEvas/" target="_blank"><i className="flaticon-facebook-logo"/></a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/nuevasevas_rawveganperu/" target="_blank"><i className="flaticon-instagram-logo" /></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/nuevasevas?lang=en" target="_blank"><i className="flaticon-twitter-logo-silhouette" target="_blank"/></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
        } else {
            this.props.viewerStore.bodyClass2(false);
        }
    };
    render() {
        if (this.props.location.pathname.match(/^\/checkout/)) {
            return null
        }
        else {
            return (
                <div id="footer" className="footer">
                    <div className="container">
                        {/* ---------------------- Popups --------------------- */}
                        <RegisterPopup />
                        <PasswordAssistancePopup />
                        <PasswordConfirmationPopup />
                        <PasswordAssistanceErrPopup />
                        <CreateNewPasswordPopup />
                        <AccessProductPopup />
                        <NewProfilePopup />
                        <ChooseNicknamePopup />
                        <EditTitlePopup />
                        <EditPostPopup />
                        <EraseConfirmationPopup />
                        <DeleteDiscussionPopup />
                        {this.showPopup()}
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="footer-top">
                                    <Link to="/" onClick={()=>this.props.themeStore.setCurrentTheme("", "")} className="footer-logo"/>
                                    <div className="">
                                        <p className="footer-text">
                                            Una Comunidad de Mujeres donde aprenderás a utilizar tus Alimentos como
                                            Medicina, a liberarte de tus enfermedades y compartir este conocimiento
                                            con las personas que amas.
                                        </p>
                                        <div className="c-footer-btns">
                                            <Link to="/las-nuevas-evas" className="btn1">Aprender más</Link>
                                            <Link to="/contacto" className="btn2">Contáctanos</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer-bottom">
                                    Toda la información, recomendaciones y recetas han sido aprobadas y cuentan con el
                                    completo aval del Equipo de Nutrición.
                                    Certificado: CNP 5171. Esta website no pretende prescribir condiciones médicas. Las
                                    instrucciones representan la opinión,
                                    experiencia e investigación personal del autor y colaboradores. Los cuales declinan
                                    cualquier responsabilidad o evento ocasionado como resultado del uso de cualquier
                                    sugerencia, preparación de alimentos o consejos que se describen aquí. Se recomienda
                                    consultar con un profesional de salud antes de cambiar por completo su alimentación.
                                    <br />
                                    <Link className="policy-link" to="/politica-de-privacidad">Política de privacidad</Link>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/*<img className="fb-plugin" src="./images/temp/fb-panel.png" alt=""/>*/}
                                {/*https://developers.facebook.com/docs/plugins/page-plugin*/}
                                <div className="fb-page">
                                    <iframe id="fb-iframe" src={"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FNuevasEvas%2F&tabs=timeline&width="+this.state.fbWidth+"&height=350&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId=372175659524646"} width="100%" height="350" scrolling="no" frameBorder="0"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-2 text-center-mob">
                                <h3 className="h3-6">Síguenos en:</h3>
                                <ul className="social-list">
                                    <li>
                                        <a href="https://www.youtube.com/channel/UCZGct2YHUZLIjXwvFS6-ZIA?app=desktop"  target="_blank"><i className="flaticon-youtube"/>YouTube</a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/NuevasEvas/" target="_blank"><i className="flaticon-facebook-logo"/>Facebook</a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/nuevasevas_rawveganperu/" target="_blank"><i className="flaticon-instagram-logo" />Instagram</a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com/nuevasevas?lang=en" target="_blank"><i className="flaticon-twitter-logo-silhouette" target="_blank"/>Twitter</a>
                                    </li>
                                </ul>

                                <div className="footer-bottom-mob">
                                    Toda la información, recomendaciones y recetas han sido aprobadas y cuentan con el
                                    completo aval del Equipo de Nutrición.
                                    Certificado: CNP 5171. Esta website no pretende prescribir condiciones médicas. Las
                                    instrucciones representan la opinión,
                                    experiencia e investigación personal del autor y colaboradores. Los cuales declinan
                                    cualquier responsabilidad o evento ocasionado como resultado del uso de cualquier
                                    sugerencia, preparación de alimentos o consejos que se describen aquí. Se recomienda
                                    consultar con un profesional de salud antes de cambiar por completo su alimentación.
                                    <Link className="policy-link" to="/politica-de-privacidad">Política de privacidad</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Footer;
