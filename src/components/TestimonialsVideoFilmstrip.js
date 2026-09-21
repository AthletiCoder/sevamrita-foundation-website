import React, { useEffect, useRef, useState } from 'react';
import {
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from '../modules/testimonials';
import './CSS/TestimonialsVideoFilmstrip.css';

const SCROLL_SPEED = 0.45;

function TestimonialsVideoFilmstrip({ videos = [] }) {
  const scrollerRef = useRef(null);
  const hoveringRef = useRef(false);
  const playingRef = useRef(null);
  const [playingKey, setPlayingKey] = useState(null);

  playingRef.current = playingKey;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setPlayingKey(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || videos.length === 0) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    let frameId = 0;

    const tick = () => {
      const paused = hoveringRef.current || Boolean(playingRef.current);
      if (!paused) {
        el.scrollLeft += SCROLL_SPEED;
        const loopAt = el.scrollWidth / 2;
        if (loopAt > 0 && el.scrollLeft >= loopAt) {
          el.scrollLeft -= loopAt;
        }
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [videos.length]);

  const play = (instanceKey, event) => {
    setPlayingKey(instanceKey);
    const slot = event.currentTarget.closest('.testimonial-videos__slot');
    slot?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  if (!videos.length) return null;

  const loop = [...videos, ...videos];

  return (
    <div
      className="testimonial-videos"
      onMouseEnter={() => {
        hoveringRef.current = true;
      }}
      onMouseLeave={() => {
        hoveringRef.current = false;
      }}
      onFocusCapture={() => {
        hoveringRef.current = true;
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          hoveringRef.current = false;
        }
      }}
    >
      <div
        className="testimonial-videos__scroller"
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Video testimonies"
      >
        <div className="testimonial-videos__track">
          {loop.map((video, index) => {
            const instanceKey = `${video.id}-${index}`;
            const isPlaying = playingKey === instanceKey;
            const isDuplicate = index >= videos.length;
            const thumbnail = youtubeThumbnailUrl(video.youtubeUrl);
            const embedSrc = youtubeEmbedUrl(video.youtubeUrl);

            return (
              <div
                key={instanceKey}
                className={`testimonial-videos__slot${isPlaying ? ' is-playing' : ''}`}
                data-video-id={video.id}
              >
                {isPlaying && embedSrc ? (
                  <div className="testimonial-videos__player">
                    <iframe
                      src={embedSrc}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                    <button
                      type="button"
                      className="testimonial-videos__stop"
                      onClick={() => setPlayingKey(null)}
                      aria-label={`Stop ${video.title}`}
                    >
                      <i className="fas fa-times" aria-hidden="true" />
                    </button>
                    <p className="testimonial-videos__caption">{video.title}</p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="testimonial-videos__card"
                    onClick={(event) => play(instanceKey, event)}
                    aria-label={`Play ${video.title}`}
                    tabIndex={isDuplicate ? -1 : 0}
                    disabled={!embedSrc}
                  >
                    <span className="testimonial-videos__thumb">
                      {thumbnail ? (
                        <img src={thumbnail} alt="" loading="lazy" decoding="async" />
                      ) : null}
                      <span className="testimonial-videos__play" aria-hidden="true">
                        <i className="fas fa-play" />
                      </span>
                    </span>
                    <span className="testimonial-videos__caption">{video.title}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsVideoFilmstrip;
