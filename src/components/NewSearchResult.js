import React, {Component} from 'react';
import Golink from '../components/Golink';
import styles from '../styles/components/NewSearchResult.css';
import {Link} from 'react-router-dom';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'discussionStore', 'userStore')
@observer

class NewSearchResult extends Component {

    showSearchText(){
        let short_text = this.props.children;
        let search_text = this.props.discussionStore.searchText;
        let regEx = new RegExp('('+search_text+')', "ig");
        short_text = short_text.replace(regEx, '<span style="color:#44c735">$1</span>');

        function createMarkup() {
            return {__html: short_text};
        }
        function showProfile() {
            // Current user is author - go to edit-profile
            if(this.props.userStore.currentUser && (this.props.authorId==this.props.userStore.currentUser.user_id)){
                this.props.history.push('/editar-perfil');
                // Guest or user not author - show popup
            } else {
                this.props.threadStore.setCurrentAuthor(this.props.authorId);
                this.props.viewerStore.showProfilePopup();
            }
        }

        if(this.props.discussion){
            return(
                <div className="ns-discussion">
                    <Link to={"/comunidad/"+this.props.threadId+"-"+this.props.threadSlug} /*onClick={this.showProfile()}*/ className="ns-avatar" style={(this.props.avatar) ? {backgroundImage: 'url("'+this.props.avatar+'")'}:{backgroundColor: '#009989'}}><div className="ns-letter">{(this.props.avatar) ? '' : this.props.firstLetter}</div></Link>
                    <Link to={"/comunidad/"+this.props.threadId+"-"+this.props.threadSlug} className="ns-disc-msg">
                        <p><span className="ns-date">{this.props.date}</span>
                            <span dangerouslySetInnerHTML={createMarkup()} />
                            <span> ... </span>
                            <Golink chref={"/comunidad/"+this.props.threadId+"-"+this.props.threadSlug} size="gl6" className="show-mob">Ver más</Golink>
                        </p>
                    </Link>
                </div>
            )
        }
        else {
            return (
                <Link to={"/blog/"+this.props.postId+"-"+this.props.postSlug} className="ns-disc-msg">
                    <p><span className="ns-date">{this.props.date}</span>
                        <span dangerouslySetInnerHTML={createMarkup()} />
                        <span> ... </span>
                        <Golink chref={"/comunidad/"+this.props.threadId+"-"+this.props.threadSlug} size="gl6" className="show-mob">Ver más</Golink>
                    </p>
                </Link>
            )
        }
    }
    showTitle(){
        let short_text = this.props.title;
        let search_text = this.props.discussionStore.searchText;
        let regEx = new RegExp('('+search_text+')', "ig");
        short_text = short_text.replace(regEx, '<span style="color:#44c735">$1</span>');
        return <h4 className="top5 link-h4" dangerouslySetInnerHTML={{__html: short_text}} />
    }
    render() {
        return (
            <div className="new-search">
                <Link to={(this.props.discussion)?"/comunidad/"+this.props.threadId+"-"+this.props.threadSlug:"/blog/"+this.props.postId+"-"+this.props.postSlug}>
                    {this.showTitle()}
                </Link>
                {this.showSearchText()}
            </div>
        );
    }
}

export default NewSearchResult;
