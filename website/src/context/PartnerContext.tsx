import React from "react"
import { Outlet } from "react-router-dom";

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

    return (
        <PartnersContext.Provider value={{allPartners, fetchPartnerList}}>
            {children}
        </PartnersContext.Provider>
    )
}

type PartnersContextType = {
    allPartners: PartnerData[] | null
    fetchPartnerList: () => Promise<void>
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