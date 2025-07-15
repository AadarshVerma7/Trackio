import React from 'react'
import VantaGlobe from '../../Components/VantaGlobe/VantaGlobe'
function LandingPage() {
    return (
        <div style={{ position: 'relative' }}>
            <VantaGlobe />
            <div style={{
                position: 'absolute',
                top: '35%',                 
                left: '7%',
                zIndex: 1,
                color: '#fff'

            }}>
                <h1 className='font-baloo font-medium text-6xl text-orange-500'>Learn,Compete,Grow</h1>
                <h1 className='font-baloo font-medium text-5xl mt-2.5'>All in one place</h1>
                <button className='font-mono mt-4 font-bold transform hover:scale-105 transition duration-300 ease-in-out bg-orange-500 text-white px-5 py-2 rounded-full'>
                    Start your Journey
                </button>
            </div>
        </div>

    )
}

export default LandingPage
