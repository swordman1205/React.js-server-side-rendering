import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom';

import styles from '../styles/components/CategoriesMenu.css';

@inject('viewerStore', 'themeStore', 'blogStore')
@observer

class CategoriesMenu extends Component {
    constructor(props){
        super(props);
    }
    updateSidebar(){
        this.props.blogStore.updateBlog();
    }

    showTags(){
        let i=0;
        return this.props.blogStore.Tags.map(item =>
            <li className={this.props.blogStore.currTag==item.slug?"active":""} key={i++}>
                <Link  onClick={()=>{this.props.blogStore.setTag(item.slug); this.updateSidebar(); }}  to={"/blog/"+this.props.themeStore.currentTheme+"/"+item.slug}>{item.name}</Link>
            </li>
        );
    }
    showSubMenu(){
        return(
            <ul className="cat-sub-menu">
                {this.showTags()}
            </ul>
        )
    }
    showCategories(){
        let i=0;
        return this.props.blogStore.BlogCategories.map(item =>
            <li className={this.props.themeStore.currentTheme==item.slug?"collapsed":""} key={i++}>
                <Link onClick={()=>{this.props.themeStore.setCurrentTheme(item.slug, item.name); this.props.blogStore.setTag(""); this.updateSidebar(); }} to={"/blog/"+item.slug}>{item.name}</Link>
                {this.props.themeStore.currentTheme==item.slug?this.showSubMenu():""}
            </li>);
    }

    render() {
        return (
            <ul className="cat-menu">
                {this.showCategories()}
            </ul>
        );
    }
}

export default CategoriesMenu;
