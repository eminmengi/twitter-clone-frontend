import { Link, useLocation } from "react-router-dom";

export default function MobileTabBar() {
  const { pathname } = useLocation();

  const Item = ({ to, label }) => (
    <Link
      to={to}
      className={`flex-1 text-center py-3 ${
        pathname === to ? "text-xblue font-semibold" : "text-xtext"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-xborder bg-xbg">
      <div className="flex">
        <Item to="/" label="Ana" />
        <Item to="/my-tweets" label="Profil" />
        <Item to="/login" label="Giriş" />
      </div>
    </div>
  );
}
