
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { whatsappLink } from '@/lib/catalog';
import { BrandIdentity } from '@/components/brand-identity';

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-main">

          {/* IDENTIDAD CORPORATIVA */}
          <div>
            <BrandIdentity dark />

            <p>
              Educación práctica para impulsar tus conocimientos,
              habilidades y proyectos. Aprende a tu ritmo,
              desde cualquier lugar.
            </p>
          </div>

          {/* NAVEGACIÓN DE LA ACADEMIA */}
          <div>
            <h4>Academia</h4>

            <Link href="/cursos">
              Nuestros cursos
            </Link>

            <Link href="/dashboard">
              Campus virtual
            </Link>

            <Link href="/registro">
              Crear cuenta
            </Link>
          </div>

          {/* INFORMACIÓN Y SOPORTE */}
          <div>
            <h4>Soporte</h4>

            <Link href="/contacto">
              Contacto
            </Link>

            <Link href="/preguntas">
              Preguntas frecuentes
            </Link>

            <Link href="/privacidad">
              Privacidad
            </Link>

            <Link href="/terminos">
              Términos y condiciones
            </Link>
          </div>

          {/* ATENCIÓN AL CLIENTE */}
          <div>
            <h4>¿Necesitas orientación?</h4>

            <p>
              Estamos para ayudarte a elegir una formación
              acorde a tus objetivos.
            </p>

            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact footer-whatsapp-btn"
              aria-label="Contactar con Elart Academia por WhatsApp"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="25"
                height="25"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.1-.198.05-.372-.025-.52-.074-.15-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.075c.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.4h-.004a9.867 9.867 0 0 1-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.262c.002-5.448 4.436-9.881 9.887-9.881a9.806 9.806 0 0 1 6.995 2.898 9.804 9.804 0 0 1 2.894 6.998c-.003 5.448-4.437 9.88-9.892 9.88m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.334.158 11.892c0 2.096.547 4.144 1.588 5.95L.057 24l6.3-1.653a11.89 11.89 0 0 0 5.688 1.448h.005c6.557 0 11.892-5.334 11.895-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
              </svg>

              <span>Solicitar Información</span>

              <ArrowUpRight size={17} />
            </a>

          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Elart Academia.
            Todos los derechos reservados.
          </span>

          <span>
            Formación digital · Bolivia y Latinoamérica
          </span>
        </div>

      </div>
    </footer>
  );
}
