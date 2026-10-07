import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🚀 MEGA CONFIGURACIÓN SEO PROFESIONAL PARA GOOGLE Y REDES
export const metadata: Metadata = {
  metadataBase: new URL("https://elartacademia.com"),
  title: {
    default: "Elart Academia | Aprende a Invertir en la Bolsa de Valores",
    template: "%s | Elart Academia"
  },
  description: "Aprende a invertir, comprar acciones y ser socio de las empresas más grandes y rentables del mundo como Nvidia, Tesla, Apple y Microsoft en la Bolsa de Valores de EE.UU. y Criptomonedas. Domina las finanzas personales como un experto y empieza a generar riqueza.",
  keywords: [
    "curso en bolsa de valores", "curso de inversiones", "curso de finanzas", 
    "curso de finanzas personales", "finanzas", "inversiones", 
    "curso de criptomonedas", "como invertir en bolsa de valores", 
    "como invertir con criptomonedas", "trading", "Elart Academia", "aprender a invertir"
  ],
  authors: [{ name: "Elart Academia", url: "https://elartacademia.com" }],
  creator: "Elart Academia",
  publisher: "Elart Academia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://elartacademia.com",
    title: "Elart Academia | Curso de Inversiones y Finanzas",
    description: "Construye tu patrimonio hoy. Aprende a invertir como un profesional en Wall Street y en el mercado de Criptomonedas.",
    siteName: "Elart Academia",
    images: [
      {
        url: "/og-image.png", // 🟢 IMPORTANTE: Crea una imagen llamativa promocional y guárdala en la carpeta "public" con este nombre
        width: 1200,
        height: 630,
        alt: "Elart Academia - Inversiones en Bolsa y Cripto",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elart Academia | Aprende a Invertir como los Grandes",
    description: "Domina las finanzas personales y aprende a invertir en acciones y cripto. Inscríbete hoy.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // 🟢 CORREGIDO: Esto le dice a Google que tu página es en Español, vital para posicionar en tu público objetivo.
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}