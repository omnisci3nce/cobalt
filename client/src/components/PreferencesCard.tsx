import { Button, Card, createStyles, Group, Loader, NumberInput, Switch, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getConfig, getConfigs } from '../services/config.service'

const useStyles = createStyles((theme) => ({
  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  }
}))

interface PreferencesFormFields {
  instanceName: string;
  allowAnonUploads: boolean;
  maxFileSize: number
}

const PreferencesForm = () => {
  const { classes } = useStyles()
  const queryClient = useQueryClient()
  const { isLoading, isError, data: configs } = useQuery('preferences', () => getConfigs(['INSTANCE_NAME', 'ALLOW_ANON_UPLOADS']), { staleTime: Infinity })
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async () => { throw Error('')},
    onSuccess: () => queryClient.invalidateQueries({ queryKey: 'preferences' }), // reload preferences from server-side after form submission
  })
  
  const form = useForm<PreferencesFormFields>({
    initialValues: {
      instanceName: '',
      allowAnonUploads: false,
      maxFileSize: 1024
    }
  })

  useEffect(() => {
    if (configs) {
      form.setValues({
        instanceName: configs['INSTANCE_NAME'].value,
        allowAnonUploads: configs['ALLOW_ANON_UPLOADS'].value === 'true',
        maxFileSize: 1024
      })
    }
  }, [configs])

  const handleSubmit = async (values: PreferencesFormFields) => {
    return mutate()
  }

  if (isLoading) return <Loader />
  if (isError) return <span>Unable to fetch server settings</span>

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group className={classes.item} position='apart' noWrap spacing='xl'>
        <div>
          <Text>Instance name</Text>
          <Text size='xs' color='dimmed'></Text>
        </div>
        <TextInput placeholder='Instance name' {...form.getInputProps('instanceName', { withError: false })} />
      </Group>

      <Group className={classes.item} position='apart' noWrap spacing='xl'>
        <div>
          <Text>Anonymous uploads</Text>
          <Text size='xs' color='dimmed'>Allow anyone to upload videos, even those who are not logged in.</Text>
        </div>
        <Switch onLabel='on' offLabel='off' size='lg' {...form.getInputProps('allowAnonUploads', { type: 'checkbox', withError: false })} />
      </Group>

      <Group className={classes.item} position='apart' noWrap spacing='xl'>
        <div>
          <Text>Maximum file size</Text>
          <Text size='xs' color='dimmed'></Text>
        </div>
        <NumberInput placeholder='1024MB' {...form.getInputProps('maxFileSize', { withError: false })} />
      </Group>

      <Group position='right' className={classes.item}>
        <Button type='submit' disabled={isSubmitting}>Save</Button>
      </Group>
    </form>
  )}

export function PreferencesCard() {
  return (
    <Card withBorder radius='md' p='xl' sx={{ maxWidth: '600px' }}>
      <Text size='lg' weight={500} mb='xl'>
        Configure preferences
      </Text>
      
      <PreferencesForm />

    </Card>
  )
}