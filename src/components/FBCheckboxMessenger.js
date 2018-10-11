import React, {Component} from 'react';
import FacebookProvider, { MessengerCheckbox } from 'react-facebook';

import {inject, observer} from 'mobx-react';

@inject('viewerStore', 'userStore', 'threadStore', 'authStore')
@observer

class FBCheckboxMessenger extends Component {
    constructor(props){
        super(props);
        this.state = {
            appId: "",
            pageId: "",
            origin: "",
            userRef: ""
        }
    }
    componentDidMount(){

        let userRef1 = Math.floor((Math.random() * 10000000000000) + 1);
        this.setState({
            appId: CONFIG.fb.appId,
            pageId: CONFIG.fb.pageId,
            origin: window.location.origin,
            userRef: userRef1.toString()
        });

        this.props.onRef(undefined);

        window.fbAsyncInit = function() {
            //SDK loaded, initialize it
            FB.init({
                appId      : CONFIG.fb.appId,
                xfbml      : true,
                version    : 'v2.6'
            });
            //JS SDK initialized, now you can use it
            FB.XFBML.parse();
        };

        //load the JavaScript SDK
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id; js.async=true;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        this.props.onRef(this);
    }
    confirmOptIn(e) {
        FB.AppEvents.logEvent('MessengerCheckboxUserConfirmation', null, {
            'app_id': this.state.appId,
            'page_id': this.state.pageId,
            'ref': this.props.userStore.currentUser.user_id,
            'user_ref': this.state.userRef
        });
        e.preventDefault();
    }

    render() {
        if(this.props.userStore.currentUser && this.props.userStore.currentUser.user_id){
            return(
                <div>
                    <FacebookProvider appId={this.state.appId}>
                        <MessengerCheckbox
                            appId={this.state.appId}
                            pageId={this.state.pageId}
                            origin={typeof window !== 'undefined' ? window.location.origin : ''}
                            prechecked={true}
                            allowLogin={false}
                            userRef={this.state.userRef}
                        />
                    </FacebookProvider>
                </div>
            );
        }
        else {
            return null;
        }

    }
}
export default FBCheckboxMessenger;
