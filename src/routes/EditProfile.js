import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import UploadImage from '../components/UploadImage';
import {Link} from 'react-router-dom';
import FacebookProvider, { MessengerCheckbox } from 'react-facebook';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/EditProfile.css';
import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'userStore', 'directoriesStore', 'discussionStore', 'themeStore', 'authStore')
@observer

class EditProfile extends Component {
    constructor(props){
        super(props);
/*
        Test data:
        this.state = ({
            appId: "1705936236121162",
            pageId: CONFIG.fb.pageId,
            origin: window.location.origin,
            userRef: ""
        });*/
    };
    componentDidMount () {
        this.props.directoriesStore.pullCountriesList();
        const token = this.props.viewerStore.token || window.localStorage.getItem('jwt');
        if (token){
            this.props.userStore.pullUser();
        }
        this.props.viewerStore.setProfileChangeSuccess(false)

        let d = new Date().getTime();
        window.userRefId2 = d.toString() + Math.floor((Math.random() * 10000000000000) + 1).toString();
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

    }

    showFBcheckbox(){
        if(this.props.userStore.currentUser && this.props.userStore.currentUser.user_id){
            if(!this.props.userStore.currentUser.is_fb_checked){
                return(
                    <div>
                        <FacebookProvider appId={CONFIG.fb.appId}>
                            <MessengerCheckbox
                                appId={CONFIG.fb.appId}
                                pageId={CONFIG.fb.pageId}
                                origin={typeof window === 'undefined' ? '' : window.location.origin}
                                prechecked={false}
                                allowLogin={false}
                                userRef={typeof window === 'undefined' ? '' : window.userRefId2}
                            />
                        </FacebookProvider>
                    </div>
                );
            } else {
                return(
                    <div className="box-top">
                        Te has suscrito a las notificaciones de NuevasEvas por messenger e email. <br/>
                        Si deseas cancelar tu suscripción gratuita, sigue el siguiente  <a className="link2" href="https://www.facebook.com/messages/t/nuevasclevercrew">enlace</a>
                    </div>
                );
            }
        }
        else {
            return null;
        }
    }

    confirmOptIn() {
        FB.AppEvents.logEvent('MessengerCheckboxUserConfirmation', null, {
            'app_id': CONFIG.fb.appId,
            'page_id': CONFIG.fb.pageId,
            'ref': this.props.userStore.currentUser.user_id,
            'user_ref': window.userRefId2
        });
    }

    handleEmailChange = e => {
            this.props.userStore.setNewEmail(e.target.value);
    };

    handleCountryChange = e => {
            this.props.discussionStore.pullCountryInfo(e.target.value);
            this.props.userStore.setNewCountry(e.target.value);
    };

    handlePhoneChange = e => {
        this.props.userStore.setNewPhone(e.target.value);
    };

    handleGenderChange = e => {
        this.props.userStore.setGender(e.target.value);
    };

    handleOccupationChange = e => {
        this.props.userStore.setNewOccupation(e.target.value);
    };

    handleInfoChange = e => {
        this.props.userStore.setNewInfo(e.target.value);
    };

    showContriesList(){
        if(this.props.directoriesStore.CountriesList.length){
            let i=0;
            return this.props.directoriesStore.CountriesList.map(item =>
                <option key={i++} value={item.name}>{item.name}</option>
            );
        }
        else {
            return null
        }
    }

    showThemesList(){
        let i = 0;
        let arr = this.props.userStore.themesList;

        return this.props.themeStore.ThemesList.map(item=>
             <li key={i++}>
                 <input onChange={(val)=>this.updateCheckbox(item.id, val)} id={item.slug} type="checkbox" hidden checked={(arr.indexOf(item.id)!=-1)?true:false}/>
                 <label htmlFor={item.slug}>{item.name}</label>
             </li>
         )
    }

    updateCheckbox(id, val){
        let themesListId = this.props.userStore.themesList;
        if(val.target.checked){
            if (!themesListId.some((number)=>id==number)){
                themesListId.push(id);
            }
            else {
                themesListId=themesListId.filter((number)=>id!=number).slice();
            }
        }
        else {
            if (!themesListId.some((number)=>id==number)){
                themesListId.pop(id);
            }
            else {
                themesListId=themesListId.filter((number)=>id!=number).slice();
            }
        }

        this.props.userStore.setThemesList(themesListId);
    }

