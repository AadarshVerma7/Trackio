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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-[#1E2635] text-white p-6 rounded-2xl w-[500px] shadow-lg relative max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Group Resources</h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : resources.length === 0 ? (
          <p className="text-gray-400 text-center">No resources added yet.</p>
        ) : (
          <ul className="space-y-3">
            {resources.map((res, index) => (
              <li
                key={index}
                className="p-3 rounded-lg bg-gray-800 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{res.title}</p>
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm"
                  >
                    {res.link}
                  </a>
                  <p className="text-xs text-gray-400 mt-1">
                    Added by: {res.addedBy?.name || "Unknown"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewResourcesModal;
