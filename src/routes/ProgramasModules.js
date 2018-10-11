import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import LeftSidebar from '../components/LeftSidebar';
import Comments from '../components/Comments';
import Title1 from '../components/Title1';
import ContentsTable from '../components/ContentsTable';
import {Link, withRouter} from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import {inject, observer} from 'mobx-react';
import styles from '../styles/routes/ProgramasModules.css';

@withRouter
@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore')
@observer

class ProgramasModules extends Component {
    constructor(props){
        super(props);
        this.state = {
            LSPopup: false
        };
    }
    componentDidMount () {
        this.props.programStore.setCurrProgram(this.props.match.params.programSlug);
        let slug =  this.props.match.params.moduleSlug;
        let moduleId = 0;
        if(this.props.match.params.moduleSlug!=null){
            if (slug.indexOf("-") != -1){
                moduleId = slug.substring(1+slug.indexOf("-"));
            }
        }
        this.props.programStore.setCurrModule(moduleId, "");
        let lessSlug =  this.props.match.params.lessonSlug;
        let lessId = "";
        if(this.props.match.params.lessonSlug!=null){
            if (lessSlug.indexOf("-") != -1){
                lessId = lessSlug.substring(1+lessSlug.indexOf("-"));
            }
        }
        this.props.programStore.setCurrLesson(lessId, "");
        this.props.programStore.pullReconendedProgram();
    }

