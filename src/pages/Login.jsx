import axiosClient from "../api/axiosClient";

export default function Login() {
  const handleLogin = async () => {
    const res = await axiosClient.post("/auth/login?userNameOrEmail=eminm&password=123456");
    localStorage.setItem("token", res.data.accessToken);
    alert("Giriş başarılı ✅");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center mt-20">
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Test Login
      </button>
    </div>
  );
}
