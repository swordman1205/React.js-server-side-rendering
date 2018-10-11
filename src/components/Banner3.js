import React, {Component} from 'react';
import Golink from '../components/Golink';
import {inject, observer} from 'mobx-react';
import styles from '../styles/components/Banner3.css';

let scrollToComponent;

@inject('viewerStore', 'themeStore')
@observer
class Banner3 extends Component {

    componentDidMount () {
        scrollToComponent = require('react-scroll-to-component');
    }

    showLink(){
        if(this.props.themeStore.greetingBanner.treatment_link_text){
            return (
                <Golink
                    prevent = {true}
                    treatmentLink = {true}
                    click={()=>{

                        scrollToComponent(
                            this.props.linkRef,
                            {
                                offset: 0,
                                align: 'top',
                                duration: 1000
                            }
                        );}
                    }
                >
                    {this.props.themeStore.greetingBanner.treatment_link_text}
                </Golink>
            )
        }
    }
    render() {
        if(!this.props.viewerStore.token){
            return (
                <div className="c-cont1">
                    <h3 className="h3-9">
                        {this.props.themeStore.greetingBanner.greeting_title}
                    </h3>
                    <p className="p1 top3n2">
                        {this.props.themeStore.greetingBanner.greeting_description}
                    </p>
                    {this.showLink()}

                    <br/>
                    <a href={this.props.themeStore.greetingBanner.link_destination_button} target="_blank" className="green-button top5">
                        {this.props.themeStore.greetingBanner.program_free_button}
                    </a>
                </div>
            );
        } else {
            return (<span></span>)
        }
    }
}

export default Banner3;
