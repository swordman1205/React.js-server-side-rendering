import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Golink from '../components/Golink';
import styles from '../styles/components/ProgramProductItem.css';


class ProgramProductItem extends Component {
    showScale(){
       return (
           <div className="scale">
               <p className="scale-value">{this.props.scale}%</p>
               <div className="full-scale" style={{width: this.props.scale+'%'}}/>
           </div>
       )
    }

    showAdd(){
        if (this.props.scale){
            return null
        }
        else {
            if (this.props.new){
                return(
                    <a href={this.props.programUrl} target="_blank" className="add-img w-icon">
                        <i className="flaticon-plus"/>
                    </a>
                )
            }
            else return null
        }
    }

    showMark(){
        if (this.props.scale == 100){
            return(
                <div className="mark-img w-icon">
                    <i className="flaticon-check"/>
                </div>
            )
        }
    }

    showTitle(){
        if(this.props.new){
            return (
                <a href={this.props.programUrl} target="_blank" className="l-program-title">
                    <div className="program-title">
                        {this.props.programTitle}
                    </div>
                </a>
            )
        } else {
            return (
                <Link to={this.props.programUrl?this.props.programUrl:"/"} className="l-program-title">
                    <div className="program-title">
                        {this.props.programTitle}
                    </div>
                </Link>
            )
        }
    }

    showLink(){
        if(this.props.programText){
            if(this.props.new){
                return (
                    <Golink chref={this.props.programUrl} ctarget={"_blank"}>{(this.props.scale)?'Ingresar':'Inscribirme'}</Golink>
                )
            } else {
                return (
                    <Golink chref={this.props.programUrl?this.props.programUrl:"/"} type={"link"}>{(this.props.scale)?'Ingresar':'Inscribirme'}</Golink>
                )
            }

        }
    }

    render() {
        let imageUrl = this.props.imageUrl?this.props.imageUrl:"/images/no-program2.png";
        let isImage = this.props.imageUrl?"":"no-img";
        return (
            <div>
                <div className="c-product-item" style={{height:(!this.props.new)?25:0}}>
                    {this.showScale()}
                </div>
                <div className={"program-image "+isImage} style={{backgroundImage: 'url(' + imageUrl + ')', height: (this.props.bigImg)?180:155}}>
                    {this.showAdd()}
                    {this.showMark()}
                </div>
                <div className="c-program-title">
                    {this.showTitle()}
                </div>
                <p className="program-text">
                    {this.props.programText}
                    &nbsp;
                    {this.showLink()}
                    </p>
            </div>
        );
    }
}

export default ProgramProductItem;
