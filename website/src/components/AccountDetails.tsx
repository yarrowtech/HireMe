import React, {
  useState,
  useContext,
  type ChangeEvent,
  useEffect,
} from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { EmployeeCard } from "./AllEmployees";
import type { Employee } from "./AllEmployees";
import {
  PartnersContext,
  type PartnerDetails,
} from "../context/PartnerContext";
import { useParams } from "react-router-dom";
import { 
  FaUser, 
  FaBuilding, 
  FaIdCard, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaExternalLinkAlt, 
  FaSearch,
  FaCrown,
  FaShield,
  FaUserTie,
  FaCreditCard,
  FaCalendarAlt,
  FaUsers,
  FaPlus
} from "react-icons/fa";

export function AccountDetailsContainer() {
  const { userState } = useContext(UserContext)!;
  
  const getAccountTypeIcon = (position: string) => {
    switch (position) {
      case "admin":
        return <FaShield className="text-red-400" />;
      case "manager":
        return <FaUserTie className="text-blue-400" />;
      case "superadmin":
        return <FaCrown className="text-yellow-400" />;
      default:
        return <FaUser className="text-green-400" />;
    }
  };

  const getAccountTypeColor = (position: string) => {
    switch (position) {
      case "admin":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "manager":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "superadmin":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };
  
  return (
    <div className="w-full bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <FaUser className="text-2xl text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Account Details</h2>
            <p className="text-slate-300">Your account information and settings</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <FaUser className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Username</p>
                <p className="text-white text-lg font-semibold">{userState.username}</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                {getAccountTypeIcon(userState.position || "user")}
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-sm">Account Type</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-white text-lg font-semibold">
                    {userState.position?.charAt(0).toUpperCase() + userState.position?.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getAccountTypeColor(userState.position || "user")}`}>
                    {userState.position === "superadmin" ? "Super Admin" : 
                     userState.position === "admin" ? "Administrator" :
                     userState.position === "manager" ? "Manager" : "User"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-cyan-400" />
                <div>
                  <p className="text-slate-400 text-sm">Last Login</p>
                  <p className="text-white text-sm font-medium">Today, 10:30 AM</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <FaShield className="text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">Security Status</p>
                  <p className="text-green-400 text-sm font-medium">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompanyDetailsContainer() {
  const { userState } = useContext(UserContext)!;
  const [partner, setPartner] = useState<PartnerDetails>();
  const { fetchPartnerDetails } = useContext(PartnersContext)!;
  const params = useParams()

  useEffect(() => {
    const fetchDetails = async () => {
      const compid = userState.position === "superadmin" ? parseInt(params.id || "-1") : userState.Company
      const details = await fetchPartnerDetails(compid || -1);
      if (details) {
        setPartner(details);
      } else {
        toast.error("Failed to fetch company details");
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
        Company Details
      </h2>

      <div className="flex items-center gap-3 border-b pb-4">
        <span className="text-lg font-semibold text-blue-900">
          Company Name:
        </span>
        <span className="text-base font-medium text-blue-800">
          {partner?.CompanyName}
        </span>
      </div>

      <div className="flex items-center gap-3 border-b pb-4">
        <span className="text-lg font-semibold text-blue-900">
          Company Code:
        </span>
        <span className="text-base font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded-lg font-mono">
          {partner?.id}
        </span>
      </div>

      <div className="flex items-center gap-3 border-b pb-4">
        <span className="text-lg font-semibold text-blue-900">CIN:</span>
        <span className="text-base font-medium text-blue-800">
          {partner?.CIN}
        </span>
      </div>

      <div className="flex items-center gap-3 border-b pb-4">
        <span className="text-lg font-semibold text-blue-900">PAN Number:</span>
        <span className="text-base font-medium text-blue-800">
          {partner?.PAN_No}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 border-b pb-4">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-blue-900">Phone No:</span>
          <span className="text-base font-medium text-blue-800">
            {partner?.Contact}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold text-blue-900">Email ID:</span>
          <span className="text-base font-medium text-blue-800">
            {partner?.Email}
          </span>
        </div>
      </div>

      {/* Company Documents Section */}
      <div className="mt-2">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          Company Documents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {partner?.ESI && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">ESI:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.ESI}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
          {partner?.PF && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">PF:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.PF}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
          {partner?.PAN && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">PAN Card:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.PAN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
          {partner?.MOA && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">MOA:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.MOA}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
          {partner?.GST && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">
                GST Certificate:
              </span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.GST}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
          {partner?.TradeLicense && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">
                Trade License:
              </span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.TradeLicense}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
          {partner?.MSMC && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">MSMC:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${partner.MSMC}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document{" "}
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SubscriptionPlanContainer() {
  return (
    <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
        Subscription Plan
      </h2>
      <div className="text-blue-900">
        Your current plan details will appear here.
      </div>
    </div>
  );
}

export function PaymentPanel() {
  return (
    <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
        Payment
      </h2>
      <div className="text-blue-900">
        Your payment details and history will appear here.
      </div>
    </div>
  );
}

export function EmployeesPanel() {
  const { userState } = useContext(UserContext)!;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/partner/employees/${userState.Company}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Transform data to match Employee type
          const transformedData = data.map((emp: any) => ({
            id: emp.id,
            fullname: emp.Name,
            pic: emp.Pic || '',
          }));
          setEmployees(transformedData);
          setAllEmployees(transformedData);
        } else {
          toast.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        toast.error("Error fetching employees");
      } finally {
        setLoading(false);
      }
    };

    if (userState.Company) {
      fetchEmployees();
    }
  }, [userState.Company]);

  const search = (e: ChangeEvent) => {
    const param = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredEmployees = allEmployees.filter((employee) => {
      return employee.fullname.toLowerCase().includes(param);
    });
    setEmployees(filteredEmployees);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        <div className="text-blue-900 font-semibold">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
      <div className="flex items-center justify-between w-full mb-10">
        <h2 className="font-extrabold text-blue-900 text-4xl">All Employees</h2>
        <div className="w-[20%] relative">
          <input
            type="text"
            className="border-2 border-blue-200 w-full h-[5vh] pl-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Search....."
            onChange={search}
          />
          <img
            src={Search}
            className="w-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            alt="Search"
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-around gap-6">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <EmployeeCard key={employee.id} employeeData={employee} />
          ))
        ) : (
          <div className="text-blue-700 font-semibold">No employees found.</div>
        )}
      </div>
    </div>
  );
}

export function SideBar({
  panelType,
  setPanelType,
}: {
  panelType: "account" | "company" | "plan" | "payment" | "add-employee" | "employees";
  setPanelType: React.Dispatch<
    React.SetStateAction<
      "account" | "company" | "plan" | "payment" | "add-employee" | "employees"
    >
  >;
}) {

  return (
    <nav className="h-full w-full md:w-auto bg-gradient-to-b from-blue-900 to-blue-700 shadow-xl p-6 flex flex-row md:flex-col items-center gap-6 md:gap-8 rounded-b-3xl md:rounded-none md:rounded-r-3xl">
      <button
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          panelType === "account"
            ? "bg-white text-blue-900 shadow-lg"
            : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
        }`}
        onClick={() => setPanelType("account")}
      >
        Account Details
      </button>
      
      <button
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          panelType === "company"
            ? "bg-white text-blue-900 shadow-lg"
            : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
        }`}
        onClick={() => setPanelType("company")}
      >
        Company Details
      </button>
      <button
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          panelType === "plan"
            ? "bg-white text-blue-900 shadow-lg"
            : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
        }`}
        onClick={() => setPanelType("plan")}
      >
        Subscription Plan
      </button>
      <button
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          panelType === "payment"
            ? "bg-white text-blue-900 shadow-lg"
            : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
        }`}
        onClick={() => setPanelType("payment")}
      >
        Payment
      </button>

      <button
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          panelType === "add-employee"
            ? "bg-white text-blue-900 shadow-lg"
            : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
        }`}
        onClick={() => setPanelType("add-employee")}
      >
        Add Employee
      </button>

      <button
        className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          panelType === "employees"
            ? "bg-white text-blue-900 shadow-lg"
            : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
        }`}
        onClick={() => setPanelType("employees")}
      >
        Employees
      </button>
    </nav>
  );
}
