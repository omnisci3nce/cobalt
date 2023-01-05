import { Card, createStyles, Group, NumberInput, Switch, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useQuery } from "react-query";
import { getConfig } from "../services/config.service";

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

const Form = ({ initialValues } : { initialValues: PreferencesFormFields }) => {
  const { classes } = useStyles()

  // const form = useForm({
  //   instanceName: 
  // })

  return (<>
  <Group className={classes.item} position='apart' noWrap spacing='xl'>
    <div>
    <Text>Instance name</Text>
    <Text size='xs' color='dimmed'></Text>
    </div>
    <TextInput placeholder='Instance name' value='Cobalt' />
  </Group>

  <Group className={classes.item} position='apart' noWrap spacing='xl'>
    <div>
    <Text>Anonymous uploads</Text>
    <Text size='xs' color='dimmed'>Allow anyone to upload videos, even those who are not logged in.</Text>
    </div>
    <Switch onLabel='on' offLabel='off' size='lg' defaultChecked={initialValues.allowAnonUploads} />
  </Group>

  <Group className={classes.item} position='apart' noWrap spacing='xl'>
    <div>
    <Text>Maximum file size</Text>
    <Text size='xs' color='dimmed'></Text>
    </div>
    <NumberInput placeholder='1024MB' />
  </Group>
</>
)}

export function PreferencesCard() {
  const { isLoading, isError, data, error } = useQuery(
    ['config', { key: 'ALLOW_ANON_UPLOADS' }],
    () => getConfig('ALLOW_ANON_UPLOADS')
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Unable to fetch preferences:</span>
  }

  return (
    <Card withBorder radius='md' p='xl' sx={{ maxWidth: '600px' }}>
      <Text size='lg' weight={500} mb='xl'>
        Configure preferences
      </Text>
      
      <Form initialValues={{
        instanceName: 'Cobalt',
        allowAnonUploads: data,
        maxFileSize: 1024
      }} />

    </Card>
  )
}