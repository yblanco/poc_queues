const express = require('express');
const Queue = require('bee-queue');
const router = express.Router();

/* GET home page. */
router.route('/')
  .get((req, res) =>{
    const { queues }= req;
    let response = {
      success: true,
      app: req.app_name,
      version: req.app_version,
      queues: queues.allQueues(),
    };
    return res.json(response)
  });

router.route('/job/:queue')
  .get(async (req, res, next) => {
    let success = false;
    let data = {};
    try{
      const { params, queues }= req;
      const { queue } = params;
      await queues.addQueue(queue)
        .then(result => {
          data = { queue: result };
          success = true;
        })
    } catch (err) {
      return next(err)
    }
    return res.json({ success, ...data })
  });

module.exports = router;
