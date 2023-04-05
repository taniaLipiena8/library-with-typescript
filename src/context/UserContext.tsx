import { ReactNode, createContext } from "react";

export type UserContextType = {
    user_id: string | null,
    username: string | null
}

type UserContextProviderType = {
    children: ReactNode
}

export const UserContext = createContext<UserContextType | null>(null)

const UserContextProvider = ({ children }: UserContextProviderType) => {
    const user_id = localStorage.getItem('user_id')
    const username = localStorage.getItem('username')

    return (
        <UserContext.Provider value={{ user_id, username }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider