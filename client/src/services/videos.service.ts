import axios from 'axios'

async function getVideos() {
  return await fetch('/api/videos').then(res => res.json())
}

async function getVideo(id: string) {
  return await fetch(`/api/videos/${id}`).then(res => res.json())
}

async function createVideo(data: any) {
  return await fetch('/api/videos', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
}

async function uploadVideo(videoId: string, file: File, progressCallback: any) {
  const formData = new FormData()
  formData.append('video_file', file)
  formData.append('fileName', file.name)
  return await axios.post(`/api/videos/${videoId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (data) => progressCallback(Math.round((100 * data.loaded) / data.total))
  })
}

async function deleteVideo(videoId: string) {
  return await fetch(`/api/videos/${videoId}`, {
    method: 'DELETE'
  })
}

export { getVideos, getVideo, createVideo, uploadVideo, deleteVideo }