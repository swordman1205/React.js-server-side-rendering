import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import themeStore from './Theme';

class DiscussionStore {
    @observable inProgress = false;
    @observable inProgressNewDiscussion = false;
    @observable inProgressSearch = false;

    @observable newDiscussionTitle = '';
    @observable newDiscussionText = '';
    @observable wysiwygText = '';
    @observable CountryInfo = [];
    @observable newDiscussionInfo = [];
    @observable editorState = undefined;
    @observable adminEditorState = undefined;
    @observable userEditorState = undefined;
    @observable newEditorState = undefined;
    @observable userPosts = [];
    @observable userName = '';
    @observable userId = '';
    @observable blogSearchResults = [];
    @observable discussionSearchResults = [];
    @observable searchText = '';
    @observable validationMessage = false;

    @action setEditorState(state) {
        this.editorState = state;
    }

    @action setAdminEditorState(state) {
        this.adminEditorState = state;
    }

    @action setUserEditorState(state) {
        this.userEditorState = state;
    }

    @action setNewEditorState(state) {
        this.newEditorState = state;
    }

    @action setNewDiscussionTitle(newDiscussionTitle) {
        this.newDiscussionTitle = newDiscussionTitle;
    }

    @action setNewDiscussionText(newDiscussionText) {
        this.newDiscussionText = newDiscussionText;
    }

    @action setWysiwygText(wysiwygText) {
        this.wysiwygText = wysiwygText;
    }

    @action setUserId(userId) {
        this.userId = userId;
    }

    @action setSearchText(searchText) {
        this.searchText = searchText;
    }

    @action setValidationMessage(validationMessage) {
        this.validationMessage = validationMessage;
    }

    @action createNewDiscussion() {
        this.inProgressNewDiscussion = true;
        return Api('/new-thread', {method: 'post', body: {'theme_slug': themeStore.newTheme, 'sub_theme_slug': themeStore.newSubTheme, 'name': this.newDiscussionTitle, 'text': this.newDiscussionText}})
            .then(action('then', (data) => {
                this.inProgressNewDiscussion = false;
                this.newDiscussionInfo = data;
                if (data.success) {
                    window.location.href = 'comunidad/'+data.thread_id+"-"+data.thread_slug;
                }
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressNewDiscussion = false;
            }))
    }

    @action pullCountryInfo(slug) {
        this.inProgress = true;
        return Api('/country', {method: 'post', body: {'country_slug': slug}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.CountryInfo = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }


    @action pullUserPosts() {
        this.inProgress = true;

        return Promise.all([
                Api('/user-threads-posts-count', {method: 'post', body: {'user_id': this.userId}}),
                Api('/user-threads-posts', {method: 'post', body: {'user_id': this.userId, 'rec_limit': viewerStore.historyLimit, 'offset':viewerStore.offsetPage}})
            ])
            .then(action('then', ([count, data]) => {
                this.inProgress = false;
                viewerStore.setPagesCount(count.items_count, 'history');
                this.userPosts = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action updateHistory() {
        this.pullUserPosts();
    }

    @action pullSearchResults() {
        this.inProgressSearch = true;

        return Promise.all([
                Api('/get-search-count', {method: 'post', body: {'search_text': this.searchText}}),
                Api('/get-search', {method: 'post', body: {'search_text': this.searchText, 'rec_limit': viewerStore.searchLimit, 'offset':viewerStore.offsetPage}})
            ])
            .then(action('then', ([count, data]) => {
                this.inProgressSearch = false;
                viewerStore.setPagesCount(count.items_count, 'search');
                this.blogSearchResults = data.blog;
                this.discussionSearchResults = data.discussion;

            }))
            .catch(action('catch', ({error}) => {
                this.inProgressSearch = false;
            }))
    }

    updateSearchResult(){
        this.pullSearchResults();
    }


}

export default new DiscussionStore();