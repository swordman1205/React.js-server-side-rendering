import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import themeStore from './Theme';
import userStore from './User';
import discussionStore from './Discussion';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';


class ThreadStore {
    @observable inProgressThread = false;
    @observable inProgressTP = false;
    @observable currentThreadSlug = "";
    @observable currentThreadData = undefined;
    @observable ctdThemeName = "";
    @observable ctdSubThemeName = "";
    @observable currentThreadId = 0;
    @observable ctdThemeSlug = "";
    @observable ctdSubThemeSlug = "";
    @observable likesUsersList = [];
    @observable quoteText = "";
    @observable quoteId = 0;
    @observable isEditPost = false;
    @observable editPostId = 0;
    @observable currentAuthor = {};
    @observable editTitle = false;
    @observable titleEdited = '';
    @observable threadThemeEdited = '';
    @observable threadSubThemeEdited = '';
    @observable wisEdit = 0;
    @observable dataLength = 0;
    @observable editTitlePopup = false;
    @observable deleteThreadPopup = false;
    @observable editPostPopup = false;
    @observable deletePostPopup = false;
    @observable deletePostNumber = 0;
    @observable deleteThreadValidation = false;
    @observable editTitleValidation = false;

    @action setCurrentAuthor(author){
        this.currentAuthor = author;
    }
    @action setEditorText(postId, htmlText){
        this.editPostId = postId;

        const contentBlock = htmlToDraft(htmlText);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        discussionStore.setEditorState(editorState);
    }

    @action setAdminEditorText(postId, htmlText){
        this.editPostId = postId;
        const contentBlock = htmlToDraft(htmlText);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        discussionStore.setAdminEditorState(editorState);
    }

    @action setUserEditorText(postId, htmlText){
        this.editPostId = postId;
        const contentBlock = htmlToDraft(htmlText);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        discussionStore.setUserEditorState(editorState);
    }


    @action setQuote(id, text){
        this.quoteText = text;
        this.quoteId = id;
    }
    @action setCurrentThread(slug) {
        if(slug==undefined || slug==null || slug==""){
            this.currentThreadSlug = "";
        } else {
            this.currentThreadSlug = slug;
        }
    }
    @action setCurrentThreadId(id) {
        if(id==undefined || id==null || id==""){
            this.currentThreadId = 0;
        } else {
            this.currentThreadId = id;
        }
    }
    @action setEditTitle(editTitle) {
        this.editTitle = editTitle;
    }

    @action setTitleEdited(titleEdited) {
        this.titleEdited = titleEdited;
    }

    @action setWisEdit(wisEdit) {
        this.wisEdit = wisEdit;
    }

    @action setThreadThemeEdited(slug) {
        if(slug==undefined || slug==null || slug==""){
            this.threadThemeEdited = "";
        } else {
            this.threadThemeEdited = slug;
        }
    }

    @action setThreadSubThemeEdited(slug) {
        if(slug==undefined || slug==null || slug==""){
            this.threadSubThemeEdited = '';
        } else {
            this.threadSubThemeEdited = slug;
        }
    }

    @action setEditTitlePopup(editTitlePopup) {
        this.editTitlePopup = editTitlePopup;
    }

    @action setDeleteThreadPopup(deleteThreadPopup) {
        this.deleteThreadPopup = deleteThreadPopup;
    }

    @action setDeletePostPopup(deletePostPopup) {
        this.deletePostPopup = deletePostPopup;
    }

    @action setEditPostPopup(editPostPopup) {
        this.editPostPopup = editPostPopup;
    }

    @action setDeletePostNumber(deletePostNumber) {
        this.deletePostNumber = deletePostNumber;
    }

    @action setDeleteThreadValidation(deleteThreadValidation) {
        this.deleteThreadValidation = deleteThreadValidation;
    }

    @action setEditTitleValidation(editTitleValidation) {
        this.editTitleValidation = editTitleValidation;
    }


    @action updateThread() {
        this.pullDiscussion();
        themeStore.pullSubThemesList(this.ctdThemeSlug);
        userStore.pullUser();
    }

