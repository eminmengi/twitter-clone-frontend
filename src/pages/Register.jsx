import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

/** Koyu tema register formu */
export default function Register() {
  const navigate = useNavigate();
  const [f, setF] = useState({ userName: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/register", f);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Kayıt başarısız");
    }
  };

  return (
    <div className="max-w-md mx-auto pt-16">
      <div className="bg-[#16181c] rounded-2xl p-6 border border-xborder">
        <h1 className="text-2xl font-bold mb-6">Kayıt ol</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full bg-transparent border border-xborder rounded px-3 py-2 outline-none focus:border-xblue"
            placeholder="Kullanıcı adı"
            value={f.userName}
            onChange={(e) => setF({ ...f, userName: e.target.value })}
          />
          <input
            type="email"
            className="w-full bg-transparent border border-xborder rounded px-3 py-2 outline-none focus:border-xblue"
            placeholder="E-posta"
            value={f.email}
            onChange={(e) => setF({ ...f, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full bg-transparent border border-xborder rounded px-3 py-2 outline-none focus:border-xblue"
            placeholder="Şifre"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
          />
          <button className="w-full bg-xblue hover:brightness-110 text-white rounded-full py-2 font-semibold">
            Kayıt ol
          </button>
        </form>
      </div>
    </div>
  );
}
