import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import styles from '../styles/routes/Error404.css';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'discussionStore')
@withRouter
@observer

class Error404 extends Component {
    beginSearch() {
        this.props.discussionStore.setSearchText(document.getElementById("search2").value);
        this.props.viewerStore.updatePageData("1", "search");
        this.props.history.push("/busqueda");
    };

    handleKeyDown = e => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            this.props.discussionStore.setSearchText(e.target.value);
            this.props.viewerStore.updatePageData("1", "search");
            this.props.history.push("/busqueda");
        }
    };

    render() {
        return (
            <div className="page">
                <TopBanner type="small">Lo sentimos, esta página no está disponible.</TopBanner>
                <div className="container err404">
                    <p>Es posible que el enlace que has seguido esté roto o que se haya eliminado la página.</p>
                    <div className="img404"></div>
                    <form className="fotm1 search-field">
                        <i className="flaticon-magnifying-glass-browser" onClick={()=> this.beginSearch()} />
                        <input
                            type="text"
                            className=""
                            placeholder="Escribe aquí lo que buscas"
                            onClick={(e)=>{e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); e.stopPropagation()}}
                            onKeyDown={this.handleKeyDown}
                            id="search2"
                        />
                    </form>
                    <Link to="/" className="link3">
                        <div className="c-btn-err404">Volver Al Home</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Error404;
