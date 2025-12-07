import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import Navbar from "../components/Navbar";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    try {
      const { data } = await api.get(`/report/${id}`);
      setReport(data.report);
    } catch (err) {
      console.error("Failed to fetch report:", err);
      alert("Could not load report. Going back to dashboard.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading report...</p>;

  if (!report) return null;

  const aiSummary = report.ai_summary || {};

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="mb-3">Report Details</h2>

        <div className="card">
          <div className="card-body">
            <p>
              <strong>Report ID:</strong> {report.id}
            </p>
            <p>
              <strong>Status:</strong> {report.status}
            </p>

            <h5 className="mt-3">AI Extracted Data</h5>
            <pre>{JSON.stringify(aiSummary, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
