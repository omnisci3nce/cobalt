import { Loader } from '@mantine/core'
import { useQuery } from 'react-query'
import { getVideo } from '../services/videos.service'


export default function({ videoId }: any) {
  const videoQuery = useQuery(['video', videoId], () => getVideo(videoId))
  return videoQuery.isSuccess ? (

    <video controls crossOrigin='true' style={{}} src={`/api/uploads/${videoQuery.data.video_id}/${videoQuery.data.filename}`} />
  ) : <Loader />
}