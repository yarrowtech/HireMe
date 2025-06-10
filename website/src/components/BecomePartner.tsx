import { useRef, useState } from "react";
import { toast } from "react-toastify";

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

    const panCardRef = useRef<HTMLInputElement>(null);
    const gstRef = useRef<HTMLInputElement>(null);
    const tradeRef = useRef<HTMLInputElement>(null);
    const esiRef = useRef<HTMLInputElement>(null);
    const pfRef = useRef<HTMLInputElement>(null);
    const moaRef = useRef<HTMLInputElement>(null);
    const msmcRef = useRef<HTMLInputElement>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        console.log(requestDetails);
        

        // Append text fields
        Object.entries(requestDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Append files if selected
        if (panCardRef.current?.files?.[0]) formData.append("PAN", panCardRef.current.files[0]);
        if (esiRef.current?.files?.[0]) formData.append("ESI", esiRef.current.files[0]);
        if (pfRef.current?.files?.[0]) formData.append("PF", pfRef.current.files[0]);
        if (moaRef.current?.files?.[0]) formData.append("MOA", moaRef.current.files[0]);
        if (msmcRef.current?.files?.[0]) formData.append("MSMC", msmcRef.current.files[0]);
        if (gstRef.current?.files?.[0]) formData.append("GST", gstRef.current.files[0]);
        if (tradeRef.current?.files?.[0]) formData.append("TradeLicense", tradeRef.current.files[0]);

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/partner/send-request`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            alert("An error occurred while submitting the request.");
        }
    }

    return (
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
                <input type="file" ref={panCardRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => panCardRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload PAN Card</button>
            </div>

            {/* ESI File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">ESI (Upload file)</label>
                <input type="file" ref={esiRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => esiRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload ESI</button>
            </div>

            {/* PF File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">PF (Upload file)</label>
                <input type="file" ref={pfRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => pfRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload PF</button>
            </div>

            {/* MOA File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">MOA (Upload file)</label>
                <input type="file" ref={moaRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => moaRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload MOA</button>
            </div>

            {/* MSMC File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">MSMC (Upload file)</label>
                <input type="file" ref={msmcRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => msmcRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload MSMC</button>
            </div>

            {/* GST Certificate File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">GST Certificate (Upload file)</label>
                <input type="file" ref={gstRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => gstRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload GST Certificate</button>
            </div>

            {/* Trade License File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">Trade License (Upload file)</label>
                <input type="file" ref={tradeRef} style={{ display: 'none' }} />
                <button type="button" onClick={() => tradeRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload Trade License</button>
            </div>

            <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-3/5 transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                Submit
            </button>
        </form>
    )
}