import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Logger from '../../lib/logger'

const ffmpegInstance = createFFmpeg({ log: true })
let ffmpegLoadingPromise = ffmpegInstance.load()

ffmpegInstance.isLoaded()

// async function moveFileToUploads() {}
async function generateThumbnail(videoFilePath: string) {
  if (!ffmpegInstance.isLoaded()) throw new Error('ffmpeg must be available')

  const inputFileName = 'input-video'
  const outputFileName = 'output.png'

  console.log('point 1')

  console.log(videoFilePath)

  ffmpegInstance.FS('writeFile', inputFileName, await fetchFile(videoFilePath))

  await ffmpegInstance.run(
    '-ss', '00:00:01.000',
    '-i', inputFileName,
    '-frames:v', '1',
    outputFileName
  )

  const outputData = ffmpegInstance.FS('readFile', outputFileName)
  ffmpegInstance.FS('unlink', inputFileName)
  ffmpegInstance.FS('unlink', outputFileName)

  Logger.debug('HERE')

  return Buffer.from(outputData)
}

export { generateThumbnail }