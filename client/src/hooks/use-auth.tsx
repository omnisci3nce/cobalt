import { createContext, useContext, useState } from 'react'
import { login as apiLogin } from '../services/auth.service'

const authContext = createContext({})

type User = {
  username: string;
}
function useProvideAuth() {
  const [user, setUser] = useState<User>()

  const login = (username: string, password: string) => {
    apiLogin(username, password)
      .then((data: any) => {
        setUser(data)
      })
  }

  const logout = () => {
    setUser(undefined)
  }

  return {
    user,
    login,
    logout,
  }
}

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
  return useContext(authContext)
}
