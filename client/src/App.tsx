import { useState } from 'react'
import { Box, MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Watch from './pages/Watch'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import Preferences from './pages/Preferences'

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>

    <div style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Box p='xl' sx={(theme) => ({
        minHeight: 'calc(100vh - 100px)',
        // height: '100%',
        backgroundColor: theme.colorScheme === 'dark' ? theme.black : theme.colors.gray[1]
      })}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watch/:videoId' element={<Watch />} />
          <Route path='/preferences' element={<Preferences />} />
          <Route path='/search' element={<></>}/>
        </Routes>
      </Box>
        <AppFooter />
    </div>
    </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
