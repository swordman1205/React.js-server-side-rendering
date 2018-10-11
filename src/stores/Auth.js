import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import userStore from './User';
import paymentStore from './Payment';
class AuthStore {
    @observable inProgress = false;
    @observable inProgressReg = false;
    @observable error = undefined;
    @observable recoveryEmail = '';
    @observable recoveryToken = '';
    @observable recoveryError = '';
    @observable validErrors = [];
    @observable tempUserNickname = '';
    @observable inputUserNickname = '';
    @observable fbData = {};
    @observable userRef = '';

    @observable values = {
        email: '',
        password: '',
        password_confirmation: '',
        realname: '',
        username: '',
        country: '',
        bday: '00',
        bmonth: '00',
        byear: '0000',
        birthday: '0000.00.00',
        themes_list: [],
        user_ref: ""
    };
    @action setUserRef(id){
        this.values.user_ref = id;
    }
    @action setInputUserNickname(nickname){
        this.inputUserNickname = nickname;
    }
    @action setRecoveryEmail(email) {
        this.recoveryEmail = email;
    }

    @action setRecoveryToken(token) {
        this.recoveryToken = token;
    }

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setPassword(password) {
        this.values.password = password;
    }
    @action setPasswordConfirmation(passwordConfirmation) {
        this.values.password_confirmation = passwordConfirmation;
    }
    @action setRealname(name) {
        this.values.realname = name;
    }

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setCountry(country) {
        this.values.country = country;
    }

    @action setBDay(bday) {
        this.values.bday = bday;
    }

    @action setBMonth(bmonth) {
        this.values.bmonth = bmonth;
    }

    @action setBYear(byear) {
        this.values.byear = byear;
    }

    @action setSelectedThemes(SelectedThemes) {
        this.values.themes_list = SelectedThemes;
    }

    @action reset() {
        this.values.email = '';
        this.values.password = '';
    }

    @action onError(err) {
        // ...
        this.inProgress = false;
    }

    @action validateEmail(email){
        var re = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
        return re.test(email);
    }

    @action validatePhone(phone){
        var re = /^\d+$/;
        return re.test(phone);
    }

    @action adminLogin(adminToken) {
        viewerStore.setToken(adminToken);
        userStore.pullUser();
    }

    @action login(email = this.values.email, password = this.values.password) {
        this.inProgress = true;
        this.error = undefined;
        return Api('/login', {method: 'post', body: {email, password}})
            .then(action('then', (user) => {
                this.inProgress = false;
                viewerStore.setToken(user.token);
                userStore.setCurrentUser(user);
                userStore.setTempUserData(user);
                history.replaceState(null, null, '/');
                history.go(0);
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
                this.inProgress = false;
            }))
    }

    @action register() {
        this.inProgressReg = true;
        this.error = undefined;
        const {email, password, password_confirmation, realname, username, country, bday, bmonth, byear, themes_list, user_ref} = this.values;
        let birthday = byear+'-'+bmonth+'-'+bday;
        return Api('/register', {method: 'post', body: {email, password, password_confirmation, realname, username, country, birthday, themes_list, user_ref}})
            .then(action('then', (user) => {
                window.localStorage.setItem('justRegister', true);
                viewerStore.setToken(user.token);
                userStore.setCurrentUser(user);
                userStore.setTempUserData(user);
                if(window.localStorage.getItem('tx')){
                    window.localStorage.removeItem('justRegister');
                    paymentStore.payPalAfter(window.localStorage.getItem('tx'));
                } else

                // After PayU
                if(window.localStorage.getItem('transaction_id')){
                    window.localStorage.removeItem('justRegister');
                    paymentStore.payUafter(window.localStorage.getItem('transaction_id'));
                } else {
                    history.replaceState(null, null, '/confirmacion-despues-subscripcion');
                    history.go(0);
                    this.inProgressReg = false;
                }

            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
                this.inProgressReg = false;
            }))
    }
    @action stepOneValidate() {
        this.fbData = {};
        const {email, password, password_confirmation, realname, username, country, bday, bmonth, byear} = this.values;
        let birthday = byear+'-'+bmonth+'-'+bday;
        return Api('/register-validation', {method: 'post', body: {email, password, password_confirmation, realname, username, country, birthday}})
            .then(action('then', (data) => {
                if(data.success){
                    viewerStore.setRegisterStep(2);
                } else {
                    this.validErrors = data.errors;
                }

            }))
            .catch(action('catch', ({error}) => {
                //window.history.pushState(null, null, '/');
                this.error = error;
                this.inProgressReg = false;
            }))
    }
    @action logout() {
        this.inProgress = true;
        this.error = undefined;
        return Api('/logout')
            .then(action('then', () => {
                this.inProgress = false;
                viewerStore.setToken(false);
                userStore.resetUser();
                userStore.resetTempUserData();
                history.replaceState(null, null, '/');
                history.go(0);
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
                this.inProgress = false;
            }))
    }

