import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import InputMask from 'react-input-mask';
import styles from '../styles/routes/Contact.css';
import MetaTags from 'react-meta-tags';
import {inject, observer} from 'mobx-react';

@inject('contactsStore', 'directoriesStore', 'userStore')
@observer

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            showNameErr: false,
            showEmailErr: false,
            showCityErr: false,
            showBusinessErr: false,
            showMessageErr: false,
            successMessage: false,
            userName: ''
        };
        this.props.directoriesStore.pullCountriesList();
        this.props.directoriesStore.setCountrySlug('');
        this.props.directoriesStore.pullCountryInfo();
        this.props.contactsStore.setCity('');
    }

    handleNameChange = e => {this.props.contactsStore.setName(e.target.value); this.setState({userName: e.target.value} )};
    handleEmailChange = e => this.props.contactsStore.setEmail(e.target.value);
    handleCityChange = e => {
        if(e.target.value!=0){
            this.props.contactsStore.setCity(e.target.value);
            this.props.directoriesStore.setCountrySlug(e.target.value);
            this.props.directoriesStore.pullCountryInfo();
        } else {
            this.props.contactsStore.setCity("");
            this.props.directoriesStore.setCountrySlug('');
            this.props.directoriesStore.pullCountryInfo();
        }
    };

    handlePhoneChange = e => this.props.contactsStore.setPhone(e.target.value);
    handleBusinessChange = e => {
        if(e.target.value!=0){
            this.props.contactsStore.setBusiness(e.target.options[e.target.selectedIndex].text);
        } else {
            this.props.contactsStore.setBusiness("");
        }
    };
    handleMessageChange = e => this.props.contactsStore.setMessage(e.target.value);
    handleSubmitForm = (e) => {
        if (this.validationRules()){
            this.setState({successMessage: true, showMessage: false, showNameErr: false, showCityErr: false, showBusinessErr: false, showMessageErr: false});
            e.preventDefault();
            this.props.contactsStore.sendContactForm();
            this.props.history.push('/confirmacion-contacto')
        }
        else {
            this.setState({showMessage: true, showNameErr: false, showEmailErr: false, showCityErr: false, showBusinessErr: false, showMessageErr: false});
            if (this.props.contactsStore.values.name.length <= 0){
                this.setState({showNameErr: true});
            }
            if (!this.validateEmail(this.props.contactsStore.values.email)){
                this.setState({showEmailErr: true});
            }
            if (this.props.contactsStore.values.city.length <= 0){
                this.setState({showCityErr: true});
            }
            if (this.props.contactsStore.values.business.length <= 0){
                this.setState({showBusinessErr: true});
            }
            if (this.props.contactsStore.values.message.length <= 0){
                this.setState({showMessageErr: true});
            }
        }
    };

    validateEmail = (email) => {
        var re = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
        return re.test(email);
    };

    validationRules(){
        return (
            this.props.contactsStore.values.name.length > 0 &&
            this.validateEmail(this.props.contactsStore.values.email) &&
            this.props.contactsStore.values.city.length > 0 &&
            this.props.contactsStore.values.business.length > 0 &&
            this.props.contactsStore.values.message.length > 0
        )
    }

    showValidationMessage(){
        if (this.state.showMessage){
            return (
                <div className="error-msg">
                    <i className="flaticon-warning"/>
                    <p>Por favor llene todos los campos requeridos </p>
                </div>
            )
        }
    }

    showSuccessMessage(){
        if (this.state.successMessage) {
            if (this.props.contactsStore.ContactMessage.success) {
                return (
                    <div>Su mensaje fue enviado</div>
                )
            }
        }
        else return null
    }

    showCountriesList(){
        return this.props.directoriesStore.CountriesList.map(item =>
            <option key={item.id} value={item.slug}>{item.name}</option>
        );
    }

    showMetaData(){
        let vTitle = "Contacto - Nuevas Evas";
        let vDescription = "Contáctanos, es un placer atenderte. Recibe información relacionada a tratamientos naturales, libros de alimentación saludable, cursos de cocina saludable y conoce más la comunidad de Nuevas Evas.";

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page contact">
                <TopBanner type="small">Contáctanos</TopBanner>
                {this.showMetaData()}
                <div className="container blog top1">
                    <div className="row">
                        {this.showValidationMessage()}
                        <div className="col-md-6">

                            <form className="fotm1">
                                <div className={(this.state.showNameErr)?"form-item error-field":"form-item"}>
                                    <label>Nombre*</label>
                                    {(this.state.showNameErr)?<p className="error-message">Escribe tu nombre</p>:""}
                                    <input
                                        onChange={this.handleNameChange}
                                        type="text"
                                        placeholder="Escribe tu nombre"
                                        value={this.state.testName}
                                    />
                                </div>
                                <div className={(this.state.showEmailErr)?"form-item error-field":"form-item"}>
                                    <label>E-mail*</label>
                                    {(this.state.showEmailErr)?<p className="error-message">A este correo te responderemos</p>:""}
                                    <input
                                        onChange={this.handleEmailChange}
                                        type="email"
                                        placeholder="A este correo te responderemos"
                                    />
                                </div>
                                <div className={(this.state.showCityErr)?"form-item error-field":"form-item"}>
                                    <label>País*</label>
                                    {(this.state.showCityErr)?<p className="error-message">Selecciona tu paíse</p>:""}
                                    <div className="cu-sel">
                                        <select onChange={this.handleCityChange} value={this.props.contactsStore.values.city}>
                                            <option value="0">Selecciona tu país</option>
                                            {this.showCountriesList()}

                                        </select>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label>Celular</label>
                                    <div className="line-controls-phone">

                                        <span className="c-phone-code">{this.props.directoriesStore.CountryInfo.phone_code}</span>
                                        <InputMask mask="999 99 99 99" maskChar=" " onChange={this.handlePhoneChange} type="text"  placeholder="Este campo es opcional" />
                                    </div>
                                </div>
                                <div className={(this.state.showBusinessErr)?"form-item error-field":"form-item"}>
                                    <label>Asunto*</label>
                                    {(this.state.showBusinessErr)?<p className="error-message">A este correo te responderemos</p>:""}
                                    <div className="cu-sel">
                                        <select onChange={this.handleBusinessChange}>
                                            <option value="0">Selecciona tu Asunto</option>
                                            <option value="1">Programa Gratis Anti-Artritis</option>
                                            <option value="2">Programa Mensual Anti-Artritis</option>
                                            <option value="3">Programa Personalizado Anti-Artritis</option>
                                            <option value="4">Programa Gratis Anti-Fibromialgia</option>
                                            <option value="5">Programa Mensual Anti-Fibromialgia</option>
                                            <option value="6">Programa Personalizado Anti-Fibromialgia</option>
                                            <option value="7">Libro Mas Verde: Desayunos Saludables</option>
                                            <option value="8">Libro Extractos Milagrosos para Enfermedades</option>
                                            <option value="9">Curso Online de Cocina Crudivegana Saludable</option>
                                            <option value="10">Ayuda con los Foros </option>
                                            <option value="11">Registrarse en el Directorio</option>
                                            <option value="12">Soporte Técnico </option>
                                            <option value="13">Otros</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={(this.state.showMessageErr)?"form-item error-field":"form-item"}>
                                    <label>Mensaje*</label>
                                    {(this.state.showMessageErr)?<p className="error-message">Escribe aquí tu Mensaje ...</p>:""}
                                    <textarea onChange={this.handleMessageChange} placeholder="Escribe aquí tu Mensaje ..." />
                                </div>
                                <div className="form-desc">* Campos Obligatorios</div>


                                {this.showSuccessMessage()}


                                <div onClick={this.handleSubmitForm} type="submit" className="btn-submit cu-submit">Enviar</div>
                            </form>

                        </div>

                        <div className="col-md-6">
                            <div className="alejandra-banner">
                                <p>
                                    “Quiero apoyarte a tomar decisiones que acaben
                                    con tu dolor y preocupaciones.
                                </p>
                                <p>
                                    Que beneficien completamente tu salud y te
                                    regalen el bienestar y la felicidad que mereces.”
                                </p>
                                <div className="alegandra3" />
                                <div className="ab-logo" />
                                <div className="ab-border" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
