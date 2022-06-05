import { Worker } from 'bullmq'


const worker = new Worker('videos', async job => {
    console.log(job.data)
})

worker.on('completed', job => {
    console.log(`${job.id} has completed!`)
  })
  
  worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`)
  })