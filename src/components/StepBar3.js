import React, {Component} from 'react';
import styles from '../styles/components/StepBar3.css';

class StepBar3 extends Component {
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
            <div className="c-step-bar3">
                <div className="sb3-bar">

                    <div className={"sb3-progress " +'prog3'+this.props.step} />
                    <div className = {"c-sb3-marker1 "+step1}>
                        <div className="sb3-marker">
                            <div className="">
                                1
                            </div>
                        </div>
                        <div className="sb3-label">
                            Cuenta
                        </div>
                    </div>

                    <div className = {"c-sb3-marker2 "+step2}>
                        <div className="sb3-marker">
                            <div className="">
                                2
                            </div>
                        </div>
                        <div className="sb3-label">
                            Intereses
                        </div>
                    </div>

                    <div className = {"c-sb3-marker3"}>
                        <div className="sb3-marker">
                            <div className="">
                                3
                            </div>
                        </div>
                        <div className="sb3-label">
                            Recibir compra
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default StepBar3;

