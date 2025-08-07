import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FaBuilding, FaPhone, FaEnvelope, FaMapMarkerAlt, FaIdCard, FaFileUpload, FaEye, FaTrash, FaCheck, FaArrowRight, FaArrowLeft, FaShieldAlt, FaCloudUploadAlt, FaTimes } from "react-icons/fa";

export default function BecomePartner() {
    const [currentStep, setCurrentStep] = useState(1);
    const [requestDetails, setRequestDetails] = useState({
        CompanyName: '',
        Contact: '',
        Email: '',
        Address: '',
        CIN: '',
        PAN_No: ''
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setRequestDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const [files, setFiles] = useState<{ [key: string]: File | null }>({
        PAN: null,
        ESI: null,
        PF: null,
        MOA: null,
        MSMC: null,
        GST: null,
        TradeLicense: null
    });
    const [previewData, setPreviewData] = useState("")
    const [previewVisible, setPreviewVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const panCardRef = useRef<HTMLInputElement>(null);
    const gstRef = useRef<HTMLInputElement>(null);
    const tradeRef = useRef<HTMLInputElement>(null);
    const esiRef = useRef<HTMLInputElement>(null);
    const pfRef = useRef<HTMLInputElement>(null);
    const moaRef = useRef<HTMLInputElement>(null);
    const msmcRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate()
    
    const steps = [
        { id: 1, title: "Company Information", description: "Basic company details" },
        { id: 2, title: "Document Upload", description: "Required legal documents" },
        { id: 3, title: "Review & Submit", description: "Verify and submit application" }
    ];

    const fileRequirements = [
        { key: "PAN", label: "PAN Card", ref: panCardRef, required: true },
        { key: "ESI", label: "ESI Certificate", ref: esiRef, required: true },
        { key: "PF", label: "PF Registration", ref: pfRef, required: true },
        { key: "MOA", label: "MOA Document", ref: moaRef, required: true },
        { key: "MSMC", label: "MSMC Certificate", ref: msmcRef, required: false },
        { key: "GST", label: "GST Certificate", ref: gstRef, required: true },
        { key: "TradeLicense", label: "Trade License", ref: tradeRef, required: true }
    ];

    const validateStep = (step: number) => {
        if (step === 1) {
            return requestDetails.CompanyName && requestDetails.Contact && requestDetails.Email && requestDetails.Address && requestDetails.CIN && requestDetails.PAN_No;
        }
        if (step === 2) {
            const requiredFiles = fileRequirements.filter(f => f.required);
            return requiredFiles.every(f => files[f.key as keyof typeof files]);
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        } else {
            toast.error("Please complete all required fields before proceeding.");
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof files) {
        const file = e.target.files?.[0] || null;
        setFiles(prev => ({
            ...prev,
            [field]: file
        }));
    }

    function handlePreview(file: File) {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setPreviewData(URL.createObjectURL(file));
        setPreviewVisible(true);
    }

    function clearFile(field: keyof typeof files) {
        setFiles(prev => ({
            ...prev,
            [field]: null
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();

        // Append text fields
        Object.entries(requestDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Append files from state
        Object.entries(files).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });

        try {
            setIsSubmitting(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/request/send-request`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message)
                navigate("/")
            } else {
                toast.error(typeof data.message === 'object' ? data.message[0] : data.message)
            }
        } catch (err) {
            toast.error("An error occurred while submitting the request.");
        }
        finally {
            setIsSubmitting(false);
        }
    }

    const { userState } = useContext(UserContext)!

    useEffect(() => {
        if (userState.position !== "guest") {
            navigate("/")
            toast.success("You already have an account with us.")
        }
    }, [userState])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/20 to-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-indigo-400/10 to-purple-500/10 rounded-full blur-2xl animate-float" />
            </div>
            
            {/* Floating Grid Pattern */}
            <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTQ3LCAxOTcsIDI1MywgMC4xKSIvPgo8L3N2Zz4=')] opacity-30"></div>

            {/* Back Button */}
            <button 
                onClick={() => navigate('/')}
                className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group z-20"
            >
                <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
            </button>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                        <FaBuilding className="text-3xl text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Partner <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Registration</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Join our ecosystem of trusted partners and unlock new business opportunities
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="mb-12">
                    <div className="flex justify-between items-center">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                                        currentStep >= step.id 
                                            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-110' 
                                            : 'bg-white/10 text-slate-400 border border-white/20'
                                    }`}>
                                        {currentStep > step.id ? <FaCheck /> : step.id}
                                    </div>
                                    <div className="text-center mt-2">
                                        <p className={`font-semibold text-sm ${currentStep >= step.id ? 'text-white' : 'text-slate-400'}`}>
                                            {step.title}
                                        </p>
                                        <p className={`text-xs ${currentStep >= step.id ? 'text-slate-300' : 'text-slate-500'}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                                        currentStep > step.id ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-white/20'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                    {/* Animated border glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[2px] opacity-50 rounded-3xl">
                        <div className="w-full h-full bg-gradient-to-br from-slate-800/90 via-blue-900/90 to-indigo-900/90 rounded-3xl"></div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="relative z-10">
                        {/* Step 1: Company Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <FaBuilding className="text-cyan-400" />
                                    Company Information
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        icon={FaBuilding}
                                        label="Company Name"
                                        name="CompanyName"
                                        placeholder="Enter your company name"
                                        value={requestDetails.CompanyName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <FormField
                                        icon={FaPhone}
                                        label="Contact Number"
                                        name="Contact"
                                        placeholder="Enter contact number"
                                        value={requestDetails.Contact}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        icon={FaEnvelope}
                                        label="Email Address"
                                        name="Email"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={requestDetails.Email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <FormField
                                        icon={FaIdCard}
                                        label="CIN Number"
                                        name="CIN"
                                        placeholder="Corporate Identity Number"
                                        value={requestDetails.CIN}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <FormField
                                    icon={FaIdCard}
                                    label="PAN Number"
                                    name="PAN_No"
                                    placeholder="Enter PAN card number"
                                    value={requestDetails.PAN_No}
                                    onChange={handleInputChange}
                                    required
                                />
                                
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                                        <FaMapMarkerAlt className="text-cyan-400" />
                                        Company Address *
                                    </label>
                                    <textarea
                                        name="Address"
                                        rows={4}
                                        className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-sm transition-all duration-300 resize-none"
                                        placeholder="Enter complete company address"
                                        value={requestDetails.Address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 2: Document Upload */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <FaFileUpload className="text-cyan-400" />
                                    Document Upload
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fileRequirements.map((requirement) => (
                                        <FileUploadCard
                                            key={requirement.key}
                                            label={requirement.label}
                                            fileKey={requirement.key as keyof typeof files}
                                            file={files[requirement.key as keyof typeof files]}
                                            required={requirement.required}
                                            onUpload={() => requirement.ref.current?.click()}
                                            onPreview={(file) => handlePreview(file)}
                                            onDelete={() => clearFile(requirement.key as keyof typeof files)}
                                        />
                                    ))}
                                </div>
                                
                                {/* Hidden file inputs */}
                                {fileRequirements.map((requirement) => (
                                    <input
                                        key={requirement.key}
                                        type="file"
                                        ref={requirement.ref}
                                        accept="application/pdf"
                                        style={{ display: 'none' }}
                                        onChange={e => handleFileInputChange(e, requirement.key as keyof typeof files)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Step 3: Review & Submit */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <FaShieldAlt className="text-cyan-400" />
                                    Review & Submit
                                </h3>
                                
                                <ReviewSection requestDetails={requestDetails} files={files} fileRequirements={fileRequirements} />
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
                                >
                                    <FaArrowLeft />
                                    Previous
                                </button>
                            )}
                            
                            <div className="ml-auto">
                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    >
                                        Next Step
                                        <FaArrowRight />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <FaCheck />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            {previewVisible && <DocumentPreview fileData={previewData} setPreviewVisible={setPreviewVisible} />}
        </div>
    )
}

function DocumentPreview({ fileData, setPreviewVisible }: { fileData: string, setPreviewVisible: React.Dispatch<React.SetStateAction<boolean>> }) {

    const file = useRef<HTMLObjectElement>(null);

    useEffect(() => {
        document.querySelector("body")!.style.overflowY = "hidden";

        window.addEventListener("mousedown", (e) => {
            if (e.target !== file.current) {
                setPreviewVisible(false);
            }
        })


        return () => {
            document.querySelector("body")!.style.overflowY = "scroll";
        }
    }, [])

    return (
        <section className="absolute top-0 left-0 w-screen h-screen flex justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-700 opacity-70 z-20">
            </div>
            <object
                data={fileData}
                type="application/pdf"
                style={{ width: "90%" }}
                className="mx-auto h-full z-30"
                ref={file}
            ></object>
        </section>
    );
}