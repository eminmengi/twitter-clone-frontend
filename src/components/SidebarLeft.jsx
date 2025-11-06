import { Link, useNavigate, useLocation } from "react-router-dom";

export default function SidebarLeft() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full justify-between py-6">
      <div>
        <div className="px-6 pb-6 text-3xl font-bold text-xblue">𝕏</div>

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
            onClick={handleLogout}
            className="w-full bg-xblue hover:brightness-110 text-white rounded-full py-3 font-semibold"
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
