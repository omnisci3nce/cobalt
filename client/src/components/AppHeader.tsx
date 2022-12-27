import { useState } from 'react'
import { Text, Header, Button, Group, TextInput, Modal, Menu, useMantineTheme, createStyles, Divider, useMantineColorScheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { ChevronDown, MoonStars, Search, Settings, SettingsAutomation, SettingsOff, Sun, Upload } from 'tabler-icons-react'
import UploadForm from './UploadForm'
import LoginForm from './LoginForm'
import { useAuth } from '../hooks/use-auth'
import { useQuery } from 'react-query'
import { getConfig } from '../services/config.service'

export default function () {
  const [uploadModalOpened, setUploadModalOpened] = useState(false)
  const [loginFormOpened, setLoginFormOpened] = useState(false)
  const theme = useMantineTheme()
  const { classes } = useStyles()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const { user, login, logout } = useAuth()
  const allowAnonUpload = useQuery(['config', { key: 'ALLOW_ANON_UPLOADS' }], () => getConfig('ALLOW_ANON_UPLOADS'))

  const uploadEnabled = user || (allowAnonUpload.isSuccess && allowAnonUpload.data.value === 'true')

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
          <Text className={classes.appHeading} weight={600} size='lg' component={Link} to='/'>Cobalt</Text>
          <TextInput className={classes.search} icon={<Search size={18} />} placeholder='Search...' />
          <Group sx={{ flexWrap: 'nowrap' }}>
            <Button disabled={!uploadEnabled} leftIcon={<Upload size={20} />} onClick={() => setUploadModalOpened(true)}>Upload</Button>
            {!user &&
              <Button variant='subtle' onClick={() => {
                login('josh', 'josh')
              }}>Login</Button>
            }

            <Button variant='subtle' leftIcon={colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />} onClick={() => toggleColorScheme()}>
              {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>

            <Button variant='subtle' color='gray' onClick={() => setLoginFormOpened(true)}>Login</Button>
            {user && (
              <Menu
                control={<Button variant='subtle' size='sm' rightIcon={<ChevronDown size={18} />}>{user.username}</Button>}
              >
                <Menu.Item icon={<Settings size={18} />} component={Link} to='/preferences'>
                  Preferences
                </Menu.Item>
                <Menu.Item icon={colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />} onClick={() => toggleColorScheme()}>
                  {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Menu.Item>
                <Divider />
                <Menu.Item onClick={() => logout()}>
                  Logout
                </Menu.Item>
              </Menu>
            )}
          </Group>
        </Group>
      </Header>
    </>
  )
}

const useStyles = createStyles((theme) => ({
  appHeading: {
    color: theme.colorScheme === 'dark' ? 'white' : theme.colors.blue
  },
  search: {
    flexGrow: 1,
    maxWidth: '330px'
  }
}))