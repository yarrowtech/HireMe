import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { EmployeeCard } from "./AllEmployees";
import type { Employee } from "./AllEmployees";
import Search from "../assets/search.svg";
import type { ChangeEvent } from "react";
import { toast } from "react-toastify";

export default function AccountManagement() {
    const [panelType, setPanelType] = useState<"account" | "plan" | "payment" | "manager" | "employees">("account")
    const navigate = useNavigate()
    const { userState } = useContext(UserContext)!
    const isAdminWithCompany = userState.Company !== null && userState.position === "admin"
    useEffect(() => {
        if (userState.Company === null || userState.position === "employee")
            navigate("/")
    }, [])
    return (
        <section className="flex flex-col md:grid md:grid-cols-[18rem_auto] min-h-screen mt-[12vh] bg-gradient-to-br from-blue-50 to-blue-100">
            <SideBar panelType={panelType} setPanelType={setPanelType} isAdminWithCompany={isAdminWithCompany} showManagerPanel={isAdminWithCompany} showEmployeesPanel={isAdminWithCompany} />
            <main className="flex flex-col items-center w-full p-4">
                {panelType === "account" && <AccountDetailsContainer />}
                {panelType === "plan" && <SubscriptionPlanContainer />}
                {panelType === "payment" && isAdminWithCompany && <PaymentPanel />}
                {panelType === "manager" && isAdminWithCompany && <ManagerCreationPanel />}
                {panelType === "employees" && isAdminWithCompany && <EmployeesPanel />}
            </main>
        </section>
    )
}

function AccountDetailsContainer() {

    const { userState } = useContext(UserContext)!

    return (
        <div className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Account Details</h2>
            <div className="flex items-center gap-3 border-b pb-4">
                <span className="text-lg font-semibold text-blue-900">Username:</span>
                <span className="text-base font-medium text-blue-800">{userState.username}</span>
            </div>
            <div className="flex items-center gap-3 border-b pb-4">
                <span className="text-lg font-semibold text-blue-900">Account Type:</span>
                <span className={`text-base font-medium px-3 py-1 rounded-full ${
                    userState.position === 'admin' ? 'bg-red-100 text-red-800' :
                    userState.position === 'manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                }`}>
                    {userState.position?.charAt(0).toUpperCase() + userState.position?.slice(1)}
                </span>
            </div>
            <div className="flex items-center gap-3 border-b pb-4">
                <span className="text-lg font-semibold text-blue-900">Company Name:</span>
                <span className="text-base font-medium text-blue-800">{userState.Company?.CompanyName}</span>
            </div>
            <div className="flex items-center gap-3 border-b pb-4">
                <span className="text-lg font-semibold text-blue-900">Company Code:</span>
                <span className="text-base font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded-lg font-mono">
                    {userState.Company?.id}
                </span>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Phone No:</span>
                    <span className="text-base font-medium text-blue-800">{userState.Company?.Contact}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Email ID:</span>
                    <span className="text-base font-medium text-blue-800">{userState.Company?.Email}</span>
                </div>
            </div>
        </div>
    )
}

function SubscriptionPlanContainer() {
    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Subscription Plan</h2>
            <div className="text-blue-900">Your current plan details will appear here.</div>
        </div>
    )
}

function PaymentPanel() {
    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Payment</h2>
            <div className="text-blue-900">Your payment details and history will appear here.</div>
        </div>
    )
}

function ManagerCreationPanel() {
    const [username, setUsername] = useState("");
    const [accountType, setAccountType] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { userState } = useContext(UserContext)!

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Form validation
        if (!username.trim()) {
            toast.error("Username is required");
            return;
        }
        if (username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long");
            return;
        }

        if (!accountType.trim()) {
            toast.error("Account type is required");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        // API call
        setIsLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            const metadata = localStorage.getItem("metadata");

            const response = await fetch(`${import.meta.env.VITE_API_URL}/partner/create-manager-account`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "metadata": metadata || "",
                },
                body: JSON.stringify({
                    companyCode: userState.Company?.id,
                    username: username.trim(),
                    accountType: accountType.trim(),
                    password: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Account created successfully!");
                // Reset form
                setUsername("");
                setAccountType("");
                setPassword("");
            } else {
                toast.error(data.message || "Failed to create account");
            }
        } catch (error) {
            console.error("Account creation error:", error);
            toast.error("An error occurred while creating account. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Create New Account</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                    type="text"
                    placeholder="Username"
                    className="p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={isLoading}
                />
                <input
                    type="text"
                    placeholder="Account Type (e.g., manager, employee)"
                    className="p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={accountType}
                    onChange={e => setAccountType(e.target.value)}
                    disabled={isLoading}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-full transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </div>
    )
}

function EmployeesPanel() {
    // Example employees data
    const allEmployees: Employee[] = [
        {
            id: "ae41hcahfq24awfh",
            fullname: "Atanu Ghosh",
            dob: "01/01/2001",
            mobileNo: "1234567890",
            emailId: "example@gmail.com",
            pic: ""
        },
        {
            id: "ae41hcahfq24awfh2",
            fullname: "Amit Saha",
            dob: "01/01/2001",
            mobileNo: "1234567890",
            emailId: "example@gmail.com",
            pic: ""
        }
    ];

    const [employees, setEmployees] = useState<Employee[]>(allEmployees)
    const search = (e: ChangeEvent) => {
        const param = (e.target as HTMLInputElement).value.toLowerCase()
        const filteredEmployees = allEmployees.filter(employee => {
            return employee.fullname.toLowerCase().includes(param)
        })
        setEmployees(filteredEmployees)
    }

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
            <div className="flex items-center justify-between w-full mb-10">
                <h2 className="font-extrabold text-blue-900 text-4xl">All Employees</h2>
                <div className="w-[20%] relative">
                    <input type="text" className="border-2 border-blue-200 w-full h-[5vh] pl-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Search....." onChange={search} />
                    <img src={Search} className="w-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" />
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-around gap-6">
                {employees.length > 0 ? (
                    employees.map((employee, idx) => (
                        <EmployeeCard key={employee.id + idx} employeeData={employee} />
                    ))
                ) : (
                    <div className="text-blue-700 font-semibold">No employees found.</div>
                )}
            </div>
        </div>
    );
}

function SideBar({ panelType, setPanelType, isAdminWithCompany, showManagerPanel, showEmployeesPanel }: { panelType: "account" | "plan" | "payment" | "manager" | "employees", setPanelType: React.Dispatch<React.SetStateAction<"account" | "plan" | "payment" | "manager" | "employees">>, isAdminWithCompany: boolean, showManagerPanel: boolean, showEmployeesPanel: boolean }) {
    return (
        <nav className="h-full w-full md:w-auto bg-gradient-to-b from-blue-900 to-blue-700 shadow-xl p-6 flex flex-row md:flex-col items-center gap-6 md:gap-8 rounded-b-3xl md:rounded-none md:rounded-r-3xl">
            <button
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${panelType === "account" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setPanelType("account")}
            >
                Account Details
            </button>
            <button
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${panelType === "plan" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setPanelType("plan")}
            >
                Subscription Plan
            </button>
            {isAdminWithCompany && (
                <button
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${panelType === "payment" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                    onClick={() => setPanelType("payment")}
                >
                    Payment
                </button>
            )}
            {showManagerPanel && (
                <button
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${panelType === "manager" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                    onClick={() => setPanelType("manager")}
                >
                    Create Manager
                </button>
            )}
            {showEmployeesPanel && (
                <button
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${panelType === "employees" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                    onClick={() => setPanelType("employees")}
                >
                    Employees
                </button>
            )}
        </nav>
    )
}