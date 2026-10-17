import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, BookOpen, CheckCircle2, PlayCircle } from 'lucide-react';
import type { CampusCourse } from '@/lib/campus';

export function CampusCourseCard({course}:{course:CampusCourse}) {
  return (
    <Link href={course.href} prefetch className="elart-course-tile">
      <div className="elart-course-tile-cover">
        <Image src={course.cover_url || '/courses/bolsa-de-valores.svg'} alt="" fill sizes="(max-width: 640px) 100vw, 340px" unoptimized />
        <span><PlayCircle size={14}/> Continuar curso</span>
      </div>
      <div className="elart-course-tile-body">
        <span className="elart-course-tag"><BookOpen size={13}/>{course.category}</span>
        <h3>{course.title}</h3>
        <div className="elart-course-progress-label"><span>Tu progreso</span><strong>{course.progress}%</strong></div>
        <div className="elart-progress-track"><span style={{width:`${course.progress}%`}}/></div>
        <div className="elart-course-tile-meta"><span><CheckCircle2 size={14}/> {course.completed} de {course.total} lecciones</span><ArrowUpRight size={18}/></div>
      </div>
    </Link>
  );
}
