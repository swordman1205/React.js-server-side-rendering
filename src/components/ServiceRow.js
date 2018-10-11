import React, {Component} from 'react';
import SocialIcons from '../components/SocialIcons';
import Golink from '../components/Golink';
import styles from '../styles/components/ServiceRow.css';

class ServiceRow extends Component {
    render() {
        return (
            <a href={this.props.itemUrl} className={"c-row-module3 " + this.props.aClass}>
                <div className="image-service" style={{backgroundImage: 'url(' + this.props.imageUrl + ')'}}>
                    <div className="service-cover"/>
                </div>
                <div className="right-col-service">
                    <h3 className="service-title">
                        {this.props.title} <i className={(this.props.online)?"flaticon-globe":"flaticon-pin"} />
                    </h3>
                    <p className="service-p">
                        {this.props.text} <Golink size="gl3">Leer más</Golink>
                    </p>
                    <div>
                        <span className="service-address">{this.props.address}</span>
                        <SocialIcons social={this.props.social} mSocials = {"m-socials-hide"} />
                    </div>
                </div>
            </a>
        );
    }
}

export default ServiceRow;
