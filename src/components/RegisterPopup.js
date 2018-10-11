import React, {Component} from 'react';
import Golink from '../components/Golink';
import StepBar from '../components/StepBar';
import StepBar3 from '../components/StepBar3';
import FBAuth from '../components/FBAuth';
import FacebookProvider, { MessengerCheckbox } from 'react-facebook';
import styles from '../styles/components/RegisterPopup.css';

import {inject, observer} from 'mobx-react';

@inject('themeStore', 'viewerStore', 'authStore', 'userStore', 'directoriesStore')
@observer

class RegisterPopup extends Component {
    constructor(props){
        super(props);
    };
    componentDidMount () {
        this.props.directoriesStore.pullCountriesList();
        if(this.props.themeStore.ThemesList.length==0){
            this.props.themeStore.pullThemesList();
        }
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
    }
    showFBcheckbox2(){
        return(
            <div className="c-reg-check">
                <FacebookProvider appId={CONFIG.fb.appId}>
                    <MessengerCheckbox
                        appId={CONFIG.fb.appId}
                        pageId={CONFIG.fb.pageId}
                        origin={typeof window !== 'undefined' ? window.location.origin : ""}
                        prechecked={false}
                        allowLogin={false}
                        userRef={typeof window !== 'undefined' ? window.userRefId : ""}
                    />
                </FacebookProvider>
            </div>
        );
    }

    confirmOptIn2() {
        FB.AppEvents.logEvent('MessengerCheckboxUserConfirmation', null, {
            'app_id': CONFIG.fb.appId,
            'page_id': CONFIG.fb.pageId,
            'ref': null,
            'user_ref': window.userRefId
        });
    }

