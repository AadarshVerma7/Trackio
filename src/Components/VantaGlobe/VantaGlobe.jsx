import { useEffect,useState,useRef } from 'react'
import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';

const VantaGlobe = () => {
  const globeRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: globeRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xff6600,
          backgroundColor: 0x223344,
        }) 
// 0x19232e
// 0x2a3e52
// 0x223344
// 0x1f3b4d
// 0x314a5f
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={globeRef} style={{ width: '100%', height: '100vh' }} />;
};

export default VantaGlobe
