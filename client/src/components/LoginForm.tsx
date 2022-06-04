import { PasswordInput, Stack, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function() {
  // const form = useForm({
  //   initialValues: {}
  // })

  return (
    <form>
      <Stack>
        <TextInput label='Username' />
        <PasswordInput label='Password' />
        <Button>Submit</Button>
      </Stack>
    </form>
  )
}