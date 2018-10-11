import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import authStore from './Auth';

class PaymentStore {
    @observable inProgress = false;
    @observable inProgressPU = false;
    @observable error = undefined;
    @observable product = undefined;
    @observable payUcountries = [];
    @observable country = 'País';
    @observable countryCode = '';
    @observable cities = [];
    @observable tx;
    @observable errorDescription = '';
    @observable inProgressProduct = false;
    @observable deviceSessionId = '';
    @observable payUid = '';
    @observable checkoutCheckbox = false;
    @observable flag = '';



    @observable validators = {
        emailMsg: '',
        countryMsg: '',
        cityMsg: '',
        addressMsg: '',
        documentTypeMsg: '',
        documentNumberMsg: '',
        phoneMsg: '',
        cardHolderMsg: '',
        cardNumberMsg: '',
        cvcMsg: '',
        cardMonthMsg: '',
        cardYearMsg: '',
        rulesMsg: false
    };

    @observable payu = {
        email: '',
        country: '',
        city: '',
        address: '',
        documentType: '',
        documentNumber: '',
        phone: '',
        cardHolder: '',
        cardNumber: '',
        cvc: '',
        cardMonth: '',
        cardYear: '',
        rules: false
    };

/*  Test Data:
    @observable payu = {
        email: 'test@test.com',
        country: 'PE',
        city: 'Trujillo',
        address: 'Test Address',
        documentType: 'CC',
        documentNumber: '1233211',
        phone: '1233211',
        cardHolder: 'APPROVED',
        cardNumber: '4111111111111111',
        cvc: '123',
        cardMonth: '10',
        cardYear: '2023'
    };*/

    @action setCheckoutCheckbox(val){
        this.checkoutCheckbox = val;
    };
    @action setEmail(email){
        this.payu.email = email;
    };
    @action setCountry(countryName, countryAbbr, countryCode = ""){
            this.payu.country = countryAbbr;
            this.country = countryName;
            this.countryCode = countryCode;
    };
    @action setCity(city){
        if(city!="0"){
            this.payu.city = city;
        } else {
            this.payu.city = '';
        }
    };
    @action setAddress(address){
        this.payu.address = address;
    };
    @action setDocumentType(type){
        if(type!="0"){
            this.payu.documentType = type;
        } else {
            this.payu.documentType = '';
        }
    };
    @action setDocumentNumber(number){
        this.payu.documentNumber = number;
    };
    @action setPhone(phone){
        this.payu.phone = phone;
    };
    @action setFlag(flag){
        this.flag = flag;
    };
    @action setCardHolder(cardHolder){
        this.payu.cardHolder = cardHolder;
    };
    @action setCardNumber(cardNumber){
        this.payu.cardNumber = cardNumber;
    };
    @action setCVC(cvc){
        this.payu.cvc = cvc;
    };
    @action setCardMonth(month){
        if(month!="0"){
            this.payu.cardMonth = month;
        } else {
            this.payu.cardMonth = '';
        }
    };
    @action setCardYear(year){
        if(year!="0"){
            this.payu.cardYear = year;
        } else {
            this.payu.cardYear = '';
        }
    };
    @action setRules(val=false){
        this.checkoutCheckbox = val;
        this.payu.rules = val;
    };

    @action payUvalidation(){
        let valid = true;

        // E-mail validation
        if(this.payu.email==''){
            this.validators.emailMsg = 'El correo electrónico es un campo obligatorio';
            valid = false;
        } else if(!authStore.validateEmail(this.payu.email)){
            this.validators.emailMsg = 'El correo electrónico no es correcto';
            valid = false;
        } else {
            this.validators.emailMsg = '';
        }

        // Country validation
        if(this.payu.country==''){
            this.validators.countryMsg = 'El país es un campo obligatorio';
            valid = false;
        } else {
            this.validators.countryMsg = '';
        }

        // City validation
        if(this.payu.city==''){
            this.validators.cityMsg = 'La ciudad es un campo obligatorio';
            valid = false;
        } else {
            this.validators.cityMsg = '';
        }

        // Address validation
        if(this.payu.address==''){
            this.validators.addressMsg = 'La dirección es campo obligatorio';
            valid = false;
        } else {
            this.validators.addressMsg = '';
        }

        // Document Type validation
        if(this.payu.documentType==''){
            this.validators.documentTypeMsg = 'Tipo de documento es un campo obligatorio';
            valid = false;
        } else {
            this.validators.documentTypeMsg = '';
        }

        // Document Number validation
        if(this.payu.documentNumber==''){
            this.validators.documentNumberMsg = 'Número de documento es campo obligatorio';
            valid = false;
        } else {
            this.validators.documentNumberMsg = '';
        }

        // Phone validation
        if(this.payu.phone==''){
            this.validators.phoneMsg = 'Número de teléfono es campo obligatorio';
            valid = false;
        } else {
            this.validators.phoneMsg = '';
        }

        // Card Holder validation
        if(this.payu.cardHolder==''){
            this.validators.cardHolderMsg = 'El titular de la tarjeta es obligatorio en el campo';
            valid = false;
        } else {
            this.validators.cardHolderMsg = '';
        }

        // Card Number validation
        if(this.payu.cardNumber==''){
            this.validators.cardNumberMsg = 'Número de tarjeta es campo obligatorio';
            valid = false;
        } else {
            this.validators.cardNumberMsg = '';
        }

        // CVC validation
        if(this.payu.cvc==''){
            this.validators.cvcMsg = 'CVC es un campo obligatorio';
            valid = false;
        } else {
            this.validators.cvcMsg = '';
        }

        // Card Month validation
        if(this.payu.cardMonth==''){
            this.validators.cardMonthMsg = 'El mes de la tarjeta es un campo obligatorio';
            valid = false;
        } else {
            this.validators.cardMonthMsg = '';
        }

        // Card Year validation
        if(this.payu.cardYear==''){
            this.validators.cardYearMsg = 'El año de la tarjeta es un campo obligatorio';
            valid = false;
        } else {
            this.validators.cardYearMsg = '';
        }
        if(!this.payu.rules){
            this.validators.rulesMsg = true;
            valid = false;
        } else {
            this.validators.rulesMsg = false;
        }
        return valid;
    };

/*  Test Data:
    card_holder     *       string(150)
    card_number     *       0000111122223333
    card_cvc        *       111
    card_month      *       01
    card_year       *       2018
    buyer_email     *       email@email.com
    buyer_country   *       string(2)
    buyer_region            string(40)
    buyer_city      *       string(50)
    buyer_address   *       string
    buyer_idcard
    buyer_dni_number *      string(20) format XXX.XXX.XXX-XX
    buyer_phone     *
*/

