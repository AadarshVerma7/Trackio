import { useEffect, useRef, useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = containerRect.top;
      const elementHeight = containerRect.height;
      let visiblePercentage;
      
      if (orientation === 'vertical') {
        visiblePercentage = Math.min(1, Math.max(0, (windowHeight - elementTop) / (windowHeight + elementHeight)));
      } else {
        visiblePercentage = Math.min(1, Math.max(0, (windowHeight - elementTop) / (windowHeight + elementHeight)));
      }
      path.style.strokeDashoffset = pathLength - (pathLength * visiblePercentage);
      setIsVisible(visiblePercentage > 0 && visiblePercentage < 1);
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
      className={`${className} transition-opacity duration-300`}
      style={style}
    >
      <svg 
        viewBox={viewBox} 
        preserveAspectRatio="none"
        width=""
        height=""
      >
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