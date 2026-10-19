'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayCircle, RefreshCw } from 'lucide-react';

type Media =
  | { kind: 'embed'; url: string }
  | { kind: 'video'; url: string }
  | { kind: 'none' };

function youtubeWatchUrl(embedUrl: string): string | null {
  const match = embedUrl.match(/^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?|$)/);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
}

export function LessonPlayer({ lessonId }: { lessonId: string }) {
  const [media, setMedia] = useState<Media | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const autoRetries = useRef(0);
  const lastPosition = useRef(0);

  function retry() {
    setError('');
    setMedia(null);
    setAttempt((n) => n + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/lecciones/${encodeURIComponent(lessonId)}/video`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (response.status === 401) throw new Error('Inicia sesión para ver esta clase.');
        if (response.status === 403) throw new Error('Tu matrícula no permite reproducir esta clase.');
        if (!response.ok) throw new Error('No se pudo cargar el reproductor. Intenta nuevamente.');
        return response.json() as Promise<Media>;
      })
      .then((result) => {
        if (!controller.signal.aborted) setMedia(result);
      })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          setError(reason instanceof Error ? reason.message : 'Error al cargar el video.');
        }
      });
    return () => controller.abort();
  }, [lessonId, attempt]);

  function handleVideoError() {
    if (autoRetries.current < 1) {
      autoRetries.current += 1;
      retry(); // Solicita un enlace firmado nuevo; conserva el minuto reproducido.
    } else {
      setError('No se pudo reproducir el archivo. Prueba recargar o contacta a soporte.');
    }
  }

  const youtubeUrl = media?.kind === 'embed' ? youtubeWatchUrl(media.url) : null;

  return (
    <>
      <div className="player">
        {error ? (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <p role="alert" style={{ color: '#e4edf2', marginBottom: 14 }}>{error}</p>
            <button className="btn btn-outline-light" type="button" onClick={retry}>
              <RefreshCw size={17} /> Reintentar reproducción
            </button>
          </div>
        ) : media === null ? (
          <span role="status">Cargando reproductor…</span>
        ) : media.kind === 'embed' ? (
          <iframe
            title="Video de la lección"
            src={media.url}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : media.kind === 'video' ? (
          <video
            controls
            controlsList="nodownload"
            src={media.url}
            preload="metadata"
            playsInline
            onTimeUpdate={(event) => {
              lastPosition.current = event.currentTarget.currentTime;
            }}
            onLoadedMetadata={(event) => {
              const video = event.currentTarget;
              if (lastPosition.current > 0 && Number.isFinite(video.duration)) {
                video.currentTime = Math.min(lastPosition.current, Math.max(0, video.duration - 1));
              }
            }}
            onError={handleVideoError}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: 25 }}>
            <PlayCircle size={45} style={{ margin: '0 auto 15px' }} />
            <p>Esta lección aún no tiene contenido audiovisual disponible.</p>
          </div>
        )}
      </div>
      {youtubeUrl && (
        <p style={{ marginTop: 10, fontSize: 12, color: '#617582' }}>
          ¿No carga el reproductor integrado?{' '}
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"
            style={{ color: '#0a6985', textDecoration: 'underline', textUnderlineOffset: 2 }}>
            Abrir la clase en YouTube ↗
          </a>
        </p>
      )}
    </>
  );
}
