import React, {Component} from 'react';
import SocialIcons from '../components/SocialIcons';
import styles from '../styles/components/InfoPanel.css';

class InfoPanel extends Component {
    showTags(){
        let i = 0;
        if(this.props.tags){
            return this.props.tags.map(item =>
                <span key={i++}>| {item.title}</span>
            )
        } else {
            return (<span></span>)
        }
    }
    render() {
        return (
            <div className="info-panel">
                {this.props.themeName?this.props.themeName:""}  {this.showTags()} &nbsp;

                {this.props.pos=="new-line"?<span className="br1" />:''}

                 <i className={"flaticon-calendar "} /> {this.props.publishDate}
                &nbsp;
                <span className="br1" />
                <i className="flaticon-social" /> {this.props.authorName}
                &nbsp;
                {this.props.pos=="new-line"?<span className="br1" />:''}
                <SocialIcons social={true}  mSocials = {this.props.mSocials} pos={this.props.pos} shareLink={this.props.shareLink} shareImg={this.props.shareImg}/>
            </div>
        );
    }
}

export default InfoPanel;
