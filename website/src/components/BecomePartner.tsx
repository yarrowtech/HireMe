import { useRef, useState } from "react";

export default function BecomePartner() {
    const panCardRef = useRef<HTMLInputElement>(null);
    const gstRef = useRef<HTMLInputElement>(null);
    const tradeRef = useRef<HTMLInputElement>(null);
    const esiRef = useRef<HTMLInputElement>(null);
    const pfRef = useRef<HTMLInputElement>(null);
    const moaRef = useRef<HTMLInputElement>(null);
    const msmcRef = useRef<HTMLInputElement>(null);

    const [panCardFile, setPanCardFile] = useState<File | null>(null);
    const [gstFile, setGstFile] = useState<File | null>(null);
    const [tradeFile, setTradeFile] = useState<File | null>(null);
    const [esiFile, setEsiFile] = useState<File | null>(null);
    const [pfFile, setPfFile] = useState<File | null>(null);
    const [moaFile, setMoaFile] = useState<File | null>(null);
    const [msmcFile, setMsmcFile] = useState<File | null>(null);

    return (
        <form className="w-[60vw] shadow-2xl p-10 flex flex-col items-center rounded-2xl bg-white/90 gap-5 my-[15vh] mx-auto border border-blue-100">
            <h2 className="underline text-3xl font-extrabold text-blue-900 mb-2 tracking-tight">Become a Partner</h2>
            <input type="text" placeholder="Enter company name" className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="Enter contact no" className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="Enter email id" className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400" />
            <textarea className="resize-none w-4/5 h-[20vh] p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter address"></textarea>

            <input type="text" placeholder="CIN No" className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400" />

            <input type="text" placeholder="PAN Card Number" className="w-4/5 p-3 border-2 border-blue-200 rounded outline-none focus:ring-2 focus:ring-blue-400" />

            {/* PAN Card File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">PAN Card (Upload file)</label>
                <input type="file" ref={panCardRef} style={{ display: 'none' }} onChange={e => setPanCardFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => panCardRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload PAN Card</button>
                {panCardFile && <span className="text-sm text-gray-700 mt-1">{panCardFile.name}</span>}
            </div>

            {/* ESI File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">ESI (Upload file)</label>
                <input type="file" ref={esiRef} style={{ display: 'none' }} onChange={e => setEsiFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => esiRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload ESI</button>
                {esiFile && <span className="text-sm text-gray-700 mt-1">{esiFile.name}</span>}
            </div>

            {/* PF File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">PF (Upload file)</label>
                <input type="file" ref={pfRef} style={{ display: 'none' }} onChange={e => setPfFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => pfRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload PF</button>
                {pfFile && <span className="text-sm text-gray-700 mt-1">{pfFile.name}</span>}
            </div>

            {/* MOA File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">MOA (Upload file)</label>
                <input type="file" ref={moaRef} style={{ display: 'none' }} onChange={e => setMoaFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => moaRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload MOA</button>
                {moaFile && <span className="text-sm text-gray-700 mt-1">{moaFile.name}</span>}
            </div>

            {/* MSMC File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">MSMC (Upload file)</label>
                <input type="file" ref={msmcRef} style={{ display: 'none' }} onChange={e => setMsmcFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => msmcRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload MSMC</button>
                {msmcFile && <span className="text-sm text-gray-700 mt-1">{msmcFile.name}</span>}
            </div>

            {/* GST Certificate File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">GST Certificate (Upload file)</label>
                <input type="file" ref={gstRef} style={{ display: 'none' }} onChange={e => setGstFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => gstRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload GST Certificate</button>
                {gstFile && <span className="text-sm text-gray-700 mt-1">{gstFile.name}</span>}
            </div>

            {/* Trade License File Upload */}
            <div className="w-4/5 flex flex-col gap-2">
                <label className="font-semibold text-blue-900">Trade License (Upload file)</label>
                <input type="file" ref={tradeRef} style={{ display: 'none' }} onChange={e => setTradeFile(e.target.files?.[0] || null)} />
                <button type="button" onClick={() => tradeRef.current?.click()} className="rounded bg-blue-500 text-white px-3 py-1 text-sm font-semibold hover:bg-blue-600 transition self-start">Upload Trade License</button>
                {tradeFile && <span className="text-sm text-gray-700 mt-1">{tradeFile.name}</span>}
            </div>

            <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 p-3 text-white font-bold cursor-pointer w-3/5 transition-all duration-300 hover:bg-blue-600 hover:scale-105 shadow focus:outline-none focus:ring-2 focus:ring-blue-400">
                Submit
            </button>
        </form>
    )
}