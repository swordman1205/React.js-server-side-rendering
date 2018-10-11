import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Gobutton from '../components/Gobutton';
import GobuttonPayment from '../components/GobuttonPayment';
import TopBanner from '../components/TopBanner';
import {inject, observer} from 'mobx-react';
import AccessProductPopup from '../components/AccessProductPopup';
import RegisterPopup from '../components/RegisterPopup';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/Checkout.css';

@inject('paymentStore', 'authStore')
@observer

class Checkout extends Component {

    constructor(props){
        super(props);
        this.state = ({
            selectedOption: 'card',
            selectedOption2: 'argentina',
            showCheckbox: false,
            flag: "",
            showPayPalBtn: true
        });
        let productToken = this.props.match.params.productToken;
        if(productToken==undefined || productToken==null){
            productToken = "";
        }

        this.props.paymentStore.pullProduct(productToken);
        this.props.paymentStore.pullPayUcountries();
    }

    componentDidMount () {

        if(window.localStorage.getItem('tx')){
            window.localStorage.removeItem('justRegister');
            this.props.paymentStore.payPalAfter(window.localStorage.getItem('tx'));
        } else

        // After PayU
        if(window.localStorage.getItem('transaction_id')){
            window.localStorage.removeItem('justRegister');
            this.props.paymentStore.payUafter(window.localStorage.getItem('transaction_id'));
        }
    }

    showLoginForm() {
        return (
            <div className="foro-form">
                <form id="form-login" className="form-login" method="POST" action="/foro/login/login">
                    <input type="hidden" name="cookie_check" value="0" />
                    <input type="hidden" name="redirect" value="/" />
                    <input type="hidden" name="_xfToken" value="" />
                    <input type="hidden" name="login"  value={this.props.authStore.values.email}/>
                    <input type="hidden" name="password" value={this.props.authStore.values.password}/>
                    <input className="hidden" type="submit" id="j-login-submit" value="log in" />
                </form>
            </div>
        );
    };

