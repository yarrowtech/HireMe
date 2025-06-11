
import { createContext, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const RequestsContext = createContext<RequestsContextType | null>(null)

function RequestsContextProvider({ children }: { children: ReactNode }) {
    const [requests, setRequests] = useState<Request[]>([])

    async function fetchRequests() {
        const token = localStorage.getItem("authToken")
        const metadata = localStorage.getItem("metadata")
        if (!token || !metadata) {
            return
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/partner/get-requests`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token}`,
                "metadata": metadata
            }
        })
        const data = await res.json();
        if (res.ok) {
            setRequests(data);
        } else {
            toast.error(data.message || "Failed to fetch requests");
        }
    }

    return (
        <RequestsContext.Provider value={{ requests, fetchRequests }}>
            {children}
        </RequestsContext.Provider>
    )
}

type RequestsContextType = {
    requests: Request[],
    fetchRequests: () => Promise<void>
}

export type Request = {
    id: number
    CompanyName: string
    Contact: string
    Email: string
    Address: string
    ESI: string
    PF: string
    PAN: string
    PAN_No: string
    MOA: string
    CIN: string
    GST: string
    TradeLicense: string
    MSMC: string
    Status: "PENDING" | "APPROVED" | "REJECTED"
}

export default function RequestsLayout() {
    return (
        <RequestsContextProvider>
            <Outlet />
        </RequestsContextProvider>
    )
}