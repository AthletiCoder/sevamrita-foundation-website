import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { HERO, animateHeroTagline } from '../../modules/deAddiction';
import './Hero.css';

gsap.registerPlugin(useGSAP);

function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      animateHeroTagline(heroRef.current);
    },
    { scope: heroRef }
  );

  return (
    <header ref={heroRef} className="da-hero" data-nav-tone="dark">
      <div className="da-hero__media" aria-hidden="true">
        <img
          src={HERO.image.src}
          alt=""
          width={HERO.image.width}
          height={HERO.image.height}
          fetchPriority="high"
          decoding="async"
          className="da-hero__image"
        />
        <div className="da-hero__veil" />
      </div>

      <div className="da-hero__content">
        <p className="da-hero__brand">{HERO.brand}</p>
        <h1 className="da-hero__title">{HERO.title}</h1>
        <p className="da-hero__tagline">
          A Pledge for{' '}
          <span className="da-hero__swap" data-hero-swap>
            Clarity
          </span>
        </p>
        <p className="da-hero__subtitle">{HERO.subtitle}</p>

        <div className="da-hero__actions">
          <a className="da-btn da-btn--primary" href={HERO.ctaPrimary.href}>
            {HERO.ctaPrimary.label}
          </a>
          <a className="da-btn da-btn--ghost" href={HERO.ctaSecondary.href}>
            {HERO.ctaSecondary.label}
          </a>
        </div>
      </div>
    </header>
  );
}

export default Hero;
