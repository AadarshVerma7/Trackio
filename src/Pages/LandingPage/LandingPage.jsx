import React from 'react'
import VantaGlobe from '../../Components/VantaGlobe/VantaGlobe'
function LandingPage() {
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
                        <div className='font-baloo font-medium text-7xl text-orange-500'>
                        Learn,
                        </div>
                        <div>
                            <h1 className='font-baloo text-white font-medium text-8xl transition-all duration-300  hover:scale-90'>
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
                        <div className='text-orange-500 text-6xl transition-all duration-300  hover:scale-90'>
                            in one
                        </div>
                        place
                    </div>
                </h1>
                <button className='mt-7.5 text-xl font-semibold px-7 py-3.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(255,102,0,0.4)] transition-all duration-300 ease-in-out active:scale-95 backdrop-blur-md'>
                    Start Now
                </button>
            </div>
        </div>
        // </div >

    )
}


export default LandingPage
