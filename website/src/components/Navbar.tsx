import { Link } from "react-router-dom";
import UserIcon from "../assets/user.svg"
import Logout from "../assets/logout.svg"
import Tweak from "../assets/tweak.svg"
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import Login from "./Login";

export default function Navbar() {
  const { userState } = useContext(UserContext)!
  const [showLogin, setShowLogin] = useState<Boolean>(false)
  const [logout, setLogout] = useState<Boolean>(false)
  const userIcon = useRef<HTMLImageElement>(null)
  const navbar = useRef<HTMLElement>(null)

  useEffect(() => {
    userIcon.current?.addEventListener("click", () => {
      setShowLogin(true)
    })
    window.addEventListener("mousedown", (e: MouseEvent) => {
      if (!document.getElementById("profile")?.contains(e.target as Node))
        setLogout(false)
    })

    // styling navbar based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY < 5) {
        navbar.current!.style.position = "absolute"
        navbar.current!.style.width = "95vw"
        navbar.current!.style.borderRadius = "1.5rem"
        navbar.current!.style.top = "0.75rem"
      }
    })

    function intersectionHandler(entries: IntersectionObserverEntry[]) {
      if (!entries[0].isIntersecting) {
        navbar.current!.style.position = "fixed"
        navbar.current!.style.width = "100vw"
        navbar.current!.style.borderRadius = "0"
        navbar.current!.style.top = "0"
      }
    }
    const observer = new IntersectionObserver(intersectionHandler, { root: null, threshold: 1 })
    observer.observe(navbar.current!)

  }, [])

  useEffect(() => {
    if (showLogin)
      document.body.style.overflow = "hidden"
    else
      document.body.style.overflowY = "scroll"
  }, [showLogin])

  return (
    <>
      <nav ref={navbar} className="w-[95vw] h-[10vh] p-5 bg-white/30 backdrop-blur-md border border-blue-200 shadow-xl rounded-3xl flex items-center justify-between text-blue-900 font-bold absolute left-1/2 top-3 -translate-x-1/2 z-20 transition-all duration-300">
        <Link to="/" className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 text-transparent bg-clip-text drop-shadow-lg">HireMe</Link>
        <div
          className={`w-3/5 h-full flex items-center ${
            userState.companyName !== null && (userState.position === "admin" || userState.position === "employee")
              ? "justify-end"
              : "justify-around"
          }`}
        >
          {userState.companyName === null && userState.position === "guest" &&
            <>
              <a href="/#about" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">About Us</a>
              <a href="/#vision" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Our Vision</a>
              <a href="/#partners" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Partners</a>
              <Link to="/be-a-partner" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Become a Partner</Link>
              <a href="/#plans" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Subscription</a>
              <img ref={userIcon} src={UserIcon} className="w-8 cursor-pointer hover:scale-110 transition-transform" />
            </>
          }
          {
            userState.companyName === null && userState.position === "admin" &&
            <>
              <Link to="/partner-requests" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Partner Requests</Link>
              <Link to="/partners" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Partners</Link>
              <div id="profile" className="flex relative" onClick={() => setLogout(!logout)}>
                <h3 className="p-2 cursor-pointer">Welcome, {userState.username}</h3>
                <img src={UserIcon} className="w-8 cursor-pointer hover:scale-110 transition-transform" />
                {logout && <button className="absolute -right-5 -bottom-18 py-3 px-5 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-2xl flex items-center gap-2 cursor-pointer shadow-xl border border-red-300 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"><img src={Logout} />LogOut</button>
                }
              </div>
            </>
          }
          {
            userState.companyName !== null &&
            <>
              {(userState.position !== "admin" && userState.position !== "employee") && (
                <>
                  <Link to="/employees" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Employees</Link>
                  <Link to="/add-employee" className="p-2 rounded-2xl transition-all duration-300 ease-linear hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">Add Employee</Link>
                </>
              )}
              <div id="profile" className="flex relative" onClick={() => setLogout(!logout)}>
                <h3 className="p-2 cursor-pointer">Welcome, {userState.username}</h3>
                <img src={UserIcon} className="w-8 cursor-pointer hover:scale-110 transition-transform" />
                {logout &&
                  <div className="flex flex-col absolute -right-5 -bottom-30 gap-2">
                    <Link to={`${userState.position !== "employee" ? "/manage-account" : "/employees/employee/ae41hcahfq24awfh"}`} className="py-3 px-5 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-2xl flex items-center gap-2 cursor-pointer shadow-xl border border-blue-300 text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"><img src={Tweak} />Manage Account</Link>
                    <button className="py-3 px-5 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-2xl flex items-center gap-2 cursor-pointer shadow-xl border border-red-300 text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"><img src={Logout} />LogOut</button>
                  </div>
                }
              </div>
            </>
          }
        </div>
      </nav>
      {showLogin && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
          <div onClick={e => e.stopPropagation()} className="z-40">
            <Login />
          </div>
        </div>
      )}
    </>
  );
}
