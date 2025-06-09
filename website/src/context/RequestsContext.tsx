
import { createContext, useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const RequestsContext = createContext<RequestsContextType | null>(null)

function RequestsContextProvider({ children }: { children: ReactNode }) {
    const [requests, setRequests] = useState<Request[]>([
            {
                reqId: 9,
                companyName: "XYZ company",
                mobileNo: "+90 1234567890",
                emailId: "abcafdafafd@gmail.com",
                address: "kolkata, india, 700143"
            },
            {
                reqId: 0,
                companyName: "ABC company",
                mobileNo: "+90 1234567890",
                emailId: "abcafdafafd@gmail.com",
                address: "kolkata, india, 700143"
            },
            {
                reqId: 1,
                companyName: "ABD company",
                mobileNo: "+90 1234567890",
                emailId: "abcafdafafd@gmail.com",
                address: "kolkata, india, 700143"
            },
            {
                reqId: 4,
                companyName: "YZX company",
                mobileNo: "+90 1234567890",
                emailId: "abcafdafafd@gmail.com",
                address: "kolkata, india, 700143"
            }
        ])
    return (
        <RequestsContext.Provider value={{ requests }}>
            {children}
        </RequestsContext.Provider>
    )
}

type RequestsContextType = {
    requests: Request[]
}

export type Request = {
    reqId: number
    companyName: string
    mobileNo: string
    emailId: string
    address: string
}

export default function RequestsLayout() {
    return (
        <RequestsContextProvider>
            <Outlet />
        </RequestsContextProvider>
    )
}