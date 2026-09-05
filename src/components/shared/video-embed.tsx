'use client';

import { useState, useCallback } from 'react';
import { Play, X } from 'lucide-react';
import { urlFor } from '../../../sanity/lib/client';

interface VideoEmbedProps {
  src: string;
  title?: string;
  posterUrl?: string;
  posterAsset?: unknown;
}

export function VideoEmbed({ src, title = 'Featured Film', posterUrl, posterAsset }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsLoaded(false);
  }, []);

  if (!src) {
    return null;
  }

  const isVimeo = src.includes('vimeo.com') || src.includes('player.vimeo.com');
  const isYoutube = src.includes('youtube.com') || src.includes('youtu.be');

  const vimeoId = isVimeo ? src.match(/(\d+)/)?.[1] || '' : '';
  const embedUrl = isVimeo
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`
    : isYoutube
    ? src.replace('watch?v=', 'embed/').split('&')[0] + '?autoplay=1&rel=0'
    : src;

  const resolvedPoster = posterAsset
    ? urlFor(posterAsset).width(1200).height(675).fit('crop').url()
    : posterUrl;

  return (
    <div className="relative aspect-video bg-[#06112A] overflow-hidden group">
      {!isLoaded ? (
        <>
          {resolvedPoster && (
            <img
              src={resolvedPoster}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-[#0A1F44]/40 group-hover:bg-[#0A1F44]/50 transition-colors duration-500" />

          <button
            onClick={handleLoad}
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
            aria-label={`Play ${title}`}
          >
            <div className="text-center transform transition-all duration-300 group-hover:scale-110">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-[#C8A23D]/70 flex items-center justify-center bg-[#C8A23D]/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#C8A23D]/25 group-hover:border-[#C8A23D] group-hover:shadow-lg group-hover:shadow-[#C8A23D]/20">
                <Play className="h-8 w-8 text-[#C8A23D] ml-1 fill-[#C8A23D]/30" />
              </div>
              <p className="mt-4 text-sm text-[#FAF7F2]/70 font-body uppercase tracking-wider group-hover:text-[#FAF7F2] transition-colors">
                {title}
              </p>
            </div>
          </button>
        </>
      ) : (
        <>
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ border: 0 }}
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0A1F44]/80 flex items-center justify-center text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-[#0A1F44] transition-colors"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
