import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold">Welcome, {user?.email}</h1>
        <p className="mt-2">You are logged in!</p>
      </div>
    </div>
  );
}
