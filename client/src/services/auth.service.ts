import axios from 'axios'

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

export { login, logout }