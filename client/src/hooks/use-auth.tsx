import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { login as apiLogin, logout as apiLogout } from '../services/auth.service'

type User = {
  username: string;
  id: string;
  is_admin: boolean;
}

interface AuthContextInterface {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>
}

const AuthContext = createContext<AuthContextInterface>({ user: undefined, setUser: () => {
  // 
}})

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  // Attempt a login on mount so when we refresh page we can check that we're logged in
  useEffect(() => {
    apiLogin('Joshua', 'joshua').then((data) => {
      if (data.loggedIn) {
        console.log('Data', data)
        setUser(data)
      }
    })
  }, [])

  return <AuthContext.Provider value={{ user, setUser }}>
    {children}
  </AuthContext.Provider>
}

const useAuth = () => {
  const { user, setUser } =  useContext(AuthContext)

  const login = async (username: string, password: string) => {
    const user = await apiLogin(username, password)
    setUser({ username: user.username, id: user.user_id, is_admin: user.is_admin })
  } 

  const logout = async () => {
    await apiLogout()
    setUser(undefined)
  }

return { user, login, logout }
}

export { AuthProvider, useAuth }