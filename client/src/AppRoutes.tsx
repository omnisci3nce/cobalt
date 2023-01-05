
import { Navigate, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Watch from './pages/Watch'
import Preferences from './pages/Preferences'
import { useAuth } from "./hooks/use-auth"

export default function() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/watch/:videoId' element={<Watch />} />
      <Route path='/preferences' element={user?.is_admin ? <Preferences /> : <Navigate to="/" />} />
      <Route path='/search' element={<></>}/>
    </Routes>
  )
}