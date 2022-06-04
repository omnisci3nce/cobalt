import { Card, Text, Button, createStyles, Group, ActionIcon } from '@mantine/core'
import { Clock, Trash } from 'tabler-icons-react'

type Video = {
  id: string;
  name: string;
  filename: string;
  // thumbnail: string;
}

interface VideoCardProps {
  video: Video;
  onDeleteClick: any
}

export default function VideoCard({ video, onDeleteClick }: VideoCardProps) {
  const { classes } = useStyles()

  return (
    <Card>
      <Card.Section>
        <video controls crossOrigin='true' style={{ maxHeight: '200px' }} src={`/api/uploads/${video.id}/${video.filename}`} />
        {/* <Image src={video.thumbnail} /> */}
      </Card.Section>

      <Card.Section className={classes.info} mt='sm'>
        <Text size="lg" weight={500}>
          {video.name}
        </Text>
        <Text size='sm' color='dimmed'>
          Uploaded 4 minutes ago
        </Text>
      </Card.Section>

      <Group sx={{ justifyContent: 'flex-end', alignItems: 'center' }} pt='sm'>
        <Button variant='light' color='red' onClick={() => onDeleteClick()}><Trash size={18} /> </Button>
      </Group>

    </Card>
  )
}

const useStyles = createStyles((theme) => ({
  info: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  watchLater: {
    color: theme.colors.gray[5],
  }
}))