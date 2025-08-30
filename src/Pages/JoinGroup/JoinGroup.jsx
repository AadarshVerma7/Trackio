import React from 'react'

const JoinGroup = ({ close4 }) => {
  return (
    <div className="bg-white h-160 w-280 rounded-2xl border-2 border-orange-300 flex relative">

      {/* left section */}
      <div className="pl-10 pt-8 pr-6 border-r border-gray-300 flex-1">
        <h1 className="text-4xl fjalla">Join a group now!</h1>
      </div>

      {/* right section */}
      <div className="pl-6 pt-6 flex-1">
        <button
          onClick={close4}
          className="absolute top-2 right-2 text-orange-500 hover:text-orange-600 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default JoinGroup
