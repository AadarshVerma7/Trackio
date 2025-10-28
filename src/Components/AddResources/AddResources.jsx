import React from "react";
import viewResources from "../../assets/viewResources.svg";
import addResources from "../../assets/addResources.svg";
function AddResources() {
  return (
    <div className="flex justify-between mx-5 bg-white p-5 rounded-xl px-20">
      <div className="flex flex-col items-center justify-center cursor-pointer bg-gray-200 px-40 py-2 rounded-2xl">
        <img src={addResources} alt="Add Resources" className="w-15" />
        <p className="fjalla">Add Resources</p>
      </div>
      <div className="flex flex-col items-center justify-center cursor-pointer bg-gray-200 px-40 py-2 rounded-2xl">
        <img src={viewResources} alt="View Resources" className="w-15" />
        <p className="fjalla">View Resources</p>
      </div>
    </div>
  );
}

export default AddResources;
