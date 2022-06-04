import { Card, SimpleGrid, Text, Header, Button, Group, Box, Paper, TextInput } from '@mantine/core'
import { useQuery } from 'react-query'
import { Trash, Upload } from 'tabler-icons-react';
import { getVideos, deleteVideo } from './services/videos.service'
import UploadForm from './components/UploadForm'

type Video = {
  id: string;
  name: string;
  filename: string;
  // thumbnail: string;
}

// const videos: Video[] = [{
//   name: '7 Design Tips for Socials',
//   thumbnail: 'https://blog.snappa.com/wp-content/uploads/2019/09/Social-Video-Thumbnails-Images.jpg'
// }, {
//   name: 'Gaming',
//   thumbnail: 'https://store.hp.com/app/assets/images/uploads/prod/video-game-genres1597871118726439.jpg'
// }]


interface VideoCardProps {
  video: Video
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <Card>
      <Card.Section>
        <video controls crossOrigin='true' style={{ maxHeight: '300px' }} src={`http://localhost:8000/uploads/${video.id}/${video.filename}`} />
        {/* <Image src={video.thumbnail} /> */}
      </Card.Section>

      <Text weight={600} size='md'>{video.name}</Text>

      <Button variant='light' color='red' onClick={() => deleteVideo(video.id)}><Trash size={18} /> </Button>
    </Card>
  )
}

function App() {
  const videos = useQuery('videos', getVideos)

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header height={60} p="xs" px='xl'>
        <Group sx={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Text weight={600} size='lg' color='white'>Cobalt</Text>
          <TextInput placeholder='Search...' />
          <Group sx={{ flexWrap: 'nowrap' }}>
            <Button leftIcon={<Upload size={20} />}>Upload</Button>
            <Button variant='subtle' color='gray'>Login</Button>
          </Group>
        </Group>
      </Header>
      <Box p='xl' sx={(theme) => ({
        minHeight: '100vh',
        height: '100%',
        backgroundColor: theme.black
      })}>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 980, cols: 2, spacing: 'md' },
            { maxWidth: 755, cols: 1, spacing: 'sm' },
            // { maxWidth: 600, cols: 1, spacing: 'sm' },
          ]}
        >
          {videos.isSuccess && videos.data.map((video: any) => <VideoCard key={video.id} video={video} />)}
        </SimpleGrid>

        <Paper my='md' shadow='md' sx={{ maxWidth: '500px'}}>
          <UploadForm />
        </Paper>

      </Box>
    </div>
  )
}

export default App
