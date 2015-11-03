# Devops HW3 - Queues, Proxies and Cache
Understanding the basic building blocks that form complex infrastructure is an important precedent to being able to construct and deploy it.

#### Screencast Link : https://youtu.be/mPgcmCvKLOc

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

## Application routes:
Go to any web browser and call the following URLs:

### Set/Get:
Set a key using /set route and then fetch that key using /get route
```
http://localhost:9090/set
http://localhost:9090/get
```

### Recent:
Get the list of 5 recently visited sites using /recent route. 
```
http://localhost:9090/recent
```
Note: /recent won't be included in the list

### Upload/Meow:
Run curl command to upload an image:
```
curl -F "image=@./img/morning.jpg" localhost:9090/upload
```
View the most recently uploaded image usinf /meow
```
http://localhost:9090/meow
```

## Application Servers:
Running main.js start 3 application server instances running on ports 3000, 3001 and 3002.

## Proxy Server:
- Running proxy-server.js start a proxy server which redirects different http requests to application servers in a round-robin fashion.
- Application server instances are maintained as a list in redis
- Redis command 'rpoplpush' is used to get/pop an app server instance from the list and push it at the end of the list.
- Proxy server redirects request to the poppedapp server instance


