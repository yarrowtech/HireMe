import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import RightArrow from "../assets/right-arrow.svg"
import LeftArrow from "../assets/left-arrow.svg"
import { toast } from "react-toastify"


export default function Employee() {


    const { userState } = useContext(UserContext)!
    const [employeeDetailsType, setEmployeeDetailsType] = useState<"details" | "job" | "attendance" | "education" | "bank">("details")
    const navigate = useNavigate()
    const [employeeData, setEmployeeData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()

    useEffect(() => {
        if (userState.position === "guest" && userState.Company === null) 
            navigate("/")
        
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/employee/get-employee-details/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setEmployeeData(data);
                } else {
                    toast.error('Failed to fetch employee details');
                }
            } catch (error) {
                toast.error('Error fetching employee details');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeDetails();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <section className="flex flex-col md:grid md:grid-cols-[18rem_auto] min-h-screen mt-[12vh] bg-gradient-to-br from-blue-50 to-blue-100">
            <SideBar employeeDetailsType={employeeDetailsType} setEmployeeDetailsType={setEmployeeDetailsType} />
            <main className="flex flex-col items-center w-full p-4">
                {employeeDetailsType === "details" && <PersonalDetailsContainer data={employeeData} />}
                {employeeDetailsType === "job" && <JobDescriptionContainer data={employeeData} />}
                {employeeDetailsType === "attendance" && <Attendance />}
                {employeeDetailsType === "education" && <EducationQualificationsContainer data={employeeData} />}
                {employeeDetailsType === "bank" && <BankDetailsContainer data={employeeData} />}
            </main>
        </section>
    )
}

function SideBar({ employeeDetailsType, setEmployeeDetailsType }: { 
    employeeDetailsType: "details" | "job" | "attendance" | "education" | "bank", 
    setEmployeeDetailsType: React.Dispatch<React.SetStateAction<"details" | "job" | "attendance" | "education" | "bank">> 
}) {
    return (
        <nav className="h-full w-full md:w-auto bg-gradient-to-b from-blue-900 to-blue-700 shadow-xl p-6 flex flex-row md:flex-col items-center gap-6 md:gap-8 rounded-b-3xl md:rounded-none md:rounded-r-3xl">
            <button
                className={`px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 ${employeeDetailsType === "details" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setEmployeeDetailsType("details")}
            >
                Personal Details
            </button>
            <button
                className={`px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 ${employeeDetailsType === "education" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setEmployeeDetailsType("education")}
            >
                Education
            </button>
            <button
                className={`px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 ${employeeDetailsType === "bank" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setEmployeeDetailsType("bank")}
            >
                Bank Details
            </button>
            <button
                className={`px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 ${employeeDetailsType === "job" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setEmployeeDetailsType("job")}
            >
                Job Description
            </button>
            <button
                className={`px-6 py-3 rounded-2xl w-full text-lg font-semibold transition-all duration-300 ease-linear focus:outline-none focus:ring-2 focus:ring-blue-400 ${employeeDetailsType === "attendance" ? 'bg-white text-blue-900 shadow-lg' : 'text-white hover:bg-blue-300 hover:text-blue-900 hover:scale-105 hover:shadow-lg'}`}
                onClick={() => setEmployeeDetailsType("attendance")}
            >
                Attendance
            </button>
            
        </nav>
    )
}

function PersonalDetailsContainer({ data }: { data: any }) {
    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Personal Details</h2>
            {data.Pic && (
                <img 
                    src={`${import.meta.env.VITE_API_URL}/${data.Pic}`} 
                    className="w-32 h-32 object-cover m-auto border-2 rounded-full bg-blue-100" 
                    alt="Profile"
                />
            )}
            <div className="grid grid-cols-[40%_auto] gap-5">
                <h2 className="text-center text-lg font-semibold text-blue-900">Full Name:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.Name}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Date of Birth:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.DOB}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Mobile No.:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.Mobile}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Email ID:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.Email}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Address:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.Address}</h3>
            </div>

            {/* Identity Documents Section */}
            <div className="border-t-2 border-blue-200 pt-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Identity Documents</h3>
                <div className="grid grid-cols-[40%_auto] gap-5">
                    <h2 className="text-center text-lg font-semibold text-blue-900">Aadhaar Number:</h2>
                    <h3 className="text-center text-base font-medium text-blue-800">{data.AadhaarNo}</h3>
                    {data.Aadhaar && (
                        <>
                            <h2 className="text-center text-lg font-semibold text-blue-900">Aadhaar Card:</h2>
                            <a 
                                href={`${import.meta.env.VITE_API_URL}/${data.Aadhaar}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-center text-base font-medium text-blue-600 hover:text-blue-800 underline"
                            >
                                View Document
                            </a>
                        </>
                    )}

                    <h2 className="text-center text-lg font-semibold text-blue-900">PAN Number:</h2>
                    <h3 className="text-center text-base font-medium text-blue-800">{data.PanNo}</h3>
                    {data.Pan && (
                        <>
                            <h2 className="text-center text-lg font-semibold text-blue-900">PAN Card:</h2>
                            <a 
                                href={`${import.meta.env.VITE_API_URL}/${data.Pan}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-center text-base font-medium text-blue-600 hover:text-blue-800 underline"
                            >
                                View Document
                            </a>
                        </>
                    )}

                    {data.Voter && (
                        <>
                            <h2 className="text-center text-lg font-semibold text-blue-900">Voter ID:</h2>
                            <a 
                                href={`${import.meta.env.VITE_API_URL}/${data.Voter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-center text-base font-medium text-blue-600 hover:text-blue-800 underline"
                            >
                                View Document
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function JobDescriptionContainer({ data }: { data: any }) {
    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Job Description</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Job Post Name:</span>
                    <span className="text-base font-medium text-blue-800">{data.Post}</span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="text-lg font-semibold text-blue-900">Payable Amount:</span>
                    <span className="text-base font-medium text-blue-800">₹ {data.Amount}</span>
                    <span className="text-lg font-semibold text-blue-900">Basis:</span>
                    <span className="text-base font-medium text-blue-800">{data.PaymentFrequency}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Joining Date:</span>
                    <span className="text-base font-medium text-blue-800">{data.JoiningDate}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Access Level:</span>
                    <span className="text-base font-medium text-blue-800">{data.AccessLevel}</span>
                </div>
            </div>
        </div>
    )
}

function Attendance() {

    const [date, setDate] = useState<{ month: number, year: number }>({ month: new Date().getMonth(), year: new Date().getFullYear() })
    const attendanceData: { [key: number]: { [key: number]: { [key: number]: boolean } } } = {
        2025: {
            0: {
                1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: true, 9: true, 10: false,
                11: true, 12: false, 13: true, 14: true, 15: false, 16: true, 17: false, 18: true, 19: true, 20: false,
                21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: false, 28: true, 29: true, 30: false
            },

            1: {
                1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true,
                11: false, 12: true, 13: false, 14: true, 15: true, 16: false, 17: true, 18: false, 19: true, 20: true,
                21: false, 22: true, 23: false, 24: true, 25: true, 26: false, 27: true, 28: false, 29: true, 30: true
            },

            2: {
                1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: true, 9: true, 10: false,
                11: true, 12: false, 13: true, 14: true, 15: false, 16: true, 17: false, 18: true, 19: true, 20: false,
                21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: false, 28: true, 29: true, 30: false
            },

            3: {
                1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true,
                11: false, 12: true, 13: false, 14: true, 15: true, 16: false, 17: true, 18: false, 19: true, 20: true,
                21: false, 22: true, 23: false, 24: true, 25: true, 26: false, 27: true, 28: false, 29: true, 30: true
            },

            4: {
                1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: true, 9: true, 10: false,
                11: true, 12: false, 13: true, 14: true, 15: false, 16: true, 17: false, 18: true, 19: true, 20: false,
                21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: false, 28: true, 29: true, 30: false
            },

            5: {
                1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true,
                11: false, 12: true, 13: false, 14: true, 15: true, 16: false, 17: true, 18: false, 19: true, 20: true,
                21: false, 22: true, 23: false, 24: true, 25: true, 26: false, 27: true, 28: false, 29: true, 30: true
            },

            6: {
                1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: true, 9: true, 10: false,
                11: true, 12: false, 13: true, 14: true, 15: false, 16: true, 17: false, 18: true, 19: true, 20: false,
                21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: false, 28: true, 29: true, 30: false
            },

            7: {
                1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true,
                11: false, 12: true, 13: false, 14: true, 15: true, 16: false, 17: true, 18: false, 19: true, 20: true,
                21: false, 22: true, 23: false, 24: true, 25: true, 26: false, 27: true, 28: false, 29: true, 30: true
            },

            8: {
                1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: true, 9: true, 10: false,
                11: true, 12: false, 13: true, 14: true, 15: false, 16: true, 17: false, 18: true, 19: true, 20: false,
                21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: false, 28: true, 29: true, 30: false
            },

            9: {
                1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true,
                11: false, 12: true, 13: false, 14: true, 15: true, 16: false, 17: true, 18: false, 19: true, 20: true,
                21: false, 22: true, 23: false, 24: true, 25: true, 26: false, 27: true, 28: false, 29: true, 30: true
            },

            10: {
                1: true, 2: false, 3: true, 4: true, 5: false, 6: true, 7: false, 8: true, 9: true, 10: false,
                11: true, 12: false, 13: true, 14: true, 15: false, 16: true, 17: false, 18: true, 19: true, 20: false,
                21: true, 22: false, 23: true, 24: true, 25: false, 26: true, 27: false, 28: true, 29: true, 30: false
            },

            11: {
                1: false, 2: true, 3: false, 4: true, 5: true, 6: false, 7: true, 8: false, 9: true, 10: true,
                11: false, 12: true, 13: false, 14: true, 15: true, 16: false, 17: true, 18: false, 19: true, 20: true,
                21: false, 22: true, 23: false, 24: true, 25: true, 26: false, 27: true, 28: false, 29: true, 30: true
            }
        }
    };

    const title = useRef<HTMLHeadingElement>(null)
    const calendarGrid = useRef<HTMLDivElement>(null)

    function generateCalendar() {
        // clearing previous calendar
        calendarGrid.current!.innerHTML = ""

        const { month, year } = date
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        title.current!.innerHTML = `${monthNames[month]} ${year}`

        const firstDay = new Date(year, month, 1).getDay()
        const totalDays = new Date(year, month + 1, 0).getDate()

        // creating empty boxes for first days
        for (let i = 0; i < firstDay; i++) {
            const p = document.createElement("p")
            p.classList.add("calendar-day")
            calendarGrid.current?.appendChild(p)
        }

        for (let i = 1; i <= totalDays; i++) {
            const p = document.createElement("p")
            p.classList.add("calendar-day")
            const isPresent: boolean = attendanceData[year][month][i]
            if (isPresent)
                p.classList.add("text-green-600")
            else
                p.classList.add("text-red-600")
            p.innerText = `${i}`
            calendarGrid.current?.appendChild(p)
        }
    }

    const decreaseDate = () => {
        if (date.month > 0) {
            setDate({ ...date, month: date.month - 1 })
            return
        }
        setDate({ month: 11, year: date.year - 1 })
    }
    const increaseDate = () => {
        if (date.month < 11) {
            setDate({ ...date, month: date.month + 1 })
            return
        }
        setDate({ month: 0, year: date.year + 1 })
    }

    useEffect(() => {
        generateCalendar()
    }, [date])

    return (
        <section className="w-[70%] bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-8 border border-blue-100">
            <div className="grid grid-cols-[10%_auto_10%] items-center w-full mb-4">
                <img src={LeftArrow} alt="Previous" className="cursor-pointer w-10 hover:scale-110 transition-transform" onClick={decreaseDate} />
                <h2 ref={title} className="font-extrabold text-blue-900 text-2xl justify-self-center">Calendar</h2>
                <img src={RightArrow} alt="Next" className="cursor-pointer w-10 hover:scale-110 transition-transform" onClick={increaseDate} />
            </div>
            <div className="flex flex-col items-center gap-6 w-full h-full">
                <div className="grid grid-cols-7 gap-2 w-full h-2/5">
                    <p className="calendar-day-name">Sun</p>
                    <p className="calendar-day-name">Mon</p>
                    <p className="calendar-day-name">Tue</p>
                    <p className="calendar-day-name">Wed</p>
                    <p className="calendar-day-name">Thu</p>
                    <p className="calendar-day-name">Fri</p>
                    <p className="calendar-day-name">Sat</p>
                </div>
                <div ref={calendarGrid} className="grid grid-cols-7 gap-2 w-full">
                </div>
            </div>
        </section>
    )
}

function EducationQualificationsContainer({ data }: { data: any }) {
    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Education Qualifications</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Qualification:</span>
                    <span className="text-base font-medium text-blue-800">{data.Qualification}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Institution:</span>
                    <span className="text-base font-medium text-blue-800">{data.Institution}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Year of Passing:</span>
                    <span className="text-base font-medium text-blue-800">{data.YearOfPassing}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-blue-900">Percentage:</span>
                    <span className="text-base font-medium text-blue-800">{data.Percentage}%</span>
                    <span className="text-lg font-semibold text-blue-900">Marksheet:</span>
                    <a className="text-base font-medium text-blue-800 underline" href={`${import.meta.env.VITE_API_URL}/${data.Marksheet}`} target="_blank">Marksheet File</a>
                </div>
            </div>
        </div>
    )
}

function BankDetailsContainer({ data }: { data: any }) {
    return (
        <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-blue-100">
            <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-tight">Bank Details</h2>
            <div className="grid grid-cols-[40%_auto] gap-5">
                <h2 className="text-center text-lg font-semibold text-blue-900">Account Holder:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.AccountHolderName}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Account Number:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.AccountNumber}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">IFSC Code:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.IFSCCode}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Bank Name:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.BankName}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Branch:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.Branch}</h3>
                <h2 className="text-center text-lg font-semibold text-blue-900">Account Type:</h2>
                <h3 className="text-center text-base font-medium text-blue-800">{data.AccountType}</h3>
            </div>
        </div>
    )
}