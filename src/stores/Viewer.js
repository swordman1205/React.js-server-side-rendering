import { observable, action, reaction } from 'mobx';
import Api from '../Api';
import programStore from './Program';
import directoriesStore from './Directories';
import blogStore from './Blog';
import viewerStore from './Viewer';
import themeStore from './Theme';
import threadStore from './Thread';
import discussionStore from './Discussion';

class Viewer {
    @observable registerPage = '/register-step1';
    @observable showRegisterPopup = false;
    @observable showMobileProfilePopup = false;
    @observable registerStep = 1;
    @observable inProgress = false;
    @observable inProgressPag = false;
    @observable isLoginShow = false;
    @observable isPasswordAssistance = false;
    @observable isPasswordConfirmation = false;
    @observable isPasswordAssistanceErr = false;
    @observable isCreateNewPassword = false;
    @observable isAfterPaymentPopup = false;
    @observable isLikesPopup = false;
    @observable isProfilePopup = false;
    @observable isChooseNicknamePopup = false;
    @observable isProfileChangeSuccess = false;
    @observable isMobileNavShow = false;
    @observable token;
    @observable username;
    @observable currPage=1;
    @observable offsetPage=0;
    @observable limit=15;
    @observable blogLimit=15;
    @observable directoryLimit=15;
    @observable threadLimit=5;
    @observable forumLimit=6;
    @observable historyLimit=10;
    @observable searchLimit=6;
    @observable totalCount=0;
    @observable pagesCount=0;

    @observable CommentsList=[];
    @observable CommentsObjectSlug = '';
    @observable CommentAreaText = "";

    @observable AfterBuy = false;
    @observable searchVal = "";
    @observable scrollTop = true;

    constructor() {
        reaction(
            () => this.token,
            token => {
              if (typeof window === 'undefined') return;
              if (token) {
                window.localStorage.setItem('jwt', token);
              } else {
                window.localStorage.removeItem('jwt');
              }
            }
        );
    }
    @action setScrollTop(val=true){
        this.scrollTop = val;
    }
    @action setRegisterStep(stepNumber){
        this.registerStep = stepNumber;
    }
    @action setHomePageData(slug, name) {
        this.currPage = 1;
        // for all
        themeStore.setCurrentTheme(slug, name);
        themeStore.pullSubThemesList(slug);
        themeStore.pullForoList(slug);
        blogStore.pullRecentArticles();
        blogStore.pullRecentReceipts();
        programStore.pullProgram();
        blogStore.pullRecentVideos();
        themeStore.pullFAQ();
        themeStore.pullStories();
        themeStore.pullTopBanner();

        // for visitor
        if(!viewerStore.token){
            themeStore.pullGreetingBanner();
            themeStore.pullBubbleBanner();
        }

        // for member
        if(viewerStore.token){
            themeStore.pullMemberBanner();
        }
    }

    @action hideAllPopups(){
        this.isLoginShow = false;
        this.isPasswordAssistance = false;
        this.isPasswordConfirmation = false;
        this.isPasswordAssistanceErr = false;
        this.isCreateNewPassword = false;
        this.isAfterPaymentPopup = false;
        this.isLikesPopup = false;
        this.isProfilePopup = false;
        this.isChooseNicknamePopup = false;
        this.showRegisterPopup = false;
        this.bodyClass(false);
    }

    @action setShowMobileProfilePopup(show=false){
        this.showMobileProfilePopup = show;
    }
    @action setRegisterPopup(show=false) {
        this.hideAllPopups();
        this.showRegisterPopup = show;
    }

    @action setProfileChangeSuccess(isProfileChangeSuccess) {
        this.isProfileChangeSuccess = isProfileChangeSuccess;
    }

