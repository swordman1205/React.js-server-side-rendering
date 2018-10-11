import React, {Component} from 'react';
import Title1 from '../components/Title1';
import ProgramProductItem from '../components/ProgramProductItem';
import ContentsTable from '../components/ContentsTable';
import {inject, observer} from 'mobx-react';

import styles from '../styles/components/LeftSidebar.css';

@inject('viewerStore', 'authStore', 'userStore', 'themeStore', 'programStore')
@observer

class LeftSidebar extends Component {
    showRecomendedProgram(){
        if(this.props.programStore.RecomendedProgram){
            return(
                <ProgramProductItem
                    imageUrl={this.props.programStore.RecomendedProgram.image}
                    programTitle={this.props.programStore.RecomendedProgram.title}
                    programText={this.props.programStore.RecomendedProgram.text}
                    bigImg={true}
                    programUrl={this.props.programStore.RecomendedProgram.url}
                    new={true}
                />
            )
        }
    }
    render() {
        return (
            <div className="col-md-4">
                <div className="l-sidebar">
                    <ContentsTable/>
                    <div className="c-program">
                        <Title1>Recomendado</Title1>
                        {this.showRecomendedProgram()}

                    </div>
                </div>
            </div>
        )
    }

}
export default LeftSidebar;
