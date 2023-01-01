import axios from 'axios'
import { User } from '../hooks/use-auth'

async function login(username: string, password: string) {
  const res = await axios.post('/api/auth/login', { username, password })
  return res.data
}

async function logout() {
  return axios.get('/api/auth/logout')
}

async function checkLoggedIn() {
  const res = await axios.get('/api/auth/loggedIn')
  return res.data
}

export default { login, logout, checkLoggedIn }