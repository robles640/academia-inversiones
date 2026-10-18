
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
  ["alcance", "01 · Alcance del servicio"],
  ["cuentas", "02 · Registro y cuentas"],
  ["cursos", "03 · Oferta académica"],
  ["pagos", "04 · Inscripciones y pagos"],
  ["acceso", "05 · Acceso a los cursos"],
  ["propiedad", "06 · Propiedad intelectual"],
  ["inversiones", "07 · Educación financiera"],
  ["conducta", "08 · Normas de uso"],
  ["devoluciones", "09 · Reembolsos"],
  ["disponibilidad", "10 · Disponibilidad"],
  ["responsabilidad", "11 · Responsabilidades"],
  ["legislacion", "12 · Legislación aplicable"],
  ["actualizaciones", "13 · Modificaciones"],
  ["contacto", "14 · Contacto"],
] as const;

export default function Terminos() {
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
              Elart Academia · Marco legal
            </p>

            <h1>
              Términos y <em>condiciones.</em>
            </h1>

            <p>
              Condiciones generales para el registro, inscripción,
              contratación y utilización de los servicios educativos
              de Elart Academia.
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
                COMPROMISO CON LA TRANSPARENCIA
              </p>

              <h2
                style={{
                  color: "#fff",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  lineHeight: 1.3,
                  margin: "0 0 12px",
                }}
              >
                Una experiencia educativa clara y responsable.
              </h2>

              <p
                style={{
                  color: "#c9d5e2",
                  lineHeight: 1.8,
                  margin: 0,
                  fontSize: 15,
                }}
              >
                En Elart Academia promovemos el acceso a formación
                digital, la comunicación transparente y el uso
                responsable de nuestra plataforma. Estas condiciones
                explican los derechos y obligaciones relacionados con
                nuestros cursos y servicios.
              </p>
            </div>

            <nav
              aria-label="Índice de términos y condiciones"
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
                Contenido del documento
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
              <section id="alcance" style={sectionStyle}>
                <h2 style={headingStyle}>
                  01. Identificación y alcance del servicio
                </h2>

                <p style={paragraphStyle}>
                  Elart Academia es una plataforma de formación
                  digital accesible desde{" "}
                  <a href="https://elartacademia.com">
                    elartacademia.com
                  </a>
                  , orientada a ofrecer cursos, contenidos educativos,
                  herramientas de aprendizaje y servicios de
                  acompañamiento académico.
                </p>

                <p style={paragraphStyle}>
                  Estas condiciones regulan la navegación, creación
                  de cuentas, adquisición de cursos y utilización del
                  campus virtual. La academia opera comercialmente
                  bajo la denominación Elart Academia y puede ser
                  contactada mediante el correo indicado al final de
                  este documento.
                </p>

                <p style={paragraphStyle}>
                  Antes de contratar, el estudiante debe revisar la
                  descripción, precio, modalidad, contenido y
                  condiciones particulares del curso seleccionado.
                  En caso de discrepancia, se respetarán las
                  condiciones expresamente ofrecidas al momento
                  de la contratación y las disposiciones legales
                  obligatorias que resulten aplicables.
                </p>
              </section>

              <section id="cuentas" style={sectionStyle}>
                <h2 style={headingStyle}>
                  02. Registro, autenticación y cuentas
                </h2>

                <p style={paragraphStyle}>
                  Para acceder a determinadas funcionalidades,
                  el usuario puede crear una cuenta con correo
                  electrónico y contraseña o utilizar el inicio
                  de sesión con Google, cuando se encuentre
                  disponible.
                </p>

                <ul style={listStyle}>
                  <li>
                    Los datos proporcionados deben ser veraces y
                    mantenerse actualizados.
                  </li>
                  <li>
                    Cada cuenta es personal y debe utilizarse
                    exclusivamente por su titular.
                  </li>
                  <li>
                    El usuario debe proteger sus credenciales y
                    comunicar cualquier acceso no autorizado.
                  </li>
                  <li>
                    La academia podrá solicitar verificaciones
                    razonables para proteger la cuenta y prevenir
                    operaciones fraudulentas.
                  </li>
                  <li>
                    Los menores de edad deberán contar con la
                    autorización de su representante legal cuando
                    corresponda.
                  </li>
                </ul>

                <p style={paragraphStyle}>
                  Los datos de las cuentas se tratarán conforme
                  a nuestra{" "}
                  <a href="/privacidad">
                    Política de Privacidad
                  </a>
                  .
                </p>
              </section>

              <section id="cursos" style={sectionStyle}>
                <h2 style={headingStyle}>
                  03. Oferta académica y modalidades
                </h2>

                <p style={paragraphStyle}>
                  Elart Academia ofrece formación digital en
                  diferentes áreas, que pueden incluir inversiones,
                  tecnología, herramientas profesionales,
                  productividad y otras especialidades.
                </p>

                <p style={paragraphStyle}>
                  Cada curso tendrá una presentación comercial
                  donde se indiquen sus objetivos, temario,
                  modalidad de acceso y condiciones específicas.
                  Los contenidos pueden comprender lecciones
                  grabadas, lecturas, materiales complementarios,
                  evaluaciones, sesiones en vivo o acompañamiento,
                  según lo anunciado para cada programa.
                </p>

                <p style={paragraphStyle}>
                  Las sesiones en vivo, asesorías y actividades
                  complementarias estarán sujetas a los horarios,
                  condiciones y disponibilidad anunciados. No
                  todos los cursos incluyen necesariamente los
                  mismos beneficios.
                </p>
              </section>

              <section id="pagos" style={sectionStyle}>
                <h2 style={headingStyle}>
                  04. Inscripciones, precios y pagos
                </h2>

                <p style={paragraphStyle}>
                  Los precios se comunicarán en la página de cada
                  curso o mediante los canales oficiales de
                  atención. Podrán expresarse en bolivianos,
                  dólares estadounidenses u otra moneda
                  expresamente indicada.
                </p>

                <p style={paragraphStyle}>
                  Según el curso y el país del estudiante, la
                  inscripción podrá gestionarse mediante
                  transferencias bancarias, pagos digitales,
                  comunicación por WhatsApp u otros medios
                  oficialmente informados.
                </p>

                <p style={paragraphStyle}>
                  Cuando corresponda una verificación manual,
                  el estudiante deberá proporcionar los datos
                  y comprobantes razonablemente necesarios
                  para identificar el pago. La matrícula se
                  habilitará después de que la academia
                  confirme la operación.
                </p>

                <p style={paragraphStyle}>
                  El envío de un comprobante o una solicitud
                  de inscripción no constituye, por sí solo,
                  confirmación definitiva del pago ni
                  habilitación automática del curso.
                </p>

                <p style={paragraphStyle}>
                  Cualquier comisión bancaria, diferencia
                  cambiaria o cargo de un proveedor externo
                  deberá informarse cuando corresponda.
                  Los impuestos y comprobantes fiscales se
                  gestionarán conforme a las obligaciones
                  legales aplicables.
                </p>
              </section>

              <section id="acceso" style={sectionStyle}>
                <h2 style={headingStyle}>
                  05. Matrículas, acceso y progreso académico
                </h2>

                <p style={paragraphStyle}>
                  Una vez confirmada la matrícula, el estudiante
                  podrá visualizar los cursos habilitados
                  desde su cuenta personal, sujetos a las
                  condiciones de la oferta contratada.
                </p>

                <p style={paragraphStyle}>
                  Cuando un curso se anuncie con acceso de por
                  vida, se entenderá como acceso sin una fecha
                  ordinaria de vencimiento preestablecida,
                  mientras el programa y la plataforma
                  permanezcan operativos, respetando los
                  derechos y compromisos adquiridos por
                  el estudiante.
                </p>

                <p style={paragraphStyle}>
                  La academia procurará mantener la continuidad
                  de los contenidos contratados. Cualquier
                  discontinuación o modificación sustancial
                  deberá comunicarse razonablemente y atenderse
                  respetando las condiciones ofrecidas y los
                  derechos del consumidor.
                </p>

                <p style={paragraphStyle}>
                  Las funciones de progreso, seguimiento,
                  historial de clases y demás herramientas
                  disponibles tienen como finalidad facilitar
                  la experiencia educativa.
                </p>
              </section>

              <section id="propiedad" style={sectionStyle}>
                <h2 style={headingStyle}>
                  06. Derechos de autor y uso de materiales
                </h2>

                <p style={paragraphStyle}>
                  Los materiales propios de Elart Academia,
                  su identidad visual, textos, diseños y
                  elementos originales están protegidos
                  por los derechos de propiedad intelectual
                  que correspondan a sus respectivos titulares.
                </p>

                <p style={paragraphStyle}>
                  El acceso a un curso no implica transferencia
                  de propiedad intelectual al estudiante.
                  La autorización de uso se limita al
                  aprendizaje personal, dentro de las
                  condiciones contratadas.
                </p>

                <p style={paragraphStyle}>
                  Algunos programas pueden incluir enlaces
                  o referencias a materiales publicados por
                  terceros. Esos recursos conservan sus
                  respectivas titularidades, licencias
                  y condiciones de utilización.
                </p>

                <p style={paragraphStyle}>
                  No está permitido reproducir, comercializar
                  o redistribuir contenidos protegidos sin
                  contar con los derechos o autorizaciones
                  correspondientes.
                </p>
              </section>

              <section id="inversiones" style={sectionStyle}>
                <h2 style={headingStyle}>
                  07. Educación financiera y riesgos de inversión
                </h2>

                <p style={paragraphStyle}>
                  Los cursos sobre bolsa de valores, acciones,
                  fondos cotizados (ETFs), Bitcoin,
                  criptomonedas y otros instrumentos financieros
                  tienen una finalidad exclusivamente educativa
                  e informativa.
                </p>

                <p style={paragraphStyle}>
                  El contenido no constituye asesoramiento
                  financiero, legal, tributario ni una
                  recomendación personalizada para comprar,
                  vender o mantener un activo determinado.
                </p>

                <p style={paragraphStyle}>
                  Toda inversión implica riesgos, incluida
                  la posible pérdida parcial o total del
                  capital. Los resultados históricos no
                  garantizan rendimientos futuros.
                </p>

                <p style={paragraphStyle}>
                  Cada estudiante es responsable de evaluar
                  su situación financiera, objetivos,
                  tolerancia al riesgo y normativa aplicable
                  antes de tomar decisiones de inversión.
                </p>

                <p style={paragraphStyle}>
                  Elart Academia no garantiza utilidades,
                  rentabilidad ni resultados económicos
                  específicos por participar en sus cursos.
                </p>
              </section>

              <section id="conducta" style={sectionStyle}>
                <h2 style={headingStyle}>
                  08. Normas de uso y seguridad
                </h2>

                <ul style={listStyle}>
                  <li>
                    No compartir cuentas ni credenciales
                    con personas no autorizadas.
                  </li>
                  <li>
                    No intentar acceder a información,
                    funciones o recursos de otros usuarios.
                  </li>
                  <li>
                    No utilizar la plataforma para fraudes,
                    actividades ilícitas o suplantación de identidad.
                  </li>
                  <li>
                    Mantener un trato respetuoso en las
                    comunidades, asesorías y sesiones académicas.
                  </li>
                  <li>
                    Respetar las licencias y derechos
                    correspondientes a cada material.
                  </li>
                </ul>

                <p style={paragraphStyle}>
                  Ante incumplimientos graves, la academia
                  podrá adoptar medidas proporcionales
                  de protección, previa evaluación de
                  los antecedentes, sin desconocer los
                  derechos legalmente reconocidos al usuario.
                </p>
              </section>

              <section id="devoluciones" style={sectionStyle}>
                <h2 style={headingStyle}>
                  09. Cancelaciones y solicitudes de devolución
                </h2>

                <p style={paragraphStyle}>
                  Las condiciones específicas de devolución
                  aplicables a una compra deberán comunicarse
                  al estudiante antes de su contratación.
                  Estas condiciones podrán considerar el
                  tipo de programa, modalidad de prestación,
                  acceso habilitado y circunstancias de
                  la solicitud.
                </p>

                <p style={paragraphStyle}>
                  El estudiante podrá presentar consultas
                  o solicitudes relacionadas con cobros
                  duplicados, errores de pago, imposibilidad
                  de acceso o incumplimientos de las
                  condiciones ofrecidas.
                </p>

                <p style={paragraphStyle}>
                  Las solicitudes se evaluarán individualmente
                  y se atenderán conforme a los términos
                  comunicados en la oferta y a la legislación
                  de protección al consumidor que resulte
                  obligatoria. Nada de lo dispuesto aquí
                  pretende excluir derechos irrenunciables.
                </p>

                <p style={paragraphStyle}>
                  Para solicitar una revisión, escribe a{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>,
                  indicando el curso, fecha, medio de pago
                  y motivo de la solicitud. No envíes
                  contraseñas ni datos financieros completos.
                </p>
              </section>

              <section id="disponibilidad" style={sectionStyle}>
                <h2 style={headingStyle}>
                  10. Disponibilidad y mantenimiento
                </h2>

                <p style={paragraphStyle}>
                  Procuramos mantener la plataforma operativa
                  y segura. No obstante, pueden producirse
                  interrupciones temporales por mantenimiento,
                  fallos de conectividad, actualizaciones
                  técnicas o circunstancias ajenas al
                  control razonable de la academia.
                </p>

                <p style={paragraphStyle}>
                  Si una incidencia afecta de forma sustancial
                  a un servicio contratado, el estudiante
                  podrá contactar a soporte para solicitar
                  una solución adecuada conforme a las
                  condiciones aplicables.
                </p>
              </section>

              <section id="responsabilidad" style={sectionStyle}>
                <h2 style={headingStyle}>
                  11. Alcance de responsabilidades
                </h2>

                <p style={paragraphStyle}>
                  Elart Academia se compromete a presentar
                  información clara sobre sus servicios
                  y a gestionar de manera diligente las
                  solicitudes relacionadas con cuentas,
                  matrículas y acceso a los cursos.
                </p>

                <p style={paragraphStyle}>
                  El estudiante reconoce que los resultados
                  de aprendizaje dependen de factores
                  individuales, como dedicación, práctica,
                  conocimientos previos y circunstancias
                  personales.
                </p>

                <p style={paragraphStyle}>
                  Ninguna disposición de estos términos
                  limita responsabilidades o garantías que,
                  conforme a la legislación aplicable,
                  no puedan ser excluidas.
                </p>
              </section>

              <section id="legislacion" style={sectionStyle}>
                <h2 style={headingStyle}>
                  12. Legislación y resolución de controversias
                </h2>

                <p style={paragraphStyle}>
                  La prestación de los servicios se sujetará
                  a la normativa aplicable, incluyendo
                  las disposiciones de protección de
                  consumidores y usuarios cuando correspondan.
                </p>

                <p style={paragraphStyle}>
                  Antes de acudir a los mecanismos legales
                  disponibles, las partes podrán intentar
                  resolver cualquier diferencia mediante
                  comunicación directa y de buena fe.
                </p>

                <p style={paragraphStyle}>
                  La contratación internacional respetará
                  las normas imperativas de protección al
                  consumidor que resulten aplicables en
                  cada jurisdicción.
                </p>
              </section>

              <section id="actualizaciones" style={sectionStyle}>
                <h2 style={headingStyle}>
                  13. Actualización de estas condiciones
                </h2>

                <p style={paragraphStyle}>
                  Estas condiciones podrán actualizarse
                  para reflejar cambios en los servicios,
                  operaciones, requisitos técnicos o
                  normativa aplicable.
                </p>

                <p style={paragraphStyle}>
                  Cuando existan modificaciones relevantes
                  que afecten a estudiantes con servicios
                  contratados, se comunicarán por los
                  medios disponibles y con la anticipación
                  que corresponda.
                </p>

                <p style={paragraphStyle}>
                  Los cambios no tendrán por objeto
                  desconocer derechos previamente adquiridos
                  ni condiciones contractuales obligatorias.
                </p>
              </section>

              <section
                id="contacto"
                style={{ ...sectionStyle, borderBottom: "none" }}
              >
                <h2 style={headingStyle}>
                  14. Atención y contacto
                </h2>

                <p style={paragraphStyle}>
                  Para consultas relacionadas con estas
                  condiciones, matrículas, servicios
                  contratados o atención al estudiante,
                  puedes contactar a nuestro equipo.
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
                    Correo de atención:{" "}
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </p>
                </div>
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
              Todos los derechos reservados.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
