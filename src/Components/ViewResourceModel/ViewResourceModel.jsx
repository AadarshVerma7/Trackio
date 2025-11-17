import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { toast } from "react-toastify";

const ViewResourcesModal = ({ onClose, groupId }) => {
  const { backendUrl } = useContext(AppContext);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/resources/${groupId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Error fetching resources:", data?.message);
          toast.error(data?.message || "Failed to fetch resources");
          return;
        }

        setResources(data.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (groupId) fetchResources();
  }, [backendUrl, groupId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
      <div className="bg-[#1C1A17] text-white p-6 rounded-2xl w-[520px] shadow-2xl relative max-h-[80vh] overflow-y-auto border border-orange-500/30">

        {/* Bigger Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-orange-400 hover:text-white text-3xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-5 text-orange-400 text-center">
          Group Resources
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : resources.length === 0 ? (
          <p className="text-gray-400 text-center">No resources added yet.</p>
        ) : (
          <div className="space-y-4">
            {resources.map((res, index) => (
              <div
                key={index}
                className="bg-[#2A2621] p-4 rounded-xl shadow-lg border border-orange-500/20"
              >
                {/* Title */}
                <p className="text-lg font-semibold text-orange-300">
                  {res.title}
                </p>

                {/* PDF Preview */}
                <div className="mt-3 bg-black/40 p-3 rounded-lg border border-orange-500/20">
                  <embed
                    src={res.link}
                    type="application/pdf"
                    className="w-full h-64 rounded-lg"
                  />

                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center bg-orange-500 hover:bg-orange-600 py-2 rounded-lg font-semibold transition-all"
                  >
                    Open Full PDF
                  </a>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Added by: {res.addedBy?.name || "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewResourcesModal;