    @action sendRecoveryMail() {
        this.error = undefined;
        return Api('/send-restore-link', {method: 'post', body: {email: this.recoveryEmail}})
            .then(action('then', (data) => {
                viewerStore.isPasswordAssistance = false;
                if(data.link_sent){
                    viewerStore.showPasswordConfirmation();
                } else {
                    viewerStore.showPasswordAssistanceErr();
                }
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
            }))
    }

    @action changePassword(password, confirmPassword){
        if(password == ""){
            return this.recoveryError = 'l campo contraseña no puede estar vacío';
        }

        if(confirmPassword == ""){
            return this.recoveryError = 'l campo confirmar contraseña no puede estar vacío';
        }
        if(password != confirmPassword){
            return this.recoveryError = 'El campo de contraseña y confirmación de contraseña deben tener los mismos valores';
        }


        return Api('/change-password', {method: 'post', body: {restore_token: this.recoveryToken, new_password: password}})
            .then(action('then', (data) => {
                viewerStore.hideCreateNewPassword();

                if(data.password_changed){
                    this.login(data.email, password);
                } else {
                    location.href="/confirmacion-error";
                }
            }))
            .catch(action('catch', ({error}) => {
                this.recoveryError = error;
            }))
    }

    @action checkEmailConfirmation(confirmToken) {
        return Api('/confirm-email', {method: 'post', body: {confirmation_token: confirmToken}})
            .then(action('then', (data) => {
                if(data.confirmed){
                    viewerStore.setToken(data.token);
                    userStore.pullUser();
                    location.href="/email-confirmacion-exitosa";
                } else {
                    location.href="/confirmacion-error";
                }

            }))
            .catch(action('catch', ({error}) => {
                this.recoveryError = error;
            }))
    }
    makeUsername() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return "User"+text;
    }
    @action fbLogin(fbData) {

        if(fbData.tokenDetail){
            return Api('/fb-login', {method: 'post', body: {fb_userid: fbData.tokenDetail.userID, fb_token: fbData.tokenDetail.accessToken}})
                .then(action('then', (data) => {
                    if(data.need_register){
                        this.fbData = fbData;

                        if(fbData.profile.email){
                            this.tempUserNickname = fbData.profile.email.split('@')[0];
                        } else {
                            this.tempUserNickname = this.makeUsername();
                        }

                        viewerStore.showChooseNicknamePopup();
                    } else {

                        viewerStore.setToken(data.user.token);
                        userStore.setCurrentUser(data.user);
                        userStore.setTempUserData(data.user);

                        //ToDo - it's workaround, should be redirected properly
                        history.go();
                        /*this.clearFBregistration(data.user.user_id);*/
                    }
                }))
                .catch(action('catch', ({error}) => {

                }))
        } else {
            return null;
        }
    }

    @action changeUsername(){
        if(this.inputUserNickname!=''){
            this.fbData.profile.username = this.inputUserNickname;
        } else {
            this.fbData.profile.username = this.tempUserNickname;
        }
    }

    @action fbRegister() {
        this.changeUsername();
        this.inProgressReg = true;
        return Api('/fb-register', {method: 'post', body: {fb_user: this.fbData, themes_list: this.values.themes_list, user_ref:this.values.user_ref}})
            .then(action('then', (user) => {
                window.localStorage.setItem('justRegister', true);
                this.inProgressReg = false;
                viewerStore.setToken(user.token);
                userStore.setCurrentUser(user);
                userStore.setTempUserData(user);

                if(window.localStorage.getItem('tx')){
                    window.localStorage.removeItem('justRegister');
                    paymentStore.payPalAfter(window.localStorage.getItem('tx'));
                } else

                // After PayU
                if(window.localStorage.getItem('transaction_id')){
                    window.localStorage.removeItem('justRegister');
                    paymentStore.payUafter(window.localStorage.getItem('transaction_id'));
                } else {
                    history.replaceState(null, null, '/confirmacion-despues-subscripcion');
                    history.go(0);
                }

                this.fbData = {};
            }))
            .catch(action('catch', ({error}) => {

            }))
    }

    @action clearFBregistration(userId) {
        return Api('/remove-user', {method: 'post', body: {user_id: userId}})
            .then(action('then', (data) => {

            }))
            .catch(action('catch', ({error}) => {

            }))
    }

}

export default new AuthStore();
