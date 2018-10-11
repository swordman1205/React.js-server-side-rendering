import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SocialIcons from '../components/SocialIcons';
import Golink from '../components/Golink';
import styles from '../styles/components/BlogRow.css';

class BlogRow extends Component {
  render() {
    return (
        <Link to={"/blog/"+this.props.id+"-"+this.props.slug} className="c-row-module2">
            <div className="image-blog" style={{backgroundImage: 'url('+this.props.imageUrl+')'}}>
                <div className="blog-cover" />
            </div>
            <div className="right-col-blog">
                <p className="p2">
                    {this.props.title}
                </p>
                <div className="br-panel">
                    <span className="date-row"><a onClick={(e)=>{e.stopPropagation();}} className="gray-link" href={"/blog/"+this.props.themeSlug}>{this.props.theme}</a>  | <a onClick={(e)=>{e.stopPropagation();}} className="gray-link" href={"/blog/"+this.props.themeSlug+"/"+this.props.tagSlug}>{this.props.tags}</a> &nbsp; <i className="flaticon-calendar" /> {this.props.date}</span>
                    <SocialIcons shareLink={"/blog/"+this.props.id+"-"+this.props.slug} social={this.props.social} />
                </div>
                <div className="blog-date">{this.props.date}</div>
                <div className="br-bottom2">
                    {this.props.text} <Golink chref={"/blog/"+this.props.id+"-"+this.props.slug} type={"link"} size="gl3">Leer más</Golink>
                </div>
            </div>
        </Link>
    );
  }
}

export default BlogRow;
