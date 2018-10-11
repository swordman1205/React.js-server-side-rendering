import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';
import blogStore from './Blog';

class ThemeStore {
    @observable inProgress = false;
    @observable inProgressForum = false;
    @observable inProgressForum2 = false;
    @observable ThemesList = [];
    @observable ThemesListForo = [];
    @observable subThemesList = [];
    @observable currentTheme = "";
    @observable currentSubTheme = "";
    @observable newTheme = "";
    @observable newSubTheme = "";
    @observable currentThemeName = 'Salud';
    @observable currentThemeMetaDesc = '';
    @observable currentSubThemeName = '';
    @observable greetingBanner = false;
    @observable bubbleBanner = false;
    @observable ForoList = [];
    @observable ForoList2 = [];
    @observable ForoLinks = {create_message_url:"", foro_url:""};
    @observable FAQ = [];
    @observable storiesList = [];
    @observable testimonialsList = [];
    @observable topBanner = [];
    @observable memberBanner = [];


    @action setCurrentTheme(slug, name) {
        if(slug==undefined || slug==null || slug=="" || slug=="alimentacion-saludable"){
            this.currentTheme = "";
            this.currentThemeMetaDesc = "";
            blogStore.Tags = [];
            this.currentThemeName = 'Salud';
        } else {
            this.currentTheme = slug;
            this.getTheme(slug);
            blogStore.pullTags(slug);
        }
        this.setSubTheme('');
        viewerStore.setCurrPage(1);
        viewerStore.setOffsetPage(0);
    }

    @action setSubTheme(slug) {
        if(slug==undefined || slug==null || slug==""){
            this.currentSubTheme = "";
            this.currentSubThemeName = "";
        } else {
            this.currentSubTheme = slug;
            this.getSubTheme(slug);
            this.pullForoList();
        }

    }

    @action setNewTheme(slug) {
        if(slug==undefined || slug==null || slug==""){
            this.newTheme = "";
        } else {
            this.newTheme = slug;
        }
    }

    @action setNewSubTheme(slug) {
        if(slug==undefined || slug==null || slug==""){
            this.newSubTheme = "";
        } else {
            this.newSubTheme = slug;
        }
    }

    @action getTheme(slug) {
        this.inProgress = true;
        return Api('/theme', {method: 'post', body: {'theme_slug': slug}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.currentThemeName = data.name;
                if (data.meta_description!=null){
                    this.currentThemeMetaDesc = data.meta_description;
                } else {
                    this.currentThemeMetaDesc = "";
                }
            }))
            .catch(action('catch', (error) => {
                if(slug){
                    console.log('/theme', error);
                  /*  alert('/theme');*/
                    //Prevent redirect if status Cancelled
                    if(error != 'TypeError: Failed to fetch' && typeof history !== 'undefined'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }
                }
                this.inProgress = false;
            }))
    }

    @action getSubTheme(slug) {
        return Api('/foro-subtheme', {method: 'post', body: {'subtheme_slug': slug}})
            .then(action('then', (data) => {
                this.currentSubThemeName = data.name;
            }))
            .catch(action('catch', (error) => {
                if(slug){
                    //Prevent redirect if status Cancelled
                    if(error != 'TypeError: Failed to fetch'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }
                  /*  alert('/foro-subtheme');*/
                }
            }))
    }

    @action pullThemesList() {
        this.inProgress = true;
        return Api('/themes-list', {method: 'post', body: {'for_thread': false}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.ThemesList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullThemesListForo() {
        this.inProgressPag = true;
        return Api('/themes-list', {method: 'post', body: {'for_thread': true}})
            .then(action('then', (data) => {
                this.inProgressPag = false;
                this.ThemesListForo = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressPag = false;
            }))
    }

    @action pullSubThemesList(slug) {
        if(slug==""){
            slug = "alimentacion-saludable";
        }
        this.inProgressPag = true;
        return Api('/sub-themes-list', {method: 'post', body: {'theme_slug': slug}})
            .then(action('then', (data) => {
                this.inProgressPag = false;
                this.subThemesList = data;
            }))
            .catch(action('catch', (error) => {
                this.inProgressPag = false;
                if(slug!="" && slug!="alimentacion-saludable"){
             /*        alert('slug', slug);*/
                    //Prevent redirect if status Cancelled
          /*          if(error != 'TypeError: Failed to fetch'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }*/
                }
            }))
    }

    @action pullGreetingBanner() {
        this.inProgress = true;
        return Api('/themes/greeting-banner', {method: 'post', body: {'theme_slug': this.currentTheme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.greetingBanner = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullBubbleBanner() {
        this.inProgress = true;
        return Api('/themes/bubble-banner', {method: 'post', body: {'theme_slug': this.currentTheme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.bubbleBanner = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action updateForum() {
        this.pullForoList();
    }

    @action pullForoList(currentThemeSlug = this.currentTheme) {
        this.inProgressForum = true;
        viewerStore.setPagesCount(1, 'forum');
        if(currentThemeSlug == ""){
            currentThemeSlug = "alimentacion-saludable";
        }
        return Promise.all([
            Api('/foro-threads-count', {method: 'post', body: {'theme_slug': currentThemeSlug, 'sub_theme_slug':this.currentSubTheme}}),
            Api('/foro-threads-list', {method: 'post', body: {'theme_slug': currentThemeSlug, 'sub_theme_slug':this.currentSubTheme, 'offset':viewerStore.offsetPage, 'rec_limit':viewerStore.forumLimit}})
        ])
        .then(action('then', ([count, data]) => {
            this.inProgressForum = false;
            viewerStore.setPagesCount(count.items_count, 'forum');
            this.ForoList = data;
        }))
        .catch(action('catch', ({error}) => {
            this.inProgressForum = false;
        }))
    }

    @action pullForoList2(currentThemeSlug = this.currentTheme) {
        this.inProgressForum2 = true;
        return  Api('/foro-threads-list', {method: 'post', body: {'theme_slug': currentThemeSlug, 'sub_theme_slug':this.currentSubTheme, 'offset':viewerStore.offsetPage, 'rec_limit':viewerStore.forumLimit}})

            .then(action('then', ( data) => {
                this.inProgressForum2 = false;
                this.ForoList2 = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressForum2 = false;
            }))
    }

    @action pullFAQ() {
        this.inProgress = true;
        return Api('/faq-list', {method: 'post', body: {'theme_slug': this.currentTheme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.FAQ = data.faq_list;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullStories() {
        this.inProgress = true;
        return Api('/stories-list', {method: 'post', body: {'theme_slug': this.currentTheme, 'rec_limit':3}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.storiesList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullTestimonials() {
        this.inProgress = true;
        return Api('/testimonials-list', {method: 'post', body: {'rec_limit':3}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.testimonialsList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullTopBanner() {
        this.inProgress = true;
        return Api('/get-top-banner', {method: 'post', body: {'theme_slug': this.currentTheme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.topBanner = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullMemberBanner() {
        this.inProgress = true;
        return Api('/get-program-banner', {method: 'post', body: {'theme_slug': this.currentTheme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.memberBanner = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }
    @action pullRecipeSlug() {
        this.inProgress = true;
        return Api('/get-recipes-slug')
            .then(action('then', (data) => {
                this.inProgress = false;
                this.recipeSlug = data.slug;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }
}

export default new ThemeStore();
