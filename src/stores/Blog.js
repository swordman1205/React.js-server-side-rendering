import {observable, action} from 'mobx';
import Api from '../Api';
import themeStore from './Theme';
import viewerStore from './Viewer';
import programStore from './Program';

class BlogStore {
    @observable inProgressRA = false;
    @observable inProgressBA = false;
    @observable inProgressRR = false;
    @observable inProgressPost = false;
    @observable inProgress = false;

    @observable RecentArticles = [];
    @observable RecentReceipts = [];
    @observable RecentVideos = [];
    @observable BlogArticles = [];
    @observable BlogCategories = [];
    @observable Tags = [];
    @observable currTag = "";
    @observable currPost = {};
    @observable blogSlug = "";
    @observable recPosts = [];


    @action setCurrPost(slug){
        this.blogSlug = slug;
    }
    @action updateBlog() {
        this.pullArticles();
        this.pullRecentArticles();
        this.pullRecentReceipts();
        this.pullRecentVideos(4);
        programStore.pullProgram();
        themeStore.pullForoList2();
    }

    @action updateSidebar() {
        this.pullRecentArticles();
        this.pullRecentReceipts();
        this.pullRecentVideos(4);
        themeStore.pullForoList2();
    }
    @action pullRecentArticles() {
        this.inProgressRA = true;
        return Api('/articles-list', {method: 'post', body: {'theme_slug': themeStore.currentTheme, 'rec_limit':3, 'tag_slug':this.currTag}})
            .then(action('then', (data) => {
                this.inProgressRA = false;
                this.RecentArticles = data.articles;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressRA = false;
            }))
    }
    @action pullRecentReceipts() {
        this.inProgressRR = true;
        return Api('/articles-list', {method: 'post', body: {'theme_slug': themeStore.currentTheme, 'rec_limit':3, 'tag_slug':"recetas"}})
            .then(action('then', (data) => {
                this.inProgressRR = false;
                this.RecentReceipts = data.articles;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressRR = false;
            }))
    }
    @action pullRecentVideos(count=6) {
        this.inProgress = true;
        return Api('/videos-list', {method: 'post', body: {'theme_slug': themeStore.currentTheme, 'rec_limit':count}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.RecentVideos = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullArticles() {
        this.inProgressBA = true;
        return Promise.all([
            Api('/articles-list', {method: 'post', body: {'theme_slug': themeStore.currentTheme, 'rec_limit':'10', 'offset':'0', 'tag_slug':this.currTag}}),
            Api('/articles-list', {method: 'post', body: {'theme_slug': themeStore.currentTheme, 'rec_limit':viewerStore.blogLimit, 'offset':viewerStore.offsetPage, 'tag_slug':this.currTag}})
        ])
        .then(action('then', ([count, data]) => {
            this.inProgressBA = false;
            viewerStore.setPagesCount(count.total_count, 'blog');
            this.BlogArticles = data.articles;
        }))
        .catch(action('catch', ({error}) => {
            this.inProgressBA = false;
        }))
    }

    @action pullCategories() {
        this.inProgress = true;
        return Api('/blog-categories-list')
            .then(action('then', (data) => {
                this.inProgress = false;
                this.BlogCategories = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullTags(theme) {
        this.inProgress = true;
        return Api('/blog-tags-list', {method: 'post', body: {'blog_category_slug': theme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.Tags = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }
    @action setTag(slug) {
        if(slug==undefined || slug==null){
            this.currTag = "";
        } else {
            this.currTag = slug;
        }
    }
    @action pullPost(slug) {
        this.inProgressPost = true;
        return Api('/get-blog-post', {method: 'post', body: {'post_slug': slug}})
            .then(action('then', (data) => {
                this.inProgressPost = false;
                this.currPost = data;
                themeStore.setCurrentTheme(data.category_slug, "");
                viewerStore.pullComments("post");
                this.pullRecommendedPosts(slug);
            }))
            .catch(action('catch', (error) => {
                this.inProgressPost = false;
                if(slug){
                    //Prevent redirect if status Cancelled
                    if(error != 'TypeError: Failed to fetch'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }
                }
            }))
    }
    @action pullRecommendedPosts(slug) {
        this.inProgressRP = true;
        return Api('/recommended-articles', {method: 'post', body: {'post_slug': slug, 'rec_limit':5}})
            .then(action('then', (data) => {
                this.inProgressRP = false;
                this.recPosts = data.articles;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressRP = false;
            }))
    }
}

export default new BlogStore();
