import React, { useEffect, useRef } from 'react';

function ensureXWidgetsScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.twttr?.widgets) return Promise.resolve(window.twttr);

  const existing = document.querySelector('script[data-sevamrita-x-widgets]');
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener('load', () => resolve(window.twttr), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://platform.x.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    script.dataset.sevamritaXWidgets = 'true';
    script.onload = () => resolve(window.twttr);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function ensureInstagramEmbedScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.instgrm?.Embeds) return Promise.resolve(window.instgrm);

  const existing = document.querySelector('script[data-sevamrita-ig-embed]');
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener('load', () => resolve(window.instgrm), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.dataset.sevamritaIgEmbed = 'true';
    script.onload = () => resolve(window.instgrm);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function TweetEmbed({ post, hideFallback = false }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    ensureXWidgetsScript()
      .then((twttr) => {
        if (cancelled || !ref.current || !twttr?.widgets) return;
        ref.current.innerHTML = '';
        twttr.widgets.createTweet(post.href.split('/').pop().split('?')[0], ref.current, {
          conversation: 'none',
          dnt: true,
        });
      })
      .catch(() => {
        /* fallback link rendered below */
      });

    return () => {
      cancelled = true;
    };
  }, [post.href]);

  return (
    <div className="social-embed social-embed--tweet">
      <div ref={ref} className="social-embed__tweet-host" />
      {!hideFallback && (
        <a
          className="social-embed__fallback"
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {post.text || 'View on X'}
          {post.handle ? ` — ${post.handle}` : ''}
        </a>
      )}
    </div>
  );
}

function InstagramEmbed({ post, hideFallback = false }) {
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;

    ensureInstagramEmbedScript()
      .then((instgrm) => {
        if (cancelled || !instgrm?.Embeds) return;
        instgrm.Embeds.process();
      })
      .catch(() => {
        /* fallback link rendered below */
      });

    return () => {
      cancelled = true;
    };
  }, [post.href]);

  return (
    <div className="social-embed social-embed--instagram" ref={ref}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={post.href}
        data-instgrm-version="14"
      />
      {!hideFallback && (
        <a
          className="social-embed__fallback"
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Instagram
        </a>
      )}
    </div>
  );
}

function IframeEmbed({ post }) {
  const title = post.title || `${post.platform} embed`;
  const allow =
    post.platform === 'facebook'
      ? 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
      : 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

  return (
    <div className="social-embed social-embed--iframe">
      <iframe
        src={post.src}
        title={title}
        width={post.width || 560}
        height={post.height || 315}
        loading="lazy"
        allow={allow}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function SocialEmbedCard({ post, hideFallback = false }) {
  if (!post) return null;
  if (post.type === 'tweet' || (post.platform === 'x' && !post.src)) {
    return <TweetEmbed post={post} hideFallback={hideFallback} />;
  }
  if (post.type === 'instagram' || post.platform === 'instagram') {
    return <InstagramEmbed post={post} hideFallback={hideFallback} />;
  }
  return <IframeEmbed post={post} />;
}

export default SocialEmbedCard;
