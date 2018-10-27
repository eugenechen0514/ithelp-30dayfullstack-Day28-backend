FROM node:10

# Localtime
ENV TZ=Asia/Taipei
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Use private registry
RUN npm set registry http://127.0.0.1:4873

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Main server
EXPOSE 3001

# Default command for executing container
#CMD [ "npm", "start" ]
