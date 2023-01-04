import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg'

class FFmpegSingleton {
  private static ffmpegInstance: FFmpeg

  private constructor() {}

  public static async startFFmpeg(): Promise<void> {
    if (!this.ffmpegInstance) {
      const ffmpeg =  createFFmpeg({ log: true })
      await ffmpeg.load()
      FFmpegSingleton.ffmpegInstance = ffmpeg
    }
  }

  public get ffmpeg() {
    return FFmpegSingleton.ffmpegInstance
  }

  public static getInstance() {
    return FFmpegSingleton.ffmpegInstance
  }
}

export default FFmpegSingleton