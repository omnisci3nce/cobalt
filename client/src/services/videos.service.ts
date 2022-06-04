import axios from 'axios'
import { SetStateAction } from 'react'

async function getVideos() {
  return await fetch('http://localhost:8000/videos').then(res => res.json())
}

async function createVideo(data: any) {
  return await fetch('http://localhost:8000/videos', {
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
  return await axios.post(`http://localhost:8000/videos/${videoId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (data) => progressCallback(Math.round((100 * data.loaded) / data.total))
  })
}

async function deleteVideo(videoId: string) {
  return await fetch(`http://localhost:8000/videos/${videoId}`, {
    method: 'DELETE'
  })
}

export { getVideos, createVideo, uploadVideo, deleteVideo }