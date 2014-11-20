# Request Manager Queue #

A simple, accessible app to handle incoming requests, 
management of requests and integration with other systems.

## Installing and Running ##

	1. The traditional way:

	Provided you don't have a problem with security and trust https://install.meteor.com/ ...

	$ curl https://install.meteor.com/ | sh
	$ cd rmq
	$ meteor

	View the application at: http://localhost:3000/

	2. Using phusion-passenger:

	(OSX)
	$ brew install passenger
	$ brew install nginx --with-passenger
	$ sudo /usr/bin/gem install daemon_controller
	$ passenger start

	View the application at http://localhost:3000/

	3. Using Docker:

	(OSX)
	$ brew install boot2docker
	$ boot2docker init && boot2docker up
	$ # export DOCKER_HOST, DOCKER_CERT_PATH, DOCKER_TLS_VERIFY
	$ # optionally you may have brew upgraded and need to boot2docker stop && boot2docker download && boot2docker up 
	$ docker build -t rmq . 
	