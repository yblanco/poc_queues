# Proof of concept Bee Que creating queue dynamically:

## Library for queue

* [Bee Queue](https://github.com/bee-queue/bee-queue): A simple, fast, robust job/task queue for Node.js, backed by Redis.

`npm install bee-queue`

## Nessage broker
* [Redis](https://redis.io/): is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. Redis has built-in replication, Lua scripting, LRU eviction, transactions and different levels of on-disk persistence, and provides high availability via Redis Sentinel and automatic partitioning with Redis Cluster.

### Used by docker:
* [Redis docker image](https://hub.docker.com/_/redis/)
`docker run --name redis -d -v /path/to/host:/data -p 6379:6379 redis redis-server --appendonly yes`


## Setup
Clone the repo and install the dependencies
```bash
git clone https://github.com/yblanco/poc_queues.git
cd poc_bee-queue-dynamic
npm install
```

To start the express server on develop environment, run the following

```bash
cd poc_bee-queue-dynamic
npm run start:dev
npm run worker:dev
```
The app is running on [http://localhost:4002](http://localhost:4002)
The worker is running  on [http://localhost:4003](http://localhost:4003)

## Use
* **[GET] :4002/**
List queues

* **[GET] :4002/job/:queue/:id**
Add a job to the {params.queue} with id {params.id}
