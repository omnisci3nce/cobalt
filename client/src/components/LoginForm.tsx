import { PasswordInput, Stack, TextInput, Button, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { useAuth } from '../hooks/use-auth'

interface LoginFormFields {
  username: string;
  password: string
}

export default function({ onSuccess }: any) {
  const { login } = useAuth()
  const form = useForm<LoginFormFields>({
    initialValues: {
      username: '',
      password: ''
    }
  })
  const [errorText, setErrorText] = useState<string | null>(null)

  const handleSubmit = ({ username, password }: LoginFormFields) => {
    return login(username, password)
      .then((res) => {
        onSuccess()
      })
      .catch(e => {
        setErrorText(e.response.data.message)
      })
  }

  return (
    <form onSubmit={form.onSubmit((values) => {
      handleSubmit(values)
    })}>
      <Stack>
        <TextInput label='Username' {...form.getInputProps('username', { withError: false })} />
        <PasswordInput label='Password' {...form.getInputProps('password', { withError: false })} />
        <Button type='submit'>Submit</Button>
        { errorText && <Text color='red'>{errorText}</Text> }
      </Stack>
    </form>
  )
}