import React, {Component} from 'react';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/TermsAndConditions.css';

class PrivacyPolicy extends Component {
    showMetaData(){
        let vTitle = "Política de Privacidad - Nuevas Evas";
        let vDescription = "Política de Privacidad de Nuevas Evas";
        return (
            <MetaTags>
                <title>{vTitle}</title>
                <meta name="description" content={vDescription} />
            </MetaTags>
        )
    }

    render() {
            return (
                <div className="page">
                    {this.showMetaData()}
                    <TopBanner type="small">Política de Privacidad de nuevasevas.com</TopBanner>
                    <div className="container terms ">
                        <p className="top1">Esta Política de Privacidad fue modificada por última vez el 30/03/2018</p>
                        <p>Esta política de privacidad ha sido compilada para servir mejor a aquellos que están preocupados por cómo se usa en línea su "Información de identificación personal" (PII). PII, como se describe en la ley de privacidad y seguridad de la información de los EE. UU., Es información que se puede usar por sí misma o con otra información para identificar, contactar o localizar a una sola persona o para identificar a una persona en contexto.</p>
                        <p>Lea detenidamente nuestra política de privacidad para obtener una comprensión clara de cómo recopilamos, usamos, protegemos o manejamos su Información de identificación personal de acuerdo con nuestro sitio web.</p>
                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                               ¿Qué información personal recolectamos de las personas que visitan nuestro blog, sitio web o aplicación?
                            </Title1>
                        </div>
                        <p>
                            Al realizar un pedido o registrarse en nuestro sitio, según corresponda, se le puede solicitar que ingrese su nombre, dirección de correo electrónico, país de origen, fecha de nacimiento.
                        </p>
                        <p>
                            Información opcional: Número de teléfono, Intereses en un estilo de vida saludable u otros detalles para ayudarlo con su experiencia.
                        </p>
                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Cuándo recopilamos información?
                            </Title1>
                        </div>
                        <p>
                            Recopilamos información de usted cuando se registra en nuestro sitio, realiza un pedido o ingresa información en nuestro sitio.
                        </p>


                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Cómo usamos su información?
                            </Title1>
                        </div>
                        <p>
                            Podemos utilizar la información que recopilamos de usted cuando se registra, hace una compra, se registra en nuestro boletín informativo, responde a una encuesta o comunicación de marketing, navega por el sitio web o utiliza otras características del sitio de las siguientes maneras:
                        </p>
                        <ul className="cat-menu3">
                            <li>Para personalizar su experiencia y permitirnos ofrecer el tipo de contenido y ofertas de  productos que más le interesan.</li>
                            <li>Para mejorar nuestro sitio web con el fin de brindarle un mejor servicio.</li>
                            <li>Para permitirnos brindarle un mejor servicio al responder a sus solicitudes de servicio al cliente.</li>
                            <li>Para procesar rápidamente sus transacciones.</li>
                            <li>Para enviar correos electrónicos periódicos con respecto a su pedido u otros productos y servicios.</li>
                        </ul>


                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Cómo protegemos tu información?
                            </Title1>
                        </div>
                        <p>
                            No utilizamos el escaneo y / o escaneo de vulnerabilidades de acuerdo a los estándares PCI.
                            Una pasarela de pago externa compatible con PCI maneja todas las transacciones CC.
                            Usamos escaneo Malware regular.
                        </p>
                        <p>
                            Su información personal está contenida por redes seguras y sólo es accesible para un número limitado de personas que tienen derechos especiales de acceso a dichos sistemas, y se les exige mantener la confidencialidad de la información. Además, toda la información sensible / crediticia que usted suministra está encriptada a través de la tecnología Secure Socket Layer (SSL).
                        </p>
                        <p>
                            Implementamos una variedad de medidas de seguridad cuando un usuario ingresa, envía o accede a su información para mantener la seguridad de su información personal.
                        </p>
                        <p>
                            Todas las transacciones se procesan a través de un proveedor de pago y puerta de enlace y no se almacenan ni procesan en nuestros servidores.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Usamos 'cookies'?
                            </Title1>
                        </div>
                        <p>
                            Sí. Las cookies son pequeños archivos que un sitio o su proveedor de servicios transfiere al disco duro de su computadora a través de su navegador web (si lo permite) que permite que los sistemas del sitio o del proveedor de servicios reconozcan su navegador y capturen y recuerden cierta información.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Usamos cookies para:
                            </Title1>
                        </div>
                        <ul className="cat-menu3">
                            <li>Comprender y guardar las preferencias del usuario para futuras visitas.</li>
                            <li>Recopilar datos agregados sobre el tráfico del sitio y la interacción del sitio para que podamos ofrecer mejores experiencias y herramientas del sitio en el futuro.</li>
                            <li>Dar acceso a la cuenta privada del cliente y a sus productos y/o servicios digitales.</li>
                        </ul>
                        <p>Puede optar por que su computadora lo advierta cada vez que se envía una cookie, o puede optar por desactivar todas las cookies. Lo haces a través de la configuración de tu navegador. Como el navegador es un poco diferente, consulte el Menú de Ayuda de su navegador para conocer la forma correcta de modificar sus cookies.</p>


                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Si los usuarios desactivan las cookies en su navegador:
                            </Title1>
                        </div>
                        <p>
                            Si desactiva las cookies, las funciones principales que hacen que su sitio sea más eficiente y tenga acceso a sus productos digitales no funcionaran correctamente.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Revelación a terceros
                            </Title1>
                        </div>
                        <p>
                            No vendemos, comercializamos ni transferimos a terceros su información de identificación personal a menos que proporcionamos a los usuarios un aviso previo.
                        </p>
                        <p>
                            Esto no incluye a los socios de hospedaje del sitio web y otras partes que nos ayudan a operar nuestro sitio web, dirigir nuestro negocio o servir a nuestros usuarios, siempre y cuando dichas partes acuerden mantener esta información confidencial.
                        </p>
                        <p>
                            También podemos divulgar información cuando su divulgación sea apropiada para cumplir con la ley, hacer cumplir las políticas de nuestro sitio o proteger nuestros derechos, propiedad o seguridad.
                        </p>
                        <p>
                            Sin embargo, la información de identificación no personal se puede proporcionar a otras partes para ayudarnos a operar nuestra empresa, dirigir nuestro negocio o servir a los usuarios.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Enlaces de terceros
                            </Title1>
                        </div>
                        <p>
                            Ocasionalmente, a nuestro criterio, podemos incluir u ofrecer productos o servicios de terceros en nuestro sitio web. Estos sitios de terceros tienen políticas de privacidad separadas e independientes. Por lo tanto, no tenemos ninguna responsabilidad por el contenido y las actividades de estos sitios vinculados. No obstante, buscamos proteger la integridad de nuestro sitio y agradecemos cualquier comentario sobre estos sitios.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} >
                                Google
                            </Title1>
                        </div>
                        <p>
                            Los requisitos de publicidad de Google se pueden resumir en los Principios de publicidad de Google. Se ponen en marcha para proporcionar una experiencia positiva para los usuarios. https://support.google.com/adwordspolicy/answer/1316548?hl=en
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Usamos Google Analytics en nuestro sitio web.
                            </Title1>
                        </div>
                        <p>
                            Google, como proveedor externo, utiliza cookies para "recordar" lo que ha hecho un usuario en páginas o en interacciones con ese sitio web o anteriores. Estas cookies recolectan data del tráfico de nuestro sitio web y nos permiten brindar un mejor servicio. No utilizamos Google Analytics para publicar avisos o propaganda pagada en nuestro sitio web. Las cookies pueden ser utilizadas para en un futuro hacer remarketing de nuestro sitio web, productos y/o servicios digitales en otros sitios web.
                        </p>
                        <p>
                            El uso de Google de la cookie de DART le permite publicar avisos para nuestros usuarios sobre la base de visitas anteriores a nuestro sitio y otros sitios en Internet. Los usuarios pueden optar por no utilizar el cookie de DART visitando la política de privacidad de Google Ad y Content Network.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Hemos implementado lo siguiente:
                            </Title1>
                        </div>
                        <ul className="cat-menu3">
                            <li>Informes de impresiones de la Red de Display de Google.</li>
                            <li>Integración de DoubleClick Campaign Manager</li>
                            <li>Información Demográfica y Reporte de Interés de Google Analytics</li>
                            <li>Remarketing con Google Analytics.</li>
                        </ul>
                        <p>
                            Nosotros, junto con terceros proveedores como Google, utilizamos cookies de origen (como las cookies de Google Analytics) y de terceros (como la cookie de DoubleClick) u otros identificadores de terceros para recopilar datos sobre las interacciones de los usuarios con impresiones de anuncios y otras funciones del servicio de anuncios relacionadas con nuestro sitio web.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Optar por salir:
                            </Title1>
                        </div>
                        <p>
                            Los usuarios pueden establecer preferencias sobre cómo Google se anuncia a través de la página de configuración de anuncios de Google. Alternativamente, puede optar por no participar visitando la página de exclusión de la iniciativa de publicidad en red o usando el complemento de exclusión de Google Analytics.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Ley de Protección de Privacidad en Línea de California
                            </Title1>
                        </div>
                        <p>
                            CalOPPA es la primera ley estatal de la nación que exige que los sitios web comerciales y los servicios en línea publiquen una política de privacidad. El alcance de la ley se extiende mucho más allá de California para exigir a cualquier persona o compañía en los Estados Unidos (y posiblemente el mundo) que opere sitios web que recopile información personal identificable de los consumidores de California que publique una política de privacidad conspicua en su sitio web que indique exactamente la información que se recopila y aquellos individuos o empresas con quienes se comparte. - Ver más en: http://consumercal.org/california-online-privacy-protection-act-caloppa/#sthash.0FdRbT51.dpuf
                            <br/>
                            De acuerdo con CalOPPA, aceptamos lo siguiente:
                            Los usuarios pueden visitar nuestro sitio de forma anónima.
                            Una vez que se haya creado esta política de privacidad, agregaremos un enlace a ella en nuestra página de inicio o, como mínimo, en la primera página importante después de ingresar a nuestro sitio web.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Se le notificará cualquier cambio en la política de privacidad:
                            </Title1>
                        </div>
                        <p>
                            En nuestra página de política de privacidad
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Puede cambiar su información personal:
                            </Title1>
                        </div>
                        <p>
                            Al iniciar sesión en su cuenta, en el área de perfil.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Cómo maneja nuestro sitio las señales de No rastrear?
                            </Title1>
                        </div>
                        <p>
                            Respetamos las señales de No rastrear y No rastrear, plantamos cookies o usamos publicidad cuando un mecanismo de navegador No rastrear (DNT) está en su lugar.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Nuestro sitio permite el seguimiento de comportamiento de terceros?
                            </Title1>
                        </div>
                        <p>
                            También es importante tener en cuenta que no permitimos el seguimiento del comportamiento de terceros.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                COPPA (Ley de Protección de la Privacidad de los Niños en Línea)
                            </Title1>
                        </div>
                        <p>
                            Cuando se trata de la recopilación de información personal de niños menores de 13 años, la Ley de Protección de la Privacidad en Línea de los Niños (COPPA) pone a los padres en control. La Comisión Federal de Comercio, la agencia de protección del consumidor de los Estados Unidos, aplica la Regla COPPA, que detalla lo que los operadores de sitios web y servicios en línea deben hacer para proteger la privacidad y seguridad de los niños en línea.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                ¿Permitimos que terceros, incluidas redes publicitarias o complementos, recopilen PII de niños menores de 13 años?
                            </Title1>
                        </div>
                        <p>
                            No comercializamos específicamente a niños menores de 13 años.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Prácticas justas de información
                            </Title1>
                        </div>
                        <p>
                            Los Principios de prácticas justas de información forman la columna vertebral de la ley de privacidad en los Estados Unidos y los conceptos que incluyen han jugado un papel importante en el desarrollo de las leyes de protección de datos en todo el mundo. Comprender los Principios Prácticos de Información Justa y cómo deben implementarse es fundamental para cumplir con las diversas leyes de privacidad que protegen la información personal.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Para estar en línea con las Prácticas de información justas, tomaremos la siguiente medida de respuesta, en caso de que se produzca una violación de datos:
                            </Title1>
                        </div>
                        <p>
                            Le notificaremos por correo electrónico dentro de los 7 días hábiles.

                            <br/>
                            También aceptamos el Principio de Reparación Individual que exige que las personas tengan derecho a buscar legalmente derechos exigibles contra los recolectores de datos y procesadores que no cumplan con la ley. Este principio requiere no sólo que los individuos tengan derechos exigibles contra los usuarios de los datos, sino también que los individuos recurran a los tribunales o agencias gubernamentales para investigar y / o enjuiciar el incumplimiento por parte de los procesadores de datos.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Ley de CAN SPAM
                            </Title1>
                        </div>
                        <p>
                            La ley CAN-SPAM es una ley que establece las reglas para el correo electrónico comercial, establece los requisitos para los mensajes comerciales, otorga a los destinatarios el derecho a que se les detenga el envío de mensajes de correo electrónico y detalla penas severas para las infracciones.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Recopilamos su dirección de correo electrónico para:
                            </Title1>
                        </div>
                        <ul className="cat-menu3">
                            <li>Enviar información, responder a consultas y / u otras solicitudes o preguntas.</li>
                            <li>Procesar pedidos y enviar información y actualizaciones relacionadas con los pedidos.</li>
                            <li>Enviarle información adicional relacionada con su producto y / o servicio.</li>
                        </ul>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">
                                Para estar de acuerdo con CANSPAM, aceptamos lo siguiente:
                            </Title1>
                        </div>
                        <ul className="cat-menu3">
                            <li>No utilizar temas o direcciones de correo electrónico falsos o engañosos.</li>
                            <li>Identifique el mensaje como un anuncio de alguna manera razonable.</li>
                            <li>Incluya la dirección física de nuestra empresa o sede del sitio.</li>
                            <li>Supervise los servicios de marketing por correo electrónico de terceros para verificar el cumplimiento, si se utiliza alguno.</li>
                            <li>Respete las solicitudes de cancelación / cancelación de suscripción rápidamente.</li>
                            <li>Permitir a los usuarios darse de baja utilizando el enlace en la parte inferior de cada correo electrónico.</li>
                        </ul>
                        <p>Si en cualquier momento desea darse de baja de recibir correos electrónicos futuros:</p>
                        <ul className="cat-menu3">
                            <li>Siga las instrucciones en la parte inferior de cada correo electrónico.
                                y lo eliminaremos inmediatamente de TODA la correspondencia.
                            </li>
                            <li>Alternativamente puede escribir su solicitud de cancelación  a <a href="mailto:comunidad@nuevasevas.com">comunidad@nuevasevas.com</a></li>
                        </ul>
                        <p>
                            Puede contactarse con nosotros
                        </p>
                        <p>
                            Si tiene alguna pregunta sobre esta política de privacidad, puede comunicarse con nosotros utilizando la información a continuación:
                        </p>
                        <p>
                            <a href="nuevasevas.com">nuevasevas.com</a> <br/>
                            Francisco Mostajo 214 Yanahuara <br/>
                            Arequipa, Arequipa 40001 <br/>
                            Perú <br/>
                            <a href="mailto:comunidad@nuevasevas.com">comunidad@nuevasevas.com</a>
                        </p>
                    </div>
                </div>
            );
    }
}
export default PrivacyPolicy;


