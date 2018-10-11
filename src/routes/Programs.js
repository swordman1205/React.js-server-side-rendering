import React, { Component } from 'react';
import Title1 from '../components/Title1';
import TopBanner from '../components/TopBanner';
import ProgramProductItem from '../components/ProgramProductItem';
import MetaTags from 'react-meta-tags';
import {inject, observer} from 'mobx-react';
import styles from '../styles/routes/Programs.css';

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore')
@observer

class Programs extends Component {
    constructor(props) {
        super(props);
    }

    showAllPrograms(){
        return this.props.programStore.AllPrograms.map(item =>
            <div className="programsItem col-lg-3">
                <ProgramProductItem
                    imageUrl={item.image}
                    new={true}
                    programTitle={item.title}
                    programText={item.text}
                    programUrl={item.url}
                />
            </div>
        );
    }

    showUserPrograms(){
        if(this.props.programStore.UserPrograms.length){
        return this.props.programStore.UserPrograms.map(item =>
            <div className="programsItem col-lg-3">
                <ProgramProductItem
                    imageUrl={item.image}
                    programTitle={item.title}
                    programText={item.text}
                    programUrl={`/programas/${item.slug}`}
                    scale={item.status}
                />
            </div>
            );
        } else {
            return (
                <div className="col-lg-12 offset-text-programs">
                En este momento no tienes programas ni productos activados. Inscríbete en un Programa recomendado o Inicia sesión para ver tus Programas.
                </div>
            )
        }
    }

    showMetaData(){
        let vTitle = "Programas, tratamientos y medicina natural - Nuevas Evas";
        let vDescription = "Los Programas de Nuevas Evas son tratamientos naturales a base de alimentación medicinal para curar, prevenir enfermedades y conservar la salud del cuerpo. Los programas incluyen el apoyo de nuestros expertos y acceso a nuestra comunidad.";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }
    componentDidMount(){
        // for all
        this.props.programStore.pullAllPrograms();

        const token = this.props.viewerStore.token || window.localStorage.getItem('jwt');

        // for member
        if(token){
            this.props.programStore.pullUserPrograms();
        }
        this.props.programStore.setCurrProgram("");
        this.props.programStore.setCurrModule("", "");

        // free program
        let freeProgramToken = this.props.viewerStore.getParameterByName('fullfree_token');
        if(freeProgramToken){
            if(token){
                this.props.programStore.addFreeProgram(freeProgramToken);
            } else {
                window.localStorage.setItem('freeProgramToken', freeProgramToken);
                this.props.viewerStore.showLogin();
            }
        }
    }
    render() {
        return (
            <div className="page programs-page">
                {this.showMetaData()}
                <TopBanner type="small">¡Bienvenida! Selecciona el programa o producto al que deseas ingresar.</TopBanner>
                <div className="container top1 bott3">
                    <Title1 isGoLink={false}>Programas & Productos Activos</Title1>
                    <div className="row">
                        {this.showUserPrograms()}
                    </div>
                    <Title1 isGoLink={false}>Programas & Productos Recomendados</Title1>
                    <div className="row">
                        {this.showAllPrograms()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Programs;
