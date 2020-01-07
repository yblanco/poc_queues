const Queue = require('bee-queue');

const queues = require('../constants');

const queueSetting = {
  removeOnSuccess: true,
  storeJobs: false,
}

const queue = new Queue(queues.q1, queueSetting);


queue.on('ready', () => {
  console.log('processing jobs...');
  queue.process((job, done) => {
    console.log('processing job ' + job.id);
    if(job.data.age > 50) {
      return done(new Error("Age must be less than 50"));
    }
    return done(null, true);
  });
  queue.on('error', (err) => {
    console.log(`A queue error happened: ${err.message}`);
  });
  queue.on('job succeeded', (jobId, result) => {
    console.log(`Job ${jobId} succeeded with result: ${result}`);
  });
  queue.on('job retrying', (jobId, err) => {
    console.log(`Job ${jobId} failed with error ${err.message} but is being retried!`);
  });
  queue.on('job failed', (jobId, err) => {
    console.log(`Job ${jobId} failed with error ${err.message}`);
  });
});
