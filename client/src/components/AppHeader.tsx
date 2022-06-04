import { useState } from 'react'
import { Text, Header, Button, Group, TextInput, Modal } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Search, Upload } from 'tabler-icons-react'
import UploadForm from './UploadForm'
import LoginForm from './LoginForm'

export default function () {
  const [uploadModalOpened, setUploadModalOpened] = useState(false)
  const [loginFormOpened, setLoginFormOpened] = useState(false)

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
        <LoginForm />
      </Modal>
      <Header height={60} p="xs" px='xl'>
        <Group sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Text weight={600} size='lg' color='white' component={Link} to='/'>Cobalt</Text>
          <TextInput icon={<Search size={18} />} placeholder='Search...' />
          <Group sx={{ flexWrap: 'nowrap' }}>
            <Button leftIcon={<Upload size={20} />} onClick={() => setUploadModalOpened(true)}>Upload</Button>
            <Button variant='subtle' color='gray' onClick={() => setLoginFormOpened(true)}>Login</Button>
          </Group>
        </Group>
      </Header>
    </>
  )
}