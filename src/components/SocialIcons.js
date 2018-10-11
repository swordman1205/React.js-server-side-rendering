import React, {Component} from 'react';
import { ShareButtons} from 'react-share';
import styles from '../styles/components/SocialIcons.css';

/*https://www.npmjs.com/package/react-share*/

class SocialIcons extends Component {
    render() {
        const {
            FacebookShareButton,
            TwitterShareButton,
            WhatsappShareButton,
            PinterestShareButton
        } = ShareButtons;
        let newURL = typeof window === 'undefined' ? '' : window.location.protocol + "//" + window.location.host + this.props.shareLink;
        let ml0="";
        if (this.props.pos == "new-line"){
            ml0="ml0 mt10";
        }
        if(this.props.social){
            return (
                <span className= {"date-text date-social " +this.props.mSocials}>
                    <FacebookShareButton className={"flaticon-facebook-logo fb slink " + ml0} url={newURL} />
                    <TwitterShareButton className="flaticon-twitter-logo-silhouette tw slink" url={newURL} />
                    <WhatsappShareButton className="flaticon-whatsapp-logo wp slink" url={newURL} title="nuevas evas" />
                    <PinterestShareButton className="flaticon-pinterest pr slink" url={newURL} media={this.props.shareImg?this.props.shareImg:"https://nuevas-evas.clevercrew.io/foro/styles/flatawesomeplus/xenforo/logo.png"} description={"Programas de Tratamiento de Enfermedades"} />
                </span>
            );
        }
        else {
            return (
                <span></span>
            )
        }
    }
}

export default SocialIcons;
