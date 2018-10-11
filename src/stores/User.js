import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import authStore from './Auth';
import discussionStore from './Discussion';

class UserStore {
    @observable inProgressUser = false;
    @observable inProgressUserInfo = false;
    @observable currentUser = undefined;
    @observable newEmail = '';
    @observable newCountry = '';
    @observable newPhone = '';
    @observable newOccupation = '';
    @observable newInfo = '';
    @observable themesList = [];
    @observable newImage = {};
    @observable newGender = '';
    @observable errorDescription = [];
    @observable UserId = '';
    @observable newUserInfoSuccess = false;

    @observable newBday = 0;
    @observable newBmonth = 0;
    @observable newByear = 0;

    @action confirm() {
        return Api('/send-confirmation-email')
            .then(action('then', (user) => {
                history.replaceState(null, null, '/confirmar-suscripcion');
                history.go(0);
            }))
            .catch(action('catch', ({error}) => {

            }))
    }

    @action pullUser() {
        this.inProgressUser = true;
        return Api('/user')
            .then(action('then', (user) => {
                this.inProgressUser = false;
                this.currentUser = user;
                this.setTempUserData(user);
                this.UserId = user.user_id;

            }))
            .catch(action('catch', ({error}) => {
                this.inProgressUser = false;
                if(error){
                    window.localStorage.removeItem('jwt');
                    viewerStore.token = null;
                }
            }))
    }

    @action setCurrentUser(user) {
        this.currentUser = user;
    }

    @action setTempUserData(user) {
        if(user.birthday!=null){
            let dateObj = new Date(user.birthday);

            this.newBday = (dateObj.getDate())>9?(dateObj.getDate()):"0"+(dateObj.getDate());
            this.newBmonth = (1+dateObj.getMonth())>9?(1+dateObj.getMonth()):"0"+(1+dateObj.getMonth());
            this.newByear = dateObj.getFullYear();
        }

        this.newEmail = user.email;

        this.newCountry = user.country;
        if(user.country){
            discussionStore.pullCountryInfo(this.newCountry);
        }
        else {
            discussionStore.pullCountryInfo('Argentina');
        }
        this.newPhone = user.phone_number;

        this.newOccupation = user.occupation;

        this.newInfo = user.signature;

        if(user.gender!="Mujer" && user.gender!="Hombre"){
            this.newGender = "Mujer";
        } else {
            this.newGender = user.gender;
        }

        let arr = user.subscription;
        let userThemeId = [];
        arr.filter(function(selected_id) {
            userThemeId.push(selected_id.theme_id);
        });
        this.themesList = userThemeId;

        if(user.avatar=''){
            this.newImage = '/images/no-program.png';
        }
        else {
            this.newImage = user.avatar;
        }



    }

    @action resetTempUserData() {
        this.newEmail = '';
        this.newCountry = 'Argentina';
        discussionStore.pullCountryInfo(this.newCountry);
        this.newPhone = '';
        this.newOccupation = '';
        this.newInfo = '';
        this.newGender = "Mujer";
        this.themesList = [];
        this.newImage = '/images/no-program.png';
    }

    @action resetUser() {
        this.currentUser = undefined;
    }

    @action setNewEmail(newEmail) {
        this.newEmail = newEmail;
    }

    @action setNewCountry(newCountry) {
        this.newCountry = newCountry;
    }

    @action setNewPhone(newPhone) {
        this.newPhone = newPhone;
    }

    @action setNewOccupation(newOccupation) {
        this.newOccupation = newOccupation;
    }

    @action setNewInfo(newInfo) {
        this.newInfo = newInfo;
    }

    @action setGender(newGender) {
        this.newGender = newGender;
    }

    @action setThemesList(themesList) {
        this.themesList = themesList;
    }

    @action setNewImage(newImage) {
        this.newImage = newImage;
    }

    @action setBDay(bday) {
        this.newBday = bday;
    }

    @action setBMonth(bmonth) {
        this.newBmonth = bmonth;
    }

    @action setBYear(byear) {
        this.newByear = byear;
    }
    @observable validators = {
        emailMsg: '',
        occupationMsg: '',
        phoneMsg: '',
        birthdayMsg: ''
    };

    @action userInfoValidation(){
        let valid = true;

        // E-mail validation
        if(this.newEmail=='' || !authStore.validateEmail(this.newEmail)){
            this.validators.emailMsg = 'El correo electrónico es un campo obligatorio';
            valid = false;
        }
        else if(!authStore.validateEmail(this.newEmail)){
                this.validators.emailMsg = 'El correo electrónico no es correcto';
                valid = false;
        }
        else {
            this.validators.emailMsg = '';
        }

        if((this.newBday!=0 && this.newBmonth!=0 && this.newByear!=0) || (this.newBday==0 && this.newBmonth==0 && this.newByear==0)){
            this.validators.birthdayMsg = '';
            console.log("valid");
        } else {
            this.validators.birthdayMsg = 'Fecha de nacimiento incorrecta';
            valid = false;
            console.log("no valid");
        }

        if(this.newPhone){
            valid = true;
            if (this.newPhone.length>0 && !authStore.validatePhone(this.newPhone)){
                this.validators.phoneMsg = 'El correo número de celular no es correcto';
                valid = false;
            } else {
                this.validators.phoneMsg = '';
            }
        }
        return valid;

    };

    @action setUserInfo() {
        if (this.userInfoValidation()) {
            this.inProgressUserInfo = true;
            let birthday = null;
            if (this.newBday!=0 && this.newBmonth!=0 && this.newByear!=0){
                birthday = this.newByear+"-"+this.newBmonth+"-"+this.newBday;
            }
                return Api('/set-user', {
                method: 'post', body: {
                    'user_id': this.currentUser.user_id,
                    'email': this.newEmail,
                    'country': this.newCountry,
                    'birthday': birthday,
                    'avatar': this.newImage,
                    'phone_number': this.newPhone,
                    'gender': this.newGender,
                    'occupation': this.newOccupation,
                    'signature': this.newInfo,
                    'themes_list': this.themesList
                }
            })
                .then(action('then', (data) => {
                    this.inProgressUserInfo = false;
                    this.newUserInfoSuccess = data.success;
                    if (data.success){
                        this.pullUser();
                        viewerStore.setProfileChangeSuccess(true);

                    }
                }))
                .catch(action('catch', ({error}) => {
                    this.inProgressUserInfo = false;
                }))
        }
    }
}

export default new UserStore();
