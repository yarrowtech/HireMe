import { createContext, useState, type ReactNode } from "react";

export const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({ children }: { children: ReactNode }) {
    const [userState, setUserState] = useState<UserState>({ username: "", Company: null, position: "guest" })
    async function updateUserState() {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem("authToken")}` || "",
            }
        })
        const data = await res.json();
        if (res.ok) {
            setUserState({
                username: data.data.Username,
                Company: data.data?.id || null,
                position: data.data.AccountType
            });
        } else {
            setUserState({
                username: "",
                Company: null,
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
    Company: null | number
    position: string 
}