    showThumb(iconUrl=''){
        if(iconUrl==''){
            return (
                <div className="c-icon">
                    <i className="i-icon flaticon-interface"/>
                </div>
            )
        } else {
            return (
                <div className="c-icon" style={{backgroundImage: 'url('+iconUrl+')'}}>

                </div>
            )
        }
    }
    showAttachedDocs(){
        if(this.props.programStore.CurrLessonContent) {
            if(this.props.programStore.CurrLessonContent.attachment_docs.length>0){
                return this.props.programStore.CurrLessonContent.attachment_docs.map(item =>
                    <div className="i-row-item">
                        {this.showThumb(item.thumbnail)}

                        <div className="c-buttons">
                            <div className="c-button">
                                <a href={item.download_url} className="btn5 pm-btn5">
                                    <i className="flaticon-downloading-action"/> descargar
                                </a>
                            </div>
                            <div className="c-button">
                                <a className="btn5 pm-btn5" target="_blank" href={item.online_url}>ver online</a>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return <div className="no-data">(sin archivos adjuntos)</div>
            }
        } else {
            return <div className="no-data">(sin archivos adjuntos)</div>
        }
    }

    bodyClass = (param) => {
        this.props.viewerStore.bodyClass2(param);
    };

    showLSPopup(){
        if (this.state.LSPopup && this.props.programStore.CurrProgram){
            return(
                <div className="ls-popup-cover" onClick={()=>{this.setState({LSPopup: false})}}>
                    <div className="ls-popup" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="c-btn-close2">
                            <span onClick={()=>{this.setState({LSPopup: false}); this.bodyClass(false)}}
                                  className="flaticon-cancel btn-close3"/>
                        </div>
                        <ContentsTable hidePopup={()=>{this.setState({LSPopup: false})}}/>
                    </div>
                </div>
            )
        }
        else return null
    }

    showContent(){
        if(this.props.programStore.inProgressCL){
            return (<div className="spinner" />)
        } else {
            return (
                <div
                    dangerouslySetInnerHTML={{__html: this.props.programStore.CurrLessonContent ? this.props.programStore.CurrLessonContent.content : ""}}/>
            );
        }
    }

    showMetaData(){
        let vTitle = "Nuevas Evas";
        let vDescription = "Nuevas Evas";
        if(this.props.programStore.CurrProgramData) {
            if (this.props.match.params.lessonSlug) {
                vTitle = "Lección "+this.props.programStore.CurrLesson+", "+"Módulo "+this.props.programStore.CurrModule+", "+this.props.programStore.CurrProgramData.slug+" - Nuevas Evas";
                vDescription = "Lección "+this.props.programStore.CurrLesson+", "+"Módulo "+this.props.programStore.CurrModule+", "+this.props.programStore.CurrProgramData.slug+" de Nuevas Evas es un tratamiento natural a base de alimentos medicinales para curar, tratar y revertir "+this.props.themeStore.currentThemeName+".";
            } else {
                if (this.props.match.params.moduleSlug) {
                    vTitle = "Módulo "+this.props.programStore.CurrModule+", "+this.props.programStore.CurrProgramData.slug+" - Nuevas Evas";
                    vDescription = "Módulo "+this.props.programStore.CurrModule+", "+this.props.programStore.CurrProgramData.slug+" de Nuevas Evas es un tratamiento natural a base de alimentos medicinales para curar, tratar y revertir "+this.props.themeStore.currentThemeName+".";
                } else {
                    vTitle = this.props.programStore.CurrProgramData.title + ", tratamientos y medicina natural - Nuevas Evas";
                    vDescription = this.props.programStore.CurrProgramData.title + " de Nuevas Evas es un tratamiento natural a base de alimentos medicinales para curar, tratar y revertir " + this.props.themeStore.currentThemeName + ".";
                }
            }
        }
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    setLessonDone = (e) => {
        let currLesson = this.props.programStore.CurrLesson;

        if (this.props.programStore.NextLessonId!="") {
            this.props.programStore.setCurrModule(this.props.programStore.NextLessonModuleId, "");
            this.props.programStore.setCurrLesson(this.props.programStore.NextLessonId, "");
        } else {
            e.preventDefault();
        }
        this.props.programStore.setLessonCompleted(currLesson);
    };

    render() {
        return (
            <div className="page modules">
                {this.showMetaData()}
                <TopBanner type="small">{this.props.programStore.CurrProgramData?this.props.programStore.CurrProgramData.title:""}</TopBanner>
                <div className="mob-select">
                    <div className="tab-select" onClick={() => {this.setState({LSPopup: true}); this.bodyClass(true)}}>
                        Conocimiento Fundamental
                        <i className="flaticon-arrows i-sel" />
                    </div>
                </div>
                {this.showLSPopup()}
                <div className="container top1 ">
                    <div className="c-ls">
                        {this.props.programStore.CurrProgram ? <LeftSidebar/> : null }
                    </div>
                    <div className="row">
                        <div className="col-md-7 c-mob" >
                            <div className="c-pm">
                                <ul className="bread-crumbs" style={{margin:(this.props.noMarg)?0:''}}>
                                    <li><a onClick={(e)=>{e.preventDefault(); this.props.programStore.pullProgramModules();}} href="#">{this.props.programStore.CurrProgramData?this.props.programStore.CurrProgramData.title:""}</a></li>
                                    <li><a href="#" onClick={(e)=>{e.preventDefault(); this.props.programStore.pullModuleLessons();}}>{this.props.programStore.CurrModuleName}</a></li>
                                    <li><span>{this.props.programStore.CurrLessonName}</span></li>
                                </ul>
                                <div className="c-lesson-content c-wysiwyg">
                                    {this.showContent()}
                                </div>
                                <div className="clearfix"></div>
                                <div className="w-lesson">
                                    <Link to={'/programas/'+this.props.programStore.CurrProgram+'/modulo-'+this.props.programStore.NextLessonModuleId+'/leccion-'+this.props.programStore.NextLessonId} className="c-lesson" onClick={this.setLessonDone}>
                                        <i className="check-icon flaticon-check" />
                                        <div>
                                            <div className="accept-font">Lección Completa</div>
                                            <div className="go-link">
                                                <span className="">Pasar a la próxima lección</span><i className="icon flaticon-arrow-pointing-to-right" />
                                            </div>
                                        </div>
                                    </Link>
                                    <p>Presiona este botón para indicar que ya completaste esta lección y quieres pasar a la próxima.</p>
                                </div>

                                <Title1 isGoLink={false}><i className="flaticon-wrench" /> Herramientas</Title1>

                                <div className="i-row">
                                    {this.showAttachedDocs()}
                                </div>
                                <Comments type={"lesson"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgramasModules;
