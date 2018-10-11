import React, { Component } from 'react';
import TopBanner from '../components/TopBanner';
import { Link } from 'react-router-dom';
import styles from '../styles/routes/RegisterProduct.css';

class RegisterProduct extends Component {

    showDays(){
        let selectDays = [];
        selectDays.push(<option value="0">Día</option>);
        for(let i=1; i<=31; i++) {
            selectDays.push(<option value={i}>{i}</option>);
        }
        return selectDays;
    };

    showMonths(){
        let selectMonths = [];
        selectMonths.push(<option value="0">Mes</option>);
        for(let i=1; i<=12; i++) {
            selectMonths.push(<option value={i}>{i}</option>);
        }
        return selectMonths;
    };
    showYears(){
        let selectYears = [];
        selectYears.push(<option value="0">Año</option>);
        for(let i=1900; i<=2017; i++) {
            selectYears.push(<option value={i}>{i}</option>);
        }
        return selectYears;
    };

    render() {
        return (
            <div className="page register-product">
                <TopBanner type="small">¡Felicitaciones tu compra ha sido exitosa!</TopBanner>
                <div className="container top1">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="h3-1">Regístrate para recibir acceso a tu(s) Producto(s)</h3>
                            <div className="cont-center">
                                <a className="btn-facebook rp-top1" target="_blank" href="https://facebook.com">
                                    <i className="flaticon-facebook-logo" />
                                    Regístrame con Facebook
                                </a>
                                <h4 className="h4-sr1">
                                    O regístrate con tu correo electrónico:
                                </h4>

                                <form className="fotm1">
                                    <div className="form-item">
                                        <label>Nombre</label>
                                        <input type="text" className="" placeholder="Escribe tu nombre" />
                                        <div className="input-desk">Con este nombre te identificaremos en la Comunidad. No se puede modificar.</div>
                                    </div>
                                    <div className="form-item">
                                        <label>E-mail</label>
                                        <input type="email" className="" placeholder="Al que te enviaremos deliciosas recetas" />
                                    </div>
                                    <div className="form-item">
                                        <div className="line-controls col-controls-mob">
                                            <div className="cui3 fmr1">
                                                <label>Contraseña</label>
                                                <input type="password" className="" placeholder="" />
                                            </div>
                                            <div className="cui3">
                                                <label>Confirmar Contraseña</label>
                                                <input type="password" className="" placeholder="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-item">
                                        <div className="line-controls col-controls-mob">
                                            <div className="cui4 fmr1">
                                                <label>País</label>
                                                <div className="cu-sel">
                                                    <select>
                                                        <option value="0">Selecciona tu país</option>
                                                        <option value="1">Argentina</option>
                                                        <option value="2">Brasil</option>
                                                        <option value="3">Colombia</option>
                                                        <option value="4">México</option>
                                                        <option value="5">Panamá</option>
                                                        <option value="6">Perú</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w100">
                                                <label>Fecha de Nacimiento</label>
                                                <div className="line-controls">
                                                    <div className="cu-sel fmr1">
                                                        <select onChange={this.handleBDayChange}>
                                                            {this.showDays()}
                                                        </select>
                                                    </div>
                                                    <div className="cu-sel fmr1">
                                                        <select onChange={this.handleBMonthChange}>
                                                            {this.showMonths()}
                                                        </select>
                                                    </div>
                                                    <div className="cu-sel">
                                                        <select onChange={this.handleBYearChange}>
                                                            {this.showYears()}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a href="#" className="btn-submit btn-submit2 rp-pos">Regístrame & Recibir producto</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default RegisterProduct;

