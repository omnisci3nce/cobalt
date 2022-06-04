import { Card, Image, SimpleGrid, Text, Header, Button, Group, Box, Paper, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useQuery } from 'react-query'

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
        <video style={{ maxHeight: '300px' }} crossOrigin='true' src={`http://localhost:8000/uploads/${video.id}/${video.filename}`} />
        {/* <Image src={video.thumbnail} /> */}
      </Card.Section>

      <Text weight={500} size='md'>{video.name}</Text>
    </Card>
  )
} 

async function getVideos() {
  return await fetch('http://localhost:8000/videos').then(res => res.json())
}

interface FormValues {
  name: string;
  file: File | undefined; // values that may be undefined cannot be inferred
}

function App() {
  const videos = useQuery('videos',  getVideos)

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      file: undefined
    },
    validate: {
      name: (value) => (value.length <= 2 ? 'Video name must be over 2 characters' : value.length > 64 ? 'Video name must be 64 characters or less' : null)
    }
  })

  return (
    <div style={{ height: '100vh' }}>
    <Header height={60} p="xs">
      <Group>
      <Text weight={500} color='white'>Cobalt</Text>
      <Button>Login</Button>
      </Group>
    </Header>
    <Box sx={(theme) => ({
      height: '100vh',
      backgroundColor: theme.black
    })}>
    <SimpleGrid cols={4} p='md'>
      {videos.isSuccess && videos.data.map((video: any) => <VideoCard key={video.id} video={video} />)}
    </SimpleGrid>

    <Paper shadow='md'>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps('name')}
        />
        <input type='file' onChange={(event) => event.target.files && form.setFieldValue('file', event.target.files[0])} />
        <Button type='submit' color='gray'>Submit</Button>
      </form>
    </Paper>

    </Box>
    </div>
  )
}

export default App
