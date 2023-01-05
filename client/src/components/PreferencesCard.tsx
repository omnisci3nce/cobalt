import { Card, createStyles, Group, Loader, NumberInput, Switch, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useQuery } from "react-query";
import { getConfig, getConfigs } from "../services/config.service";

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
    <TextInput placeholder='Instance name' defaultValue={initialValues.instanceName} />
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
  const keys = ['INSTANCE_NAME', 'ALLOW_ANON_UPLOADS']
  const { isLoading, isError, data, error } = useQuery(['preferences', keys], () => getConfigs(keys))

  console.log(data)

  const body = () => {
    if (isLoading) {
      return <Loader />
    } else if (isError) {
      return <Text size='sm'>Unable to fetch preferences</Text>
    } else {
      return data && (<Form initialValues={{
        instanceName: data['INSTANCE_NAME'].value,
        allowAnonUploads: data['ALLOW_ANON_UPLOADS'].value === 'true',
        maxFileSize: 1024
      }} /> )
    }
  }


  return (
    <Card withBorder radius='md' p='xl' sx={{ maxWidth: '600px' }}>
      <Text size='lg' weight={500} mb='xl'>
        Configure preferences
      </Text>
      
      {body()}

    </Card>
  )
}