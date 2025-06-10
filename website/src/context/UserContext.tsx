import { createContext, useState, type ReactNode } from "react";

export const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({ children }: { children: ReactNode }) {
    const [userState, setUserState] = useState<UserState>({ username: "Kishore", companyName: null, position: "guest" })
    async function updateUserState() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem("authToken") || "",
                "metadata": localStorage.getItem("metadata") || ""
            }
        })
        const data = await res.json();
        
        if (res.ok) {
            setUserState({
                username: data.data.Username,
                companyName: data.data.CompanyName || null,
                position: data.data.type
            });
        } else {
            setUserState({
                username: "",
                companyName: null,
                position: "guest"
            })
        }
    }
    return (
        <UserContext.Provider value={{ userState, setUserState, updateUserState }}>
            {children}
        </UserContext.Provider>
    )
}

type UserContextType = {
    userState: UserState
    setUserState: React.Dispatch<React.SetStateAction<UserState>>
    updateUserState: () => Promise<void>
}

type UserState = {
    username: string
    companyName: null | string
    position: string 
}