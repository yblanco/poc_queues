const Queue = require('bee-queue');
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
    queue.on('ready', () => {
      console.log(`> processing jobs on ${name}...`);
      queue.process((job, done) => {
        console.log(`>> processing job ${job.id} on ${queue.name}: ${JSON.stringify(job.data)}`);
        return done(null, true);
      });
    });
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
