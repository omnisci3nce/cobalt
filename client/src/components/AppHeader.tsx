import { useState } from 'react'
import { Text, Header, Button, Group, TextInput, Modal, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Search, Upload } from 'tabler-icons-react'
import UploadForm from './UploadForm'
import LoginForm from './LoginForm'
import { useAuth } from '../hooks/use-auth'

export default function () {
  const [uploadModalOpened, setUploadModalOpened] = useState(false)
  const [loginFormOpened, setLoginFormOpened] = useState(false)
  const theme = useMantineTheme()
  const auth = useAuth()

  return (
    <>
      <Modal
        opened={uploadModalOpened}
        onClose={() => setUploadModalOpened(false)}
        title='Upload Video'
      >
        <UploadForm onSuccess={() => setUploadModalOpened(false)} />
      </Modal>
      <Modal
        opened={loginFormOpened}
        onClose={() => setLoginFormOpened(false)}
        title='Login'
      >
        <LoginForm onSuccess={() => setLoginFormOpened(false)} />
      </Modal>
      <Header height={60} p="xs" px='xl'>
        <Group sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Text weight={600} size='lg' color={theme.colorScheme === 'dark' ? 'white' : 'blue'} component={Link} to='/'>Cobalt</Text>
          <TextInput icon={<Search size={18} />} placeholder='Search...' />
          <Group sx={{ flexWrap: 'nowrap' }}>
            <Button leftIcon={<Upload size={20} />} onClick={() => setUploadModalOpened(true)}>Upload</Button>
            { auth.user ? 
              <Button variant='subtle' color='gray' onClick={() => setLoginFormOpened(true)}>Login</Button>
              : <Button>Logout</Button>
            }
           
          </Group>
        </Group>
      </Header>
    </>
  )
}