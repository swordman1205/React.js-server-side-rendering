import React, { Component } from 'react';
import EmailItem from '../components/EmailItem';
import styles from '../styles/components/Magnifier.css';

class Magnifier extends Component {
    render() {
        return (
            <div className="c-gmail">
                <div className="circle-zoom">
                    <div className="circle-zoom2">
                        <div className="circle-shadow">
                            <div className="sender-name-zoom sender-name-zoom1 blur1"><div className="c-gmail-icons blur1 marg8"></div><p>ZSL</p></div>
                            <div className="sender-name-zoom sender-name-zoom2"><div className="c-gmail-icons blur1 marg8"></div><p>Nuevas Evas</p></div>
                            <div className="sender-name-zoom sender-name-zoom3 blur1"><div className="c-gmail-icons blur1 marg8"></div><p>Paola Rojas</p></div>
                        </div>
                    </div>
                </div>

                <div className="c-email-item">
                    <EmailItem
                        sender="ZSL"
                        message_title="Fwd: Ver Pago de IGV no Domiciliado"
                        message_text="-  Forwarded message From: &lsaquo;contabilidad@liberagroup.pe&rsaquo; Date:2017-05-02 GTM-6:00 Subject: Ver Pago de IVG no Domiciliado"
                        blurred={true}
                    />
                    <div className="color-border"></div>
                    <EmailItem
                        sender="Nuevas Evas"
                        message_title="[Delicioso Postre Saludable] Confirmación & Regalo"
                        message_text="-  Forwarded message From: &lsaquo;alejandra.abarca@nuevasevas.com&rsaquo; Date: 2017-08-16 10:50 GTM-6:00"
                        blurred={false}
                    />
                    <div className="color-border"></div>
                    <EmailItem
                        sender="Google+"
                        message_title="RV: Pasaje electronico de la reserva4FGSB"
                        message_text="-  De: emailtoolkit@esky.pl  Date: 2017-05-02 10:50 GTM-6:00 Subject: Ver Pago de IVG no Domiciliado"
                        blurred={true}
                    />
                </div>
            </div>
        );
    }
}

export default Magnifier;
