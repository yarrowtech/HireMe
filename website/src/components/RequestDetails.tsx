import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { RequestsContext, type Request } from "../context/RequestsContext"
import LeftArrow from "../assets/left-arrow-white.svg"
import ApproveIcon from "../assets/approve.svg"
import RejectIcon from "../assets/reject.svg"

export default function RequestDetails() {
    const { id } = useParams()
    const { requests } = useContext(RequestsContext)!
    const [requestDetails, setRequestDetails] = useState<Request | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const found = requests.find(req => req.reqId === parseInt(id!))
        setRequestDetails(found || null)
    }, [id, requests])

    if (!requestDetails) {
        return (
            <section className="mt-[15vh] flex flex-col items-center justify-center min-h-[40vh]">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">Request Not Found</h2>
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all"
                    onClick={() => navigate(-1)}
                >
                    <img src={LeftArrow} className="w-5" alt="Back" />
                    Back
                </button>
            </section>
        )
    }

    // Placeholder handlers for approve/reject
    const handleApprove = () => {
        // Implement approve logic here
        alert("Request approved!")
    }
    const handleReject = () => {
        // Implement reject logic here
        alert("Request rejected!")
    }

    return (
        <section className="w-full max-w-2xl my-[15vh] mx-auto flex flex-col items-center gap-8">
            <div className="w-full flex items-center mb-8">
                <button
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow hover:bg-blue-600 hover:scale-105 transition-all cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <img src={LeftArrow} className="w-5" alt="Back" />
                    Back
                </button>
                <h2 className="flex-1 text-center font-extrabold text-blue-900 text-4xl">Request Details</h2>
            </div>
            <div className="w-full rounded-2xl bg-white/90 border border-blue-100 shadow-xl p-8 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="font-bold text-blue-900 text-2xl md:w-1/3">Company Name:</span>
                    <span className="text-lg text-blue-800">{requestDetails.companyName}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="font-bold text-blue-900 text-2xl md:w-1/3">Mobile No:</span>
                    <span className="text-lg text-blue-800">{requestDetails.mobileNo}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="font-bold text-blue-900 text-2xl md:w-1/3">Email ID:</span>
                    <span className="text-lg text-blue-800">{requestDetails.emailId}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <span className="font-bold text-blue-900 text-2xl md:w-1/3">Address:</span>
                    <span className="text-lg text-blue-800">{requestDetails.address}</span>
                </div>
            </div>
            <div className="flex gap-8 mt-6">
                <button
                    onClick={handleApprove}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl shadow font-bold text-lg hover:bg-green-600 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    <img src={ApproveIcon} className="w-6" alt="Approve" />
                    Approve
                </button>
                <button
                    onClick={handleReject}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl shadow font-bold text-lg hover:bg-red-600 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <img src={RejectIcon} className="w-6" alt="Reject" />
                    Reject
                </button>
            </div>
        </section>
    )
}