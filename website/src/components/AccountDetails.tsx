import React, {
  useState,
  useContext,
  type ChangeEvent,
  useEffect,
} from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import Search from "../assets/search.svg";
import type { Employee } from "./AllEmployees";
import { EmployeeCard } from "./AllEmployees";
import {
  PartnersContext,
  type PartnerDetails,
} from "../context/PartnerContext";
import { useParams } from "react-router-dom";

export function AccountDetailsContainer() {
  const { userState } = useContext(UserContext)!;
  
  return (
    <div className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
        Account Details
      </h2>

      <div className="flex items-center gap-3 border-b pb-4">
        <span className="text-lg font-semibold text-blue-900">Username:</span>
        <span className="text-base font-medium text-blue-800">
          {userState.username}
        </span>
      </div>

      <div className="flex items-center gap-3 border-b pb-4">
        <span className="text-lg font-semibold text-blue-900">
          Account Type:
        </span>
        <span
          className={`text-base font-medium px-3 py-1 rounded-full ${
            userState.position === "admin"
              ? "bg-red-100 text-red-800"
              : userState.position === "manager"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {userState.position?.charAt(0).toUpperCase() +
            userState.position?.slice(1)}
        </span>
      </div>
    </div>
  );
}

export function PersonalDetailsContainer() {
  const [personalDetails, setPersonalDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/employee/get-employee-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPersonalDetails(data);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error fetching personal details");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalDetails();
  }, []);

  useEffect(() => {
    console.log(personalDetails)
  }, [personalDetails])

  if (loading) {
    return (
      <div className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
          Personal Details
        </h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-blue-900">Loading personal details...</div>
        </div>
      </div>
    );
  }

  if (!personalDetails) {
    return (
      <div className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
        <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
          Personal Details
        </h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-600">Failed to load personal details</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
        Personal Details
      </h2>

      <div className="w-full grid grid-cols-3 gap-5">
        <div className="col-span-full">
          <label className="block text-blue-900 font-semibold mb-1">Full Name</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span className="text-base font-medium text-blue-800">
              {personalDetails.Name || 'N/A'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">Date of Birth</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span className="text-base font-medium text-blue-800">
              {personalDetails.DOB || 'Not Available'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">Mobile No</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span className="text-base font-medium text-blue-800">
              {personalDetails.Mobile || 'Not Available'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">Email Address</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span className="text-base font-medium text-blue-800">
              {personalDetails.Email || 'Not Available'}
            </span>
          </div>
        </div>

        <div className="col-span-full">
          <label className="block text-blue-900 font-semibold mb-1">Address</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full min-h-[60px]">
            <span className="text-base font-medium text-blue-800">
              {personalDetails.Address || 'Address not available'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">Aadhaar Number</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span className="text-base font-medium text-blue-800 font-mono">
              {personalDetails.AadhaarNo || 'Not Available'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">PAN Number</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span className="text-base font-medium text-blue-800 font-mono">
              {personalDetails.PanNo || 'Not Available'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">Account Type</label>
          <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
            <span
              className={`text-base font-medium px-3 py-1 rounded-full ${
                personalDetails.AccessLevel === "ADMIN"
                  ? "bg-red-100 text-red-800"
                  : personalDetails.AccessLevel === "MANAGER"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {personalDetails.AccessLevel || 'Not Available'}
            </span>
          </div>
        </div>

        {personalDetails.Pic && (
          <div className="col-span-full">
            <label className="block text-blue-900 font-semibold mb-1">Photo</label>
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.VITE_API_URL}/${personalDetails.Pic}`}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-lg border-2 border-blue-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* Education Details Section */}
      <div className="border-t border-blue-200 pt-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Education Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Qualification</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.Qualification || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Institution</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.Institution || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Year of Passing</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.YearOfPassing || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Percentage</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.Percentage ? `${personalDetails.Percentage}%` : 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details Section */}
      <div className="border-t border-blue-200 pt-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Bank Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Account Holder Name</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.AccountHolderName || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Account Number</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800 font-mono">
                {personalDetails.AccountNumber || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">IFSC Code</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800 font-mono">
                {personalDetails.IFSCCode || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Bank Name</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.BankName || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Branch</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.Branch || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Account Type</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.AccountType || 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="border-t border-blue-200 pt-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Job Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Employee ID</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800 font-mono">
                {personalDetails.id || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Company Code</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800 font-mono">
                {personalDetails.CompanyCode || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Joining Date</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.JoiningDate || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Position</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.Post || 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Salary Amount</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.Amount ? `₹${personalDetails.Amount}` : 'Not Available'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">Payment Frequency</label>
            <div className="p-2 pl-3 rounded-lg border-2 border-blue-200 bg-gray-50 w-full">
              <span className="text-base font-medium text-blue-800">
                {personalDetails.PaymentFrequency || 'Not Available'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Links Section */}
      <div className="border-t border-blue-200 pt-6">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Documents</h3>
        <div className="grid grid-cols-2 gap-4">
          {personalDetails.Aadhaar && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">Aadhaar Card:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${personalDetails.Aadhaar}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}

          {personalDetails.Pan && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">PAN Card:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${personalDetails.Pan}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}

          {personalDetails.Voter && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">Voter ID:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${personalDetails.Voter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}

          {personalDetails.Marksheet && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-800">Marksheet:</span>
              <a
                href={`${import.meta.env.VITE_API_URL}/${personalDetails.Marksheet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
              >
                View Document <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CompanyDetailsContainer() {
  const { userState } = useContext(UserContext)!;
  const [partner, setPartner] = useState<PartnerDetails>();
  const { fetchPartnerDetails } = useContext(PartnersContext)!;

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchPartnerDetails(userState.Company || 0);
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
  // Example employees data
  const allEmployees: Employee[] = [
    {
      id: "ae41hcahfq24awfh",
      fullname: "Atanu Ghosh",
      dob: "01/01/2001",
      mobileNo: "1234567890",
      emailId: "example@gmail.com",
      pic: "",
    },
    {
      id: "ae41hcahfq24awfh2",
      fullname: "Amit Saha",
      dob: "01/01/2001",
      mobileNo: "1234567890",
      emailId: "example@gmail.com",
      pic: "",
    },
  ];

  const [employees, setEmployees] = useState<Employee[]>(allEmployees);
  const search = (e: ChangeEvent) => {
    const param = (e.target as HTMLInputElement).value.toLowerCase();
    const filteredEmployees = allEmployees.filter((employee) => {
      return employee.fullname.toLowerCase().includes(param);
    });
    setEmployees(filteredEmployees);
  };

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
          />
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

export function SideBar({
  panelType,
  setPanelType,
}: {
  panelType: "account" | "personal" | "company" | "plan" | "payment" | "add-employee" | "employees";
  setPanelType: React.Dispatch<
    React.SetStateAction<
      "account" | "personal" | "company" | "plan" | "payment" | "add-employee" | "employees"
    >
  >;
}) {
  const { userState } = useContext(UserContext)!;
  
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
      
      {/* Show Personal Details button only for non-admin users */}
      {userState.position !== "admin" && (
        <button
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            panelType === "personal"
              ? "bg-white text-blue-900 shadow-lg"
              : "text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg"
          }`}
          onClick={() => setPanelType("personal")}
        >
          Personal Details
        </button>
      )}
      
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

export function CheckPartnerDetails() {
  const [partner, setPartner] = useState<PartnerDetails>();
  const { id } = useParams();
  const { fetchPartnerDetails } = useContext(PartnersContext)!;

  useEffect(() => {
    const fetchDetails = async (id: number) => {
      const details = await fetchPartnerDetails(id);
      if (details) {
        setPartner(details);
      } else {
        toast.error("Failed to fetch partner details");
      }
    };
    fetchDetails(parseInt(id || "0"));
  }, []);

  return (
    <div className="w-full bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 border border-blue-100">
      <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">
        Partner Details
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

      {/* Added PAN No */}
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
