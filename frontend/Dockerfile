FROM node:16.13.1-alpine
# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

COPY /package.json /app/package.json
RUN npm install

# add app
COPY /. ./

# start app
CMD ["npm", "run", "deploy_start"]