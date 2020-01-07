const Bull = require('bull');
const queues = require('../constants');


const q1 = new Bull(queues.q1);
const q2 = new Bull(queues.q2);
const q3 = new Bull(queues.q3);
const q4 = new Bull(queues.q4);
const q5 = new Bull(queues.q5);


Object.keys(queues).forEach(q => {
  const name = queues[q];
  const queue = new Bull(name);
  queue.on('global:waiting', (job) => {
    console.log(`Job ${job} on ${name} is waiting!`);
  });
  queue.on('global:active', (job) => {
    console.log(`Job ${job} on ${name} is started!`);
  });
  queue.on('global:completed', (job,result) => {
    console.log(`Job ${job} on ${name} is completed!`);
    queue.getJob(job).then((job) => {
      job.remove();
    });
  });
  queue.on('global:failed',(job, err) => {
    console.log(`Job ${job} on ${name} failed: ${err}`)
  })
});

module.exports = true;
