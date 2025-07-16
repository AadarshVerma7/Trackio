import React from 'react'
import VantaGlobe from '../../Components/VantaGlobe/VantaGlobe'
import './LandingPage.css'
import { useState, useEffect } from 'react'
function LandingPage() {

    const [showGlow, setShowGlow] = useState(false);
    useEffect(() => {
        const showTimer = setTimeout(() => setShowGlow(true), 3000);
        const hideTimer = setTimeout(() => setShowGlow(false), 6000);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        }
    }, [])

    return (
        <div style={{ position: 'relative' }}>
            <VantaGlobe />
            <div style={{
                position: 'absolute',
                top: '31%',
                left: '5%',
                zIndex: 1,
                color: '#fff'

            }}>
                <h1>
                    <div className='flex items-baseline'>
                        <div className='font-baloo font-medium text-6xl text-orange-500'>
                            Learn,
                        </div>
                        <div>
                            <h1 className='font-baloo text-white font-medium text-8xl transition-all duration-300  '>
                                Compete
                            </h1>
                        </div>
                        <div className='font-baloo font-medium text-7xl text-orange-500'>
                            ,Grow
                        </div>
                    </div>
                </h1>
            </div>
            <div style={
                {
                    position: 'absolute',
                    zIndex: 1,
                    top: '43%',
                    left: '5%',
                }
            }>
                <h1 className='font-baloo text-white font-medium text-5xl mt-2.5'>
                    <div className='flex gap-2.5 items-baseline'>
                        All
                        <div className='text-orange-500 text-6xl transition-all duration-300  '>
                            in one
                        </div>
                        place
                    </div>
                </h1>
                <div className="glow-wrapper relative inline-block rounded-[22px] p-[2px] mt-10">
                    <button className="relative z-10 w-full text-white text-xl font-semibold px-7 py-3.5 rounded-[20px] bg-orange-500 hover:bg-orange-600 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(255,102,0,0.4)] transition-all duration-300 ease-in-out active:scale-95 cursor-pointer">
                        Start Now
                    </button>
                    <span className={`glow-border pointer-events-none absolute inset-0 rounded-[20px] z-0 ${showGlow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}></span>
                </div>

            </div>
        </div>
    )
}


export default LandingPage