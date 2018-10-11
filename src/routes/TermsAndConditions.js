import React, {Component} from 'react';
import TopBanner from '../components/TopBanner';
import Title1 from '../components/Title1';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import MetaTags from 'react-meta-tags';
import styles from '../styles/routes/TermsAndConditions.css';

@inject('paymentStore', 'authStore')
@observer

class TermsAndConditions extends Component {
    showMetaData(){
        let vTitle = "Términos y condiciones";
        let vDescription = "Términos y condiciones";
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
                    <TopBanner type="small">Términos y Condiciones</TopBanner>
                    <div className="container terms ">
                        <div className="terms-btn-w top1"><Link to="#" onClick={(e)=>{typeof history !== 'undefined' && e.preventDefault(); this.props.paymentStore.setCheckoutCheckbox(true); history.go(-1);}} className="btn1">Acepto, Regresar a mi ComprA</Link></div>

                        <p className="top1">Este documento describe los términos y condiciones generales (los “Términos y Condiciones Generales”) y las políticas de privacidad (las “Políticas de
                            Privacidad”) aplicables al acceso y uso de los servicios ofrecidos por NUEVAS EVAS S.A.C. dentro del sitio www.nuevasevas.com, y/u otros dominios (urls) relacionados (en adelante “nuevasevas.com” o el “Sitio”), en donde éstos Términos y Condiciones se encuentren.
                        </p>
                        <p>
                            Cualquier persona que desee acceder y/o suscribirse y/o usar el Sitio o los Servicios podrá hacerlo sujetándose a los Términos y Condiciones Generales y las Políticas de Privacidad, junto con todas las demás políticas y principios que rigen nuevasevas.com y que son incorporados al presente directamente o por referencia o que son explicados y/o detallados en otras secciones del Sitio. En consecuencia, todas las visitas y todos los contratos y transacciones que se realicen en este Sitio, así como sus efectos jurídicos, quedarán regidos por estas reglas y sometidos a la legislación aplicable en Perú.
                            CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES Y LAS POLÍTICAS DE PRIVACIDAD, LOS CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS.
                        </p>
                        <p>
                            El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los Términos y Condiciones Generales y en las Políticas de Privacidad de NUEVAS EVAS S.A.C. así como en los demás documentos incorporados a los mismos por referencia, previo a su registro como Usuario de nuevasevas.com y/o a la adquisición de productos y/o entrega de cualquier dato con cualquier fin.
                        </p>
                        <p>
                            Si el usuario hiciera uso del Sitio de NUEVAS EVAS, ello implicará la aceptación plena de las condiciones establecidas en los Términos y Condiciones
                            Generales y en las Políticas de NUEVAS EVAS S.A.C. Por dicha utilización del sitio y/o sus servicios, el Usuario se obligará a cumplir expresamente con las mismas, no pudiendo alegar el desconocimiento de tales Términos y Condiciones Generales y de la Política de Privacidad.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} >1. Capacidad Legal </Title1>
                        </div>
                        <p>
                            Los Servicios sólo están disponibles para personas que tengan capacidad legal para contratar. No podrán utilizar los servicios las personas que no
                            tengan esa capacidad entre estos los menores de edad o Usuarios de nuevasevas.com que hayan sido suspendidos temporalmente o inhabilitados
                            definitivamente. Los actos que los menores realicen en este sitio serán responsabilidad de sus padres, tutores, encargados o curadores, y por tanto se considerarán realizados por éstos en ejercicio de la representación legal con la que cuentan. Quien registre un Usuario como empresa, deberá tener capacidad para contratar a nombre de tal entidad y de obligar a la misma en los términos de este Acuerdo.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} >2. Modificaciones Del Acuerdo  </Title1>
                        </div>
                        <p>NUEVAS EVAS S.A.C. podrá modificar los Términos y Condiciones Generales en cualquier momento, haciendo público en el Sitio, los términos
                                modificados. Todos los términos modificados entrarán en vigor a los 10 (diez) días de su publicación. Dentro de los 5 (cinco) días siguientes a la publicación de las modificaciones introducidas, el Usuario deberá comunicar por e-mail si no acepta las mismas; en ese caso quedará disuelto el vínculo contractual y será inhabilitado como Miembro. Vencido este plazo, se considerará que el Usuario acepta los nuevos términos y el contrato continuará vinculando a ambas partes.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} >3. Procedimiento para hacer uso de este sitio de Internet</Title1>
                        </div>
                        <p> En los contratos ofrecidos por medio del Sitio, la Empresa Oferente informará, de manera inequívoca y fácilmente accesible, los pasos que deberán seguirse para celebrarlos, e informará, cuando corresponda, si el documento electrónico en que se formalice el contrato será archivado y si éste será accesible al Miembro. El sólo hecho de seguir los pasos que para tales efectos se indiquen en este sitio para efectuar una compra, equivale a aceptar que efectivamente la Empresa Oferente ha dado cumplimiento a las condiciones contenidas en este apartado.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} >4. Medios de pago que se podrán utilizar en el Sitio </Title1>
                        </div>
                        <p>Los productos y servicios ofrecidos en el Sitio, salvo que se señale una forma diferente para casos particulares u ofertas de determinados bienes o
                        servicios, sólo pueden ser pagados con los medios que en cada caso específicamente se indiquen.
                        </p>
                        <p>
                        En caso de dichas excepciones o casos particulares donde se no se utilice el medio de pago online para la adquisición de bienes o servicios ofrecidos por nuevasevas.com. esto implicará automáticamente la aceptación de los términos y condiciones que se encuentran contenidos en este apartado por parte del usuario.
                        </p>
                        <p>
                        El uso de tarjetas de débito y/o crédito se sujetará a lo establecido en estos Términos y Condiciones y, en relación con su emisor, y a lo pactado en los respectivos Contratos de Apertura y Reglamento de Uso. En caso de contradicción, predominará lo expresado en ese último instrumento. Tratándose de tarjetas bancarias aceptadas en el Sitio, los aspectos relativos a éstas, tales como la fecha de emisión, caducidad, cupo, bloqueos, etc., se regirán por el respectivo Contrato de Apertura y Reglamento de Uso, de tal forma que las Empresas no tendrán responsabilidad por cualquiera de los aspectos
                        señalados.
                        </p>
                        <p>
                        El Sitio podrá indicar determinadas condiciones de compra según el medio de pago que se utilice por el usuario.
                        </p>
                        <p>
                        Al momento de aceptar dichas condiciones de compra determinadas por el medio de pago elegido por el usuario, el presente apartado también quedaría aceptado por omisión.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true" >4.1 El uso de tarjetas de débito y/o crédito </Title1>
                        </div>
                        <p> En los contratos ofrecidos por medio del Sitio, la Empresa Oferente informará, de manera inequívoca y fácilmente accesible, los pasos que deberán seguirse para celebrarlos, e informará, cuando corresponda, si el documento electrónico en que se formalice el contrato será archivado y si éste será accesible al Miembro. El sólo hecho de seguir los pasos que para tales efectos se indiquen en este sitio para efectuar una compra, equivale a aceptar que efectivamente la Empresa Oferente ha dado cumplimiento a las condiciones contenidas en este apartado.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} >5. Promociones </Title1>
                        </div>
                        <p> En caso de que se entregue un cupón de descuento para cualquiera de nuestros productos o servicios, se cumplen las siguientes condiciones:
                        </p>
                        <ul className="cat-menu3">
                            <li>El uso del cupón de descuento es completamente gratuito.</li>
                            <li>Cuando se ofrezcan cupones de descuento, se señalará en la publicidad, el valor del cupón, la suma mínima de compra para poder redimir el bono
                                y las fechas válidas para su redención.</li>
                            <li>El cupón de descuento aplica para compras realizada exclusivamente en la página nuevasevas.com</li>
                            <li>Podrá hacer uso del bono de descuento cualquier persona natural mayor de dieciocho (18) años.</li>
                            <li>No es acumulable con otras promociones.</li>
                            <li>El uso del bono solamente podrá ser usado una vez por cada cliente. </li>
                            <li>Al hacer una compra con el cupón se entiende que el consumidor ha aceptado íntegramente los tanto los Términos y Condiciones generales de la página.</li>
                        </ul>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>6. Límite de las responsabilidades</Title1>
                        </div>
                        <p> Queda expresado el completo entendimiento sobre las recomendaciones alimenticias y planes nutricionales expuestos dentro de los productos o servicios del Sitio, y todas y cada una de las orientaciones derivadas del mismo únicamente están enfocadas a mejorar los hábitos saludables.
                        </p>
                        <p>
                            Asimismo, en el caso de servicios con la categoría de personalizado, si el usuario no informa con la verdad todos los datos necesarios que se solicitan en
                            el cuestionario previo cumplimentado, así como en todas las preguntas que se formulan en relación a los hábitos cotidianos, el resultado no se ajustará al objetivo de lograr un estilo de vida saludable.
                        </p>
                        <p>
                            Todas las recomendaciones y consejos y el seguimiento del cumplimiento de los mismos, no son un tratamiento médico. Tampoco son sustitutivas de ningún tratamiento médico o farmacológico que esté recibiendo o pueda recibir en un futuro. En el caso de duda deberé consultar con un facultativo especialista.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>7. Productos y Servicios ofrecidos por Nuevas Evas SAC</Title1>
                        </div>
                        <p>
                            Son todos los productos y servicios ofrecidos en nuestro dominio, aquellos que se utilizan a través del Sitio u otras páginas creadas por nuestra empresa,
                            y servicios personalizados que se brindan directamente al usuario.
                        </p>
                        <p>
                            Todos aquellos servicios que implican gastos adicionales en los cuales el usuario (a) pueda incurrir, ya sea análisis de laboratorio, exámenes médicos, limpieza de colon, consultas externas con otros especialistas o cualquier otro costo adicional que sea necesario para realizar un diagnóstico exacto de su situación y que conduzca a alcanzar los mejores resultados durante la duración del programa deberán ser asumidos por el usuario en su totalidad, y no pertenecen a los productos y servicios ofrecidos por Nuevas Evas SAC.
                        </p>
                        <p>
                            NUEVAS EVAS S.A.C. no se responsabiliza por la calidad y efectividad de cualquiera de los servicios anteriormente mencionados, por ser totalmente externos a nuestra compañía.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true" >7.1 Servicios Programas Personalizados </Title1>
                        </div>
                        <h4 className="ss-menu">7.1.1  Caducidad del Pago</h4>

                        <p>Cualquiera de los servicios personalizados que hayan sido adquiridos por el usuario en una fecha determinada están sujetos a la disponibilidad de tiempo del mismo usuario. Por lo tanto, si al cabo de 6 meses después de haberse realizado el pago, el usuario no inició con el programa en cuestión, perderá el cupo para realizar su programa en el futuro sin derecho a devolución de su dinero.
                        </p>

                        <h4 className="ss-menu">7.1.2  Inicio del Programa Personalizado </h4>
                        <p>Después de haber realizado el pago, el usuario recibirá en un plazo máximo de 12 horas, un mensaje por correo electrónico con la Ficha Nutricional que le corresponde. Después de haber llenado dicha ficha, y después de 7 días hábiles, se realizará la Primera Entrevista Uno-a-uno, siempre y cuando el pago se haya completado en su totalidad. De lo contrario, los siete días se contarán a partir del día en el cual el pago se haya completado.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">7.2 Métodos de Pago </Title1>
                        </div>
                        <p>
                            El programa personalizado se puede pagar haciendo uso de los medios de pago online que se utilizan en el Sitio.
                        </p>
                        <p>
                            En caso de excepciones o casos particulares donde se no se utilice el medio de pago online para la adquisición de este servicio, esto implicará
                            automáticamente la aceptación de los términos y condiciones que se encuentran contenidos en este apartado por parte del usuario.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>8. Política de Garantía</Title1>
                        </div>
                        <p>
                            El cliente(a) tiene un plazo de 30 días calendario después de adquirir nuestros productos y servicios para acceder a la devolución total de su dinero.
                        </p>
                        <p>
                            El único servicio que se encuentra exento de la Política de Garantía son los programas personalizados o servicios personalizados que brinda Nuevas Evas SAC. Para los demás casos, si es aplicable.
                        </p>
                        <p>
                            En caso de que el proceso de devolución tome un tiempo adicional a los 30 días calendario, por condiciones externas a NUEVAS EVAS S.A.C. el
                            procedimiento dejará de ser válido automáticamente.
                        </p>
                        <p>
                            El cliente(a) deberá seguir los siguientes pasos:<br/>
                            En primer lugar, expresar su deseo de aplicar a la Política de Garantía de Devolución Total de su Dinero. Es suficiente con enviarnos un email a <span className="color1">ventas@nuevasevas.com</span>. Con el asunto: SOLICITUD DE DEVOLUCIÓN DE MI DINERO. Y a continuación especificar el Número de orden compra o “Order #”del producto que adquirió, dicho número se encuentra registrado en el Email de Confirmación de la Compra que realizó. Así como su nombre y apellidos y el nombre del producto o servicio que adquirió.
                        </p>
                        <p>
                            En segundo lugar, deberá esperar un máximo de 48 horas para recibir un email de aprobación de la solicitud donde se adjuntará un documento con el
                            Formulario de Comprobación de Resultados que corresponderá al producto o servicio que el cliente adquirió de NUEVAS EVAS S.A.C. en el dominio
                            nuevasevas.com. El interesado deberá descargar, editar y llenar dicho Formulario para verificar si nuestro producto o servicio no generó los resultados deseados. Luego de ello, deberá reenviarnos por medio del mismo correo electrónico el Formulario correctamente completado.
                        </p>
                        <p>
                            Debe tener en cuenta que cada uno de los espacios o campos requeridos deberán ser llenados para que se aplique la devolución de su dinero. Si no nos proporciona la información completa, tiene un plazo de 24 horas adicionales para reenviar nuevamente el documento con las correcciones que sean
                            necesarias. De lo contrario, se cancelará la solicitud.
                        </p>
                        <p>
                            En tercer lugar, una vez que el formulario haya sido entregado debidamente, NUEVAS EVAS S.A.C. cuenta con la potestad para evaluar el caso y decidir si la SOLICITUD DE DEVOLUCIÓN DE TU DINERO se hará efectiva o no.
                        </p>
                        <p>
                            Si la Evaluación de tu Formulario indica que la devolución es efectiva, te enviaremos un nuevo correo electrónico solicitando tu número de cuenta bancario o tu Cuenta de PayPal.
                        </p>
                        <p>
                            El desembolso de dinero se hará efectivo durante los próximos siete días hábiles, previo envío del número de cuenta bancario donde el cliente desea que se le realice el depósito.
                        </p>
                        <p>
                            Si la Evaluación de tu Formulario indica que la devolución no es efectiva, NUEVAS EVAS S.A.C. te enviará un email resumiendo las principales causas por las cuales no se aplica la devolución completa de tu dinero.
                        </p>


                        <div className="terms-title1">
                            <Title1 isGoLink={false}>9. Propiedad Intelectual</Title1>
                        </div>
                        <p>
                            Todo el contenido incluido o puesto a disposición del Usuario en el Sitio, incluyendo textos, gráficas, logos, íconos, imágenes, archivos de audio, vídeos
                            y cualquier otra información (el “Contenido”), es de propiedad de NUEVAS EVAS S.A.C. o ha sido licenciada a ésta por las Empresas Proveedoras. La
                            compilación del Contenido es propiedad exclusiva de NUEVAS EVAS S.A.C. y, en tal sentido, el Usuario debe abstenerse de extraer y/o reutilizar partes
                            del Contenido sin el consentimiento previo y expreso de la Empresa.
                        </p>
                        <p>
                            Además del Contenido, las marcas, denominativas o figurativas, marcas de servicio, diseños industriales y cualquier otro elemento de propiedad
                            intelectual que haga parte del Contenido (la “Propiedad Industrial”), son de propiedad de NUEVAS EVAS S.A.C. o de las Empresas Proveedoras y, por tal razón, están protegidas por las leyes y los tratados internacionales de derecho de autor, marcas, patentes, modelos y diseños industriales. El uso indebido y la reproducción total o parcial de dichos contenidos quedan prohibidos, salvo autorización expresa y por escrito de NUEVAS EVAS S.A.C., asimismo, no pueden ser usadas por los Usuarios en conexión con cualquier producto o servicio que no sea provisto por NUEVAS EVAS S.A.C. En el mismo sentido, la Propiedad Industrial no podrá ser usada por los Usuarios en conexión con cualquier producto y servicio que no sea de aquellos que comercializa u ofrece NUEVAS EVAS S.A.C. o de forma que produzca confusión con sus clientes o que desacredite a la Empresa o a las Empresas Proveedoras.
                        </p>
                        <p>
                            Con respecto a los productos y servicios ofrecidos por Nuevas Evas SAC, como son los libros electrónicos, los programas nutricionales, el Curso de
                            Cocina Online, entre otros servicios de creación propia de nuestra compañía, son propiedad exclusiva de Nuevas Evas y por lo tanto no se permite su
                            reproducción, copiado ni distribución ya sea con fines comerciales o sin ánimos de lucro. Todos los textos, imágenes, así como su composición o diseño están protegidos por derechos de autor.
                        </p>
                        <p>
                            A excepción de uso personal, ninguna parte de los libros, programas nutricionales, o recetas del Curso Online pueden ser reproducida por ningún medio, ya sea electrónico, mecánico, fotocopia, o cualquier otro, sin el permiso por escrito del autor.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>10. Responsabilidad de Nuevas Evas </Title1>
                        </div>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">10.1 Del Sitio </Title1>
                        </div>

                        <p>NUEVAS EVAS S.A.C. hará lo posible dentro de sus capacidades para que la transmisión del Sitio sea ininterrumpida y libre de errores. Sin embargo,
                            dada la naturaleza de la Internet, dichas condiciones no pueden ser garantizadas. En el mismo sentido, el acceso del Usuario al Curso Online puede ser ocasionalmente restringido o suspendido con el objeto de efectuar reparaciones, mantenimiento o introducir nuevos Servicios. NUEVAS EVAS S.A.C.
                            no será responsable por pérdidas (i) que no hayan sido causadas por el incumplimiento de sus obligaciones; (ii) lucro cesante o pérdidas de oportunidades comerciales; (iii) cualquier daño indirecto.
                        </p>
                        <p>
                            El contenido que se transmite en el Sitio, no pretende prescribir condiciones médicas. Los procedimientos y consejos representan las opiniones,
                            experiencia e investigación personal del autor y colaboradores. Los cuales declinan cualquier responsabilidad o evento ocasionado como resultado del
                            uso de cualquier sugerencia, receta de preparación de alimentos o consejos que se describen en el Sitio. Se recomienda consultar con un profesional
                            de salud, además de seguir su propia intuición antes de cambiar por completo su alimentación.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false} submenu="true">10.2 De los productos y Servicios ofrecidos</Title1>
                        </div>
                        <p>
                            Toda la información, recomendaciones y recetas que se encuentran dentro de nuestros productos y servicios en general, han sido evaluadas, probadas y cuentan con el completo aval del Equipo de Nutricionistas de Nuevas Evas. Certificado: CNP 5171.
                        </p>
                        <p>
                            El contenido que se transmite en ellos, no pretende prescribir condiciones médicas. Los procedimientos y consejos representan las opiniones,
                            experiencia e investigación personal del autor y colaboradores. Los cuales declinan cualquier responsabilidad o evento ocasionado como resultado del
                            uso de cualquier sugerencia, receta de preparación de alimentos o consejos que se describen allí. Se recomienda consultar con un profesional de salud, además de seguir su propia intuición antes de cambiar por completo su alimentación.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>11. Términos de Ley </Title1>
                        </div>
                        <p>Este acuerdo será gobernado e interpretado de acuerdo con las leyes de Perú, sin dar efecto a cualquier principio de conflictos de ley. Si alguna
                            disposición de estos Términos y Condiciones es declarada ilegal, o presenta un vacío, o por cualquier razón resulta inaplicable, la misma deberá ser
                            interpretada dentro del marco del mismo y en cualquier caso no afectará la validez y la aplicabilidad de las provisiones restantes.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>12. Jurisdicción y ley aplicable</Title1>
                        </div>
                        <p>Este acuerdo estará regido en todos sus puntos por las leyes vigentes en la República del Perú. Asimismo, si se tratara de un cliente extranjero, se tomará en cuenta la normativa que regula los contratos, las condiciones generales de contratación, el comercio electrónico, así como la normativa de propiedad intelectual e industrial y protección de datos, en el país correspondiente.
                        </p>
                        <p>
                            Además, se debe tener en cuenta la normativa específica a nivel internacional que regula los productos o servicios que se ofrecen a través de la página web o el “comercio electrónico”.
                        </p>

                        <div className="terms-title1">
                            <Title1 isGoLink={false}>13. Seguridad </Title1>
                        </div>
                        <p>Tenemos en marcha medidas técnicas y de seguridad para evitar el acceso no autorizado o ilegal o la pérdida accidental, destrucción u ocurrencia de daños a su información. Cuando se recogen datos a través del Sitio, recogemos sus datos personales en un servidor seguro. Nosotros usamos programas de protección en nuestros servidores. Cuando recopilamos información de tarjetas de pago electrónico, se utilizan sistemas de cifrado Secure Socket Layer (SSL) que codifica la misma evitando usos fraudulentos. Si bien no es posible garantizar la consecución de un resultado estos sistemas han probado ser efectivos en el manejo de información reservada y Toda vez que cuentan con mecanismos que impiden el acceso de amenazas externas (i.e. hackers). Se recomienda no enviar todos los detalles de tarjetas de crédito o débito sin cifrar las comunicaciones electrónicas con nosotros. Mantenemos las
                            salvaguardias físicas, electrónicas y de procedimiento en relación con la recolección, almacenamiento y divulgación de su información. Nuestros
                            procedimientos de seguridad exigen que en ocasiones podremos solicitarle una prueba de identidad antes de revelar información personal. Tenga en cuenta que Ud. es el único responsable de la protección contra el acceso no autorizado a su contraseña y a su computadora.
                        </p>

                        <div className="terms-btn-w top1"><Link to="#" onClick={(e)=>{typeof history !== 'undefined' && e.preventDefault(); this.props.paymentStore.setCheckoutCheckbox(true); history.go(-1);}} className="btn1">Acepto, Regresar a mi ComprA</Link></div>
                    </div>
                </div>
            );

    }
}
export default TermsAndConditions;


