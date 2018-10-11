import React, {Component} from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import Navigation from './components/Navigation'
import MobileNavigation from './components/MobileNavigation'
import LoginPopup from './components/LoginPopup'
import Footer from './components/Footer'
// Routes
import Home from './routes/Home';
import Programs from './routes/Programs';
import ProgramModules from './routes/ProgramasModules';
import Blog from './routes/Blog';
import BlogPost from './routes/BlogPost';
import Contact from './routes/Contact';
import ContactConfirm from './routes/ContactConfirm';
import Directory from './routes/Directory';
import DirectorySingle from './routes/DirectorySingle';
import DirectoryCountry from './routes/DirectoryCountry';
import DirectoryCategory from './routes/DirectoryCategory';
import DirectoryCategoryOnline from './routes/DirectoryCategoryOnline';
import DirectoryPost from './routes/DirectoryPost';
import DirectoryPostOnline from './routes/DirectoryPostOnline';
import NuevasVisitor from './routes/NuevasVisitor';
import Checkout from './routes/Checkout';
import Confirmation from './routes/Confirmation';
import ConfirmationError from './routes/ConfirmationError';
import Error404 from './routes/Error404';
import EmailConfirmation from './routes/EmailConfirmation';
import EmailConfirmationSuccess from './routes/EmailConfirmationSuccess';
import PostPurchase from './routes/PostPurchase';
import TermsAndConditions from './routes/TermsAndConditions';
import PrivacyPolicy from './routes/PrivacyPolicy';
import SearchResults from './routes/SearchResults';
import ConfirmSubscription from './routes/ConfirmSubscription';
import ConfirmAfterSubscription from './routes/ConfirmAfterSubscription';
import Thread from './routes/Thread';
import NewDiscussion from './routes/NewDiscussion';
import EditProfile from './routes/EditProfile';
import NewSearch from './routes/NewSearch';
import PostsHistory from './routes/PostsHistory';

import DevTools from 'mobx-react-devtools';
import {inject, observer} from 'mobx-react';

import './styles/App.css';

let scrollToComponent;

global.CONFIG = require('../config').default;

@withRouter

@inject('viewerStore', 'paymentStore', 'socialStore')
@observer

class App extends Component {

    componentDidMount() {
      scrollToComponent = require('react-scroll-to-component');
      this.props.viewerStore.setToken(window.localStorage.getItem('jwt'));
      this.props.paymentStore.setTx(window.localStorage.getItem('tx'));
      this.props.socialStore.setOrigin(window.location.origin);
    }

    componentDidUpdate(){
        if (!window.location.hash && this.props.viewerStore.scrollTop){
            scrollToComponent(
                this.refs.main,
                {
                    offset: 0,
                    align: 'top',
                    duration: 1000
                }
            );

        } else {
            this.props.viewerStore.setScrollTop(true);
        }
    }

    render() {
        return (
            <div className="App" ref="main">
                <Navigation/>
                <MobileNavigation/>
                <LoginPopup/>
                <Switch>
                    <Route exact path="/programas" component={Programs}/>
                    <Route exact path="/programas/:programSlug" component={ProgramModules}/>
                    <Route exact path="/programas/:programSlug/:moduleSlug" component={ProgramModules}/>
                    <Route path="/programas/:programSlug/:moduleSlug/:lessonSlug" component={ProgramModules}/>
                    {/* Commented to prevent error while login from Temas page */}
                    <Route path="/error" component={Error404}/>
                    <Route exact path="/blog" component={Blog}/>
                    <Route exact path="/blog(_\d)" component={Blog}/>
                    <Route exact path="/blog/:postSlug(\d+-.*)" component={BlogPost}/>

                    <Route exact path="/blog/:category" component={Blog}/>
                    <Route exact path="/blog/:category/:tag" component={Blog}/>

                    {/*<Route exact path="/post/:category/:postSlug" component={BlogPost}/>*/}

                    <Route path="/contacto" component={Contact}/>
                    <Route path="/confirmacion-contacto" component={ContactConfirm}/>

                    <Route exact path="/directorio" component={Directory}/>
                    <Route exact path="/directorio/local/:countrySlug" component={DirectoryCountry}/>
                    <Route exact path="/directorio/local/:countrySlug/:citySlug" component={DirectorySingle}/>
                    <Route exact path="/directorio/local/:countrySlug/:citySlug/:categorySlug" component={DirectoryCategory}/>
                    <Route path="/directorio/local/:countrySlug/:citySlug/:categorySlug/:businessSlug" component={DirectoryPost}/>
                    <Route exact path="/directorio/online/:categorySlug" component={DirectoryCategoryOnline}/>
                    <Route path="/directorio/online/:categorySlug/:businessSlug" component={DirectoryPostOnline}/>
                    <Route path="/directory-post" component={DirectoryPost}/>



                    <Route path="/las-nuevas-evas" component={NuevasVisitor}/>
                    <Route exact path="/checkout/:productToken" component={Checkout}/>
                    <Route path="/confirmacion" component={Confirmation}/>
                    <Route path="/confirmacion-error" component={ConfirmationError}/>
                    <Route path="/email-confirmacion" component={EmailConfirmation}/>
                    <Route path="/email-confirmacion-exitosa" component={EmailConfirmationSuccess}/>

                    <Route path="/post-compra" component={PostPurchase}/>
                    <Route path="/terminos-condiciones" component={TermsAndConditions}/>
                    <Route path="/resultados-busqueda" component={SearchResults}/>
                    <Route path="/confirmar-suscripcion" component={ConfirmSubscription}/>
                    <Route path="/confirmacion-despues-subscripcion" component={ConfirmAfterSubscription}/>

                    <Route path="/comunidad/:threadSlug" component={Thread}/>
                    <Route path="/nueva-conversacion" component={NewDiscussion}/>
                    <Route path="/editar-perfil" component={EditProfile}/>
                    <Route path="/busqueda" component={NewSearch}/>
                    <Route exact path="/historial-posts/:userId" component={PostsHistory}/>
                    <Route path="/politica-de-privacidad" component={PrivacyPolicy}/>

                    <Route exact path="/" component={Home}/>
                    <Route exact path="/:theme" component={Home}/>
                    <Route exact path="/:theme/:subtheme" component={Home}/>

                    {/* Commented to prevent error while login from Temas page */}
                    {/*<Route path="*" component={Error404}/>*/}
                </Switch>
                    <Footer/>

              {/*  <DevTools />*/}
            </div>
        );
    }
}

export default App;
