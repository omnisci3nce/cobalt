import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import authService from '../services/auth.service'

export type User = {
  username: string;
  id: string;
  is_admin: boolean;
}

interface AuthContext {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  // Attempt a login on mount so when we refresh page we can check that we're logged in
  useEffect(() => {
    authService
      .checkLoggedIn()
      .then(setUser)
      .catch(() => setUser(undefined))
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>
}

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext)

  const login = async (username: string, password: string) => {
    const response = await authService.login(username, password)
    if (response.loggedIn) {
      setUser({ username: response.username, id: response.user_id, is_admin: response.is_admin })
    } else {
      setUser(undefined)
      console.error(response.status)
    }
  }

  const logout = async () => {
    await authService.logout()
    setUser(undefined)
  }

  return { user, login, logout }
}

export { AuthProvider, useAuth }