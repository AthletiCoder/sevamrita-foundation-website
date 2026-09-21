import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  groupPostsByPlatform,
  buildCrossPlatformPlaylist,
  SOCIAL_ROTATE_MS,
} from '../modules/eventsGallery';
import SocialEmbedCard from './SocialEmbedCard';
import './CSS/SocialPresence.css';

const HISTORY_LIMIT = 10;
const RING_RADIUS = 15.5;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function resolveNextItem({ playlist, playlistIndex, history, historyOffset }) {
  if (!playlist.length) return null;

  if (historyOffset > 0) {
    if (historyOffset === 1) return playlist[playlistIndex];
    return history[history.length - historyOffset + 1] ?? null;
  }

  if (playlist.length < 2) return null;
  return playlist[(playlistIndex + 1) % playlist.length];
}

function SocialPresence() {
  const groups = useMemo(() => groupPostsByPlatform(), []);
  const playlist = useMemo(() => buildCrossPlatformPlaylist(groups), [groups]);

  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyOffset, setHistoryOffset] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerStartRef = useRef(performance.now());
  const goNextRef = useRef(() => {});

  const current = useMemo(() => {
    if (!playlist.length) return null;
    if (historyOffset > 0) {
      return history[history.length - historyOffset] ?? playlist[playlistIndex];
    }
    return playlist[playlistIndex];
  }, [playlist, playlistIndex, history, historyOffset]);

  const nextItem = useMemo(
    () => resolveNextItem({ playlist, playlistIndex, history, historyOffset }),
    [playlist, playlistIndex, history, historyOffset]
  );

  const canGoPrev = historyOffset < history.length;
  const canGoNext = playlist.length > 1 || historyOffset > 0;

  const secondsLeft = Math.max(
    0,
    Math.ceil((1 - progress) * (SOCIAL_ROTATE_MS / 1000))
  );

  const resetTimer = useCallback(() => {
    timerStartRef.current = performance.now();
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    if (!playlist.length) return;

    if (historyOffset > 0) {
      setHistoryOffset((offset) => offset - 1);
      resetTimer();
      return;
    }

    const leaving = playlist[playlistIndex];
    setHistory((prev) => [...prev, leaving].slice(-HISTORY_LIMIT));
    setPlaylistIndex((prev) => (prev + 1) % playlist.length);
    resetTimer();
  }, [playlist, playlistIndex, historyOffset, resetTimer]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setHistoryOffset((offset) => offset + 1);
    resetTimer();
  }, [canGoPrev, resetTimer]);

  goNextRef.current = goNext;

  useEffect(() => {
    if (playlist.length === 0) return undefined;

    let frameId = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (now) => {
      const elapsed = now - timerStartRef.current;
      const ratio = Math.min(1, elapsed / SOCIAL_ROTATE_MS);
      setProgress(reduced ? 1 : ratio);

      if (elapsed >= SOCIAL_ROTATE_MS) {
        goNextRef.current();
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [playlist]);

  // DNS / document prefetch for the next iframe src
  useEffect(() => {
    const src = nextItem?.post?.src;
    if (!src) return undefined;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = src;
    link.as = 'document';
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [nextItem?.post?.src]);

  if (!current) return null;

  const { post, platform, meta } = current;
  const countdownLabel =
    secondsLeft === 1 ? 'Next post in 1 second' : `Next post in ${secondsLeft} seconds`;
  const strokeOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <section
      id="social-media"
      className="social-presence"
      aria-labelledby="social-presence-title"
    >
      <div className="container-custom">
        <header className="social-presence__intro">
          <h2 id="social-presence-title" className="section-title section-title-left">
            <i className="fas fa-share-alt" aria-hidden="true" /> Presence from Social Media
          </h2>
          <p className="section-description social-presence__channels">
            Highlights from our social media channels at{' '}
            {groups.map((group, i) => (
              <React.Fragment key={group.platform}>
                {i > 0 && (i === groups.length - 1 ? ' and ' : ', ')}
                <span className="social-presence__channel" style={{ '--platform-color': group.meta.color }}>
                  <i className={group.meta.icon} aria-hidden="true" />
                  {group.meta.label}
                </span>
              </React.Fragment>
            ))}
            .
          </p>
        </header>

        <div className="social-presence__stage">
          <button
            type="button"
            className="social-presence__nav-btn social-presence__nav-btn--prev"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous post"
          >
            <i className="fas fa-chevron-left" aria-hidden="true" />
          </button>

          <article className="social-presence__slot" data-platform={platform}>
            <header className="social-presence__slot-head">
              <span
                className="social-presence__badge"
                style={{ '--platform-color': meta.color }}
              >
                <i className={meta.icon} aria-hidden="true" />
                {meta.label}
              </span>

              {playlist.length > 1 && (
                <div className="social-presence__timer-block">
                  <p className="social-presence__countdown" aria-live="polite">
                    {countdownLabel}
                  </p>
                  <div
                    className="social-presence__ring"
                    style={{ '--ring-color': meta.color }}
                    role="timer"
                    aria-label={countdownLabel}
                  >
                    <svg className="social-presence__ring-svg" viewBox="0 0 36 36" aria-hidden="true">
                      <circle
                        className="social-presence__ring-track"
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        strokeWidth="2.5"
                      />
                      <circle
                        className="social-presence__ring-progress"
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        strokeWidth="2.5"
                        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                        strokeDashoffset={strokeOffset}
                      />
                    </svg>
                    <span className="social-presence__ring-count">
                      {secondsLeft}
                    </span>
                  </div>
                </div>
              )}
            </header>

            <div className="social-presence__frame" key={post.id}>
              <SocialEmbedCard post={post} hideFallback />
            </div>

            <a
              className="social-presence__title"
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.title}
              <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          </article>

          <button
            type="button"
            className="social-presence__nav-btn social-presence__nav-btn--next"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next post"
          >
            <i className="fas fa-chevron-right" aria-hidden="true" />
          </button>
        </div>

        {/* Warm the next embed off-screen so the swap feels instant */}
        {nextItem?.post && nextItem.post.id !== post.id && (
          <div className="social-presence__prefetch" aria-hidden="true">
            <SocialEmbedCard post={nextItem.post} hideFallback />
          </div>
        )}
      </div>
    </section>
  );
}

export default SocialPresence;
