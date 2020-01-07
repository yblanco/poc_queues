# Proof of concept:

## Features

This app work with 5 queue that do the following:

Queue1:
  - Receive info
  - Create job in Queue2 with IP request
  - Ping IP which asked for create job in Queue1
Queue2:
  - Receive info
  - Do things until some condition is true

Queue3:
  - Receive info
  - Schedule job for the future using the data received

Queue4:
  - Do heavily things

Queue5:
  - Repeat a process n times


## Library for queue

* [Bull](https://optimalbits.github.io/bull/): is a Node library that implements a fast and robust queue system based on redis.Although it is possible to implement queues directly using Redis commands, this library provides an API that takes care of all the low-level details and enriches Redis basic functionality so that more complex use-cases can be handled easily. [References](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md)


`npm install bull`

## Nessage broker
* [Redis](https://redis.io/): is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

### Used by docker:
* [Redis docker image](https://hub.docker.com/_/redis/)
`docker run --name redis -d -v /path/to/host:/data -p 6379:6379 redis redis-server --appendonly yes`


## Setup
Clone the repo and install the dependencies
```bash
git clone https://github.com/yblanco/poc_bull-queue.git
cd poc_bull-queue
npm install
```

To start the express server, run the following

```bash
npm run start:dev
```
The app is running on [http://localhost:3000](http://localhost:3000)

## Use
* **[GET] /**
List queues

* **[GET] /job**
Add a job to the Queue1.

* **[POST] /job { "date": "-DATE FOR START-"}**
Add a job to the Queue2 with delay. The job will be processed at {body.date}.


* **[POST] /job { "date": "-DATE FOR START-", "cant": "-REPEAT CANT-", "time": "-TIME IN SECOND FOR EVERY REPEAT-"}**
Add a job to the Queue5 make it repeat {body.cant} time every {body.time}.

### [TO DO] Dynamics:
[Dynamic queues](https://github.com/OptimalBits/bull/issues/867)