    showLogin = (e) => {
        e.preventDefault();
        this.props.viewerStore.showLogin();
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
    showError() {
        if (this.props.authStore.error) {
            return (
                <div className="c-error">{this.props.authStore.error}</div>
            )
        }
    };
    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handlePasswordConfirmationChange = e => this.props.authStore.setPasswordConfirmation(e.target.value);
    handleRealnameChange = e => this.props.authStore.setRealname(e.target.value);
    handleUsernameChange = e => this.props.authStore.setUsername(e.target.value);
    handleCountryChange = e => {
        if(e.target.value!=""){
            this.props.authStore.setCountry(e.target.options[e.target.selectedIndex].text);
        } else {
            this.props.authStore.setCountry("");
        }
    };
    handleBDayChange = e => {
        if(e.target.value!=0){
            this.props.authStore.setBDay(e.target.value);
        } else {
            this.props.authStore.setBDay("01");
        }
    };
    handleBMonthChange = e => {
        if(e.target.value!=0){
            this.props.authStore.setBMonth(e.target.value);
        } else {
            this.props.authStore.setBMonth("01");
        }
    };
    handleBYearChange = e => {
        if(e.target.value!=0){
            this.props.authStore.setBYear(e.target.value);
        } else {
            this.props.authStore.setBYear("1900");
        }
    };

    buttonDisabled(){
        if (typeof document === 'undefined') return;
        document.getElementById('btn1');
        btn1.disabled = true;
    }

    /* SUBMIT REGISTER  */
    handleSubmitForm = (e) => {
        this.buttonDisabled();
        e.preventDefault();
        this.confirmOptIn2();
        if(this.props.authStore.fbData.profile){
            this.props.authStore.fbRegister();
        } else {
            this.props.authStore.register();
        }

    };

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass(param);
    };
    hidePopup(){
        this.props.viewerStore.setRegisterPopup(false);
        this.bodyClass(false);
    };
    showError(field){
        if(this.props.authStore.validErrors){
            if(this.props.authStore.validErrors[field]){
                return (<p className="error-message">{this.props.authStore.validErrors[field][0]}</p>)
            }
        } else {
            return null
        }
    }
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
    /*--------------------------------- First Step ------------------------------*/
    showFirstStep(){
        return(
            <form className="fotm1" style={{display:this.props.viewerStore.registerStep==2?" none":"block"}}>
                <div className="form-item">
                    <label>Nombre Real</label>
                    {this.showError("realname")}
                    <input onChange={this.handleRealnameChange} type="text" className="" placeholder="Este nombre es privado" />
                </div>
                <div className="form-item">
                    <label>Apodo para la Comunidad</label>
                    {this.showError("username")}
                    <input onChange={this.handleUsernameChange} type="text" className="" placeholder="Este nombre es público y permanente" />
                    <div className="input-desk">Máximo 16 caracteres.</div>
                </div>
                <div className="form-item">
                    <label>E-mail / Correo Electrónico</label>
                    {this.showError("email")}
                    <input onChange={this.handleEmailChange} type="email" className="" placeholder="Al que te enviaremos deliciosas recetas" />
                </div>
                <div className="form-item">
                    <div className="line-controls col-controls-mob">
                        <div className="cui3 fmr1">
                            <label>Contraseña</label>
                            {this.showError("password")}
                            <input onChange={this.handlePasswordChange} type="password" className="" placeholder="" />
                        </div>
                        <div className="cui3">
                            <label>Confirmar Contraseña</label>
                            {this.showError("confirm_password")}
                            <input onChange={this.handlePasswordConfirmationChange} type="password" className="" placeholder="" />
                        </div>
                    </div>
                </div>


                <div className="form-item">
                    <div className="line-controls col-controls-mob">
                        <div className="cui4 fmr1">
                            <label>País</label>
                            {this.showError("country")}
                            <div className="cu-sel">
                                <select onChange={this.handleCountryChange}>
                                    <option value="">Selecciona tu país</option>
                                    {this.showContriesList()}
                                </select>
                            </div>
                        </div>
                        <div className="w100">
                            <label>Fecha de Nacimiento</label>
                            {this.showError("birthday")}
                            <div className="line-controls">
                                <div className="cu-sel fmr1">
                                    <select onChange={this.handleBDayChange}>
                                        {this.showDays()}
                                    </select>
                                </div>
                                <div className="cu-sel fmr1">
                                    <select onChange={this.handleBMonthChange}>
                                        {this.showMonths()}
                                    </select>
                                </div>
                                <div className="cu-sel">
                                    <select onChange={this.handleBYearChange}>
                                        {this.showYears()}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="input-desk input-desk2">Permanecerás conectada hasta que desconectes tu cuenta manualmente.
                    </div>
                </div>


                {this.showError()}
                <div onClick={(e)=>{this.props.authStore.stepOneValidate()}} className="btn-submit cu-btn-submit">Regístrame {this.props.viewerStore.AfterBuy?" y recibir compra":""} </div>
                <div className="c-reg-popup-link">
                    <Golink prevent={true} click={(e)=>{this.props.viewerStore.showLogin();}} chref="" size="gl1">¿Ya tienes una cuenta? Conéctate aquí</Golink>
                </div>

            </form>

        )
    }

    updateCheckbox(id, val){
        let lselectedThemes = this.props.authStore.values.themes_list;
        if(val.target.checked){
            if (!lselectedThemes.some((number)=>id==number)){
                lselectedThemes.push(id);
            }
        } else {
            lselectedThemes=lselectedThemes.filter((number)=>id!=number).slice();
        }

        this.props.authStore.setSelectedThemes(lselectedThemes);
    }
    showThemesList(){
        let i=0;
        return this.props.themeStore.ThemesList.map(item=>
            <li key={i++}>
                <input onChange={(val)=>this.updateCheckbox(item.id, val)} id={item.slug} type="checkbox" hidden />
                <label htmlFor={item.slug}>{item.name}</label>
            </li>
        )
    }

    /*--------------------------------- Second Step ------------------------------*/
    showRegisterLink(){

        if(this.props.authStore.inProgressReg){
            return (
                <div>
                    <div className="spinner" />
                    <div className="btn-submit cu1-btn-submit rs2-pos btn-disabled">{this.props.viewerStore.AfterBuy?"Recibir mi compra":"Completar Registro "} </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div id="btn1" onClick={this.handleSubmitForm} type="submit" className="btn-submit cu1-btn-submit rs2-pos">{this.props.viewerStore.AfterBuy?"Recibir mi compra":"Completar Registro "} </div>
                </div>
            )
        }
    }


