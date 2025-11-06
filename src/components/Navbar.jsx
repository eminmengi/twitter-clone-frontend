import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white w-full shadow-md fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6 py-3">
        <Link to="/" className="text-xl font-bold">
          Twitter Clone
        </Link>
        <div className="flex gap-6">
          {!token ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/my-tweets" className="hover:underline">
                My Tweets
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
