import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn("Logout failed on server:", err);
    }

    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setUser(null);

    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-100 p-4 flex justify-between items-center">
      <h2
        className="font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        MedAI
      </h2>

      <button
        onClick={handleLogout}
        className="text-sm px-3 py-1 border rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  );
}
