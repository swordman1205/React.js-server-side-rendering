import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import authStore from './Auth';
import discussionStore from './Discussion';

class SocialStore {
    @observable  appId = CONFIG.fb.appId;
    @observable  pageId = CONFIG.fb.pageId;
    @observable  origin;

    @action setOrigin(origin) {
        this.origin = origin;
    }
}

export default new SocialStore();

