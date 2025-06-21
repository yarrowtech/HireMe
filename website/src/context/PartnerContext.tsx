import React from "react"
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const PartnersContext = React.createContext<null | PartnersContextType>(null)

export function PartnersContextProvider({ children }: { children: React.ReactNode }) {

    const [allPartners, setAllPartners] = React.useState<PartnerData[] | null>(null)

    async function fetchPartnerList() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/partner-list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("authToken")}` || "",
                "metadata": localStorage.getItem("metadata") || ""
            }
        })
        if (res.ok) {
            const data = await res.json();
            setAllPartners(data);
        } else {
            setAllPartners(null);
        }
    }

    async function fetchPartnerDetails(partnerId: number) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/partner-details/${partnerId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("authToken")}` || "",
                "metadata": localStorage.getItem("metadata") || ""
            }
        })
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            toast.error("Failed to fetch partner details");
        }
    }

    return (
        <PartnersContext.Provider value={{allPartners, fetchPartnerList, fetchPartnerDetails}}>
            {children}
        </PartnersContext.Provider>
    )
}

type PartnersContextType = {
    allPartners: PartnerData[] | null
    fetchPartnerList: () => Promise<void>
    fetchPartnerDetails: (partnerId: number) => Promise<Object | null>
}

type PartnerData = {
    id: number,
    CompanyName: string,
}


export default function PartnerContextLayout() {
    return (
        <PartnersContextProvider>
            <Outlet />
        </PartnersContextProvider>
    )
} 