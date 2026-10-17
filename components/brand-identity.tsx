
import Image from 'next/image';
import Link from 'next/link';

type BrandIdentityProps = {
  dark?: boolean;
};

export function BrandIdentity({ dark = false }: BrandIdentityProps) {
  return (
    <Link
      href="/"
      className={`ea-brand ${dark ? 'ea-brand--dark' : ''}`}
      aria-label="Elart Academia, ir al inicio"
    >
      <span className="ea-brand__seal">
        <Image
          src="/elart-logo-oficial.webp"
          alt="Emblema oficial de Elart Academia"
          fill
          sizes="56px"
        />
      </span>
      <span className="ea-brand__copy">
        <span className="ea-brand__name">
          <span className="ea-brand__elart">ELART</span>
          <span className="ea-brand__academia">ACADEMIA</span>
        </span>
        <span className="ea-brand__tagline">
          EDUCACIÓN PROFESIONAL
        </span>
      </span>
    </Link>
  );
}
