import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../api/axiosClient";

const ReportsDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/report");
      setReports(data.reports || []);
    } catch (err) {
      console.error("Failed to fetch reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Auto refresh every 5 seconds for status updates
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-5">Loading reports...</p>;

  return (
    <div className="">
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold">Welcome, {user?.email}</h1>
        <h2 className="mb-3">Uploaded Reports</h2>

        {reports.length === 0 && <p>No reports uploaded yet.</p>}

        <div className="list-group">
          {reports.map((report) => (
            <button
              key={report.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => navigate(`/report/${report.id}`)}
            >
              <div>
                <strong>{report.fileName}</strong>
                <div className="small text-muted">
                  Uploaded: {new Date(report.created_at).toLocaleString()}
                </div>
              </div>
              {report.status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
