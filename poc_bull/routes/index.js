const Bull = require('bull');
const express = require('express');
const queues = require('../constants');

const router = express.Router();

const getIp = (req) => {
  const ip = req.connection.remoteAddress.split(':') .pop();
  return ip === '1' ? 'localhost' : ip;
};

/* GET home page. */
router.route('/')
  .get((req, res) =>{
    let response = { success: true, queues };
    return res.json(response)
  });

router.route('/job')
  .get(async (req, res, next) =>{
    let success = false;
    let data = {}
    try{
      const q1 = new Bull(queues.q1);
      const from = getIp(req);
      const job = await q1.add({ from });
      data = { job };
      success = true;
    } catch (err) {
      return next(err)
    }
    return res.json({ success, ...data })
  })
  .post(async (req, res, next) =>{
    let success = false;
    let data = {}
    try{
      const { body } = req;
      const { date } = body;
      const q3 = new Bull(queues.q3);
      const from = getIp(req);
      const start = (new Date(date).getTime());
      const now = (new Date().getTime());
      let delay = 0;
      if(start > now){
        delay = start - now;
      }
      const job = await q3.add({ from, start }, { delay });
      data = { job };
      success = true;
    } catch (err) {
      return next(err)
    }
    return res.json({ success, ...data })
  })
  .put(async (req, res, next) =>{
    let success = false;
    let data = {}
    try{
      const { body } = req;
      const { date, cant, time } = body;
      const q5 = new Bull(queues.q5);
      const from = getIp(req);
      const start = (new Date(date).getTime());
      const job = await q5.add({ from, start, cant }, { repeat: { every: time*1000, limit: cant }});
      data = { job };
      success = true;
    } catch (err) {
      return next(err)
    }
    return res.json({ success, ...data })
  });



module.exports = router;
