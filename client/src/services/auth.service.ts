import axios from 'axios'

async function login(username: string, password: string) {
  const res = await axios.post('/api/auth/login', { username, password })
  return res
}

async function logout() {
  return axios.get('/api/auth/logout')
}

export { login, logout }