import React, {Component} from 'react';
import SocialIcons from '../components/SocialIcons';
import styles from '../styles/components/InfoPanel.css';

class InfoPanelBlog extends Component {
    showTags(){
        let i = 0;
        if(this.props.tags){
            return this.props.tags.map(item =>
                <span key={i++}> | <a onClick={(e)=>{e.stopPropagation();}} className="gray-link" href={"/blog/"+this.props.themeSlug+"/"+item.slug}>{item.title}</a></span>
            )
        } else {
            return (<span></span>)
        }
    }
    render() {
        return (
            <div className="info-panel">
                <a onClick={(e)=>{e.stopPropagation();}} className="gray-link" href={"/blog/"+this.props.themeSlug}>{this.props.themeName?this.props.themeName:""}</a>
                {this.showTags()} &nbsp;

                {this.props.pos=="new-line"?<span className="br1" />:''}
                <span className="c-custom-soc-descr">
                     <i className={"flaticon-calendar "} /> {this.props.publishDate}
                    &nbsp;
                    <span className="br1" />
                    <i className="flaticon-social" /> {this.props.authorName}
                    &nbsp;
                </span>
                {this.props.pos=="new-line"?<span className="br1" />:''}
                <SocialIcons social={true}  mSocials = {this.props.mSocials} pos={this.props.pos} shareLink={this.props.shareLink} shareImg={this.props.shareImg}/>
            </div>
        );
    }
}

export default InfoPanelBlog;
