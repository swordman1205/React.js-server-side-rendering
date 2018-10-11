import React, {Component} from 'react';
import SocialIcons from '../components/SocialIcons';
import {Link} from 'react-router-dom';
import styles from '../styles/components/NewsRow.css';

class NewsRow extends Component {
    showContent(){
        return(
            <div className={"c-row-module1 " + this.props.aClass}>
                <div className="image-news" style={{backgroundImage: 'url(' + this.props.imageUrl + ')'}}>
                    <div className="news-cover"/>
                </div>
                <div className="right-col-news">
                    <p className="p2 mt-m7 lh-1p6">
                        {this.props.text}
                    </p>
                    <div>
                        <span className="news-date">{this.props.date}</span>
                        <SocialIcons shareLink={"/blog/"+this.props.id+"-"+this.props.slug} social={this.props.social} shareImg={this.props.imageUrl?this.props.imageUrl:(typeof window !== 'undefined' ? window.location.protocol + "//" + window.location.host +"/images/banner-logo.png" : "")}  />
                    </div>
                </div>
            </div>
        )
    }
    render() {
        if(this.props.type!='link'){
            return (
                <a href={this.props.chref}>
                    {this.showContent()}
                </a>
            );
        } else {
            return (
                <Link to={"/blog/"+this.props.id+"-"+this.props.slug}>
                    {this.showContent()}
                </Link>
            );
        }
    }

}

export default NewsRow;
