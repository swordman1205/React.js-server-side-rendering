import {observable, action} from 'mobx';
import Api from '../Api';
import viewerStore from './Viewer';

class DirectoriesStore {
    @observable inProgress = false;
    @observable inProgressCL = false;
    @observable inProgressSCi = false;
    @observable inProgressDCL = false;
    @observable inProgressCCL = false;
    @observable inProgressCoRB = false;
    @observable inProgressCiRB = false;
    @observable inProgressBL = false;
    @observable CountriesList = [];
    @observable SearchCityList = [];
    @observable SuggestedCities = [];
    @observable DirectoryCategoriesList = [];
    @observable CountryCitiesList = [];
    @observable CountryInfo = {};
    @observable CityInfo = {};
    @observable CategoryInfo = {};
    @observable countrySlug = '';
    @observable citySlug = '';
    @observable categorySlug = '';
    @observable businessSlug = '';
    @observable categoriesListOnline = false;
    @observable searchField = '';
    @observable CountryRecentBusinesses = [];
    @observable CityRecentBusinesses = [];
    @observable BusinessesList = [];
    @observable Business = {};
    @observable directoryIsOnline = true;



    @action setSearchField(searchField) {
        this.searchField = searchField;
    }

    @action setCategoriesListOnline(categoriesListOnline) {
        this.categoriesListOnline = categoriesListOnline;
    }

    @action setCountrySlug(countrySlug) {
        this.countrySlug = countrySlug;
    }

    @action setCitySlug(citySlug) {
        this.citySlug = citySlug;
    }

    @action setCategorySlug(categorySlug) {
        this.categorySlug = categorySlug;
    }

    @action setBusinessSlug(businessSlug) {
        this.businessSlug = businessSlug;
        this.pullBusiness();
    }

    @action setDirectoryIsOnline(directoryIsOnline) {
        this.directoryIsOnline = directoryIsOnline;
    }

    @action updateDirectory() {
        this.pullBusinessesList();

    }

    @action pullSearchCityList() {
        this.inProgress = true;
        return Api('/search-city', {method: 'post', body: {'rec_limit': '10', 'search_text': this.searchField}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.SearchCityList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullCountriesList() {
        this.inProgressCL = true;
        return Api('/countries-list', {method: 'get'})
            .then(action('then', (data) => {
                this.inProgressCL = false;
                this.CountriesList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressCL = false;
            }))
    }

    @action pullSuggestedCities() {
        this.inProgressSCi = true;
        return Api('/suggested-cities', {method: 'post', body: {'rec_limit': '28'}})
            .then(action('then', (data) => {
                this.inProgressSCi = false;
                this.SuggestedCities = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressSCi = false;
            }))
    }

    @action pullDirectoryCategoriesList() {
        this.inProgressDCL = true;
        return Api('/directory-categories-list', {method: 'post', body: {'is_online': this.categoriesListOnline}})
            .then(action('then', (data) => {
                this.inProgressDCL = false;
                this.DirectoryCategoriesList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressDCL = false;
            }))
    }

    @action pullCountryCitiesList() {
        this.inProgressCCL = true;
        return Api('/countries-cities', {method: 'post', body: {'country_slug': this.countrySlug}})
            .then(action('then', (data) => {
                this.inProgressCCL = false;
                this.CountryCitiesList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressCCL = false;
            }))
    }

    @action pullCountryInfo() {
        this.inProgress = true;
        return Api('/country', {method: 'post', body: {'country_slug': this.countrySlug}})
            .then(action('then', (data) => {
             /*   if (!data.id){
                    history.replaceState(null, null, '/error');
                    history.go(0);
                }*/
                this.inProgress = false;
                this.CountryInfo = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullCityInfo() {
        this.inProgress = true;
        return Api('/city', {method: 'post', body: {'city_slug': this.citySlug}})
            .then(action('then', (data) => {
                if (!data.id){
                    history.replaceState(null, null, '/error');
                    history.go(0);
                }
                this.inProgress = false;
                this.CityInfo = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullCategoryInfo() {
        this.inProgress = true;
        return Api('/category', {method: 'post', body: {'category_slug': this.categorySlug}})
            .then(action('then', (data) => {
                if (!data.id){
                    history.replaceState(null, null, '/error');
                    history.go(0);
                }
                this.inProgress = false;
                this.CategoryInfo = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }


    @action pullCountryRecentBusinesses() {
        this.inProgressCoRB = true;
        return Api('/country-recent-biz', {method: 'post', body: {'rec_limit': '6', 'country_slug': this.countrySlug}})
            .then(action('then', (data) => {
                this.inProgressCoRB = false;
                this.CountryRecentBusinesses = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressCoRB = false;
            }))
    }

    @action pullCityRecentBusinesses() {
        this.inProgressCiRB = true;
        return Api('/city-recent-biz', {method: 'post', body: {'rec_limit': '6', 'city_slug': this.citySlug}})
            .then(action('then', (data) => {
                this.inProgressCiRB = false;
                this.CityRecentBusinesses = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressCiRB = false;
            }))
    }


    @action pullBusinessesList() {
        this.inProgressBL = true;
        return Promise.all([
                Api('/biz-list', {method: 'post', body: {'is_online': this.directoryIsOnline, 'city_slug': this.citySlug, 'category_slug': this.categorySlug, 'rec_limit': '10', 'offset':'0'}}),
                Api('/biz-list', {method: 'post', body: {'is_online': this.directoryIsOnline, 'city_slug': this.citySlug, 'category_slug': this.categorySlug, 'rec_limit': viewerStore.directoryLimit, 'offset':viewerStore.offsetPage}})
            ])
            .then(action('then', ([count, data]) => {
                this.inProgressBL = false;
                viewerStore.setPagesCount(count.total_count, 'directory');
                this.BusinessesList = data.directories;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressBL = false;
            }))
    }

    @action pullBusiness() {
        this.inProgress = true;
        return Api('/get-business', {method: 'post', body: {'business_slug': this.businessSlug}})
            .then(action('then', (data) => {
                if (!data.id){
                    history.replaceState(null, null, '/error');
                    history.go(0);
                }
                this.inProgress = false;
                this.Business = data;
                viewerStore.pullComments("directory");

            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }



}

export default new DirectoriesStore();


