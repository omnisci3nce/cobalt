import { Card, Text, Button, createStyles, Group, Image } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Trash } from 'tabler-icons-react'
import { useAuth } from '../hooks/use-auth';

type Video = {
  video_id: string;
  name: string;
  filename: string;
  created_at: Date;
  created_by: string;
  // thumbnail: string;
}

interface VideoCardProps {
  video: Video;
  onDeleteClick: any
}

export default function VideoCard({ video, onDeleteClick }: VideoCardProps) {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const auth = useAuth()
  console.log(auth.user?.id)
  console.log(video)

  return (
    <Card>
      <Card.Section sx={{ height: '240px', cursor: 'pointer' }} onClick={() => navigate(`/watch/${video.video_id}`)}>
        {/* <video controls crossOrigin='true' style={{ maxHeight: '200px' }} src={`/api/uploads/${video.video_id}/${video.filename}`} /> */}
        <Image sx={{ height: '100%', overflow: 'hidden' }}src={`/api/uploads/${video.video_id}/thumbnail.png`} />
      </Card.Section>

      <Card.Section className={classes.info} mt='sm' onClick={() => navigate(`/watch/${video.video_id}`)}>
        <Text size="lg" weight={500}>
          {video.name}
        </Text>
        <Text size='sm' color='dimmed'>
          {new Intl.DateTimeFormat().format(new Date(video.created_at))}

        </Text>
      </Card.Section>

      <Group sx={{ justifyContent: 'flex-end', alignItems: 'center' }} pt='sm'>
        { auth.user && ((video.created_by && auth.user?.id == video.created_by) || (auth.user.is_admin)) &&
        <Button variant='light' color='red' onClick={() => onDeleteClick()}><Trash size={18} /> </Button>
        
        }
      </Group>


    </Card>
  )
}

const useStyles = createStyles((theme) => ({
  info: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    cursor: 'pointer'
  },
  watchLater: {
    color: theme.colors.gray[5],
  }
}))