    handleEmailChange = e => this.props.paymentStore.setEmail(e.target.value);

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
        if(changeEvent=='card'){
            this.props.paymentStore.pullPayUcountries();
        }
    };

    handleOptionChange2 = (changeEvent) => {
        if(changeEvent.target.value!="PayPal"){
            this.props.paymentStore.setCountry(changeEvent.target.title, changeEvent.target.value, changeEvent.target.dataset.code);
            this.props.paymentStore.pullCities(changeEvent.target.id);
            //this.setState({flag: changeEvent.target.dataset.flag});
            this.props.paymentStore.setFlag(changeEvent.target.dataset.flag);
            this.hideRadio();
        } else {
            this.props.paymentStore.setFlag('');
            this.props.paymentStore.setCountry('País', '', '');
            this.setState({selectedOption:'paypal'});
        }
    };

    handleCityChange = (changeEvent) => {
        this.props.paymentStore.setCity(changeEvent.target.value);
    };
    handleAddressChange = e => this.props.paymentStore.setAddress(e.target.value);
    hideRadio(){
        if (this.state.showCheckbox){
            if(document.getElementById("checkboxes")){
                document.getElementById("checkboxes").classList.add('no-display-country');
                this.setState({showCheckbox: false})
            }
            else return null
        }
    }
    handleDocTypeChange = (changeEvent) => {
        this.props.paymentStore.setDocumentType(changeEvent.target.value);
    };
    handleDocNumberChange = (changeEvent) => {
        this.props.paymentStore.setDocumentNumber(changeEvent.target.value);
    };
    handlePhoneChange = (changeEvent) => {
        this.props.paymentStore.setPhone(changeEvent.target.value);
    };
    handleCardHolderChange = (changeEvent) => {
        this.props.paymentStore.setCardHolder(changeEvent.target.value);
    };
    handleCardNumberChange = (changeEvent) => {
        this.props.paymentStore.setCardNumber(changeEvent.target.value);
    };
    handleCVCchange = (changeEvent) => {
        this.props.paymentStore.setCVC(changeEvent.target.value);
    };
    handleMonthChange = (changeEvent) => {
        this.props.paymentStore.setCardMonth(changeEvent.target.value);
    };
    handleYearChange = (changeEvent) => {
        this.props.paymentStore.setCardYear(changeEvent.target.value);
    };
    handleCheckRules = (val) => {
        this.props.paymentStore.setRules(val.target.checked);
    };
    showRadio(){
        if(document.getElementById("checkboxes")){
            document.getElementById("checkboxes").classList.remove('no-display-country');
            this.setState({showCheckbox: true})
        }
        else return null
    }
    showCountries(){
        let i=1;
        return this.props.paymentStore.payUcountries.map(item=>
            <li>
                <input type="radio"
                       name="country"
                       id={item.slug}
                       onClick={this.handleOptionChange2}
                       value={item.abbr}
                       title={item.name}
                       data-code={item.phone_code}
                       data-flag={item.flag_image}
                       key={++i}
                />
                <label htmlFor={item.slug}><img src={item.flag_image}/>{item.name}</label>
            </li>
        )
    }
    showDD(){
        return(
            <ul id="checkboxes" className="radio-but-list radio-list no-display-country" onClick={(e)=>{e.stopPropagation()}}>
                {this.showCountries()}
                <li>
                    <input type="radio"
                           name="country"
                           id="other"
                           onClick={this.handleOptionChange2}
                           value="PayPal"
                           title={"Otro País - Pagar con PayPal"}
                           data-code={""}
                           data-flag={""}
                           key={0}
                    />
                    <label htmlFor="other">Otro País - Pagar con PayPal</label>
                </li>
            </ul>
        )
    }
    showCities(){
        let i=1;
        return this.props.paymentStore.cities.map(item=>
            <option key={++i} value={item.name}>{item.name}</option>
        )
    }
    showMonth(){
        let months = [];
        for(let i=1; i<=12; i++){
            months.push(<option value={i.toString().length==1?'0'+i:i}>{i.toString().length==1?'0'+i:i}</option>);
        }
        return months;
    }
    showYear(){
        let years = [];
        for(let i=2018; i<=2030; i++){
            years.push(<option value={i}>{i}</option>);
        }
        return years;
    }
    showPayPalSubmitBtn() {
        if(this.state.showPayPalBtn){
            return (
                <Gobutton prevent={true} click={()=>{this.setState({showPayPalBtn:false}); let ppform = document.getElementById("f-paypal"); ppform.submit()}} padd='52px'>Completar el pago</Gobutton>
            )
        } else {
            return (<div className="spinner" />)
        }
    }
    showPayUsubmitBtn(){
        if (!this.props.paymentStore.inProgressPU){
            return (
                <GobuttonPayment prevent={true} click={()=>this.props.paymentStore.payUpayment()} padd='52px'>Completar el pago</GobuttonPayment>
            )
        } else {
            return (<div className="spinner" />)
        }
    }
    payUsuperCode(){
        if(this.props.paymentStore.payUid!=''){
            return (
                <div>
                    <p style={{background: 'url(https://maf.pagosonline.net/ws/fp?id='+this.props.paymentStore.payUid+')'}} />

                    <img style={{display: 'none'}} src={"https://maf.pagosonline.net/ws/fp/clear.png?id="+this.props.paymentStore.payUid} />

                    <script src={"https://maf.pagosonline.net/ws/fp/check.js?id="+this.props.paymentStore.payUid}></script>

                    <object type="application/x-shockwave-flash"

                            data={"https://maf.pagosonline.net/ws/fp/fp.swf?id="+this.props.paymentStore.payUid} width="1" height="1"

                            id="thm_fp">

                        <param name="movie" value={"https://maf.pagosonline.net/ws/fp/fp.swf?id="+this.props.paymentStore.payUid} />

                    </object>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    showForm(){
        if(this.state.selectedOption === 'card') {
            return(
                <form>
                    <div className={(this.props.paymentStore.validators.emailMsg)?"form-item error-field":"form-item"}>
                        <label>2. Información de Contacto:</label>
                        {(this.props.paymentStore.validators.emailMsg)?<p className="error-message">{this.props.paymentStore.validators.emailMsg}</p>:""}
                        <input onChange={this.handleEmailChange} value={this.props.paymentStore.payu.email} type="text" className="" placeholder="Correo Electrónico" />
                    </div>

                    <div className="c-checkboxes">

                        <div className="form-item mob-bott0">
                            {(this.props.paymentStore.validators.countryMsg)?<p className="error-message">{this.props.paymentStore.validators.countryMsg}</p>:""}
                            {(this.props.paymentStore.validators.cityMsg)?<p className="error-message">{this.props.paymentStore.validators.cityMsg}</p>:""}
                            <div className="line-controls2">
                                <div className={(this.props.paymentStore.validators.countryMsg)?"cu-sel cu-sel-my cont-1 cont-1-mob cont-1-mob-marg sel-radio error-field":"cu-sel cont-1 cont-1-mob cont-1-mob-marg sel-radio"} onClick={()=>{this.showRadio()}}>
                                    {this.props.paymentStore.country}
                                </div>

                                <div className={(this.props.paymentStore.validators.cityMsg)?"cu-sel cont-1-mob error-field":"cu-sel cont-1-mob"}>
                                    <span>{this.props.paymentStore.payu.city}</span>
                                    <select onChange={this.handleCityChange} value={this.props.paymentStore.payu.city}>
                                        <option hidden="hidden" disabled="disabled" selected="selected"  key={0} value="">Ciudad</option>
                                        {this.showCities()}
                                    </select>
                                </div>

                            </div>

                        </div>
                        {this.showDD()}
                    </div>


                    {(this.props.paymentStore.validators.addressMsg)?<p className="error-message">{this.props.paymentStore.validators.addressMsg}</p>:""}
                    <div className={(this.props.paymentStore.validators.addressMsg)?"form-item error-field":"form-item"}>
                        <input onChange={this.handleAddressChange} value={this.props.paymentStore.payu.address} type="text" className="" placeholder="Escribe tu Dirección" />
                    </div>

                    <div className="form-item mob-bott0">
                        {(this.props.paymentStore.validators.documentTypeMsg)?<p className="error-message">{this.props.paymentStore.validators.documentTypeMsg}</p>:""}
                        {(this.props.paymentStore.validators.documentNumberMsg)?<p className="error-message">{this.props.paymentStore.validators.documentNumberMsg}</p>:""}
                        <div className="line-controls2">
                            <div className={(this.props.paymentStore.validators.documentTypeMsg)?"cu-sel cont-1 error-field":"cu-sel cont-1"}>
                                <select onChange={this.handleDocTypeChange} value={this.props.paymentStore.payu.documentType}>

                                    <option hidden="hidden" disabled="disabled" selected="selected" value="0">Seleccionar tipo de documento</option>
                                    <option key={0} value="CC">Cédula / Documento de Identidad</option>
                                    <option key={1} value="CE">Carnet de Extranjería</option>
                                </select>
                            </div>
                            <div className={(this.props.paymentStore.validators.documentNumberMsg)?"form-item cont-3 error-field":"form-item cont-3"}>
                                <input onChange={this.handleDocNumberChange} value={this.props.paymentStore.payu.documentNumber} type="text"  placeholder="Tu número de Identidad" />
                            </div>
                        </div>
                    </div>

                    {(this.props.paymentStore.validators.phoneMsg)?<p className="error-message">{this.props.paymentStore.validators.phoneMsg}</p>:""}
                    <div className={(this.props.paymentStore.validators.phoneMsg)?"form-item error-field":"form-item"}>

                        <div className="country-code">
                            <img src={this.props.paymentStore.flag} /><span>{this.props.paymentStore.countryCode}</span>
                        </div>
                        <input onChange={this.handlePhoneChange} value={this.props.paymentStore.payu.phone} type="text" className="phone" placeholder="Escribe tu Número de Celular" />
                    </div>



                    <label>3. Información de Tarjeta: <i className="flaticon-lock" /></label>

                    <div className={(this.props.paymentStore.validators.cardHolderMsg)?"form-item error-field":"form-item"}>
                        {(this.props.paymentStore.validators.cardHolderMsg)?<p className="error-message">{this.props.paymentStore.validators.cardHolderMsg}</p>:""}
                        <input onChange={this.handleCardHolderChange} type="text" value={this.props.paymentStore.payu.cardHolder} className="" placeholder="Nombre Completo del Titular de la Tarjeta" />
                    </div>


                    <div className="form-item mob-bott0">
                        {(this.props.paymentStore.validators.cardNumberMsg)?<p className="error-message">{this.props.paymentStore.validators.cardNumberMsg}</p>:""}
                        {(this.props.paymentStore.validators.cvcMsg)?<p className="error-message">{this.props.paymentStore.validators.cvcMsg}</p>:""}
                        <div className="line-controls2">
                            <div className={(this.props.paymentStore.validators.cardNumberMsg)?"form-item cu-imp cont-1 error-field":"form-item cu-imp cont-1"} >
                                <input onChange={this.handleCardNumberChange} value={this.props.paymentStore.payu.cardNumber} type="text" className="" placeholder="Número de Tarjeta de Débito o Crédito" />
                            </div>
                            <div className={(this.props.paymentStore.validators.cvcMsg)?"form-item cont-3 error-field":"form-item cont-3"}>
                                <input onChange={this.handleCVCchange} value={this.props.paymentStore.payu.cvc}  type="password" className="" placeholder="CVC  (3 dígitos)" />
                                <div className="card-cvv">
                                    <img src="/images/payment/cvv.png"/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="form-item">
                        {(this.props.paymentStore.validators.cardMonthMsg)?<p className="error-message">{this.props.paymentStore.validators.cardMonthMsg}</p>:""}
                        {(this.props.paymentStore.validators.cardYearMsg)?<p className="error-message">{this.props.paymentStore.validators.cardYearMsg}</p>:""}
                        <div className="line-controls2">
                            <div className={(this.props.paymentStore.validators.cardMonthMsg)?"cu-sel cont-1 error-field":"cu-sel cont-1"}>
                                <select value={this.props.paymentStore.payu.cardMonth} onChange={this.handleMonthChange}>
                                    <option hidden="hidden" value="0">Mes Vencimiento</option>
                                    {this.showMonth()}
                                </select>
                            </div>
                            <div  className={(this.props.paymentStore.validators.cardYearMsg)?"cu-sel error-field":"cu-sel"}>
                                <select value={this.props.paymentStore.payu.cardYear} onChange={this.handleYearChange}>
                                    <option hidden="hidden" value="0">Año Vencimiento</option>
                                    {this.showYear()}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-item c-privacy">
                        <input onChange={this.handleCheckRules} checked = {this.props.paymentStore.checkoutCheckbox} id="check-rules" type="checkbox" hidden />
                        <label htmlFor="check-rules" />
                        <Link className={this.props.paymentStore.validators.rulesMsg?"red-link":""} to="/terminos-condiciones">He leído y acepto los Términos y Condiciones</Link>
                    </div>



                    <div className="c-form-butt c-form-payu">
                        {this.showPayUsubmitBtn()}
                    </div>
                    {this.payUsuperCode()}
                </form>
            )
        } else {
            return (
                <form id="f-paypal" action={"https://"+this.props.paymentStore.product.hostname+"/cgi-bin/webscr"} method="post">
                    <input type="hidden" name="business" value={this.props.paymentStore.product.merchant_email} />
                    <input type="hidden" name="cmd" value="_xclick" />
                    <input type="hidden" name="item_name" value={this.props.paymentStore.product.product_title} />
                    <input type="hidden" name="amount" value={this.props.paymentStore.product.product_price} />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="hidden" name="item_number" value={this.props.paymentStore.product.product_id} />
                    <img src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"  />
                    <div className="c-form-butt">
                        {this.showPayPalSubmitBtn()}
                    </div>
                </form>
            );
        }
    }
    showPayUerrors(){
        if(this.props.paymentStore.errorDescription){
            return (
                <div className="error-msg">
                    <i className="flaticon-warning"/>
                    <p>{this.props.paymentStore.errorDescription}</p>
                </div>
            )
        }
    }
    showProductDetails(){
        if(this.props.paymentStore.inProgressProduct){
            return (<p className="loading">Cargando...</p>)
        } else {
            return (
                <div className="c-purchase">
                    <p>{this.props.paymentStore.product?this.props.paymentStore.product.product_title:'0'}</p>
                    <h4>${this.props.paymentStore.product?this.props.paymentStore.product.product_price:""}</h4>
                </div>
            )
        }
    }
    showRadioPaymentSystems(){
        if(!this.props.paymentStore.inProgressProduct) {
            return (
                <ul className="radio-but-list">
                    <li>
                        <input id="radio1"
                               type="radio"
                               name="payment-type"
                               value="card"
                               checked={this.state.selectedOption === 'card'}
                               onChange={this.handleOptionChange}
                        />
                        <label htmlFor="radio1" className="c-payment">
                            <img src="/images/payment/visa.png"/>
                            <img src="/images/payment/mastercard.png"/>
                            <img src="/images/payment/amex.png"/>
                        </label>
                    </li>
                    <li>
                        <input id="radio2" type="radio"
                               name="payment-type"
                               value="paypal"
                               checked={this.state.selectedOption === 'paypal'}
                               onChange={this.handleOptionChange}
                        />
                        <label htmlFor="radio2" className="c-payment">
                            <img src="/images/payment/paypal.png"/>
                        </label>
                    </li>
                </ul>
            );
        } else {
            return (<p className="loading">Cargando...</p>)
        }
    }
    showMetaData(){
        let vTitle = this.props.match.params.productToken;
        let vDescription = this.props.match.params.productToken;

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }
    render() {
        return (
            <div className="checkout" onClick={()=>{this.hideRadio()}}>
                {this.showMetaData()}
                <TopBanner type="small">Formulario de Pago</TopBanner>
                <div className="container blog top1">
                    <div className="row">

                        {this.showPayUerrors()}

                        <div className="col-md-6">
                            <div className="checkout-info-text">
                                Si necesitas ayuda para completar tu pago, escríbenos por whatsapp al +51973586834.
                            </div>

                            <div className="fotm1">

                                {/* ------------------------ Mobile Price Box */}
                                <div className="purchase-info-mob">
                                    <h4>Detalles de Compra</h4>
                                    <div className="c-purchase">
                                        <p>{this.props.paymentStore.product?this.props.paymentStore.product.product_title:'0'}</p>
                                        <h4>${this.props.paymentStore.product?this.props.paymentStore.product.product_price:""}</h4>
                                    </div>
                                </div>

                                {/* ------------------------- LEFT COLUMN -------------------------- */}

                                <label>1. Elige tu forma de pago:</label>
                                {this.showRadioPaymentSystems()}
                                {this.showForm()}

                            </div>
                        </div>

                        {/* ------------------------- RIGHT COLUMN -------------------------- */}
                        <div className="col-md-6">
                            <div className="purchase-info">
                                <h4>Detalles de Compra</h4>

                                    {this.showProductDetails()}

                            </div>
                            <div className="w-s-icons">
                            <div className="c-s-icons">
                                <img src="/images/payment/secured-icons.png"/>
                            </div>
                            </div>

                            <div className="alejandra-banner3">
                                <div className="w-alejandra3">
                                    <div className="alejandra3" />
                                    <p>
                                        Únete a los cientos de mujeres que han logrado curar sus enfermedades a través de sus alimentos con nuestros
                                        programas y productos.
                                    </p>
                                </div>
                                <div className="ab-logo4" />
                                <div className="ab-border2" />
                            </div>
                        </div>
                    </div>
                </div>
                {this.showLoginForm()}
                <RegisterPopup />
                <AccessProductPopup />
            </div>
        );
    }
}

export default Checkout;
