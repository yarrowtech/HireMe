import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import PDFIcon from "../assets/pdfIcon.svg"
import Bin from "../assets/bin.svg"
import { useNavigate } from "react-router-dom";

export default function BecomePartner() {
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

    return (
        <>
            <form
                className="w-[60vw] shadow-2xl p-10 flex flex-col items-center rounded-2xl bg-white/90 gap-5 my-[15vh] mx-auto border border-blue-100"
                onSubmit={handleSubmit}
            >
                <h2 className="underline text-3xl font-extrabold text-blue-900 mb-2 tracking-tight">Become a Partner</h2>
                <input
                    type="text"
                    name="CompanyName"
                    placeholder="Enter company name"
                    className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={requestDetails.CompanyName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="Contact"
                    placeholder="Enter contact no"
                    className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={requestDetails.Contact}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="Email"
                    placeholder="Enter email id"
                    className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={requestDetails.Email}
                    onChange={handleInputChange}
                />
                <textarea
                    name="Address"
                    className="resize-none w-4/5 h-[20vh] p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter address"
                    value={requestDetails.Address}
                    onChange={handleInputChange}
                ></textarea>
                <input
                    type="text"
                    name="CIN"
                    placeholder="CIN No"
                    className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={requestDetails.CIN}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="PAN_No"
                    placeholder="PAN Card Number"
                    className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    value={requestDetails.PAN_No}
                    onChange={handleInputChange}
                />

                {/* PAN Card File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">PAN Card (Upload file)</label>
                    <input
                        type="file"
                        ref={panCardRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "PAN")}
                    />
                    <button type="button" onClick={() => panCardRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload PAN Card</button>
                    {files.PAN && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.PAN!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("PAN")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                {/* ESI File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">ESI (Upload file)</label>
                    <input
                        type="file"
                        ref={esiRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "ESI")}
                    />
                    <button type="button" onClick={() => esiRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload ESI</button>
                    {files.ESI && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.ESI!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("ESI")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                {/* PF File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">PF (Upload file)</label>
                    <input
                        type="file"
                        ref={pfRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "PF")}
                    />
                    <button type="button" onClick={() => pfRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload PF</button>
                    {files.PF && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.PF!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("PF")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                {/* MOA File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">MOA (Upload file)</label>
                    <input
                        type="file"
                        ref={moaRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "MOA")}
                    />
                    <button type="button" onClick={() => moaRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload MOA</button>
                    {files.MOA && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.MOA!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("MOA")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                {/* MSMC File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">MSMC (Upload file)</label>
                    <input
                        type="file"
                        ref={msmcRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "MSMC")}
                    />
                    <button type="button" onClick={() => msmcRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload MSMC</button>
                    {files.MSMC && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.MSMC!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("MSMC")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                {/* GST Certificate File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">GST Certificate (Upload file)</label>
                    <input
                        type="file"
                        ref={gstRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "GST")}
                    />
                    <button type="button" onClick={() => gstRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload GST Certificate</button>
                    {files.GST && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.GST!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("GST")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                {/* Trade License File Upload */}
                <div className="w-4/5 flex flex-col gap-2">
                    <label className="font-semibold text-blue-900">Trade License (Upload file)</label>
                    <input
                        type="file"
                        ref={tradeRef}
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={e => handleFileInputChange(e, "TradeLicense")}
                    />
                    <button type="button" onClick={() => tradeRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload Trade License</button>
                    {files.TradeLicense && <div className="flex gap-2">
                        <button
                            type="button"
                            className="rounded bg-green-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-green-600 transition self-start"
                            onClick={() => handlePreview(files.TradeLicense!)}
                        >
                            Preview <img src={PDFIcon} />
                        </button>
                        <button
                            type="button"
                            className="rounded bg-red-500 text-white px-3 flex items-center py-1 text-sm font-semibold hover:bg-red-600 transition self-start"
                            onClick={() => clearFile("TradeLicense")}
                        >
                            <img src={Bin} />
                        </button>
                    </div>}
                </div>

                <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-3/5 transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
            </form>
            {previewVisible && <DocumentPreview fileData={previewData} setPreviewVisible={setPreviewVisible} />}
        </>
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