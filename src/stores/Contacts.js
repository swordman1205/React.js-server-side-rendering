import {observable, action} from 'mobx';
import Api from '../Api';
import directoriesStore from './Directories'

class ContactsStore {
    @observable inProgress = false;
    @observable ContactMessage = [];
    @observable CountriesList = [];
    @observable values = {
        name: '',
        email: '',
        city: '',
        phone: '',
        business: '',
        message: ''
    };

    @action setName(name) {
        this.values.name = name;
    }

    @action setEmail(email) {
        this.values.email = email;
    }

    @action setCity(city) {
        this.values.city = city;
    }

    @action setPhone(phone) {
        this.values.phone = directoriesStore.CountryInfo.phone_code+ " " + phone;
    }

    @action setBusiness(business) {
        this.values.business = business;
    }

    @action setMessage(message) {
        this.values.message = message;
    }

    @action sendContactForm() {
        this.inProgress = true;
        this.error = undefined;
        const {name, email, city, phone, business, message} = this.values;

        return Api('/send-email', {method: 'post', body: {name, email, city, phone, business, message}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.ContactMessage = data;
            }))
            .catch(action('catch', ({error}) => {
                this.error = error;
                this.inProgress = false;
            }))
    }

}

export default new ContactsStore();

