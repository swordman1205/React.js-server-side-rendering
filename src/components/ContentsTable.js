import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import LinkArr from '../components/LinkArr';
import {inject, observer} from 'mobx-react';

import styles from '../styles/components/ContentsTable.css';
@withRouter

@inject('viewerStore', 'themeStore', 'blogStore', 'programStore')
@observer

class ContentsTable extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.programStore.pullProgramModules();
    }   

    showLessons(module_id){
        if(this.props.programStore.inProgressLessons){
            return(<div></div>)
        } else {
            let i=0;
            return  this.props.programStore.ModuleLessons.map(item =>
                <li key={item.id} className={item.id==this.props.programStore.CurrLesson?"active":""}>
                    <LinkArr chref={"/programas/"+this.props.programStore.CurrProgram+"/modulo-"+this.props.programStore.CurrModule+"/leccion-"+item.id} click={()=>{this.props.programStore.setCurrLesson(item.id, item.name); this.props.hidePopup();}} className="c-ct-list-item" checked={item.is_completed}>{module_id}.{++i}. {item.name}</LinkArr>
                </li>);
        }
    }

    showActiveItem(id){
       return this.props.programStore.CurrModule==id?"ct-list-itemA":"";
    }

    showModules(){
        let i=0;
        if(this.props.programStore.ProgramModules.length>0){
        return  this.props.programStore.ProgramModules.map(item =>
            <li key={i++}>
                <Link to={"/programas/"+this.props.programStore.CurrProgram+"/modulo-"+item.id} onClick={()=>{this.props.programStore.setCurrModule(item.id, item.name); this.props.programStore.pullModuleLessons();  this.props.hidePopup();}} className="c-ct-list-item">
                    <div className={"ct-list-item "+this.showActiveItem(item.id)}>{i}{'. '+item.name}</div>
                </Link>
                <ul className="ct-list ct-list2">
                    {this.props.programStore.CurrModule==item.id?this.showLessons(i):<li />}
                </ul>
            </li>);
        } else {
            return (<li>No modules yet</li>)
        }
    }

    render() {
        return (
            <ul className="ct-list">
                {this.showModules()}
            </ul>
        )
    }
}
export default ContentsTable;
