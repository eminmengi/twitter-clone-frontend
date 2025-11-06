import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLeft from "./components/SidebarLeft";
import SidebarRight from "./components/SidebarRight";
import MobileTabBar from "./components/MobileTabBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTweets from "./pages/MyTweets";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ eklendi

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-xbg text-xtext">
        {/* 3 kolonlu yapı */}
        <div className="max-w-7xl mx-auto grid grid-cols-12">
          {/* Sol Menü */}
          <aside className="hidden md:block col-span-3 border-r border-xborder sticky top-0 h-screen">
            <SidebarLeft />
          </aside>

          {/* Orta Timeline */}
          <main className="col-span-12 md:col-span-6 border-x border-xborder min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🔒 Korumalı rota */}
              <Route
                path="/my-tweets"
                element={
                  <ProtectedRoute>
                    <MyTweets />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* Sağ Panel */}
          <aside className="hidden xl:block col-span-3 px-4 py-3">
            <SidebarRight />
          </aside>
        </div>

        {/* Mobil alt menü */}
        <MobileTabBar />
      </div>
    </Router>
  );
}
