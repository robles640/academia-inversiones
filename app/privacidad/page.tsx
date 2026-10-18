
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const UPDATED = "18 de octubre de 2026";
const EMAIL = "elartconsultora@gmail.com";

const sectionStyle: CSSProperties = {
  padding: "30px 0",
  borderBottom: "1px solid #e5ebf0",
  scrollMarginTop: "110px",
};

const headingStyle: CSSProperties = {
  color: "#0b2239",
  fontSize: "clamp(20px, 2.4vw, 25px)",
  fontWeight: 750,
  lineHeight: 1.3,
  margin: "0 0 15px",
};

const paragraphStyle: CSSProperties = {
  color: "#475569",
  fontSize: "15px",
  lineHeight: 1.85,
  margin: "0 0 15px",
};

const listStyle: CSSProperties = {
  color: "#475569",
  fontSize: "15px",
  lineHeight: 1.9,
  paddingLeft: "23px",
};

const navigation = [
  ["responsable", "01 · Responsable del tratamiento"],
  ["datos", "02 · Información recopilada"],
  ["google", "03 · Inicio de sesión con Google"],
  ["finalidades", "04 · Finalidades del tratamiento"],
  ["proveedores", "05 · Proveedores y terceros"],
  ["conservacion", "06 · Conservación de datos"],
  ["seguridad", "07 · Seguridad de la información"],
  ["cookies", "08 · Cookies y tecnologías"],
  ["derechos", "09 · Derechos de los usuarios"],
  ["transferencias", "10 · Transferencias internacionales"],
  ["menores", "11 · Protección de menores"],
  ["cambios", "12 · Actualizaciones"],
  ["contacto", "13 · Contacto y solicitudes"],
] as const;