    showValidationMessage(){
        let text = '';
        if (this.props.userStore.validators.emailMsg ||
            this.props.userStore.validators.occupationMsg ||
            this.props.userStore.validators.phoneMsg ||
            !this.props.viewerStore.token){
            if (this.props.userStore.validators.emailMsg || this.props.userStore.validators.occupationMsg || this.props.userStore.validators.phoneMsg){
                text = 'Por favor llene todos los campos requeridos';
            }
            if (!this.props.viewerStore.token){
                text = 'Por favor inicia sesión o regístrate';
            }

            return (
                <div className="error-msg">
                    <i className="flaticon-warning"/>
                    <p>{text}</p>
                </div>
            )
        }
        else return null
    }

    handleSubmitForm = (e) => {
        if (this.props.viewerStore.token) {
            e.preventDefault();
            this.confirmOptIn(e);
            this.props.userStore.setUserInfo();
        }
    };

    showSubmitBtn(){
        if (!this.props.userStore.inProgressUserInfo){
            return (
                <div>
                    {this.showProfileChangeSuccess()}
                    <div className="ep-c-btn"><Link to="#" className="btn1" onClick={this.handleSubmitForm}>guardar</Link></div>
                </div>
            )
        } else {
            return (<div className="spinner" />)
        }
    }

    showProfileChangeSuccess(){
        if (this.props.viewerStore.isProfileChangeSuccess){
            return(
                <div className="confirm-msg">
                    <p className="confirm-msg2">Tus cambios han sido guardados con éxito.</p>
                </div>)
        }
    }

    showMetaData(){
        let vTitle = "Editar perfil";
        let vDescription = "Editar perfil";

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }
    handleBDayChange = e => {
        if(e.target.value!=0){
            this.props.userStore.setBDay(e.target.value);
        } else {
            this.props.userStore.setBDay(0);
        }
    };
    handleBMonthChange = e => {
        if(e.target.value!=0){
            this.props.userStore.setBMonth(e.target.value);
        } else {
            this.props.userStore.setBMonth(0);
        }
    };
    handleBYearChange = e => {
        if(e.target.value!=0){
            this.props.userStore.setBYear(e.target.value);
        } else {
            this.props.userStore.setBYear(0);
        }
    };
    showDays(){
        let selectDays = [];
        selectDays.push(<option value="0">Día</option>);
        for(let i=1; i<=31; i++) {
            selectDays.push(<option value={i<10?"0"+i:i}>{i<10?"0"+i:i}</option>);
        }
        return selectDays;
    };

    showMonths(){
        let selectMonths = [];
        selectMonths.push(<option value="0">Mes</option>);
        for(let i=1; i<=12; i++) {
            selectMonths.push(<option value={i<10?"0"+i:i}>{i<10?"0"+i:i}</option>);
        }
        return selectMonths;
    };
    showYears(){
        let selectYears = [];
        selectYears.push(<option value="0">Año</option>);
        for(let i=1900; i<=2017; i++) {
            selectYears.push(<option value={i}>{i}</option>);
        }
        return selectYears;
    };

