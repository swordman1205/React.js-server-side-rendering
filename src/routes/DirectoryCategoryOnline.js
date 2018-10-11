import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import SidebarDirectory from '../components/SidebarDirectory';
import Title1 from '../components/Title1';
import ServiceRowOnline from '../components/ServiceRowOnline';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/DirectoryCategoryOnline.css';
import {inject, observer} from 'mobx-react';

@inject('directoriesStore', 'viewerStore')
@observer

class DirectoryCategoryOnline extends Component {

    constructor(props) {
        super(props);
        this.props.directoriesStore.setCategorySlug(this.props.match.params.categorySlug);
        this.props.directoriesStore.setDirectoryIsOnline(true);
        this.props.directoriesStore.pullBusinessesList();
        this.props.directoriesStore.pullCategoryInfo();
    }

    showBusinesses(){
        if(this.props.directoriesStore.inProgressBL){
            return (<div className="spinner" />)
        } else {
            if (this.props.directoriesStore.BusinessesList.length) {
                let i=0;

                return this.props.directoriesStore.BusinessesList.map(item =>
                    <ServiceRowOnline
                        key={i++}
                        itemUrl={`/directorio/online/${this.props.directoriesStore.categorySlug}/${item.id}-${item.slug}`}
                        imageUrl={item.image_url ? item.image_url : "/images/no-program.png"}
                        title={item.title}
                        text={item.short_text}
                        website={item.website}
                        social={false}
                    />
                )
            }
            else return (
                <div className="no-data">¡La información no existe!</div>
            )
        }

    }

    showMetaData(){
        let vTitle = "Nuevas Evas";
        let vDescription = "Nuevas Evas";

        if(this.props.directoriesStore.CategoryInfo.id) {
            vTitle = this.props.directoriesStore.CategoryInfo.title+" - Directorio Saludable - Nuevas Evas";
            vDescription = "En el directorio saludable online de Nuevas Evas puedes encontrar "+this.props.directoriesStore.CategoryInfo.title+" que ofrecen productos que son saludables, naturales, orgánicos, ecológicos, amigables con vegetarianos y veganos.";
        }

        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
        return (
            <div className="page directory">
                {this.showMetaData()}
                <TopBanner type="small">Directorio Saludable</TopBanner>
                <div className="container blog top1 bott3">
                    <div className="row">
                        <div className="col-md-7">

                            {/* unit 2 */}
                            <div className="c-module top2 top1m">
                                <Title1 isGoLink={false}>{this.props.directoriesStore.CategoryInfo?this.props.directoriesStore.CategoryInfo.title:""}</Title1>

                                {this.showBusinesses()}

                                <div className="directory-add">
                                    <a href="/contacto" className="btn6">Inscribirme en el Directorio</a>
                                </div>
                            </div>
                        </div>

                        <SidebarDirectory />

                    </div>
                </div>
            </div>
        );
    }
}

export default DirectoryCategoryOnline;



