
import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

const WHATSAPP_NUMBER = '59174173222';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: course } = await supabase
    .from('courses')
    .select('title')
    .eq('slug', slug)
    .single();

  if (!course) {
    notFound();
  }

  const message =
    `Hola, deseo inscribirme al Curso de "${course.title}".`;

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  redirect(whatsappUrl);
}
