import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Twitter } from "lucide-react"; // ✅ Lucide'den ikon import edildi

export default function SidebarLeft() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth(); // ✅ token & logout

  const navItem = (to, label) => (
    <Link
      key={to}
      to={to}
      className={`flex items-center gap-3 px-5 py-3 rounded-full text-lg transition hover:bg-[#16181c] ${
        pathname === to ? "font-bold text-xblue" : "text-xtext"
      }`}
    >
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="flex flex-col h-full justify-between py-6">
      <div>
        {/* 🔹 Lucide Twitter ikonu */}
        <div className="px-6 pb-6">
          <Twitter size={34} className="text-white hover:text-xblue transition" />
        </div>

        <nav className="flex flex-col space-y-2">
          {navItem("/", "Ana Sayfa")}
          {navItem("/my-tweets", "Profil")}
          {!token && navItem("/login", "Giriş")}
          {!token && navItem("/register", "Kayıt")}
        </nav>
      </div>

      {token && (
        <div className="px-6">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="w-full bg-xblue hover:brightness-110 text-white rounded-full py-3 font-semibold"
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