    @action payUpayment(){
        if (this.payUvalidation()){
            this.inProgressPU = true;
            return Api('/payu', {method: 'post', body: {
                card_holder: this.payu.cardHolder,
                card_number: this.payu.cardNumber,
                card_cvc: this.payu.cvc,
                card_month: this.payu.cardMonth,
                card_year: this.payu.cardYear,
                buyer_email: this.payu.email,
                buyer_country: this.payu.country,
                buyer_city: this.payu.city,
                buyer_address: this.payu.address,
                buyer_idcard: this.payu.documentType,
                buyer_dni_number: this.payu.documentNumber,
                buyer_phone: this.payu.phone,
                product_id: this.product.product_id,
                device_session_id: this.deviceSessionId
                }
            })
            .then(action('then', (data) => {
                if(data.status) {
                    this.inProgressPU = false;
                    this.payUafter(data.transaction_id);
                } else {
                    this.payu.cardHolder = '';
                    this.payu.cardNumber = '';
                    this.payu.cvc = '';
                    this.payu.cardMonth = '0';
                    this.payu.cardYear = '0';

                    this.inProgressPU = false;
                    this.errorDescription = '';
                    if(data.error_code){
                        this.errorDescription = data.error_code;
                    }
                    if(data.error_description){
                        this.errorDescription = this.errorDescription +' '+data.error_description;
                    }
                }
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressPU = false;
                this.error = error;
            }))
        }
    };
    @action payUafter(transaction_id) {
        const token = viewerStore.token || window.localStorage.getItem('jwt');
        if(token) {
            // check and show success page
            this.payUcheck(transaction_id);

            viewerStore.AfterBuy = false;
            viewerStore.isAfterPaymentPopup = false;
            window.localStorage.removeItem('transaction_id');
        } else {
            viewerStore.AfterBuy = true;
            viewerStore.isAfterPaymentPopup = true;
            window.localStorage.setItem('transaction_id', transaction_id);
        }
    };
    @action payUcheck(transaction_id) {
        return Api('/payu-continue', {method: 'post', body: {transaction_id: transaction_id}})
            .then(action('then', (data) => {
                authStore.inProgressReg = false;
                if (data.success) {
                    window.location.href = '/post-compra';
                } else {
                    window.location.href = '/confirmacion-error';
                }
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
            }))

    };
    @action pullProduct(productToken) {
        this.inProgressProduct = true;
        return Api('/paypal-get-product', {method: 'post', body: {hash: productToken}})
            .then(action('then', (data) => {
                this.inProgressProduct = false;
                this.product = data;
                if(data.error){
                    this.errorDescription = data.error;
                }
                this.payUid = data.device_session_id+data.user_id;
                this.deviceSessionId = data.device_session_id;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressProduct = false;
                this.error = error;
            }))
    };
    @action pullPayUcountries() {
        return Api('/payu-countries')
            .then(action('then', (data) => {
                this.payUcountries = data;
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
            }))
    };
    @action pullCities(countrySlug) {
        if(countrySlug!=''){
        return Api('/countries-cities', {method: 'post', body: {country_slug: countrySlug}})
            .then(action('then', (data) => {
                this.cities = data;
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
            }))
        } else {
            this.cities = []
        }
    };

    @action payPalCheck(tx) {
            return Api('/paypal-check-payment', {method: 'post', body: {tx: tx}})
                .then(action('then', (data) => {
                    authStore.inProgressReg = false;
                    if (data.success) {
                        window.location.href = '/post-compra';
                    } else {
                        window.location.href = '/confirmacion-error';
                    }
                }))
                .catch(action('catch', ({error}) => {
                    this.error = error;
                    window.location.href = '/confirmacion-error';
                }))

    };

    // state after payment (check TX param)
    @action payPalAfter(tx) {
        if(viewerStore.token) {
            // check and show success page
            this.payPalCheck(tx);

            viewerStore.AfterBuy = false;
            viewerStore.isAfterPaymentPopup = false;
            window.localStorage.removeItem('tx');
        } else {
            viewerStore.AfterBuy = true;
            viewerStore.isAfterPaymentPopup = true;
            window.localStorage.setItem('tx', tx);
        }
    };

    @action setTx(tx) {
        this.tx = tx;
    };
}

export default new PaymentStore();
