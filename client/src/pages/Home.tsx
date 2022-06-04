import { SimpleGrid, Paper, Card, Text, Button, Modal } from '@mantine/core'
import { getVideos, deleteVideo } from '../services/videos.service'
import {Trash} from 'tabler-icons-react'
import {useMutation, useQuery, useQueryClient} from 'react-query'

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
  
function VideoCard({ video, onDeleteClick }: VideoCardProps) {
  return (
    <Card>
      <Card.Section>
        <video controls crossOrigin='true' style={{ maxHeight: '300px' }} src={`http://localhost:8000/uploads/${video.id}/${video.filename}`} />
        {/* <Image src={video.thumbnail} /> */}
      </Card.Section>
  
      <Text weight={600} size='md'>{video.name}</Text>
  
      <Button variant='light' color='red' onClick={() => onDeleteClick()}><Trash size={18} /> </Button>
    </Card>
  )
}

export default function() {
  const queryClient = useQueryClient()
  const videos = useQuery('videos', getVideos)
  const deleteMutation = useMutation(deleteVideo)

  return (
    <>
        
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 755, cols: 1, spacing: 'sm' },
          // { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {videos.isSuccess && videos.data.map((video: any) => <VideoCard key={video.id} video={video} onDeleteClick={() => deleteMutation.mutateAsync(video.id).then(() => queryClient.invalidateQueries('videos'))} />)}
      </SimpleGrid>

      <Paper my='md' shadow='md' sx={{ maxWidth: '500px'}}>
        {/* <UploadForm /> */}
      </Paper>

    </>
  )
}
