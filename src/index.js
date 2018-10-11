import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'App';
import viewerStore from './stores/Viewer';
import authStore from './stores/Auth';
import userStore from './stores/User';
import themeStore from './stores/Theme';
import blogStore from './stores/Blog';
import programStore from './stores/Program';
import contactsStore from './stores/Contacts';
import directoriesStore from './stores/Directories';
import paymentStore from './stores/Payment';
import discussionStore from './stores/Discussion';
import threadStore from './stores/Thread';
import socialStore from './stores/Social';
import { Provider } from 'mobx-react';

const stores = {
    viewerStore,
    authStore,
    userStore,
    themeStore,
    blogStore,
    programStore,
    contactsStore,
    directoriesStore,
    paymentStore,
    discussionStore,
    threadStore,
    socialStore
};


const app = document.getElementById('app');

hydrate(<Provider {...stores}><Router><App/></Router></Provider>, app);