    @action getParameterByName(name, url) {
        if (typeof window === 'undefined') return '';
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    @action updatePageData(targetPage, type="blog"){
        if(targetPage==null){
            targetPage=1;
        }
        this.currPage = targetPage;
        this.setCurrPage(targetPage);
        if(type=="blog"){
            this.setOffsetPage((targetPage-1)*this.blogLimit);
            blogStore.updateBlog();
        }
        if(type=="directory"){
            this.setOffsetPage((targetPage-1)*this.directoryLimit);
            directoriesStore.updateDirectory();
        }
        if(type=="thread"){
            this.setOffsetPage((targetPage-1)*this.threadLimit);
            threadStore.updateThread();
        }
        if(type=="forum"){
            this.setOffsetPage((targetPage-1)*this.forumLimit);
            themeStore.updateForum();
        }
        if(type=="history"){
            this.setOffsetPage((targetPage-1)*this.historyLimit);
            discussionStore.updateHistory();
        }
        if(type=="search"){
            this.setOffsetPage((targetPage-1)*this.searchLimit);
            discussionStore.updateSearchResult();
        }
    }

    @action setCurrPage(page) {
        this.currPage = page;
    }

    @action setOffsetPage(offset=0) {
        this.offsetPage = offset;
    }

    @action setPagesCount(totalCount, type) {
        this.totalCount = totalCount;
        let curLimit = 1;
        if(type=="blog"){
            curLimit = this.blogLimit;
        }
        if(type=="directory"){
            curLimit = this.directoryLimit;
        }
        if(type=="thread"){
            curLimit = this.threadLimit;
        }
        if(type=="history"){
            curLimit = this.historyLimit;
        }
        if(type=="search"){
            curLimit = this.searchLimit;
        }
        if(type=="forum"){
            curLimit = this.forumLimit;
        }
        this.pagesCount = Math.ceil(totalCount/curLimit);
    }


    @action setCommentAreaText(text) {
        this.CommentAreaText = text;
    }
    @action showLogin() {
        this.hideAllPopups();
        this.isLoginShow = true;
        this.bodyClass(true);
    }
    @action hideLogin() {
        this.isLoginShow = false;
    }

    @action showPasswordAssistance() {
        this.hideAllPopups();
        this.isPasswordAssistance = true;
    }
    @action hidePasswordAssistance() {
        this.isPasswordAssistance = false;
    }


    @action showPasswordConfirmation() {
        this.hideAllPopups();
        this.isPasswordConfirmation = true;
    }
    @action hidePasswordConfirmation() {
        this.isPasswordConfirmation = false;
    }

    @action showPasswordAssistanceErr() {
        this.hideAllPopups();
        this.isPasswordAssistanceErr = true;
    }
    @action hidePasswordAssistanceErr() {
        this.isPasswordAssistanceErr = false;
    }

    @action showCreateNewPassword() {
        this.hideAllPopups();
        this.isCreateNewPassword = true;
    }
    @action hideCreateNewPassword() {
        this.isCreateNewPassword = false;
    }
    @action showAfterPaymentPopup() {
        this.hideAllPopups();
        this.isAfterPaymentPopup = true;
    }
    @action hideAfterPaymentPopup() {
        this.isAfterPaymentPopup = false;
    }
    @action showChooseNicknamePopup() {
        this.hideAllPopups();
        this.isChooseNicknamePopup = true;
    }
    @action hideChooseNicknamePopup() {
        this.isChooseNicknamePopup = false;
    }

    @action showLikesPopup() {
        this.hideAllPopups();
        this.isLikesPopup = true;
    }
    @action hideLikesPopup() {
        this.isLikesPopup = false;
    }
    @action showProfilePopup() {
        this.hideAllPopups();
        this.isProfilePopup = true;
    }
    @action hideProfilePopup() {
        this.isProfilePopup = false;
    }



    @action showMobileNav() {
        this.isMobileNavShow = true;
    }
    @action hideMobileNav() {
        this.isMobileNavShow = false;
    }

    @action setToken(token) {
        this.token = token;
    }
    @action setUsername(username) {
        this.username = username;
    }
    @action pullComments(type){
        this.inProgress = true;
        if(type=="lesson"){
            this.CommentsObjectSlug = programStore.CurrLessonSlug;
        }
        if(type=="directory"){
            this.CommentsObjectSlug = directoriesStore.businessSlug;
        }
        if(type=="post"){
            this.CommentsObjectSlug = blogStore.blogSlug;
        }
        return Api('/comments', {method: 'post', body: {'object_slug': this.CommentsObjectSlug, 'object_type':type}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.CommentsList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }
    @action addComment(type){
        if(viewerStore.token){
            this.inProgress = true;
            if(type=="lesson"){
                this.CommentsObjectSlug = programStore.CurrLessonSlug;
            }
            if(type=="directory"){
                this.CommentsObjectSlug = directoriesStore.businessSlug;

            }
            if(type=="post"){
                this.CommentsObjectSlug = blogStore.blogSlug;
            }
            return Api('/add-comment', {method: 'post', body: {'object_slug': this.CommentsObjectSlug, 'object_type':type, 'comment_text':this.CommentAreaText}})
                .then(action('then', (data) => {
                    this.inProgress = false;
                    this.pullComments(type);
                    this.CommentAreaText="";
                }))
                .catch(action('catch', ({error}) => {
                    this.inProgress = false;
                }))
        } else {
            this.CommentAreaText="";
            viewerStore.showLogin();
        }
    }


    @action bodyClass(param){
        if (typeof document === 'undefined') return;
        let body = document.getElementsByTagName('body');
        if (param == true) {
            body[0].classList.add('hideScroll')
        }
        else {
            body[0].classList.remove('hideScroll')
        }
    }

    @action bodyClass2(param){
        if (typeof document === 'undefined') return;
        let body = document.getElementsByTagName('body');
        if (param == true) {
            body[0].classList.add('hideScroll2')
        }
        else {
            body[0].classList.remove('hideScroll2')
        }
    }

}
export default new Viewer();
