import { createContext, useState, type ReactNode } from "react";

export const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({ children }: { children: ReactNode }) {
    const [userState, setUserState] = useState<UserState>({ username: "Kishore", companyName: null, position: "guest" })
    return (
        <UserContext.Provider value={{ userState, setUserState }}>
            {children}
        </UserContext.Provider>
    )
}

type UserContextType = {
    userState: UserState
    setUserState: React.Dispatch<React.SetStateAction<UserState>>
}

type UserState = {
    username: string
    companyName: null | string
    position: string 
}