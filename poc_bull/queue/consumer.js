const Bull = require('bull');
var ping = require('ping');
const queues = require('../constants');

const q1 = new Bull(queues.q1);
const q2 = new Bull(queues.q2);
const q3 = new Bull(queues.q3);
const q4 = new Bull(queues.q4);
const q5 = new Bull(queues.q5);

q1.process(async (job) => {
  const { data } = job;
  const { from } = data;
  ping.sys.probe(from, (isAlive) => {
    if(isAlive) {
      q2.add({ from, max: parseInt(Math.random()*100, 10) });
    }
  });
});

q2.process(async (job) => {
  const { data } = job;
  const { from , max } = data;
  let count = max;
  do {
    count--;
  } while (count > 0);
});


q3.process(async (job) => {
  const { data } = job;
  q4.add(data);
});

q4.process(5, async (job) => {
  const { data } = job;
  const { from , start } = data;
  await new Promise(resolve=>setTimeout(resolve,2000));
  return true;
});

q5.process(async (job) => {
  const { data } = job;
  const { from , cant } = data;
});


module.exports = true;
