import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, User, LogIn, LogOut } from "lucide-react"; // ✅ Eklenen ikonlar

export default function MobileTabBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { token, logout } = useAuth(); // ✅ Giriş durumu ve çıkış fonksiyonu

  const Item = ({ to, Icon, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`flex-1 flex justify-center py-3 transition ${
        pathname === to ? "text-xblue" : "text-xtext hover:text-xblue"
      }`}
    >
      <Icon size={24} />
    </Link>
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-xborder bg-xbg">
      <div className="flex">
        {/* 🏠 Ana Sayfa */}
        <Item to="/" Icon={Home} />

        {/* 👤 Profil */}
        <Item to="/my-tweets" Icon={User} />

        {/* 🔐 Giriş veya 🚪 Çıkış */}
        {token ? (
          <Item to="#" Icon={LogOut} onClick={handleLogout} />
        ) : (
          <Item to="/login" Icon={LogIn} />
        )}
      </div>
    </div>
  );
}
