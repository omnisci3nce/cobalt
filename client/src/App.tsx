import { Box } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AppHeader from './components/AppHeader'

function App() {
  return (

    <div style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Box p='xl' sx={(theme) => ({
        minHeight: '100vh',
        height: '100%',
        backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.colors.gray[1]
      })}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>

      </Box>
    </div>
  )
}

export default App
