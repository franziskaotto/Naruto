# Dockerfile for React Client

# Build React client
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

#installing dependencies
RUN node -v
RUN npm install


#copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

