import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ context'ten al
  const [f, setF] = useState({ userNameOrEmail: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    // Backend login endpoint'i query param ile çalışıyor
    const url = `/auth/login?userNameOrEmail=${f.userNameOrEmail}&password=${f.password}`;
    const res = await axiosClient.post(url);

    // ✅ token'ı context ile kaydet → user bilgisi otomatik çözülecek
    login(res.data.accessToken);

    navigate("/my-tweets");
  };

  return (
    <div className="max-w-md mx-auto pt-16">
      <div className="bg-[#16181c] rounded-2xl p-6 border border-xborder">
        <h1 className="text-2xl font-bold mb-6">Giriş yap</h1>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full bg-transparent border border-xborder rounded px-3 py-2 outline-none focus:border-xblue"
            placeholder="Kullanıcı adı veya e-posta"
            value={f.userNameOrEmail}
            onChange={(e) => setF({ ...f, userNameOrEmail: e.target.value })}
          />
          <input
            type="password"
            className="w-full bg-transparent border border-xborder rounded px-3 py-2 outline-none focus:border-xblue"
            placeholder="Şifre"
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
          />
          <button className="w-full bg-xblue hover:brightness-110 text-white rounded-full py-2 font-semibold">
            Giriş yap
          </button>
        </form>
      </div>
    </div>
  );
}
