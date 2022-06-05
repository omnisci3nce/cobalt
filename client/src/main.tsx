import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import axios from 'axios'
import { AuthProvider } from './hooks/use-auth'
import './index.css'

axios.interceptors.response.use(function(response) {
  if (response.status === 401) {
    console.warn('Unauthorised. Login')
  }
}, function(error) {
  return Promise.reject(error)
})


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MantineProvider theme={{ colorScheme: 'light' }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </AuthProvider>
  </React.StrictMode>
)
