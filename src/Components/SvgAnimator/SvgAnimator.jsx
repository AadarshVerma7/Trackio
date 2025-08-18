import { useEffect, useRef } from 'react';

const SvgAnimator = ({
  pathData,
  stroke,
  strokeWidth,
  className,
  style,
  viewBox,
  orientation,
}) => {
  const pathRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      if (!containerRef.current || !pathRef.current) return;

      const path = pathRef.current;
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = containerRect.top;
      const elementHeight = containerRect.height;

      const pathLength = path.getTotalLength();

      let scrollFraction = (windowHeight - elementTop) / (windowHeight + elementHeight);
      let visiblePercentage = Math.min(1, Math.max(0, scrollFraction * 1.6));

      path.style.strokeDashoffset = pathLength - pathLength * visiblePercentage;

      containerRef.current.style.opacity = window.scrollY === 0 ? 0 : 1;
    };

    const debouncedScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', debouncedScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [pathData, orientation]);

  return (
    <div
      ref={containerRef}
      className={`${className} transition-opacity duration-500`}
      style={{ ...style, opacity: 0 }} // start hidden
    >
      <svg viewBox={viewBox} preserveAspectRatio="none" width="" height="">
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SvgAnimator;
