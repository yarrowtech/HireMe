import { useRef, useState, type ChangeEvent } from "react"

export default function AddEmployee() {
    const [subFormState, setSubFormState] = useState<"details" | "documents" | "education" | "bank" | "job">("details")
    const [personalDetails, setPersonalDetails] = useState<{ firstname: string, lastname: string, middlename: string, dob: string, mobile: string, email: string, address: string, pic: File | null }>({
        firstname: "",
        middlename: "",
        lastname: "",
        dob: "",
        mobile: "",
        email: "",
        address: "",
        pic: null
    })
    const [documentFiles, setDocumentFiles] = useState<{
        aadhaarNo: string,
        panNo: string,
        aadhaar: File | null,
        pan: File | null,
        voter: File | null
    }>({
        aadhaarNo: "",
        panNo: "",
        aadhaar: null,
        pan: null,
        voter: null
    })
    const [educationDetails, setEducationDetails] = useState<{ qualification: string, institute: string, yearOfPassing: string, percentage: number, marksheet: File | null }>({
        qualification: "",
        institute: "",
        yearOfPassing: "",
        percentage: 0,
        marksheet: null
    })
    const [bankDetails, setBankDetails] = useState<{
        accountHolderName: string,
        bankName: string,
        accountNumber: string,
        ifscCode: string,
        branchName: string,
        accountType: string
    }>({
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        branchName: "",
        accountType: ""
    })
    const [jobDetails, setJobDetails] = useState<{
        post: string,
        amount: number,
        paymentFrequency: string,
        joiningDate: string,
        accessLevel: string // Added
    }>({
        post: "",
        amount: 0,
        paymentFrequency: "",
        joiningDate: "",
        accessLevel: "" // Added
    })

    // Add loading and feedback state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form submission handler
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();

        // Personal Details
        formData.append("Name", `${personalDetails.firstname} ${personalDetails.middlename} ${personalDetails.lastname}`.trim());
        formData.append("DOB", personalDetails.dob);
        formData.append("Email", personalDetails.email);
        formData.append("Mobile", personalDetails.mobile);
        formData.append("Address", personalDetails.address);
        if (personalDetails.pic) formData.append("Pic", personalDetails.pic);

        // Documents
        formData.append("AadhaarNo", documentFiles.aadhaarNo);
        formData.append("PanNo", documentFiles.panNo);
        if (documentFiles.aadhaar) formData.append("Aadhaar", documentFiles.aadhaar);
        if (documentFiles.pan) formData.append("Pan", documentFiles.pan);
        if (documentFiles.voter) formData.append("Voter", documentFiles.voter);

        // Education
        formData.append("Qualification", educationDetails.qualification);
        formData.append("Institution", educationDetails.institute);
        formData.append("YearOfPassing", educationDetails.yearOfPassing);
        formData.append("Percentage", educationDetails.percentage.toString());
        if (educationDetails.marksheet) formData.append("Marksheet", educationDetails.marksheet);

        // Bank
        formData.append("AccountHolderName", bankDetails.accountHolderName);
        formData.append("BankName", bankDetails.bankName);
        formData.append("AccountNumber", bankDetails.accountNumber);
        formData.append("IFSCCode", bankDetails.ifscCode);
        formData.append("Branch", bankDetails.branchName);
        formData.append("AccountType", bankDetails.accountType);

        // Job
        formData.append("Post", jobDetails.post);
        formData.append("Amount", jobDetails.amount.toString());
        formData.append("PaymentFrequency", jobDetails.paymentFrequency);
        formData.append("JoiningDate", jobDetails.joiningDate);
        formData.append("AccessLevel", jobDetails.accessLevel); // Added

        // Password (optional, set as needed)
        formData.append("Password", "defaultPassword"); // You may want to generate or ask for this

        try {
            const token = localStorage.getItem("authToken");
            const res = await fetch(`${import.meta.env.VITE_API_URL}/partner/add-employee`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                alert("Employee added successfully!");
                // Optionally reset form here
            } else {
                alert(data.message || "Failed to add employee");
            }
        } catch (err) {
            alert("An error occurred while submitting the employee.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            className="mx-auto min-h-[55vh] w-full max-w-3xl flex flex-col items-center bg-white/90 rounded-3xl shadow-2xl p-10 border border-blue-100"
            onSubmit={handleSubmit}
        >
            <h2 className="text-3xl font-extrabold text-blue-900 mb-6 tracking-tight">Add Employee</h2>
            <div className="w-full flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => setSubFormState("details")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "details" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Personal Details
                </button>
                <button
                    type="button"
                    onClick={() => setSubFormState("documents")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "documents" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Documents
                </button>
                <button
                    type="button"
                    onClick={() => setSubFormState("education")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "education" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Education
                </button>
                <button
                    type="button"
                    onClick={() => setSubFormState("bank")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "bank" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Bank Details
                </button>
                <button
                    type="button"
                    onClick={() => setSubFormState("job")}
                    className={`p-3 border-2 border-blue-300 border-b-0 rounded-t-xl text-sm font-bold cursor-pointer transition-all duration-300 ${subFormState === "job" ? "bg-blue-500 text-white" : "bg-white text-blue-900 hover:bg-blue-100"}`}
                >
                    Job Specifications
                </button>
            </div>
            <div className="w-full border-t-2 border-blue-200 p-5 bg-white/80 rounded-b-2xl">
                {subFormState === "details" ? (
                    <PersonalDetails personalDetails={personalDetails} setPersonalDetails={setPersonalDetails} />
                ) : subFormState === "documents" ? (
                    <Documents documentFiles={documentFiles} setDocumentFiles={setDocumentFiles} />
                ) : subFormState === "education" ? (
                    <Education educationDetails={educationDetails} setEducationDetails={setEducationDetails} />
                ) : subFormState === "bank" ? (
                    <Bank bankDetails={bankDetails} setBankDetails={setBankDetails} />
                ) : (
                    <JobSpecifications jobDetails={jobDetails} setJobDetails={setJobDetails} />
                )}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-lg self-end font-bold text-sm text-white cursor-pointer hover:bg-blue-600 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form >
    )
}

function PersonalDetails({
    personalDetails,
    setPersonalDetails
}: {
    personalDetails: {
        firstname: string,
        middlename: string,
        lastname: string,
        dob: string,
        mobile: string,
        email: string,
        address: string,
        pic: File | null
    },
    setPersonalDetails: React.Dispatch<React.SetStateAction<{
        firstname: string;
        middlename: string;
        lastname: string;
        dob: string;
        mobile: string;
        email: string;
        address: string;
        pic: File | null;
    }>>
}) {

    const employeePicUploader = useRef<HTMLInputElement>(null)
    const employeePic = useRef<HTMLImageElement>(null)
    const [picUploaded, setPicUploaded] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full grid grid-cols-3 gap-5">
            <div className="col-span-full mb-2">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Personal Details</h3>
            </div>
            <div>
                <label htmlFor="firstname" className="block text-blue-900 font-semibold mb-1">First Name</label>
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="Enter firstname"
                    value={personalDetails.firstname}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="middlename" className="block text-blue-900 font-semibold mb-1">Middle Name</label>
                <input
                    type="text"
                    name="middlename"
                    id="middlename"
                    placeholder="Enter middlename"
                    value={personalDetails.middlename}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="lastname" className="block text-blue-900 font-semibold mb-1">Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter lastname"
                    value={personalDetails.lastname}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="dob" className="block text-blue-900 font-semibold mb-1">Date of Birth</label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder="Enter date of birth"
                    value={personalDetails.dob}
                    onChange={handleChange}
                    className="rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full h-3/5 p-2"
                />
            </div>
            <div>
                <label htmlFor="mobileNo" className="block text-blue-900 font-semibold mb-1">Mobile No</label>
                <input
                    type="text"
                    name="mobile"
                    id="mobileNo"
                    placeholder="Enter mobile no"
                    value={personalDetails.mobile}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="emailId" className="block text-blue-900 font-semibold mb-1">Email Address</label>
                <input
                    type="text"
                    name="email"
                    id="emailId"
                    placeholder="Enter email address"
                    value={personalDetails.email}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div className="col-span-full">
                <label htmlFor="address" className="block text-blue-900 font-semibold mb-1">Address</label>
                <textarea
                    name="address"
                    id="address"
                    placeholder="Enter address"
                    value={personalDetails.address}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 resize-none w-full outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="flex items-center gap-3 col-span-full">
                <label className="block text-blue-900 font-semibold mb-1">Photo</label>
                <input
                    type="file"
                    name=""
                    id=""
                    className="hidden"
                    ref={employeePicUploader}
                    onChange={() => {
                        const file = employeePicUploader.current?.files?.[0]
                        if (!file) return
                        setPicUploaded(true)
                        employeePic.current!.src = URL.createObjectURL(file)
                        setPersonalDetails(prev => ({
                            ...prev,
                            pic: file
                        }))
                    }}
                />
                <button
                    type="button"
                    className="p-3 bg-blue-500 rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300"
                    onClick={() => employeePicUploader.current!.click()}
                >
                    Upload Photo
                </button>
                <img
                    ref={employeePic}
                    alt=""
                    className={`w-40 aspect-square border-0 ${picUploaded ? "" : "hidden"}`}
                />
                {picUploaded && (
                    <p
                        className="text-red-500 underline cursor-pointer self-end"
                        onClick={() => {
                            employeePic.current!.src = ""
                            setPicUploaded(false)
                            setPersonalDetails(prev => ({
                                ...prev,
                                pic: null
                            }))
                        }}
                    >
                        Clear
                    </p>
                )}
            </div>
        </div>
    )
}

function Documents({ documentFiles, setDocumentFiles }: { documentFiles: { aadhaarNo: string, panNo: string, aadhaar: File | null, pan: File | null, voter: File | null }, setDocumentFiles: React.Dispatch<React.SetStateAction<{ aadhaarNo: string, panNo: string, aadhaar: File | null, pan: File | null, voter: File | null }>> }) {
    const aadhaarCardRef = useRef<HTMLInputElement>(null)
    const panCardRef = useRef<HTMLInputElement>(null)
    const voterCardRef = useRef<HTMLInputElement>(null)
    const [aadhaarPreview, setAadhaarPreview] = useState<string>()
    const [panPreview, setPanPreview] = useState<string>()
    const [voterPreview, setVoterPreview] = useState<string>()

    const handleFileChange = (e: ChangeEvent) => {
        const name = (e.currentTarget as HTMLInputElement).name
        const file = (e.currentTarget as HTMLInputElement).files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        if (name === 'aadhaar') setAadhaarPreview(url)
        else if (name === "pan") setPanPreview(url)
        else setVoterPreview(url)
        setDocumentFiles({ ...documentFiles, [name]: file })
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDocumentFiles(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="w-full grid grid-cols-2 gap-5">
            <div className="col-span-full mb-2">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Identity Documents</h3>
            </div>

            {/* Aadhaar Card Section */}
            <div className="col-span-full flex flex-col gap-2 border p-4 rounded-lg border-blue-200 mb-2">
                <h4 className="text-md font-medium text-blue-800">Aadhaar Card</h4>
                <input
                    type="text"
                    name="aadhaarNo"
                    placeholder="Aadhaar Card Number"
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                    value={documentFiles.aadhaarNo}
                    onChange={handleInputChange}
                />
                <div className="flex items-center gap-3 mt-2">
                    <input
                        type="file"
                        name="aadhaar"
                        className="hidden"
                        ref={aadhaarCardRef}
                        accept="application/pdf,image/*"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="p-3 bg-blue-500 rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300"
                        onClick={() => aadhaarCardRef.current?.click()}
                    >
                        Upload Aadhaar Card
                    </button>
                    {documentFiles.aadhaar && (
                        <>
                            <a target="_blank" href={aadhaarPreview} className="text-green-600 text-sm font-medium underline">
                                View File
                            </a>
                            <span className="text-red-500  underline cursor-pointer" onClick={() => {
                                setDocumentFiles({ ...documentFiles, aadhaar: null })
                            }}>Clear</span>
                        </>
                    )}
                </div>
            </div>

            {/* PAN Card Section */}
            <div className="col-span-full flex flex-col gap-2 border p-4 rounded-lg border-blue-200 mb-2">
                <h4 className="text-md font-medium text-blue-800">PAN Card</h4>
                <input
                    type="text"
                    name="panNo"
                    placeholder="PAN Card Number"
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                    value={documentFiles.panNo}
                    onChange={handleInputChange}
                />
                <div className="flex items-center gap-3 mt-2">
                    <input
                        type="file"
                        name="pan"
                        className="hidden"
                        ref={panCardRef}
                        accept="application/pdf,image/*"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="p-3 bg-blue-500 rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300"
                        onClick={() => panCardRef.current?.click()}
                    >
                        Upload PAN Card
                    </button>
                    {documentFiles.pan && (
                        <>
                            <a target="_blank" href={panPreview} className="text-green-600 text-sm font-medium underline">
                                View File
                            </a>
                            <span className="text-red-500  underline cursor-pointer" onClick={() => {
                                setDocumentFiles({ ...documentFiles, pan: null })
                            }}>Clear</span>
                        </>
                    )}
                </div>
            </div>

            {/* Voter Card Section */}
            <div className="col-span-full flex flex-col gap-2 border p-4 rounded-lg border-blue-200">
                <h4 className="text-md font-medium text-blue-800">Voter ID Card</h4>
                <div className="flex items-center gap-3 mt-2">
                    <input
                        type="file"
                        name="voter"
                        className="hidden"
                        ref={voterCardRef}
                        accept="application/pdf,image/*"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="p-3 bg-blue-500 rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300"
                        onClick={() => voterCardRef.current?.click()}
                    >
                        Upload Voter ID Card
                    </button>
                    {documentFiles.voter && (
                        <>
                            <a target="_blank" href={voterPreview} className="text-green-600 text-sm font-medium underline">
                                View File
                            </a>
                            <span className="text-red-500  underline cursor-pointer" onClick={() => {
                                setDocumentFiles({ ...documentFiles, voter: null })
                            }}>Clear</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function Education({ educationDetails, setEducationDetails }: {
    educationDetails: { qualification: string, institute: string, yearOfPassing: string, percentage: number, marksheet: File | null },
    setEducationDetails: React.Dispatch<React.SetStateAction<{ qualification: string, institute: string, yearOfPassing: string, percentage: number, marksheet: File | null }>>

}) {
    const marksheetRef = useRef<HTMLInputElement>(null)
    const [marksheetReview, setMarksheetReview] = useState<string>("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEducationDetails(prev => ({
            ...prev,
            [name]: name === 'percentage' ? parseFloat(value) || 0 : value
        }));
    };

    return (
        <div className="w-full grid grid-cols-2 gap-5">
            <div className="col-span-full mb-2">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Educational Qualifications</h3>
            </div>
            <div>
                <label htmlFor="qualification" className="block text-blue-900 font-semibold mb-1">Highest Qualification</label>
                <input
                    type="text"
                    name="qualification"
                    id="qualification"
                    placeholder="Highest Qualification"
                    value={educationDetails.qualification}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="institute" className="block text-blue-900 font-semibold mb-1">Institute/University</label>
                <input
                    type="text"
                    name="institute"
                    id="institute"
                    placeholder="Institute/University"
                    value={educationDetails.institute}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="yearOfPassing" className="block text-blue-900 font-semibold mb-1">Year of Passing</label>
                <input
                    type="text"
                    name="yearOfPassing"
                    id="yearOfPassing"
                    placeholder="Year of Passing"
                    value={educationDetails.yearOfPassing}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="percentage" className="block text-blue-900 font-semibold mb-1">Percentage/CGPA</label>
                <input
                    type="number"
                    name="percentage"
                    id="percentage"
                    placeholder="Percentage/CGPA"
                    step="0.01"
                    min="0"
                    max="100"
                    value={educationDetails.percentage || ''}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div className="flex items-center gap-3 mt-2 col-span-full">
                <label className="block text-blue-900 font-semibold mb-1">Marksheet</label>
                <input
                    type="file"
                    name="marksheet"
                    className="hidden"
                    ref={marksheetRef}
                    accept="application/pdf,image/*"
                    onChange={(e: ChangeEvent) => {
                        const file = (e.currentTarget as HTMLInputElement).files?.[0]
                        setMarksheetReview(URL.createObjectURL(file || new Blob()))
                        setEducationDetails(prev => ({
                            ...prev,
                            marksheet: file || null
                        }))
                    }}
                />
                <button
                    type="button"
                    className="p-3 bg-blue-500 rounded-lg text-white text-xs font-bold cursor-pointer hover:bg-blue-600 transition-all duration-300"
                    onClick={() => marksheetRef.current?.click()}
                >
                    Upload Marksheet
                </button>
                {marksheetReview && (
                    <>
                        <a target="_blank" href={marksheetReview} className="text-green-600 text-sm font-medium underline">
                            View File
                        </a>
                        <span className="text-red-500 underline cursor-pointer" onClick={() => {
                            setEducationDetails(prev => ({
                                ...prev,
                                marksheet: null
                            }))
                        }}>Clear</span>
                    </>
                )}
            </div>
        </div>
    )
}

function Bank({ bankDetails, setBankDetails }: {
    bankDetails: {
        accountHolderName: string, bankName: string, accountNumber: string, ifscCode: string,
        branchName: string, accountType: string
    },
    setBankDetails: React.Dispatch<React.SetStateAction<{ accountHolderName: string, bankName: string; accountNumber: string, ifscCode: string, branchName: string, accountType: string }>>
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBankDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full grid grid-cols-2 gap-5">
            <div className="col-span-full mb-2">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Bank Account Details</h3>
            </div>
            <div>
                <label htmlFor="accountHolderName" className="block text-blue-900 font-semibold mb-1">Account Holder Name</label>
                <input
                    type="text"
                    name="accountHolderName"
                    id="accountHolderName"
                    placeholder="Account Holder Name"
                    value={bankDetails.accountHolderName}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="bankName" className="block text-blue-900 font-semibold mb-1">Bank Name</label>
                <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    placeholder="Bank Name"
                    value={bankDetails.bankName}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="accountNumber" className="block text-blue-900 font-semibold mb-1">Account Number</label>
                <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    placeholder="Account Number"
                    value={bankDetails.accountNumber}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="confirmAccountNumber" className="block text-blue-900 font-semibold mb-1">Confirm Account Number</label>
                <input
                    type="text"
                    name="confirmAccountNumber"
                    id="confirmAccountNumber"
                    placeholder="Confirm Account Number"
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="ifscCode" className="block text-blue-900 font-semibold mb-1">IFSC Code</label>
                <input
                    type="text"
                    name="ifscCode"
                    id="ifscCode"
                    placeholder="IFSC Code"
                    value={bankDetails.ifscCode}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="branchName" className="block text-blue-900 font-semibold mb-1">Branch Name</label>
                <input
                    type="text"
                    name="branchName"
                    id="branchName"
                    placeholder="Branch Name"
                    value={bankDetails.branchName}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="accountType" className="block text-blue-900 font-semibold mb-1">Account Type</label>
                <select
                    name="accountType"
                    id="accountType"
                    value={bankDetails.accountType}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                >
                    <option value="" hidden>Select Account Type</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                    <option value="salary">Salary</option>
                </select>
            </div>
        </div>
    )
}

function JobSpecifications({ jobDetails, setJobDetails }: {
    jobDetails: { post: string, amount: number, paymentFrequency: string, joiningDate: string, accessLevel: string },
    setJobDetails: React.Dispatch<React.SetStateAction<{ post: string, amount: number, paymentFrequency: string, joiningDate: string, accessLevel: string }>>
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setJobDetails(prev => ({
            ...prev,
            [name]: name === 'amount' ? parseFloat(value) || 0 : value
        }));
    };

    return (
        <div className="w-full grid grid-cols-2 gap-5">
            <div className="col-span-full mb-2">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Job Specifications</h3>
            </div>
            <div>
                <label htmlFor="post" className="block text-blue-900 font-semibold mb-1">Job Post</label>
                <input
                    type="text"
                    name="post"
                    id="post"
                    placeholder="Enter job post name"
                    value={jobDetails.post}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="joiningDate" className="block text-blue-900 font-semibold mb-1">Joining Date</label>
                <input
                    type="date"
                    name="joiningDate"
                    id="joiningDate"
                    placeholder="Joining Date"
                    value={jobDetails.joiningDate}
                    onChange={handleChange}
                    className="rounded-lg border-2 border-blue-200 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-blue-900 font-semibold mb-1">Payable Amount</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter payable amount"
                    value={jobDetails.amount || ''}
                    onChange={handleChange}
                    className="p-2 pl-3 rounded-lg border-2 border-blue-200 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
            </div>
            <div>
                <label htmlFor="paymentFrequency" className="block text-blue-900 font-semibold mb-1">Payment Frequency</label>
                <select
                    name="paymentFrequency"
                    id="paymentFrequency"
                    value={jobDetails.paymentFrequency}
                    onChange={handleChange}
                    className="p-2 rounded-lg border-2 border-blue-200 h-3/5 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                >
                    <option value="" hidden>Select Frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="hourly">Hourly</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>
            <div>
                <label htmlFor="accessLevel" className="block text-blue-900 font-semibold mb-1">Access Level</label>
                <select
                    name="accessLevel"
                    id="accessLevel"
                    value={jobDetails.accessLevel}
                    onChange={handleChange}
                    className="p-2 rounded-lg border-2 border-blue-200 h-3/5 outline-none focus:ring-2 focus:ring-blue-400 w-full"
                >
                    <option value="" hidden>Select Access Level</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
        </div>
    )
}