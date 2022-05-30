import { Card, Image, SimpleGrid, Text, Header, Button, Group } from '@mantine/core'

type Video = {
  name: string;
  thumbnail: string;
}

const videos: Video[] = [{
  name: '7 Design Tips for Socials',
  thumbnail: 'https://blog.snappa.com/wp-content/uploads/2019/09/Social-Video-Thumbnails-Images.jpg'
}, {
  name: 'Gaming',
  thumbnail: 'https://store.hp.com/app/assets/images/uploads/prod/video-game-genres1597871118726439.jpg'
}]


interface VideoCardProps {
  video: Video
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <Card>
      <Card.Section>
        <Image src={video.thumbnail} />
      </Card.Section>

      <Text weight={500} size='md'>{video.name}</Text>
    </Card>
  )
} 

function App() {
  return (
    <div>
    <Header height={60} p="xs">
      <Group>
      <Text weight={500}>Cobalt</Text>
      <Button>Login</Button>
      </Group>
    </Header>
    <SimpleGrid cols={4} p='md'>
      {videos.map(video => <VideoCard video={video} />)}
    </SimpleGrid>
    </div>
  )
}

export default App
