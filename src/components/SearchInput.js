import React, {Component} from 'react';
import { withRouter } from 'react-router';

import styles from '../styles/components/SearchInput.css';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'discussionStore')
@withRouter
@observer

class SearchInput extends Component {
    constructor(props){
        super(props);
        const searchVal = this.props.location.search.split('=')[1];
        this.props.viewerStore.searchVal = searchVal;
        this.props.discussionStore.setSearchText(searchVal);
    }

    search(searchVal){
        this.props.viewerStore.searchVal = searchVal;
        this.props.discussionStore.setSearchText(searchVal);
        this.props.viewerStore.updatePageData("1", "search");
        this.props.history.push("/busqueda?b="+searchVal);
    }

    beginSearch = e => {
        if (typeof document === 'undefined') return;
        let searchVal = document.getElementById(this.props.mainNav?"search":"searchM").value;
        this.search(searchVal);
    };

    handleKeyDown = e => {
        if (e.key === 'Enter' && e.shiftKey === false) {
            let searchVal = e.target.value;
            this.search(searchVal);
            this.props.viewerStore.hideMobileNav();
            this.props.viewerStore.bodyClass(false);
        }
    };

    render() {
        return (
            <div className="c-search">
                <input
                    className="search-input"
                    type="text"
                    value={this.props.viewerStore.searchVal}
                    onChange={(e)=>{this.props.viewerStore.searchVal = e.target.value}}
                    placeholder={this.props.mainNav?'':"Busca recetas, artículos, etc."}
                    onClick={(e)=>{e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); e.stopPropagation()}}
                    onKeyDown={this.handleKeyDown}
                    id={this.props.mainNav?"search":"searchM"}
                />
                <div className="btn-search" onClick={this.beginSearch}>
                    <i className="i-search flaticon-magnifying-glass-browser"/>
                </div>
            </div>
        );
    }
}

export default SearchInput;

