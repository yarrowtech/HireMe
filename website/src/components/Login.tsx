import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [companyCode, setCompanyCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username validation
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    // Company Code validation
    if (!companyCode.trim()) {
      toast.error("Company code is required");
      return;
    }
    if (!/^\d{3}$/.test(companyCode)) {
      toast.error("Company code must be exactly 3 digits");
      return;
    }

    // If validation passes
    toast.success("Password reset instructions sent successfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md flex flex-col gap-5 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl font-bold text-blue-500 hover:text-blue-700">&times;</button>
        <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Forgot Password</h2>
        <p className="text-sm text-blue-800 mb-2">Enter your username and company code to receive password reset instructions.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter company code (3 digits)"
            className="w-full p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
            value={companyCode}
            onChange={e => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 3);
              setCompanyCode(value);
            }}
            maxLength={3}
          />
          <button 
            type="submit"
            className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-full transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Reset Instructions
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Login({ setShowLogin }: { setShowLogin: React.Dispatch<React.SetStateAction<Boolean>> }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserState } = useContext(UserContext)!;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Username validation
    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    // Password validation
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Company Code validation
    if (!companyCode.trim()) {
      toast.error("Company code is required");
      return;
    }
    if (!/^\d{3}$/.test(companyCode)) {
      toast.error("Company code must be exactly 3 digits");
      return;
    }

    // API call
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/partner/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
          companyCode: parseInt(companyCode)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and encrypted data
        localStorage.setItem("authToken", data.token);
        
        await updateUserState();
        toast.success(data.message || "Login successful");
        setShowLogin(false);
        navigate("/manage-account")
      } else {
        const message = typeof data.message === "object" ? data.message[0] : data.message;
        toast.error(message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
      <form 
        onSubmit={handleSubmit}
        className="w-[35vw] mx-auto shadow-2xl p-10 flex flex-col items-center rounded-2xl bg-white border border-blue-100 gap-5"
      >
        <h2 className="text-3xl font-extrabold text-blue-900 mb-2 tracking-tight">LogIn</h2>
        <input
          type="text"
          placeholder="Enter username"
          className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={e => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Enter company code (3 digits)"
          className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
          value={companyCode}
          onChange={e => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 3);
            setCompanyCode(value);
          }}
          maxLength={3}
          disabled={isLoading}
        />
        <span className="text-blue-500 underline text-xs font-semibold cursor-pointer" onClick={() => setShowForgot(true)}>Forgot Password?</span>
        <button 
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-3/5 transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "LogIn"}
        </button>
      </form>
    </>
  );
}
