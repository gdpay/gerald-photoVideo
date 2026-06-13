'use client';

import { useState, useCallback } from 'react';
import { Play } from 'lucide-react';

interface VideoEmbedProps {
  src: string;
  title?: string;
  posterUrl?: string;
}

export function VideoEmbed({ src, title = 'Featured Film', posterUrl }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const isVimeo = src.includes('vimeo.com') || src.includes('player.vimeo.com');
  const isYoutube = src.includes('youtube.com') || src.includes('youtu.be');

  // Extract video ID for Vimeo
  const vimeoId = isVimeo ? src.match(/(\d+)/)?.[1] || '' : '';
  const embedUrl = isVimeo
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
    : isYoutube
    ? src.replace('watch?v=', 'embed/').split('&')[0] + '?autoplay=1&rel=0'
    : src;

  return (
    <div className="relative aspect-video bg-[#06112A] overflow-hidden group">
      {!isLoaded ? (
        <>
          {/* Poster / Thumbnail */}
          {posterUrl && (
            <img
              src={posterUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          {/* Navy overlay */}
          <div className="absolute inset-0 bg-[#0A1F44]/30" />

          {/* Play button */}
          <button
            onClick={handleLoad}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            aria-label={`Play ${title}`}
          >
            <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#C8A23D]/60 flex items-center justify-center bg-[#C8A23D]/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#C8A23D]/20 group-hover:border-[#C8A23D]">
                <Play className="h-8 w-8 text-[#C8A23D] ml-1" />
              </div>
              <p className="mt-4 text-sm text-[#FAF7F2]/50 font-body uppercase tracking-wider">
                {title}
              </p>
            </div>
          </button>
        </>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{ border: 0 }}
        />
      )}
    </div>
  );
}
