import React, { useState } from "react";
import { FaCamera, FaUpload, FaEdit } from "react-icons/fa";

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8">
      {/* Left: Profile Image + Upload */}
      <div className="flex flex-col items-center gap-6 w-full md:w-1/3">
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />
          <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700 transition">
            <FaCamera />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:border-purple-600 cursor-pointer transition">
            <FaUpload className="mx-auto text-purple-600 mb-2" />
            <p className="font-semibold text-sm">LOGO</p>
          </div>
        </div>
      </div>

      {/* Right: User Info */}
      <div className="w-full md:w-2/3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">Name:</label>
            <input
              type="text"
              defaultValue="User name"
              disabled={!isEditing}
              className={`w-full border rounded-xl px-4 py-2 focus:outline-none ${
                isEditing ? "border-purple-500" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">Email:</label>
            <input
              type="email"
              defaultValue="mi@xpaytech.co"
              disabled={!isEditing}
              className={`w-full border rounded-xl px-4 py-2 focus:outline-none ${
                isEditing ? "border-purple-500" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">Phone Number:</label>
            <input
              type="text"
              defaultValue="+20-01274318900"
              disabled={!isEditing}
              className={`w-full border rounded-xl px-4 py-2 focus:outline-none ${
                isEditing ? "border-purple-500" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 font-medium">Address:</label>
            <input
              type="text"
              defaultValue="285 N Broad St, Elizabeth, NJ 07208, USA"
              disabled={!isEditing}
              className={`w-full border rounded-xl px-4 py-2 focus:outline-none ${
                isEditing ? "border-purple-500" : "border-gray-300 bg-gray-100"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
              >
                SAVE
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition"
              >
                CANCEL
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 border border-purple-600 text-purple-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-50 transition"
            >
              <FaEdit /> EDIT PROFILE
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;