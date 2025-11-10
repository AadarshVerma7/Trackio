import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

const AddResourceModal = ({ onClose, groupId, onAddResource }) => {
  const { backendUrl } = useContext(AppContext);
  const [resourceType, setResourceType] = useState("link");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (resourceType === "link" && (!title || !link))
    return toast.error("Please fill all fields");
  if (resourceType === "pdf" && (!title || !file))
    return toast.error("Please upload a PDF");

  setLoading(true);

  try {
    let res;

    if (resourceType === "pdf") {
      // multipart/form-data for file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("groupId", groupId);
      formData.append("description", ""); // optional
      formData.append("file", file);

      res = await fetch(`${backendUrl}/api/resources/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
    } else {
      // JSON body for link resources
      const body = {
        title,
        link,
        groupId,
      };

      res = await fetch(`${backendUrl}/api/resources/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
    }

    const data = await res.json();

    if (!res.ok) {
      console.error("Error adding resource:", data?.message);
      toast.error(data?.message || "Failed to add resource");
      return;
    }
    onAddResource(data.data);
    onClose();
  } catch (err) {
    console.error("Error adding resource:", err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1E2635] text-white p-6 rounded-2xl w-[400px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Add Resource</h2>

        <div className="mb-4 flex gap-4">
          <button
            onClick={() => setResourceType("link")}
            className={`px-4 py-2 rounded-lg ${
              resourceType === "link" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            Link
          </button>
          <button
            onClick={() => setResourceType("pdf")}
            className={`px-4 py-2 rounded-lg ${
              resourceType === "pdf" ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            PDF
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter title"
            className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {resourceType === "link" ? (
            <input
              type="text"
              placeholder="Enter link"
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 outline-none"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          ) : (
            <input
              type="file"
              accept="application/pdf"
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-600 outline-none"
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
          >
            {loading ? "Adding..." : "Add Resource"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResourceModal;
