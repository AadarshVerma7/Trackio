import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

const AddResourceModal = ({ onClose, groupId, onAddResource }) => {
  const { backendUrl } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !file) return toast.error("Please upload a PDF");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("groupId", groupId);
      formData.append("file", file);

      const res = await fetch(`${backendUrl}/api/resources/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to add resource");
        return;
      }

      onAddResource(data.data);
      onClose();
    } catch (err) {
      console.error("Add Resource Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-black/60 z-50">
      <div className="bg-[#1b1b1b] text-white p-7 rounded-3xl w-[430px] shadow-2xl relative border border-orange-600/40">

        {/* BIG CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-300 hover:text-white text-4xl leading-none cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-orange-400 text-center">
          Upload PDF Resource
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <input
            type="text"
            placeholder="Title of the PDF"
            className="w-full p-3 rounded-xl bg-[#2a2a2a] border border-orange-600/30 outline-none focus:border-orange-500 duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* FILE UPLOAD BOX - BIGGER & MODERN */}
          <label className="block">
            <span className="text-sm text-gray-300 mb-2 block">Upload PDF</span>

            <div className="w-full cursor-pointer p-5 rounded-xl border-2 border-dashed border-orange-500/60 bg-[#2a2a2a] hover:bg-[#333] transition text-center">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                id="pdfInput"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label htmlFor="pdfInput" className="cursor-pointer flex flex-col items-center">
                <i className="fa-solid fa-file-pdf text-4xl text-orange-500 mb-2"></i>
                <span className="text-gray-300">
                  {file ? file.name : "Choose PDF File"}
                </span>
              </label>
            </div>
          </label>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-xl font-semibold text-lg transition cursor-pointer"
          >
            {loading ? "Uploading..." : "Add Resource"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;
