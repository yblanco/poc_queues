const express = require('express');
const Queue = require('bee-queue');
const router = express.Router();

const queues = require('../constants');

const queueSetting = { isWorker: false }


/* GET home page. */
router.route('/')
  .get((req, res) =>{
    let response = {
      success: true,
      app: req.app_name,
      version: req.app_version,
      queues
    };
    return res.json(response)
  });


router.get('/job/:id', async (req, res, next) => {
  let success = false;
  let data = {}
  try{
    const { params }= req;
    const { id } = params;
    const age = parseInt(Math.random()*100, 10);
    await new Queue(queues.q1, queueSetting)
      .createJob({ age, id })
      .retries(2).save()
      .then(result => {
        success = true;
        data = { job: result.id, age };
      });
  } catch (err) {
    return next(err)
  }
  return res.json({ success, ...data })
});

module.exports = router;
