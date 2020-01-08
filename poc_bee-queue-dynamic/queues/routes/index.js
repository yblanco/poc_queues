const express = require('express');
const axios = require('axios');

const Queue = require('bee-queue');

const router = express.Router();

const constants = require('../constants');
const { queueSetting, workerUrl } = constants;

/* GET home page. */
router.route('/')
  .get(async (req, res, next) =>{
    let success = false;
    let data = {};
    try{
      const request = {
        method: 'get',
        url: `${workerUrl}`,
        responseType: 'json'
      };
      await axios(request)
        .then(response => {
          success = true;
          data = {
            app: req.app_name,
            version: req.app_version,
            queues: response.data.queues
          };
        })
    } catch (err) {
      return next(err)
    }
    return res.json({ success, ...data })
  });

router.route('/job/:queue/:id')
  .get(async (req, res, next) => {
    let success = false;
    let data = {}
    try{
      const { params }= req;
      const { id, queue } = params;
      const request = {
        method: 'get',
        url: `${workerUrl}job/${queue}`,
        responseType: 'json'
      };
      await new Queue(queue, queueSetting)
        .createJob({ id })
        .save()
        .then(job => {
          return axios(request)
            .then((response) => {
              success = true;
              data = { job: job.id, queue: response.data.queue.name };
            });
        });
    } catch (err) {
      return next(err)
    }
    return res.json({ success, ...data })
  });

module.exports = router;