    @action pullDiscussion() {
        this.inProgressThread = true;
        return Promise.all([
            Api('/get-thread-post-count', {method: 'post', body: {thread_slug: this.currentThreadSlug}}),
            Api('/get-thread', {method: 'post', body: {thread_slug: this.currentThreadSlug, 'offset':viewerStore.offsetPage, rec_limit: viewerStore.threadLimit}})
        ])
        .then(action('then', ([count, data]) => {
 /*           if (!data.thread_id){
                console.log('/get-thread', data);
                history.replaceState(null, null, '/error');
                history.go(0);
            }*/
            this.inProgressThread = false;
            viewerStore.setPagesCount(count.items_count, 'thread');
            this.dataLength = count.items_count;
            this.currentThreadData = data;
            this.setTempThreadData(data);
            if(data.theme){
                this.ctdThemeName = data.theme.title;
                this.ctdThemeSlug = data.theme.slug;
            }
            if(data.sub_theme){
                this.ctdSubThemeName = data.sub_theme.title;
                this.ctdSubThemeSlug = data.sub_theme.slug;
            }
        }))
        .catch(action('catch', ({error}) => {
            this.inProgressThread = false;
        }))
    }

    setTempThreadData(thread){
        this.titleEdited = thread.title;
        this.threadThemeEdited = thread.theme.slug;
        this.threadSubThemeEdited = thread.sub_theme.slug;
    }

    @action getUsersLikes(postId){
        this.currentThreadData.posts.map(item=>{
                if (item.id==postId){
                    this.likesUsersList = item.likes;
                    viewerStore.showLikesPopup();
                }
            }
        );
    }

    @action toggleLike(postId) {
        return Api('/like-thread-post', {method: 'post', body: {'post_id': postId}})
            .then(action('then', (data) => {
                if(data.success){
                    this.updateThread();
                }
            }))
            .catch(action('catch', ({error}) => {

            }))
    }
    @action clearWW(){
        discussionStore.setEditorState(EditorState.createEmpty());
        this.quoteId = 0;
        this.quoteText = "";
        discussionStore.setWysiwygText("");
        this.isEditPost = false;
        this.editPostId = 0;
    }
    @action sendNewPost() {
        this.inProgressTP = true;
        return Api('/new-thread-post', {method: 'post', body: {'thread_slug': this.currentThreadSlug, 'text': discussionStore.wysiwygText, 'parent_id':this.quoteId}})
            .then(action('then', (data) => {
                this.updateThread();
                this.clearWW();
                this.inProgressTP = false;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressTP = false;
            }))
    }

    @action sendEditedPost() {
        return Api('/edit-thread-post', {method: 'post', body: {'post_id': this.editPostId, 'text': discussionStore.wysiwygText, 'admin_token':''}})
            .then(action('then', (data) => {
                this.updateThread();
            }))
            .catch(action('catch', ({error}) => {

            }))
    }

    @action sendEditedTitle() {
        return Api('/edit-thread', {method: 'post', body: {'thread_slug': this.currentThreadSlug, 'theme_slug': this.threadThemeEdited, 'sub_theme_slug':this.threadSubThemeEdited, 'name':this.titleEdited}})
            .then(action('then', (data) => {
                this.updateThread();
            }))
            .catch(action('catch', ({error}) => {

            }))
    }

    @action checkCanEdit(postId, htmlText) {
        return Api('/check-editable-post', {method: 'post', body: {'post_id': postId}})
            .then(action('then', (data) => {
                this.isEditPost = data.can_edit;
                this.editPostId = postId;
                if(data.can_edit){
                    this.setWisEdit(postId);
                    this.setUserEditorText(postId, htmlText);
                } else {
                    discussionStore.setUserEditorState(EditorState.createEmpty());
                    discussionStore.setWysiwygText("");
                }
            }))
            .catch(action('catch', ({error}) => {

            }))
    }

    @action deleteThread() {
        return Api('/delete-thread', {method: 'post', body: {'thread_slug': this.currentThreadSlug}})
            .then(action('then', (data) => {

            }))
            .catch(action('catch', ({error}) => {

            }))
    }

    @action deleteThreadPost(postId) {
        return Api('/delete-thread-post', {method: 'post', body: {'post_id': postId}})
            .then(action('then', (data) => {

                if (data.success){
                    let page = viewerStore.getParameterByName('p');
                    if (page){
                        viewerStore.updatePageData(page, "thread");
                    }
                    else {
                        viewerStore.updatePageData(1, "thread");
                    }
                }
            }))
            .catch(action('catch', ({error}) => {

            }))
    }

}

export default new ThreadStore();
