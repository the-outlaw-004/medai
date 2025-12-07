import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosClient";

export default function UploadReport() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(e.target.files[0].type)) {
      alert("Invalid file type");
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file first");

    const formData = new FormData();
    formData.append("report", file);

    setUploading(true);

    try {
      const res = await api.post("/report/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response", res);

      alert("Upload successful! Processing started...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Upload failed", err);
      alert(err.response?.data?.error || err.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">Upload Medical Report</h2>

        <input
          type="file"
          accept=".pdf,image/png,image/jpeg"
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          disabled={uploading}
          onClick={handleUpload}
          className={`px-4 py-2 rounded bg-blue-500 text-white ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        <p className="text-sm mt-4 text-gray-600">Allowed: PDF, PNG, JPEG</p>
      </div>
    </>
  );
}
