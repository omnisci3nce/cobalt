import { SimpleGrid } from '@mantine/core'
import { getVideos, deleteVideo } from '../services/videos.service'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import VideoCard from '../components/VideoCard'

export default function () {
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
        ]}
      >
        {videos.isSuccess && videos.data.map((video: any) => <VideoCard key={video.video_id} video={video} onDeleteClick={() => deleteMutation.mutateAsync(video.video_id).then(() => queryClient.invalidateQueries('videos'))} />)}
      </SimpleGrid>
    </>
  )
}
