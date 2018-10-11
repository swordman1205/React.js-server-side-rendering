import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import { Link } from 'react-router-dom';
import styles from '../styles/routes/RegisterProductC.css';

class RegisterProductC extends Component {
    render() {
        return (
            <div className="page register-product-c">
                <TopBanner type="small">Marca 1, 2 o 3 enfermedades que deseas eliminar.</TopBanner>
                <div className="container top1">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="center-container">
                                <h4 className="h4-rpc">
                                    ¡Recibirás información valiosa en tu e-mail para sanar!
                                </h4>
                                <form>
                                    <ul className="ch-boxes-list">
                                        <li>
                                            <input id="ch1" type="checkbox" hidden />
                                            <label htmlFor="ch1">Anemia</label>
                                        </li>
                                        <li>
                                            <input id="ch2" type="checkbox" hidden />
                                            <label htmlFor="ch2">Artritis Reumatoide</label>
                                        </li>
                                        <li>
                                            <input id="ch3" type="checkbox" hidden />
                                            <label htmlFor="ch3">Bajar de Peso</label>
                                        </li>
                                        <li>
                                            <input id="ch4" type="checkbox" hidden />
                                            <label htmlFor="ch4">Colesterol Alto</label>
                                        </li>
                                        <li>
                                            <input id="ch5" type="checkbox" hidden />
                                            <label htmlFor="ch5">Diabetes & Prediabetes</label>
                                        </li>
                                        <li>
                                            <input id="ch6" type="checkbox" hidden />
                                            <label htmlFor="ch6">Fibromialgia</label>
                                        </li>
                                        <li>
                                            <input id="ch7" type="checkbox" hidden />
                                            <label htmlFor="ch7">Ninguna de Estas</label>
                                        </li>
                                    </ul>
                                    <br/>
                                    <Link to="#" type="submit" className="btn-submit cu1-btn-submit rpc-pos">Completar Registro & Recibir producto</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterProductC;

