FROM node:18

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

RUN npm run build

# Uses port which is used by the actual application
EXPOSE 5000

CMD npm run start
