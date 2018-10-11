import React, {Component} from 'react';
import {withRouter, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/MainMenu.css';

@withRouter
@inject('themeStore', 'viewerStore', 'authStore')
@observer

class MainMenu extends Component {
    constructor(props) {
        super(props);
        /*admin_token=668eda3b1ca4f7be60541b01fab4e252*/
    }

    componentDidMount () {
        let adminToken = this.props.viewerStore.getParameterByName('admin_token');
        if(adminToken){
            this.props.authStore.adminLogin(adminToken);
        }
    }

    render() {
        return (
            <ul className="top-menu">
                <li>
                    <NavLink
                        to="/"
                        exact
                        onClick={()=>{
                            this.props.themeStore.setCurrentTheme("", "Salud");
                            this.props.viewerStore.setHomePageData("", "Salud");
                        }}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/programas">
                        Programas
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/blog"
                        onClick={()=>{
                            typeof history !== 'undefined' &&
                            this.props.themeStore.setCurrentTheme("", "Salud");
                            history.go(0);
                        }}
                      >
                        Blog
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/directorio">
                        Directorio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/las-nuevas-evas">
                        Las Nuevas Evas
                    </NavLink>
                </li>
            </ul>
        );
    }
}
MainMenu.contextTypes = {
    router: PropTypes.object
};
export default MainMenu;
