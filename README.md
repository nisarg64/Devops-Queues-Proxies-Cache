# Devops HW3 - Queues, Proxies and Cache
Understanding the basic building blocks that form complex infrastructure is an important precedent to being able to construct and deploy it.

## Installation:
- Install a stable version of NodeJS (v0.10.31 or higher)
- Install redis and start the redis-server on port 6379

## Setup:
- Clone the github repository:
```
git clone https://github.com/nisarg64/Devops-Queues-Proxies-Cache.git
```
- Install node modules:
```
cd Devops-Queues-Proxies-Cache
npm install
```

## Start Application Server Instances and a Proxy Server:
- Enter the following command to start 3 application server instances at ports 3000, 3001 and 3002:
```
node main.js
```
- Enter the following command to start a proxy server listening at port 9090:
```
node proxy-server.js
```




