import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CSSProperties } from 'styled-components';

const ScrollSlideText = ({
  text,
  style,
  direction,
  duration = 0.5,
}: {
  text: string;
  style: CSSProperties;
  direction: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setIsScrollingDown(currentPosition > scrollPosition);
      setScrollPosition(currentPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  useEffect(() => {
    if (!textRef.current) {
      return;
    }

    const tl = gsap.timeline({ paused: true });
    tl.to(textRef.current, {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: isScrollingDown
        ? direction === 'left'
          ? -100
          : direction === 'right'
          ? 100
          : direction === 'down'
          ? 100
          : direction === 'up'
          ? -100
          : 100
        : 0,
      opacity: isScrollingDown ? 0 : 1,
      duration,
    });

    tl.play();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      tl.to(textRef.current, {
        [direction === 'left' || direction === 'right' ? 'x' : 'y']: isScrollingDown
          ? direction === 'left'
            ? -100
            : direction === 'right'
            ? 100
            : direction === 'down'
            ? 100
            : direction === 'up'
            ? -100
            : 100
          : 0,
        opacity: isScrollingDown ? 0 : 1,
        duration,
      });
    };
  }, [isScrollingDown, direction, duration]);

  return (
    <div ref={textRef} style={style}>
      {text}
    </div>
  );
};

export default ScrollSlideText;
