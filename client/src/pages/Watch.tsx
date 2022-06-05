import { Box, Container } from '@mantine/core'
import { useParams } from 'react-router-dom'
import WatchVideo from '../components/WatchVideo'

export default function() {
  const { videoId } = useParams()

  return (
    <Container size={1280}>
    {/* <Box sx={{
      // marginLeft: 'auto',
      // marginRight: 'auto',
    }}> */}
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    }}>
      {
        videoId && <WatchVideo videoId={videoId} />
      }

    </Box>
    {/* </Box> */}
    </Container>
  )
}