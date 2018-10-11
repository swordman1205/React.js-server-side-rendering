import React, {Component} from 'react';
import SocialIcons from '../components/SocialIcons';
import Golink from '../components/Golink';
import styles from '../styles/components/ServiceRowOnline.css';

class ServiceRowOnline extends Component {
    render() {
        return (
            <a href={this.props.itemUrl} className={"c-row-module3 " + this.props.aClass}>
                <div className="image-service" style={{backgroundImage: 'url(' + this.props.imageUrl + ')'}}>
                    <div className="service-cover"/>
                </div>
                <div className="right-col-service">
                    <h3 className="service-title">
                        {this.props.title} <i className="flaticon-globe" />
                    </h3>
                    <a href={this.props.website} target="_blank" className="internet-address">{this.props.website}</a>
                    <p className="service-p">
                        {this.props.text} <Golink chref={this.props.itemUrl} size="gl3">Leer más</Golink>
                    </p>
                    <div>

                        <SocialIcons social={this.props.social} mSocials = {"m-socials-hide"} />
                    </div>
                </div>
            </a>
        );
    }
}

export default ServiceRowOnline;
