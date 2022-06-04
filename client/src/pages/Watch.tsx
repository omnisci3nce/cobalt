import { Box } from '@mantine/core'
import { useParams } from 'react-router-dom'
import WatchVideo from '../components/WatchVideo'

export default function() {
  const { videoId } = useParams()

  return videoId && (
    <Box sx={{
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>

      <WatchVideo videoId={videoId} />

    </Box>
  )
}