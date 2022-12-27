import axios from 'axios'
import { User } from '../hooks/use-auth'

async function login(username: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }) } ).then(res => res.json())
  return res
}

async function logout() {
  return axios.get('/api/auth/logout')
}

async function checkLoggedIn() {
  const res = await axios.get('/api/auth/loggedIn')
  return res.data
}

export default { login, logout, checkLoggedIn }