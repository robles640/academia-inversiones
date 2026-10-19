
import Link from 'next/link';
import Image from 'next/image';

import {
  ArrowUpRight,
  BookOpen,
  Clock3,
} from 'lucide-react';

import {
  type Course,
  money,
} from '@/lib/catalog';

export function CourseCard({
  course,
}: {
  course: Course;
}) {
  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="course-card"
    >
      {/* PORTADA DEL CURSO */}
      <div className="course-art">
        <Image
          src={course.cover_url}
          alt={course.title}
          width={800}
          height={560}
          unoptimized
        />

      </div>

      {/* INFORMACIÓN DEL CURSO */}
      <div className="course-content">

        
        <div className="ea-course-heading">
        <div className="eyebrow eyebrow-gold">
            {course.category}
        </div>

        {course.status === 'published' && (
          <span className="ea-course-status">Inscripciones abiertas</span>
        )}
        </div>


        <h3>{course.title}</h3>

        <p>{course.summary}</p>

        {/* INFORMACIÓN ACADÉMICA */}
        <div className="course-meta">
          <span>
            <BookOpen size={15} />
            {course.level}
          </span>

          <span>
            <Clock3 size={15} />
            {course.duration_label}
          </span>
        </div>

        {/* PRECIO Y ACCESO A LOS DETALLES */}
        <div className="course-bottom">
          <div>
            <small>Precio de referencia</small>
            <strong>{money(course.price_usd)}</strong>
          </div>

          <span className="card-arrow">
            <ArrowUpRight size={21} />
          </span>
        </div>

      </div>
    </Link>
  );
}
