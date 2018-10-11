import React, {Component} from 'react';
import styles from '../styles/components/StepBar.css';

class StepBar extends Component {
    render() {
        let step1 = "";
        let step2 = "";

        if (this.props.step==1){
            step1="active"
        }

        if (this.props.step==2){
            step1="active";
            step2="active";
        }

        return (
            <div className="c-step-bar">
                <div className="sb-bar">
                    <div className={"sb-progress " +'prog'+this.props.step} />
                    <div className = {"c-sb-marker1 "+step1}>
                        <div className="sb-marker">
                            <div className="">
                            1
                            </div>
                        </div>
                        <div className="sb-label">
                            Crear cuenta
                        </div>
                    </div>
                    <div className = {"c-sb-marker2 "+step2}>
                        <div className="sb-marker">
                            <div className="">
                                2
                            </div>
                        </div>
                        <div className="sb-label">
                            Elegir Intereses
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepBar;
