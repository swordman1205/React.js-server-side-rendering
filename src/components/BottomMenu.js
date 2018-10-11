import React, {Component} from 'react';
import Title1 from '../components/Title1';
import {Link} from 'react-router-dom';
import styles from '../styles/components/BottomMenu.css';

import {inject, observer} from 'mobx-react';
@inject('viewerStore', 'threadStore', 'themeStore')
@observer

class BottomMenu extends Component {
    showMenu(){
        return this.props.themeStore.ThemesList.map(item =>
            <li key={item.id}>
                <Link className="btn13" to={"/"+item.slug}>{item.name} </Link>
            </li>
        );
    }
    render() {
        return (
            <div className="bottom-banner">
                <div className="container bottom-menu mob-hide">
                    <h3>Aprende cómo curar otras enfermedades</h3>
                    <ul className="c-menu">
                        {this.showMenu()}
                    </ul>
                </div>

                <div className="container bottom-menu-mob desk-hide">
                    <Title1>Aprende cómo curar otras enfermedades</Title1>
                    <ul className="cat-menu2">
                        {this.showMenu()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default BottomMenu;

