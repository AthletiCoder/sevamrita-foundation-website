import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  CONTACT_INFO,
  copyPhoneNumber,
  prefersReducedMotion,
} from '../modules/contact';

const ACTIONS = [
  { key: 'copy', label: 'Copy', icon: 'fas fa-copy' },
  { key: 'dial', label: 'Dial', icon: 'fas fa-phone' },
  { key: 'whatsapp', label: 'WhatsApp', icon: 'fab fa-whatsapp' },
];

function ContactPhoneChannel() {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef([]);
  const tweenRef = useRef(null);
  const closeTimerRef = useRef(null);
  const hasMountedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openPanel = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }, []);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    const panel = panelRef.current;
    const items = itemsRef.current.filter(Boolean);
    if (!panel) return undefined;

    tweenRef.current?.kill();

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      gsap.set(panel, { display: 'none', autoAlpha: 0, y: 10, scale: 0.92 });
      gsap.set(items, { autoAlpha: 0, y: 8, scale: 0.85 });
      return undefined;
    }

    if (prefersReducedMotion()) {
      gsap.set(panel, {
        display: open ? 'flex' : 'none',
        autoAlpha: open ? 1 : 0,
        y: 0,
        scale: 1,
      });
      gsap.set(items, { autoAlpha: open ? 1 : 0, y: 0, scale: 1 });
      return undefined;
    }

    if (open) {
      gsap.set(panel, { display: 'flex' });
      tweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          panel,
          { autoAlpha: 0, y: 10, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 }
        )
        .fromTo(
          items,
          { autoAlpha: 0, y: 8, scale: 0.85 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, stagger: 0.05 },
          '-=0.14'
        );
    } else {
      tweenRef.current = gsap
        .timeline({
          defaults: { ease: 'power2.in' },
          onComplete: () => {
            gsap.set(panel, { display: 'none' });
          },
        })
        .to(items, {
          autoAlpha: 0,
          y: 6,
          scale: 0.9,
          duration: 0.14,
          stagger: { each: 0.03, from: 'end' },
        })
        .to(
          panel,
          { autoAlpha: 0, y: 8, scale: 0.94, duration: 0.18 },
          '-=0.06'
        );
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [open]);

  const handleCopy = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const ok = await copyPhoneNumber(CONTACT_INFO.phone);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      ref={rootRef}
      className={`contact-phone${open ? ' is-open' : ''}`}
      onMouseEnter={openPanel}
      onMouseLeave={scheduleClose}
      onFocusCapture={openPanel}
      onBlurCapture={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget)) {
          scheduleClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className="contact-phone-actions"
        role="group"
        aria-label="Phone actions"
        aria-hidden={!open}
        style={{ display: 'none' }}
      >
        {ACTIONS.map((action, index) => {
          const label =
            action.key === 'copy' && copied ? 'Copied!' : action.label;
          const className = `contact-phone-action contact-phone-action--${action.key}${
            action.key === 'copy' && copied ? ' is-copied' : ''
          }`;
          const setItemRef = (el) => {
            itemsRef.current[index] = el;
          };

          if (action.key === 'dial') {
            return (
              <a
                key={action.key}
                ref={setItemRef}
                className={className}
                href={CONTACT_INFO.phoneHref}
                tabIndex={open ? 0 : -1}
                aria-label={`Dial ${CONTACT_INFO.phone}`}
              >
                <i className={action.icon} aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          }

          if (action.key === 'whatsapp') {
            return (
              <a
                key={action.key}
                ref={setItemRef}
                className={className}
                href={CONTACT_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                aria-label={`WhatsApp ${CONTACT_INFO.phone}`}
              >
                <i className={action.icon} aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          }

          return (
            <button
              key={action.key}
              ref={setItemRef}
              type="button"
              className={className}
              tabIndex={open ? 0 : -1}
              aria-label={`Copy ${CONTACT_INFO.phone}`}
              onClick={handleCopy}
            >
              <i
                className={copied ? 'fas fa-check' : action.icon}
                aria-hidden="true"
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="contact-channel contact-phone-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="contact-channel-icon" aria-hidden="true">
          <i className="fas fa-phone" />
        </span>
        <span className="contact-channel-body">
          <span className="contact-channel-label">Phone</span>
          <span className="contact-channel-value">{CONTACT_INFO.phone}</span>
        </span>
        <span className="contact-phone-hint" aria-hidden="true">
          <i className="fas fa-ellipsis-h" />
        </span>
      </button>
    </div>
  );
}

export default ContactPhoneChannel;
