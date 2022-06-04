import { PasswordInput, Stack, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { login } from '../services/auth.service'

export default function({ onSuccess }: any) {
  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    }
  })

  return (
    <form onSubmit={form.onSubmit((values) => {
      try {
        login(values.username, values.password).then((res) => {
          console.log(res)
          onSuccess()
        })
      } catch (err) {
        console.error(err)
      }
    })}>
      <Stack>
        <TextInput label='Username' {...form.getInputProps('username')} />
        <PasswordInput label='Password' {...form.getInputProps('password')} />
        <Button type='submit'>Submit</Button>
      </Stack>
    </form>
  )
}