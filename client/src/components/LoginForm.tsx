import { PasswordInput, Stack, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function({ onSuccess }: any) {
  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    }
  })

  return (
    <form onSubmit={form.onSubmit((values) => {
      console.log(values)
    })}>
      <Stack>
        <TextInput label='Username' {...form.getInputProps('username')} />
        <PasswordInput label='Password' {...form.getInputProps('password')} />
        <Button type='submit'>Submit</Button>
      </Stack>
    </form>
  )
}