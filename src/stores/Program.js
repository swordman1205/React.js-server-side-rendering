import {observable, action} from 'mobx';
import Api from '../Api';
import themeStore from './Theme';
import viewerStore from './Viewer';

class ProgramStore {
    @observable inProgress = false;
    @observable inProgressLessons = false;
    @observable inProgressCL = false;
    @observable ProgramsList = [];
    @observable AllPrograms = [];
    @observable UserPrograms = [];
    @observable ProgramModules = [];
    @observable ModuleLessons = [];

    @observable CurrProgram = '';
    @observable CurrProgramData;

    @observable CurrModuleId = 0;
    @observable CurrModule = '';
    @observable CurrModuleName = '';

    @observable CurrLesson = '';
    @observable CurrLessonSlug = '';
    @observable CurrLessonName = '';

    @observable CurrLessonContent;
    @observable RecomendedProgram;
    @observable NextLessonId = "";
    @observable NextLessonModuleId = "";

    @action setCurrProgram(id){
        this.CurrProgram = id;
        this.getProgramById();
    }

    @action setCurrModule(id, name){
        this.CurrModule = id;
        if(name!=""){
            this.CurrModuleName = name;
        } else {
            this.getModuleName(id);
        }
    }

    @action setCurrLesson(id, name){
        this.CurrLesson = id;
        if(name!=""){
            this.CurrLessonName = name;
        } else {
            this.getLessonName(id);
        }
        this.pullCurrLesson();
    }
    @action getModuleName(id) {
        return Api('/module-by-id', {method: 'post', body: {'module_id': id}})
            .then(action('then', (data) => {
                this.CurrModuleName = data.title;
                this.CurrModuleId = data.id;
            }))
            .catch(action('catch', (error) => {
                if (id!=0){
                    //Prevent redirect if status Cancelled
                    if(error != 'TypeError: Failed to fetch'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }
                }
            }))
    }
    @action getLessonName(id) {
        return Api('/lesson-by-id', {method: 'post', body: {'lesson_id': id}})
            .then(action('then', (data) => {
                this.CurrLessonName = data.title;
            }))
            .catch(action('catch', (error) => {
                if (id!=0){
                    //Prevent redirect if status Cancelled
                    if(error != 'TypeError: Failed to fetch'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }
                }
            }))
    }
    @action pullProgram() {
        this.inProgress = true;
        return Api('/products-list', {method: 'post', body: {'theme_slug': themeStore.currentTheme}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.ProgramsList = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }


    @action getProgramById() {
        this.inProgress = true;
        return Api('/current-program', {method: 'post', body: {'program_slug': this.CurrProgram}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.CurrProgramData = data;
            }))
            .catch(action('catch', (error) => {
                this.inProgress = false;
                if(this.CurrProgram){
                    //Prevent redirect if status Cancelled
                    if(error != 'TypeError: Failed to fetch'){
                        history.replaceState(null, null, '/error');
                        history.go(0);
                    }
                }
            }))
    }

    @action pullAllPrograms() {
        this.inProgress = true;
        return Api('/programs', {method: 'post', body: {'text_limit': '120'}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.AllPrograms = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullUserPrograms() {
        this.inProgress = true;
        return Api('/my-programs', {method: 'post', body: {'text_limit': '120'}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.UserPrograms = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }
    @action addFreeProgram(token) {
        return Api('/add-fullfree-program', {method: 'post', body: {'fullfree_token': token}})
            .then(action('then', (data) => {
                if(data.success){
                    this.pullUserPrograms();
                }
            })).catch(action('catch', ({error}) => {

            }))
    }
    @action pullCurrLesson() {
        this.inProgressCL = true;
        return Api('/lesson-content', {method: 'post', body: {'lesson_id': this.CurrLesson}})
            .then(action('then', (data) => {
                this.inProgressCL = false;
                this.CurrLessonContent = data;
                this.CurrLessonSlug = data.slug;
                this.NextLessonId = data.next_lesson_id;
                this.NextLessonModuleId = data.next_lesson_module_id;
                viewerStore.pullComments("lesson");
            }))
            .catch(action('catch', ({error}) => {
                this.inProgressCL = false;
                this.CurrLessonContent = undefined;
            }))
    }

    @action pullProgramModules() {
        this.inProgress = true;
        return Api('/programs-modules', {method: 'post', body: {'program_slug': this.CurrProgram}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.ProgramModules = data;
                if(this.CurrModule==""){
                    this.CurrModule = data[0].id;
                    this.CurrModuleName = data[0].name;
                }

                this.pullModuleLessons(this.CurrModule);
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action pullModuleLessons() {
        this.inProgressLessons = true;
        return Api('/modules-lessons', {method: 'post', body: {'module_id': this.CurrModule}})
            .then(action('then', (data) => {
                this.inProgressLessons = false;
                this.ModuleLessons = data;
                if(this.CurrLesson=="") {
                    if (data[0]) {
                        this.CurrLesson = data[0].id;
                        this.CurrLessonName = data[0].name;
                    } else {
                        this.CurrLesson = "";
                        this.CurrLessonName = "";
                        this.CurrLessonContent = undefined;
                    }
                }
                this.pullCurrLesson();

            }))
            .catch(action('catch', ({error}) => {
                this.inProgressLessons = false;
            }))
    }

    @action pullReconendedProgram(){
        this.inProgress = true;
        return Api('/recommended-program', {method: 'post', body: {'program_slug': this.CurrProgram}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.RecomendedProgram = data;
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }

    @action setLessonCompleted(currLesson){
        this.inProgress = true;
        return Api('/set-lesson-completed', {method: 'post', body: {'lesson_id': currLesson}})
            .then(action('then', (data) => {
                this.inProgress = false;
                this.RecomendedProgram = data;
                this.pullModuleLessons();
            }))
            .catch(action('catch', ({error}) => {
                this.inProgress = false;
            }))
    }
}

export default new ProgramStore();
