import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import WysiwygE from '../components/WysiwygE';
import {Link} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/NewDiscussion.css';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'discussionStore', 'themeStore')
@observer

class NewDiscussion extends Component {
    constructor(props){
        super(props);
        this.state = {
            themeInvalid: false,
            subThemeInvalid: false,
            themeTitleInvalid: false,
            themeTextInvalid: false,
            showMessage: false
        };
        this.props.themeStore.pullThemesListForo(true);
    };

    showThemesList(){
        return this.props.themeStore.ThemesListForo.map(item =>
            <option key={item.id} value={item.slug}>{item.name=="General"?"Alimentación Saludable":item.name}</option>
        );
    }

    showSubThemesList(){
        return this.props.themeStore.subThemesList.map(item =>
            <option key={item.id} value={item.slug}>{item.name}</option>
        );
    }

    handleNewThemeChange = e => {
        if(e.target.value!=0){
            this.props.themeStore.setNewTheme(e.target.value);
            this.props.themeStore.pullSubThemesList(e.target.value);
        } else {
            this.props.themeStore.setNewTheme("");
        }
    };

    handleNewSubThemeChange = e => {
        if(e.target.value!=0){
            this.props.themeStore.setNewSubTheme(e.target.value);
        } else {
            this.props.themeStore.setNewSubTheme("");
        }
    };

    handleThemeTitleChange = e => {
        if(e.target.value!=0){
            this.props.discussionStore.setNewDiscussionTitle(e.target.value);
        } else {
            this.props.discussionStore.setNewDiscussionTitle("");
        }
    };

    validation(){
        if (this.props.themeStore.newTheme.length == 0){
            this.setState({themeInvalid: true})
        }
        else {
            this.setState({themeInvalid: false})
        }

        if (this.props.themeStore.newSubTheme.length == 0){
            this.setState({subThemeInvalid: true})
        }
        else {
            this.setState({subThemeInvalid: false})
        }

        if (this.props.discussionStore.newDiscussionTitle.length == 0){
            this.setState({themeTitleInvalid: true})
        }
        else {
            this.setState({themeTitleInvalid: false})
        }

        if (this.props.discussionStore.newDiscussionText.length == 0){
            this.setState({themeTextInvalid: true})
        }
        else {
            this.setState({themeTextInvalid: false})
        }
    }

    validationRules(){
        return (
            this.props.themeStore.newTheme.length > 0 &&
            this.props.themeStore.newSubTheme.length > 0 &&
            this.props.discussionStore.newDiscussionTitle.length > 0 &&
            this.props.discussionStore.newDiscussionText != ""
        )
    }

    handleSubmitForm = (e) => {
        if (this.props.viewerStore.token) {
            {this.validation()}
            if (!this.validationRules()) {
                this.setState({showMessage: true})
            }
            else {
                this.props.discussionStore.createNewDiscussion();
                e.preventDefault();
                this.setState({showMessage: false});
            }
        }

    };

    showSubmitBtn(){
        if (!this.props.discussionStore.inProgressNewDiscussion){
            return (
                <div className="nd-c-btn"><Link to="#" className="btn1" onClick={this.handleSubmitForm}>Publicar</Link></div>
            )
        } else {
            return (<div className="spinner" />)
        }
    }

    showValidationMessage(){
        let text = '';
        if (this.state.showMessage || !this.props.viewerStore.token){
            if (this.state.showMessage){
                text = 'Por favor llene todos los campos requeridos';
            }
            else if (!this.props.viewerStore.token){
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

    showMetaData(){
        let vTitle = "Nueva discusión - Nuevas Evas";
        let vDescription = "Crea una nueva discusión en la comunidad de Nuevas Evas, recibe apoyo, respuesta y ayuda de nuestros expertos de salud y nutrición. Además de los consejos de las mujeres de la comunidad.";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        let subThemeSelect = '';
        if (this.props.themeStore.newTheme.length > 0){
            subThemeSelect = "cu-sel nd-sel"
        }
        else {
            subThemeSelect = "cu-sel nd-sel disabled-sel"
        }

        return (
            <div className="page new-disscussion">
                {this.showMetaData()}
                <TopBanner type="small-text" subtext="Haz preguntas, recibe respuestas de nuestros Especialistas de Salud y comunidad de Mujeres. Comparte tus consejos y experiencias.">
                    Crea una Nueva Discusión
                </TopBanner>
                <div className="container c-nd top1">
                    {this.showValidationMessage()}
                    <form className="fotm1">
                        <div className={(this.state.themeInvalid)?"cu-sel nd-sel error-field":"cu-sel nd-sel"}>
                            <select onChange={this.handleNewThemeChange}>
                                <option value="0">Seleccionar Tema</option>
                                {this.showThemesList()}
                            </select>
                        </div>

                        <div className={(this.state.subThemeInvalid)?"error-field "+subThemeSelect:subThemeSelect}>
                            <select onChange={this.handleNewSubThemeChange} disabled={(this.props.themeStore.newTheme.length > 0)?false:true}>
                                <option value="0">Seleccionar Sub-Tema</option>
                                {this.showSubThemesList()}
                            </select>
                        </div>

                        <div className={(this.state.themeTitleInvalid)?"form-item mb-0 error-field":"form-item mb-0"}>
                            <input onChange={this.handleThemeTitleChange} type="text" className="cui2" placeholder="Escribe el Título de tu Discusión" />
                        </div>
                        <p className="cu-p">** Para recibir más respuestas menciona el tema principal de tu pregunta o post en el título.</p>

                        <div className="wysiwyg-container">
                            <WysiwygE newDiscussion={true} />
                        </div>

                        {this.showSubmitBtn()}
                    </form>

                </div>
            </div>
        );
    }
}

export default NewDiscussion;
