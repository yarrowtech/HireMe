import { Link } from "react-router-dom";
import UserIcon from "../assets/user.svg";
import Logout from "../assets/logout.svg";
import Tweak from "../assets/tweak.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import Login from "./Login";

export default function Navbar() {
  const { userState, updateUserState } = useContext(UserContext)!;
  const [showLogin, setShowLogin] = useState<Boolean>(false);
  const [logout, setLogout] = useState<Boolean>(false);
  const [scrolled, setScrolled] = useState<Boolean>(false);
  const userIcon = useRef<HTMLImageElement>(null);
  const navbar = useRef<HTMLElement>(null);

  async function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("metadata");
    await updateUserState();
    window.location.href = "/";
    setLogout(false);
  }

  useEffect(() => {
    // fetching user details
    updateUserState();

    userIcon.current?.addEventListener("click", () => {
      setShowLogin(true);
    });

    window.addEventListener("mousedown", (e: MouseEvent) => {
      if (!document.getElementById("profile")?.contains(e.target as Node))
        setLogout(false);
    });

    // styling navbar based on scroll position
    const handleScroll = () => {
      const isScrolled = window.scrollY > 5;
      setScrolled(isScrolled);
      
      if (navbar.current) {
        if (!isScrolled) {
          navbar.current.style.position = "absolute";
          navbar.current.style.width = "95vw";
          navbar.current.style.borderRadius = "1.5rem";
          navbar.current.style.top = "0.75rem";
          navbar.current.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
        } else {
          navbar.current.style.position = "fixed";
          navbar.current.style.width = "100vw";
          navbar.current.style.borderRadius = "0";
          navbar.current.style.top = "0";
          navbar.current.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  return (
    <>
      <nav
        ref={navbar}
        className={`w-[95vw] h-[12vh] p-5 ${
          scrolled ? "bg-white/90" : "bg-white/30"
        } backdrop-blur-md border ${
          scrolled ? "border-blue-100" : "border-blue-200"
        } shadow-xl rounded-3xl flex items-center justify-between text-blue-900 font-bold absolute left-1/2 top-3 -translate-x-1/2 z-20 transition-all duration-300 ease-in-out`}
      >
        <Link
          to="/"
          className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-transparent bg-clip-text drop-shadow-lg hover:scale-105 transition-transform duration-300"
        >
          HireMe
        </Link>

        <div
          className={`w-3/5 h-full flex items-center ${
            userState.Company !== null
              ? "justify-end"
              : "justify-around"
          }`}
        >
          {userState.Company === null && userState.position === "guest" && (
            <>
              <a
                href="/#about"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                About Us
              </a>
              <a
                href="/#vision"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Our Vision
              </a>
              <a
                href="/#partners"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Partners
              </a>
              <Link
                to="/be-a-partner"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Become a Partner
              </Link>
              <a
                href="/#plans"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Subscription
              </a>
              <img
                ref={userIcon}
                src={UserIcon}
                className="w-8 h-8 p-1.5 cursor-pointer hover:scale-110 transition-transform duration-300 hover:bg-blue-100/50 rounded-full"
                alt="User profile"
              />
            </>
          )}

          {userState.Company === null && userState.position === "admin" && (
            <>
              <Link
                to="/partner-requests"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Partner Requests
              </Link>
              <Link
                to="/partners"
                className="p-2 rounded-2xl transition-all duration-300 ease-in-out hover:bg-blue-100/50 hover:text-blue-700 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Partners
              </Link>
              <div
                id="profile"
                className="flex relative items-center gap-2 group"
                onClick={() => setLogout(!logout)}
              >
                <div className="flex items-center gap-2 hover:bg-blue-100/50 p-2 rounded-xl transition-all duration-200 cursor-pointer">
                  <h3 className="font-medium">Welcome, {userState.username}</h3>
                  <div className="w-8 h-8 rounded-full bg-blue-100/70 flex items-center justify-center">
                    <img
                      src={UserIcon}
                      className="w-5 h-5"
                      alt="User profile"
                    />
                  </div>
                </div>
                {logout && (
                  <button
                    onClick={handleLogout}
                    className="absolute right-0 top-14 py-2 px-4 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl flex items-center gap-2 cursor-pointer shadow-lg border border-red-300 text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                  >
                    <img src={Logout} className="w-4 h-4" alt="Logout" />
                    LogOut
                  </button>
                )}
              </div>
            </>
          )}

          {userState.Company !== null && (
            <>
              <div
                id="profile"
                className="flex relative items-center gap-2 group"
                onClick={() => setLogout(!logout)}
              >
                <div className="flex items-center gap-2 hover:bg-blue-100/50 p-2 rounded-xl transition-all duration-200 cursor-pointer">
                  <h3 className="font-medium">Welcome, {userState.username}</h3>
                  <div className="w-8 h-8 rounded-full bg-blue-100/70 flex items-center justify-center">
                    <img
                      src={UserIcon}
                      className="w-5 h-5"
                      alt="User profile"
                    />
                  </div>
                </div>
                {logout && (
                  <div className="flex flex-col absolute right-0 top-14 gap-2 bg-white p-3 rounded-xl shadow-xl border border-blue-100 min-w-[180px]">
                    <Link
                      to={`${
                        userState.position !== "employee"
                          ? "/manage-account"
                          : "/employees/employee/ae41hcahfq24awfh"
                      }`}
                      className="py-2 px-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl flex items-center gap-2 cursor-pointer text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                      onClick={() => setLogout(false)}
                    >
                      <img src={Tweak} className="w-4 h-4" alt="Settings" />
                      Manage Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-2 px-3 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl flex items-center gap-2 cursor-pointer text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                    >
                      <img src={Logout} className="w-4 h-4" alt="Logout" />
                      LogOut
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {showLogin && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowLogin(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="z-40 animate-scaleIn transition-all duration-300"
          >
            <Login setShowLogin={setShowLogin} />
          </div>
        </div>
      )}
    </>
  );
}