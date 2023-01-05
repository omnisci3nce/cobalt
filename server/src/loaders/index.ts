import { getDb } from '../lib/database'
import Logger from '../lib/logger'
import FFmpegSingleton from './ffmpeg'

export async function loadAll() {
  Logger.info('run all loaders')
  await FFmpegSingleton.startFFmpeg() // load ffmpeg
  Logger.info('loaded FFmpeg')

  try {
    Logger.info('connecting to postgres...')
    const db = getDb() // this will cause new Database() to be run
    Logger.info('created pool')
  } catch (e) {
    Logger.error(`failed to connect to postgres database with error: ${e}`)
  }
}

export async function shutdownAll() {
  // 
}