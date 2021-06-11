FROM node:14

# Create app directory
WORKDIR /back_end

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .


CMD [ "npm", "start" ]