    render() {
        return (
            <div className="page profile">
                {this.showMetaData()}
                <TopBanner type="small">
                    Tu perfil
                </TopBanner>

                <div className="container c-ep top1">

                    {this.showValidationMessage()}

                    <form className="fotm1">
                        <div className="ep-b1">
                            <div className="ep-b1-1 mob-f1">Nombre real</div>
                            <div className="ep-b1-2-cu">{this.props.userStore.currentUser?this.props.userStore.currentUser.realname:''}</div>
                            <div className="ep-b1-3">{this.props.userStore.currentUser?'** No es posible cambiar tu nombre de usuario':''}</div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1 mob-f1">Apodo comunidad</div>
                            <div className="ep-b1-2-cu">{this.props.userStore.currentUser?this.props.userStore.currentUser.username:''}</div>
                            <div className="ep-b1-3">{this.props.userStore.currentUser?'** No es posible cambiar tu apodo':''}</div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1 mob-f1">Rol comunidad</div>
                            <div className="ep-b1-2-cu">{this.props.userStore.currentUser?this.props.userStore.currentUser.role:''}</div>
                            <div className="ep-b1-3">{this.props.userStore.currentUser?'** Es otorgado de acuerdo a tu participación':''}</div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">E-mail</div>

                            <div className={(this.props.userStore.validators.emailMsg)?"ep-b1-2 error-field":"ep-b1-2"}>
                                {(this.props.userStore.validators.emailMsg)?<p className="error-message">{this.props.userStore.validators.emailMsg}</p>:""}
                                <input onChange={this.handleEmailChange} type="email" className="cui2" value={this.props.userStore.newEmail}/>
                            </div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">País</div>
                            <div className="ep-b1-2">
                                <div className="cu-sel ep-sel">
                                    <select onChange={this.handleCountryChange} value={this.props.userStore.newCountry}>
                                        <option value=""></option>
                                        {this.showContriesList()}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Fecha de Nacimiento</div>
                            <div className={(this.props.userStore.validators.birthdayMsg)?"ep-b1-2 error-field":"ep-b1-2"}>
                                {(this.props.userStore.validators.birthdayMsg)?<p className="error-message">{this.props.userStore.validators.birthdayMsg}</p>:""}
                                <div className="line-controls mw400">
                                    <div className="cu-sel fmr1">
                                        <select onChange={this.handleBDayChange} value={this.props.userStore.newBday}>
                                            {this.showDays()}
                                        </select>
                                    </div>
                                    <div className="cu-sel fmr1">
                                        <select onChange={this.handleBMonthChange} value={this.props.userStore.newBmonth}>
                                            {this.showMonths()}
                                        </select>
                                    </div>
                                    <div className="cu-sel">
                                        <select onChange={this.handleBYearChange} value={this.props.userStore.newByear} >
                                            {this.showYears()}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Número de celular*</div>

                            <div className={(this.props.userStore.validators.phoneMsg)?"ep-b1-2 error-field":"ep-b1-2"}>
                                {(this.props.userStore.validators.phoneMsg)?<p className="error-message">{this.props.userStore.validators.phoneMsg}</p>:""}
                                <div className="ep-phone">
                                    <div className="phone-code"><div className="ep-flag" style={{backgroundImage: 'url('+this.props.discussionStore.CountryInfo.flag_image+')'}} />{this.props.discussionStore.CountryInfo.phone_code}</div>
                                    <input onChange={this.handlePhoneChange} type="number" value={this.props.userStore.newPhone} placeholder="Escribe tu Número de Celular" />
                                </div>
                            </div>
                            <div className="ep-b1-3">{this.props.userStore.currentUser?'** Esta información es privada':''}</div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Género</div>
                            <div className="ep-b1-2">
                                <div className="cu-sel ep-sel">
                                    <select onChange={this.handleGenderChange} value={this.props.userStore.newGender}>
                                        <option value="Mujer">Mujer</option>
                                        <option value="Hombre">Hombre</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Imagen de perfil</div>

                            <div className="ep-b1-2">
                                <UploadImage/>
                            </div>

                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Lista de intereses</div>
                            <div className="ep-b1-2">
                                <ul className="ch-boxes-list">
                                    {this.showThemesList()}
                                </ul>
                            </div>
                            <div className="ep-b1-3">** Recibirás información relacionada en tu e-mail y Facebook semanalmente</div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Ocupación</div>
                            <div className={(this.props.userStore.validators.occupationMsg)?"ep-b1-2 error-field":"ep-b1-2"}>
                                {(this.props.userStore.validators.occupationMsg)?<p className="error-message">{this.props.userStore.validators.occupationMsg}</p>:""}
                                <input onChange={this.handleOccupationChange} type="text" className="cui2" value={this.props.userStore.newOccupation} placeholder="Escribe a que te dedicas" />
                            </div>
                            <div className="ep-b1-3">** Esta información es privada</div>
                        </div>

                        <div className="ep-b1">
                            <div className="ep-b1-1">Firma personal</div>
                            <div className="ep-b1-2 ep-info">
                                <textarea value={this.props.userStore.newInfo} onChange={this.handleInfoChange} placeholder="Escribe aquí un mensaje que refleje tu personalidad o que desees compartir con la comunidad."/>
                            </div>
                            <div className="ep-b1-3">** Este mensaje aparecerá en todos tus comentarios de la comunidad</div>
                        </div>
                        {this.showFBcheckbox()}
                        {this.showSubmitBtn()}
                    </form>
                </div>
            </div>
        );
    }
}

export default EditProfile;
