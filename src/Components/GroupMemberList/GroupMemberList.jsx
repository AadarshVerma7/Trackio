import React from 'react'
import OrangeBG from '../../assets/OrangeBG.png'

const GroupMemberList = () => {
  return (
    <div className="bg-white p-4 rounded-2xl w-80 flex flex-col justify-between">
      <div
        className="rounded-2xl flex justify-center items-center h-16 mb-4"
        style={{
          backgroundImage: `url(${OrangeBG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="fjalla text-white text-2xl">Group Name</h1>
      </div>

      <div className="flex flex-col gap-3 bg-gray-100 p-3 rounded-2xl shadow-inner flex-grow">
        {['Member 1', 'Member 2', 'Member 3', 'Member 4'].map((member, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-gray-300 p-3 rounded-xl shadow-sm"
          >
            <div className="bg-orange-500 p-2 rounded-full text-white">
            </div>
            <p className="fjalla text-gray-800">{member}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="bg-gray-300 hover:bg-gray-400 p-3 rounded-lg">
        </button>
      </div>
    </div>
  )
}

export default GroupMemberList
