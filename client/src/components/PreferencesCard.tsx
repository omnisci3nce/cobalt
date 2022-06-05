import { Card, createStyles, Group, Switch, Text } from "@mantine/core"

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

  const items = () => (
    <Group className={classes.item} position='apart' noWrap spacing='xl'>
      <div>
      <Text>Anonymous uploads</Text>
      <Text size='xs' color='dimmed'>Allow anyone to upload videos, even those who are not logged in.</Text>
      </div>
      <Switch onLabel='on' offLabel='off' size='lg' />
    </Group>
  )

  return (
    <Card withBorder radius='md' p='xl' sx={{ maxWidth: '600px' }}>
      <Text size='lg' weight={500}>
        Configure preferences
      </Text>
      
      {items()}

    </Card>
  )
}