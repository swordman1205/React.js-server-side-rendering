import React, {Component} from 'react';
import Gobutton from '../components/Gobutton';
import {inject, observer} from 'mobx-react';

import styles from '../styles/components/ProgramItem.css';

@inject('viewerStore', 'themeStore')
@observer

class ProgramItem extends Component {
    showAchievementsList() {
        let i=0;
        if(this.props.pdata){
            return this.props.pdata.achievements.map(item =>
                <li key={i++}>{item}</li>
            );
        } else {
            return(
                <li className="">¡La información no existe!</li>
            );
        }
    }

    showIngredientsList() {
        let i=0;
        if(this.props.pdata) {
            return this.props.pdata.ingredients.map(item =>
                <li key={i++}>{item}</li>
            );
        } else {
            return(
                <li className="">¡La información no existe!</li>
            );
        }
    }

    render() {
        if(this.props.pdata){
            return (
                <div className="c-prog">
                    <div className="c-orange-label">
                        <div className="orange-label">
                            <i className={this.props.pdata.icon?this.props.pdata.icon+" smile":"flaticon-emoticon-with-happy-face smile"} /> {this.props.pdata?this.props.pdata.tag:""}
                        </div>
                    </div>

                    <div className="c-mob-prog">
                        <h3 className="h3-4">{this.props.pdata?this.props.pdata.title:""}</h3>
                        <a href={this.props.pdata?this.props.pdata.button_url:""} target="_blank" className="mob-btn"><span>Ver más</span>
                            <i className="icon flaticon-arrow-pointing-to-right"/>
                        </a>
                    </div>

                    <div className="title-prog1">Lograrás:</div>
                    <ul className="list-prog">
                        {this.showAchievementsList()}
                    </ul>

                    <div className="title-prog1 line-orange">Recibirás:</div>
                    <ul className="list-prog list-orange">
                        {this.showIngredientsList()}
                    </ul>
                    <Gobutton
                        subtitle={this.props.pdata?this.props.pdata.button_subtitle:""}
                        minWidth="100%"
                        hint={this.props.pdata?this.props.pdata.button_hint:""}
                        chref={this.props.pdata?this.props.pdata.button_url:""}
                        ctarget={"_blank"}
                    >
                        {this.props.pdata?this.props.pdata.button_title:""}
                    </Gobutton>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ProgramItem;
