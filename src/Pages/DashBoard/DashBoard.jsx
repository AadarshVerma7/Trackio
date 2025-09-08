import React from 'react'
import Footer from '../../Components/Footer/Footer'
import { useState } from 'react';
import ContributionGraph from './StreakCalendar';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import sourceData from './sourceData.json';

function DashBoard({theme}) {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }
    return (
        <div className="grid grid-cols-[20%_80%] grid-rows-[auto_1fr] gap-4 h-screen p-6 my-5">

            {/* Left side */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg shadow-white/10 row-span-3 rounded-xl">
                <div className='flex flex-col gap-5 justify-center items-center m-10'>
                    {/*Avatar Image */}
                    <div className='w-42 h-42 rounded-full'>
                        <img src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" alt="Avatar Image" />
                    </div>
                    {/*name */}
                    <div className='w-40 h-10 text-center font-bold text-xl lily'>
                        <p className='text-2xl'>Aayush Vats</p>
                    </div>
                    {/*Edit Profile*/}
                    <div className='w-42 h-10 text-center items-center roboto text-xl'>
                        <button className='w-full h-full bg-orange-400 text-white rounded-lg font-semibold shadow-md hover:bg-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                            Edit Profile
                        </button>
                    </div>
                </div>
                <hr className='border-t-2 border-gray-600 w-65 mx-auto' />
                <div className='flex justify-center items-center'>
                    <p className='text-3xl font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent'>Stats</p>
                </div>
                <div className='flex flex-col px-2'>
                    <div className="flex flex-col h-[32vh] w-[15vw]">
                        {/* Sidebar */}
                        <div className="flex flex-col mt-2 ">
                            <div className="h-[5vh] mx-4 my-1.5 flex items-center gap-2.5">
                                <i className='fas fa-users text-xl'></i>
                                Groups : 3
                            </div>
                            <div className="h-[5vh] mx-5 my-1.5 flex items-center gap-4">
                                <i className='fas fa-clipboard-list text-xl'></i>
                                Quizes : 12
                            </div>
                            <div className="h-[5vh] mx-4 my-1.5 flex items-center gap-3">
                                <i className='fas fa-trophy text-xl'></i>
                                Points : 123
                            </div>
                            <div className="h-[5vh] mx-5 my-1.5 flex items-center gap-4">
                                <i className='fas fa-award text-xl'></i>
                                Rank : 12
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-around'>
                        <div>
                            <button className='bg-red-500 text-white px-6 py-1 rounded-lg shadow hover:bg-red-600 transition-all duration-300 font-semibold cursor-pointer'>
                                Logout
                            </button>
                        </div>
                        <div>
                            <button className='bg-blue-500 text-white font-semibold px-6 py-1 rounded-lg shadow hover:bg-blue-600 transition-all duration-300 cursor-pointer'>
                                Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right side - row 2 */}
            <div className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg shadow-white/10 rounded-2xl">
                <ContributionGraph darkMode={theme}/>
            </div>

            {/* Right side - row 3 split into 2 columns */}
            <div className="row-span-2 grid grid-cols-2 gap-4">

                {/* 1. "Div 4" is now full-width and uses flexbox to center its content. */}
                <div className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg shadow-white/10  rounded-xl w-full h-full flex justify-center items-center p-4">

                    {/* 2. A new wrapper div to control the chart's actual size. */}
                    <div className="w-[450px] h-[350px]">
                        <Doughnut
                            data={{
                                labels: sourceData.map((data) => data.label),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: sourceData.map((data) => data.value),
                                        backgroundColor: [
                                            "rgba(249, 115, 22, 0.9)",
                                            "rgba(229, 231, 235, 0.7)",
                                        ],
                                        cutout: '60%',
                                        borderRadius: 5,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false, // Allows chart to fill the new wrapper
                                plugins: {
                                    legend: {
                                        position: 'right',
                                    },
                                },
                                radius: '100%', // Corrected to fit within its container
                            }}
                        />
                    </div>
                </div>
                <div className="bg-black/20 backdrop-blur-md border border-white/10 shadow-lg shadow-white/10    rounded-xl shadow-md p-1 flex flex-col items-center gap-2">
                    <div className='text-2xl font-semibold m-2 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent underline'>View Group Details</div>
                    <div className='flex m-2 items-center w-full px-5 py-2'>
                        {/*Search Bar */}
                        <div className='relative w-2/3 h-[6vh]'>
                            {!inputValue && (<div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                    fill="black"
                                >
                                    <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                                </svg>
                            </div>
                            )}

                            <input
                                type="text"
                                className='border rounded-lg w-2/3 h-full pl-10 pr-4'
                                placeholder='Search Groups'
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </div>
                        <select className='border px-5 py-1 rounded-lg'>
                            <option value="Member">Member</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <div className='flex flex-wrap gap-10 ml-5'>
                        <div className='border p-8 rounded-lg shadow hover:bg-orange-50 tranistion-all duration-300'>React Group</div>
                        <div className='border p-8 rounded-lg shadow hover:bg-orange-50 tranistion-all duration-300'>HTML Group</div>
                        <div className='border p-8 rounded-lg shadow hover:bg-orange-50 tranistion-all duration-300'>CSS Group</div>
                        <div className='border p-8 rounded-lg shadow hover:bg-orange-50 tranistion-all duration-300'>JavaScript Group</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard