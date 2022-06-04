import { Card, Text, Button } from '@mantine/core'
import { Trash } from 'tabler-icons-react'

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
  return (
    <Card>
      <Card.Section>
        <video controls crossOrigin='true' style={{ maxHeight: '300px' }} src={`/api/uploads/${video.id}/${video.filename}`} />
        {/* <Image src={video.thumbnail} /> */}
      </Card.Section>

      <Text weight={600} size='md'>{video.name}</Text>

      <Button variant='light' color='red' onClick={() => onDeleteClick()}><Trash size={18} /> </Button>
    </Card>
  )
}