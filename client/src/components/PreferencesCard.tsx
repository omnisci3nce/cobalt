import { Card, createStyles, Group, NumberInput, Switch, Text, TextInput } from "@mantine/core"

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

export function PreferencesCard() {
  const { classes } = useStyles()

  const items = (<>
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
      <Switch onLabel='on' offLabel='off' size='lg' />
    </Group>

    <Group className={classes.item} position='apart' noWrap spacing='xl'>
      <div>
      <Text>Maximum file size</Text>
      <Text size='xs' color='dimmed'></Text>
      </div>
      <NumberInput placeholder='1024MB' />
    </Group>
  </>
  )

  return (
    <Card withBorder radius='md' p='xl' sx={{ maxWidth: '600px' }}>
      <Text size='lg' weight={500} mb='xl'>
        Configure preferences
      </Text>
      
      {items}

    </Card>
  )
}