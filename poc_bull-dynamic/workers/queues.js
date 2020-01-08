const Queue = require('bull');
const constants = require('./constants');
const { queueSetting } = constants;

module.exports = class {
  constructor() {
    this.queues = [];
  }
  static findFunction(item, name) {
    return item.name === name;
  }
  allQueues(){
    return this.queues;
  }
  checkQueue(name){
    return this.queues.findIndex(item => this.constructor.findFunction(item, name)) >= 0;
  }
  getQueue(name) {
    if(this.checkQueue(name)) {
      return this.queues.find(item => this.constructor.findFunction(item, name));
    }
    return false;
  }
  createQueue(name) {
    const queue = new Queue(name, queueSetting);
    queue.process((job, done) => {
      console.log(`Job ${job.id} on ${queue.name} is processing`);
      return done(null, true);
    });
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
    queue.on('global:drained', () => {
      console.log(`${name} drained`);
    })
    return queue
  }
  addQueue(name) {
    return new Promise((resolve, reject) => {
      try{
        if(!this.checkQueue(name)) {
          this.queues.push(this.createQueue(name));
        }
        resolve(this.getQueue(name));
      } catch (err) {
        reject(err);
      }
    });
  }

};
