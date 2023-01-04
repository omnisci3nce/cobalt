import { fetchFile } from '@ffmpeg/ffmpeg'
import FFmpegSingleton from '../../loaders/ffmpeg'

// async function moveFileToUploads() {}
async function generateThumbnail(videoFilePath: string) {
  const ffmpeg = FFmpegSingleton.getInstance() 
  const inputFileName = 'input-video'
  const outputFileName = 'output.png'

  console.log(videoFilePath)

  ffmpeg.FS('writeFile', inputFileName, await fetchFile(videoFilePath))

  await ffmpeg.run(
    '-ss', '00:00:01.000',
    '-i', inputFileName,
    '-frames:v', '1',
    outputFileName
  )

  const outputData = ffmpeg.FS('readFile', outputFileName)
  ffmpeg.FS('unlink', inputFileName)
  ffmpeg.FS('unlink', outputFileName)

  return Buffer.from(outputData)
}

export { generateThumbnail }