export default function Privacidad() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="subhero">
          <div className="container">
            <p
              style={{
                color: "#b38a4b",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Elart Academia · Protección de datos
            </p>

            <h1>
              Política de <em>privacidad.</em>
            </h1>

            <p>
              Conoce cómo recopilamos, utilizamos,
              protegemos y administramos la información
              personal de los usuarios de nuestra plataforma.
            </p>

            <p
              style={{
                marginTop: 18,
                fontSize: 13,
                opacity: 0.75,
              }}
            >
              Última actualización: {UPDATED}
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: 1050 }}>
            <div
              style={{
                background: "#0b2239",
                borderRadius: 18,
                padding: "clamp(22px, 4vw, 36px)",
                color: "#fff",
                marginBottom: 28,
                borderTop: "4px solid #b38a4b",
              }}
            >
              <p
                style={{
                  color: "#d8ba86",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                  margin: "0 0 12px",
                }}
              >
                PRIVACIDAD Y CONFIANZA
              </p>

              <h2
                style={{
                  color: "#fff",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  lineHeight: 1.3,
                  margin: "0 0 12px",
                }}
              >
                Tus datos forman parte de nuestra
                responsabilidad.
              </h2>

              <p
                style={{
                  color: "#c9d5e2",
                  lineHeight: 1.8,
                  margin: 0,
                  fontSize: 15,
                }}
              >
                En Elart Academia utilizamos la información
                personal necesaria para administrar las cuentas,
                habilitar matrículas, facilitar el aprendizaje y
                prestar nuestros servicios educativos.
                Nuestro compromiso es explicar de forma clara
                qué información tratamos y con qué finalidad.
              </p>
            </div>

            <nav
              aria-label="Índice de política de privacidad"
              style={{
                background: "#fff",
                border: "1px solid #e4eaf0",
                borderRadius: 18,
                padding: "26px",
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  color: "#0b2239",
                  fontSize: 19,
                  margin: "0 0 17px",
                }}
              >
                Contenido de esta política
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "12px 24px",
                }}
              >
                {navigation.map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    style={{
                      color: "#17627a",
                      fontSize: 14,
                      fontWeight: 600,
                      textDecoration: "none",
                      lineHeight: 1.6,
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>

            <article
              className="content-panel"
              style={{
                padding: "clamp(22px, 4vw, 48px)",
                borderRadius: 20,
              }}
            >
              <section id="responsable" style={sectionStyle}>
                <h2 style={headingStyle}>
                  01. Responsable del tratamiento de datos
                </h2>

                <p style={paragraphStyle}>
                  Elart Academia es la plataforma educativa
                  disponible en{" "}
                  <a href="https://elartacademia.com">
                    https://elartacademia.com
                  </a>
                  . Bajo esta denominación se administran
                  los servicios de formación digital y la
                  información relacionada con sus usuarios,
                  matrículas y actividades académicas.
                </p>

                <p style={paragraphStyle}>
                  Para cualquier consulta sobre privacidad,
                  acceso a información personal, corrección
                  o eliminación de datos, puedes comunicarte
                  mediante el correo electrónico oficial
                  de contacto:
                </p>

                <p style={{ ...paragraphStyle, fontWeight: 700 }}>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>

                <p style={paragraphStyle}>
                  Esta política se aplica al sitio web,
                  las cuentas de estudiantes, el campus
                  virtual y los servicios digitales
                  gestionados por Elart Academia.
                </p>
              </section>

              <section id="datos" style={sectionStyle}>
                <h2 style={headingStyle}>
                  02. Información personal que recopilamos
                </h2>

                <p style={paragraphStyle}>
                  Según las funcionalidades que utilices,
                  podemos tratar las siguientes categorías
                  de información:
                </p>

                <ul style={listStyle}>
                  <li>
                    <strong>Datos de identificación:</strong>{" "}
                    nombre, apellidos y correo electrónico.
                  </li>

                  <li>
                    <strong>Datos de perfil:</strong>{" "}
                    fotografía, teléfono, dirección,
                    ocupación, biografía u otros datos
                    que el usuario decida proporcionar
                    mediante los formularios disponibles.
                  </li>

                  <li>
                    <strong>Datos de autenticación:</strong>{" "}
                    identificadores de cuenta, información
                    básica del proveedor de inicio de sesión
                    y datos necesarios para mantener
                    sesiones autenticadas.
                  </li>

                  <li>
                    <strong>Información académica:</strong>{" "}
                    cursos matriculados, módulos, lecciones,
                    progreso de aprendizaje y estado de
                    acceso a los programas.
                  </li>

                  <li>
                    <strong>Información de inscripción:</strong>{" "}
                    solicitudes, estados de pago, importes
                    y comprobantes de transferencia,
                    cuando corresponda.
                  </li>

                  <li>
                    <strong>Comunicaciones:</strong>{" "}
                    consultas y mensajes enviados mediante
                    los canales oficiales de la academia.
                  </li>

                  <li>
                    <strong>Datos técnicos:</strong>{" "}
                    información de sesión, navegador,
                    registros de seguridad y datos técnicos
                    necesarios para el funcionamiento
                    de la plataforma.
                  </li>
                </ul>

                <p style={paragraphStyle}>
                  Solicitamos únicamente la información
                  razonablemente necesaria para prestar
                  nuestros servicios. Recomendamos no
                  enviar contraseñas, códigos de verificación
                  ni datos financieros que no sean
                  indispensables para una operación.
                </p>
              </section>

              <section id="google" style={sectionStyle}>
                <h2 style={headingStyle}>
                  03. Información obtenida mediante Google
                </h2>

                <div
                  style={{
                    background: "#f1f6f8",
                    borderLeft: "4px solid #167b82",
                    padding: "22px 24px",
                    borderRadius: 12,
                    marginBottom: 22,
                  }}
                >
                  <strong
                    style={{
                      color: "#0b2239",
                      fontSize: 16,
                    }}
                  >
                    Inicio de sesión con Google
                  </strong>

                  <p
                    style={{
                      ...paragraphStyle,
                      margin: "10px 0 0",
                    }}
                  >
                    Google se utiliza como proveedor de
                    autenticación para facilitar el
                    registro y acceso seguro a tu cuenta
                    de Elart Academia.
                  </p>
                </div>

                <h3 style={{ ...headingStyle, fontSize: 18 }}>
                  ¿A qué información accedemos?
                </h3>

                <p style={paragraphStyle}>
                  Cuando eliges continuar con Google,
                  y de acuerdo con los permisos mostrados
                  en la pantalla de consentimiento,
                  podemos recibir información básica
                  de tu cuenta, como:
                </p>

                <ul style={listStyle}>
                  <li>Nombre asociado a tu cuenta de Google.</li>
                  <li>Dirección de correo electrónico.</li>
                  <li>Fotografía pública del perfil, si está disponible.</li>
                  <li>
                    Identificador técnico necesario para
                    vincular el acceso con tu cuenta
                    de estudiante.
                  </li>
                </ul>

                <h3 style={{ ...headingStyle, fontSize: 18 }}>
                  ¿Para qué utilizamos esos datos?
                </h3>

                <ul style={listStyle}>
                  <li>
                    Crear o identificar tu cuenta dentro
                    de Elart Academia.
                  </li>
                  <li>
                    Permitir el inicio de sesión y la
                    administración segura de sesiones.
                  </li>
                  <li>
                    Asociar tus matrículas y progreso
                    académico con tu usuario.
                  </li>
                  <li>
                    Mostrar información básica de perfil
                    dentro del campus virtual.
                  </li>
                </ul>

                <h3 style={{ ...headingStyle, fontSize: 18 }}>
                  Uso limitado de los datos de Google
                </h3>

                <p style={paragraphStyle}>
                  Los datos obtenidos mediante el inicio
                  de sesión con Google se utilizan para
                  las funciones de autenticación, perfil
                  y acceso académico descritas en
                  esta política.
                </p>

                <p style={paragraphStyle}>
                  No solicitamos acceso al contenido
                  de Gmail, Google Drive, contactos,
                  documentos personales ni mensajes
                  privados mediante el inicio de sesión
                  estándar de nuestra plataforma.
                </p>

                <p style={paragraphStyle}>
                  No vendemos la información personal
                  obtenida de Google ni la utilizamos
                  para elaborar perfiles publicitarios
                  ajenos a las funcionalidades
                  expresamente ofrecidas.
                </p>

                <h3 style={{ ...headingStyle, fontSize: 18 }}>
                  Almacenamiento y proveedores
                </h3>

                <p style={paragraphStyle}>
                  La autenticación de Google se integra
                  con Supabase, nuestro proveedor de
                  autenticación y administración de datos.
                  La información básica necesaria
                  para identificar al usuario puede
                  almacenarse en su cuenta y perfil
                  de Elart Academia.
                </p>

                <p style={paragraphStyle}>
                  También puedes retirar el acceso de
                  la aplicación desde la configuración
                  de seguridad de tu cuenta de Google.
                  Esto no elimina automáticamente
                  los registros académicos que debamos
                  conservar por una obligación legítima
                  o contractual.
                </p>
              </section>

              <section id="finalidades" style={sectionStyle}>
                <h2 style={headingStyle}>
                  04. Finalidades del tratamiento
                </h2>

                <p style={paragraphStyle}>
                  Utilizamos la información personal
                  para las siguientes finalidades:
                </p>

                <ul style={listStyle}>
                  <li>
                    Registrar usuarios y gestionar
                    el acceso al campus virtual.
                  </li>

                  <li>
                    Procesar solicitudes de inscripción,
                    verificar pagos y habilitar matrículas.
                  </li>

                  <li>
                    Mostrar cursos, lecciones y
                    seguimiento del aprendizaje.
                  </li>

                  <li>
                    Responder consultas y proporcionar
                    soporte relacionado con el servicio.
                  </li>

                  <li>
                    Enviar mensajes operativos,
                    confirmaciones y comunicaciones
                    de seguridad.
                  </li>

                  <li>
                    Prevenir accesos indebidos,
                    fraudes y usos no autorizados.
                  </li>

                  <li>
                    Atender obligaciones contractuales,
                    administrativas y legales
                    cuando correspondan.
                  </li>
                </ul>

                <p style={paragraphStyle}>
                  El tratamiento se basa, según el caso,
                  en la prestación del servicio solicitado,
                  el consentimiento del usuario cuando
                  resulte necesario, la seguridad de
                  la plataforma y el cumplimiento
                  de obligaciones aplicables.
                </p>

                <p style={paragraphStyle}>
                  Las comunicaciones comerciales
                  no indispensables para la prestación
                  del servicio se gestionarán conforme
                  a los permisos y opciones de
                  comunicación aplicables.
                </p>
              </section>

              <section id="proveedores" style={sectionStyle}>
                <h2 style={headingStyle}>
                  05. Proveedores tecnológicos y terceros
                </h2>

                <p style={paragraphStyle}>
                  Para operar nuestros servicios
                  utilizamos proveedores tecnológicos
                  que pueden tratar información
                  estrictamente necesaria para prestar
                  sus respectivas funciones.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 14,
                    margin: "18px 0 24px",
                  }}
                >
                  {[
                    {
                      name: "Supabase",
                      function:
                        "Autenticación, administración de cuentas, base de datos y almacenamiento.",
                    },
                    {
                      name: "Vercel",
                      function:
                        "Alojamiento y funcionamiento técnico del sitio web.",
                    },
                    {
                      name: "Google",
                      function:
                        "Inicio de sesión mediante Google OAuth, cuando el usuario lo elige.",
                    },
                    {
                      name: "Resend",
                      function:
                        "Envío de comunicaciones transaccionales y de seguridad.",
                    },
                  ].map((provider) => (
                    <div
                      key={provider.name}
                      style={{
                        padding: "20px",
                        background: "#f8fafc",
                        border: "1px solid #e5ebf0",
                        borderRadius: 12,
                      }}
                    >
                      <strong
                        style={{
                          color: "#0b2239",
                          fontSize: 16,
                        }}
                      >
                        {provider.name}
                      </strong>

                      <p
                        style={{
                          ...paragraphStyle,
                          fontSize: 14,
                          margin: "9px 0 0",
                        }}
                      >
                        {provider.function}
                      </p>
                    </div>
                  ))}
                </div>

                <p style={paragraphStyle}>
                  Cuando el estudiante utiliza medios
                  de pago, servicios bancarios o canales
                  externos como WhatsApp, también pueden
                  aplicarse las políticas de privacidad
                  de los respectivos proveedores.
                </p>

                <p style={paragraphStyle}>
                  No comercializamos bases de datos
                  personales de estudiantes. La
                  información podrá comunicarse
                  a autoridades competentes cuando
                  exista una obligación legal válida.
                </p>
              </section>

              <section id="conservacion" style={sectionStyle}>
                <h2 style={headingStyle}>
                  06. Almacenamiento y conservación de datos
                </h2>

                <p style={paragraphStyle}>
                  Los datos de cuenta y matrícula se
                  conservan mientras sean necesarios
                  para mantener el acceso académico,
                  administrar los servicios contratados
                  y atender las solicitudes del estudiante.
                </p>

                <p style={paragraphStyle}>
                  Cuando se solicite la eliminación
                  de una cuenta, revisaremos los datos
                  que puedan suprimirse o anonimizarse
                  y aquellos que deban mantenerse
                  durante un período adicional por
                  obligaciones legales, contables,
                  prevención del fraude o resolución
                  de controversias.
                </p>

                <p style={paragraphStyle}>
                  Los criterios de conservación
                  dependerán de la naturaleza del
                  dato, de la vigencia del servicio
                  y de las obligaciones que resulten
                  aplicables. Una vez que deje de
                  existir una finalidad válida,
                  los datos se eliminarán o
                  anonimizarán de manera razonable.
                </p>
              </section>

              <section id="seguridad" style={sectionStyle}>
                <h2 style={headingStyle}>
                  07. Seguridad de la información
                </h2>

                <p style={paragraphStyle}>
                  Adoptamos medidas técnicas y
                  organizativas destinadas a proteger
                  los datos frente a accesos no
                  autorizados, alteración, divulgación
                  o pérdida indebida.
                </p>

                <p style={paragraphStyle}>
                  Estas medidas incluyen mecanismos
                  de autenticación, controles de acceso
                  y configuraciones de seguridad
                  proporcionados por los servicios
                  tecnológicos utilizados.
                </p>

                <p style={paragraphStyle}>
                  Las contraseñas de acceso se gestionan
                  mediante el proveedor de autenticación;
                  no solicitamos a los usuarios que
                  compartan sus contraseñas mediante
                  correo electrónico o WhatsApp.
                </p>

                <p style={paragraphStyle}>
                  Ningún sistema conectado a Internet
                  puede garantizar seguridad absoluta.
                  Por ello, recomendamos utilizar
                  contraseñas robustas, mantener
                  protegidos los dispositivos y
                  comunicar cualquier actividad
                  sospechosa.
                </p>
              </section>

              <section id="cookies" style={sectionStyle}>
                <h2 style={headingStyle}>
                  08. Cookies y tecnologías similares
                </h2>

                <p style={paragraphStyle}>
                  El sitio puede utilizar cookies y
                  tecnologías equivalentes necesarias
                  para la autenticación, continuidad
                  de sesiones, seguridad y
                  funcionamiento del campus virtual.
                </p>

                <p style={paragraphStyle}>
                  Algunas funcionalidades de
                  proveedores externos pueden
                  utilizar sus propios mecanismos
                  técnicos conforme a sus
                  políticas de privacidad.
                </p>

                <p style={paragraphStyle}>
                  Si se incorporan herramientas
                  adicionales de medición o
                  publicidad que requieran información
                  o consentimiento específico,
                  se proporcionarán los avisos
                  y controles correspondientes.
                </p>
              </section>

              <section id="derechos" style={sectionStyle}>
                <h2 style={headingStyle}>
                  09. Derechos sobre tus datos personales
                </h2>

                <p style={paragraphStyle}>
                  Puedes comunicarte con Elart Academia
                  para solicitar, según corresponda
                  y conforme a la normativa aplicable:
                </p>

                <ul style={listStyle}>
                  <li>
                    Conocer qué información personal
                    tratamos sobre ti.
                  </li>

                  <li>
                    Solicitar la corrección de
                    información inexacta o desactualizada.
                  </li>

                  <li>
                    Solicitar la eliminación de datos
                    que ya no sean necesarios.
                  </li>

                  <li>
                    Consultar cómo se utilizan
                    y comparten tus datos.
                  </li>

                  <li>
                    Retirar autorizaciones otorgadas
                    cuando el tratamiento dependa
                    de tu consentimiento.
                  </li>

                  <li>
                    Solicitar información sobre
                    el cierre de tu cuenta.
                  </li>
                </ul>

                <p style={paragraphStyle}>
                  Para proteger la información,
                  podremos solicitar una verificación
                  razonable de identidad antes de
                  atender determinadas solicitudes.
                </p>

                <p style={paragraphStyle}>
                  La eliminación de una cuenta
                  puede afectar la disponibilidad
                  de matrículas, historial y progreso.
                  Antes de proceder, comunicaremos
                  los efectos relevantes de
                  la solicitud.
                </p>
              </section>

              <section id="transferencias" style={sectionStyle}>
                <h2 style={headingStyle}>
                  10. Tratamiento internacional de información
                </h2>

                <p style={paragraphStyle}>
                  Dado que Elart Academia utiliza
                  proveedores de infraestructura
                  y servicios digitales de alcance
                  internacional, algunos datos
                  pueden almacenarse o procesarse
                  mediante sistemas ubicados
                  fuera del país de residencia
                  del estudiante.
                </p>

                <p style={paragraphStyle}>
                  Estos tratamientos se relacionan
                  con funciones como autenticación,
                  alojamiento, almacenamiento
                  y entrega de comunicaciones.
                </p>

                <p style={paragraphStyle}>
                  Procuramos utilizar proveedores
                  adecuados para las necesidades
                  técnicas del servicio y adoptar
                  las medidas que correspondan
                  según la normativa aplicable.
                </p>
              </section>

              <section id="menores" style={sectionStyle}>
                <h2 style={headingStyle}>
                  11. Privacidad y protección de menores
                </h2>

                <p style={paragraphStyle}>
                  Los servicios de Elart Academia
                  están dirigidos a personas que
                  pueden contratar y utilizar
                  servicios educativos conforme
                  a la normativa aplicable.
                </p>

                <p style={paragraphStyle}>
                  Cuando sea necesaria la autorización
                  de un padre, madre o representante
                  legal, esta deberá obtenerse
                  antes del registro o contratación.
                </p>

                <p style={paragraphStyle}>
                  Si identificamos un tratamiento
                  de información de un menor sin
                  la autorización exigida, podremos
                  adoptar medidas para revisar
                  la situación y proteger sus datos.
                </p>
              </section>

              <section id="cambios" style={sectionStyle}>
                <h2 style={headingStyle}>
                  12. Actualizaciones de esta política
                </h2>

                <p style={paragraphStyle}>
                  Esta política podrá actualizarse
                  cuando cambien los servicios,
                  los proveedores tecnológicos,
                  nuestras prácticas de tratamiento
                  o los requisitos legales aplicables.
                </p>

                <p style={paragraphStyle}>
                  Publicaremos la versión actualizada
                  en esta misma página, identificando
                  su fecha de revisión.
                </p>

                <p style={paragraphStyle}>
                  Cuando existan cambios relevantes
                  en el uso de información personal,
                  y especialmente de datos obtenidos
                  mediante Google, proporcionaremos
                  la información o comunicación
                  adicional que corresponda.
                </p>
              </section>

              <section
                id="contacto"
                style={{ ...sectionStyle, borderBottom: "none" }}
              >
                <h2 style={headingStyle}>
                  13. Contacto y solicitudes de privacidad
                </h2>

                <p style={paragraphStyle}>
                  Si deseas ejercer tus derechos,
                  realizar una consulta sobre
                  tratamiento de información
                  o informar una posible incidencia
                  relacionada con tus datos,
                  puedes comunicarte directamente
                  con Elart Academia.
                </p>

                <div
                  style={{
                    padding: "24px",
                    borderRadius: 14,
                    background: "#f1f6f8",
                    borderLeft: "4px solid #b38a4b",
                  }}
                >
                  <strong style={{ color: "#0b2239" }}>
                    ELART ACADEMIA
                  </strong>

                  <p style={{ ...paragraphStyle, marginTop: 10 }}>
                    Sitio web:{" "}
                    <a href="https://elartacademia.com">
                      https://elartacademia.com
                    </a>
                  </p>

                  <p style={{ ...paragraphStyle, marginBottom: 0 }}>
                    Solicitudes de privacidad:{" "}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                </div>

                <p
                  style={{
                    ...paragraphStyle,
                    marginTop: 20,
                    fontSize: 13,
                  }}
                >
                  Recomendamos incluir en la solicitud
                  el correo asociado a tu cuenta
                  y una descripción clara de lo
                  que necesitas, evitando enviar
                  contraseñas o información
                  confidencial innecesaria.
                </p>
              </section>
            </article>

            <p
              style={{
                color: "#64748b",
                fontSize: 13,
                textAlign: "center",
                marginTop: 24,
                lineHeight: 1.7,
              }}
            >
              © {new Date().getFullYear()} Elart Academia.
              Privacidad, confianza y educación profesional.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
