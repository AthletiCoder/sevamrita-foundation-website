import React, { useState, useEffect } from 'react';

function TypewriterTitle({ text, className, speed = 110 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let index = 0;

    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [text, speed]);

  return (
    <h1 className={className} aria-label={text}>
      {displayed}
    </h1>
  );
}

export default TypewriterTitle;
