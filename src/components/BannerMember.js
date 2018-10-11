import React, {Component} from 'react';
import Golink from '../components/Golink';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/BannerMember.css';

@inject('viewerStore', 'themeStore')
@observer
class BannerMember extends Component {
    render() {
        if(this.props.viewerStore.token && this.props.titleText && this.props.linkURL && this.props.linkText){
            return (
                <div className="c-member-banner">
                    <h2 className="h2-bm">
                        {this.props.titleText}
                    </h2>
                    <Golink
                        size="gl1"
                        chref={this.props.linkURL}
                    >
                        {this.props.linkText}
                    </Golink>
                </div>
            );
        } else {
            return (<span></span>)
        }
    }
}

export default BannerMember;
