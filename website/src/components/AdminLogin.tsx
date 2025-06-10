import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md flex flex-col gap-5 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold text-blue-500 hover:text-blue-700">&times;</button>
        <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Forgot Password</h2>
        <p className="text-sm text-blue-800 mb-2">Enter your email address to receive password reset instructions.</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-full transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  const [ loginCred, setLoginCred ] = useState({ username: "", password: "" });
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();
  const { updateUserState } = useContext(UserContext)!;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCred(prev => ({ ...prev, [name]: value }));
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginCred)
    })
    const data = await res.json();
    if (res.ok) {
      toast.success(data.message)
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("metadata", data.encryptedData);
      await updateUserState();
      navigate("/partner-requests")
    }
    else {
      toast.error(data.message)
    }
  };
  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      <form className="w-[35vw] mt-[15vh] mx-auto shadow-2xl p-10 flex flex-col items-center rounded-2xl bg-white border border-blue-100 gap-5" onSubmit={handleLogin}>
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2 tracking-tight">Admin LogIn</h2>
        <input
          type="text"
          placeholder="Enter admin username"
          className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={loginCred.username}
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter admin password"
          className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={loginCred.password}
          name="password"
          onChange={handleChange}
        />
        <span className="text-blue-500 underline text-xs font-semibold cursor-pointer" onClick={() => setShowForgot(true)}>Forgot Password?</span>
        <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-3/5 transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
          LogIn
        </button>
      </form>
    </>
  );
}