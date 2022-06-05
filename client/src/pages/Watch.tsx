import { Box } from '@mantine/core'
import { useParams } from 'react-router-dom'
import WatchVideo from '../components/WatchVideo'

export default function() {
  const { videoId } = useParams()

  return (
    <Box sx={{
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      {
        videoId && <WatchVideo videoId={videoId} />
      }

    </Box>
  )
}