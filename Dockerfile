# Use phusion/passenger-full as base image. To make your builds reproducible, make
# sure you lock down to a specific version, not to `latest`!
# See https://github.com/phusion/passenger-docker/blob/master/Changelog.md for
# a list of version numbers.
FROM phusion/passenger-nodejs:0.9.14

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# ...put your own build instructions here...

#### This will go into a separate image eventually.
# Mongodb (alternatively, I guess you could just meteor run without a bundle and expect things to work)
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get -qq update
RUN apt-get -yqq install mongodb-org

# Create the default data directory
RUN mkdir -p /data/db

EXPOSE 27017
#####


#### The web app side;
RUN apt-get install -y curl
RUN curl https://install.meteor.com/ | sh
WORKDIR /opt/application

ADD .meteor/packages /tmp/app/.meteor/packages
ADD .meteor/release /tmp/app/.meteor/release
WORKDIR /tmp/app/
# This is a hack to force meteor to install the dependencies.
RUN meteor build tmp.tgz

ADD . /tmp/app/

RUN meteor build --directory /opt/application/

# install dependencies
WORKDIR /opt/application/bundle/programs/server
RUN npm install

# setup nginx config
ADD webapp.conf /etc/nginx/sites-enabled/webapp.conf

# Remove the default site from nginx
RUN rm /etc/nginx/sites-enabled/default

# Enable nginx
RUN rm -f /etc/service/nginx/down

EXPOSE 3000

# do you even need this?
WORKDIR /opt/application/bundle
CMD ROOT_URL=http://reqman.io/ \
    PORT=3000 \
    MONGO_URL=mongodb://$MONGO_PORT_27017_TCP_ADDR/meteor \
    node main.js


# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*