    showSecondStep(){
        return (
            <form className="step2" style={{height: this.props.viewerStore.registerStep==1?" 0":"auto"}}>
                <ul className="ch-boxes-list">
                    {this.showThemesList()}
                </ul>
                <div className="green-container">
                    ¡REGALO: Marca la casilla abajo y recibe una receta de un postre delicioso en Facebook!
                    <div className="down-arrow" />
                </div>
                {this.showFBcheckbox2()}
                {this.showRegisterLink()}

            </form>
        )
    }


/*https://developers.facebook.com/apps/1996370243971490/fb-login/settings/*/
    showStep1Title(){
        if(this.props.viewerStore.registerStep==1){
            return(
                <h4 className="p-reg-title3">
                    O Regístrate con tu correo electrónico:
                </h4>
            )
        }
    }
    showTopTitle(){
        if(this.props.viewerStore.registerStep==1 && this.props.viewerStore.AfterBuy){
            return (
                <h3 className="ap-popup-h3">Pago exitoso</h3>
            )
        }

        if(this.props.viewerStore.registerStep==1 && !this.props.viewerStore.AfterBuy){

            return (
                <div>
                    <h3 className="p-reg-title mob-hide">Crea tu cuenta, es gratis.</h3>
                    <h3 className="p-reg-title-mob desk-hide fix-reg-title">Crea tu cuenta,<br/>
                        ¡Es gratis!</h3>
                </div>
            )
        }

        if(this.props.viewerStore.registerStep==2 && this.props.viewerStore.AfterBuy){
            return (
                <h3 className="ap-popup-h3">Pago exitoso</h3>
            )
        }

        if(this.props.viewerStore.registerStep==2 && !this.props.viewerStore.AfterBuy){
            return (
                <h3 className="p-reg-title mob-hide">Marca según tu interés:</h3>
            )
        }
    }


    showSecondTitle(){
        if(this.props.viewerStore.registerStep==1 && this.props.viewerStore.AfterBuy){
            return (
                <h3 className="p-reg-title2">Crea tu cuenta</h3>
            )
        }

        if(this.props.viewerStore.registerStep==1 && !this.props.viewerStore.AfterBuy){
            return null
        }

        if(this.props.viewerStore.registerStep==2 && this.props.viewerStore.AfterBuy){
            return (
                <div>
                    <h2 className="ap-popup-h2">Marca según tu interés:</h2>
                    <h3 className="p-reg-title2">¡Recibirás noticias semanalmente!</h3>
                </div>
            )
        }

        if(this.props.viewerStore.registerStep==2 && !this.props.viewerStore.AfterBuy){
            return (
                <div>
                    <h3 className="p-reg-title-n desk-hide">Marca según tu interés:</h3>
                    <h3 className="p-reg-title2 p-reg-title2-n">¡Recibirás noticias semanalmente!</h3>
                </div>
            )
        }
    }

    render() {
        {this.bodyClass(this.props.viewerStore.showRegisterPopup)}
        return (
            <div className="c-popup-cover" style={{left: this.props.viewerStore.showRegisterPopup?" 0":"150%"}} onClick={()=>{this.hidePopup()}}>
                <div className="c-popup cp-reg" onClick={(e)=>{e.stopPropagation()}}>
                    <div className="c-btn-close">
                        <span onClick={()=>{this.hidePopup()}} className="flaticon-cancel btn-close3"/>
                    </div>
                    <div className="w-popup-content">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="center-container-new">
                                    {this.showTopTitle()}

                                    {this.props.viewerStore.AfterBuy?<StepBar3 step = {this.props.viewerStore.registerStep} />:<StepBar step = {this.props.viewerStore.registerStep} />}
                                    {this.showSecondTitle()}

                                    {this.props.viewerStore.registerStep=="1"?<FBAuth />:""}
                                    {this.showStep1Title()}

                                    {this.showFirstStep()}
                                    {this.showSecondStep()}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default RegisterPopup;

