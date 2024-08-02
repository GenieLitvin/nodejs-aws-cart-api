ARG NODE_VERSION=20.14.0
# alpine - the light version of node
FROM node:${NODE_VERSION}-alpine
WORKDIR /app

#Copy package*.json file, intall dependencies
COPY package*.json ./
ENV NODE_ENV development
RUN npm ci --only=production && npm cache clean --force
#
# copy source
COPY . .

#build
RUN npm run build

USER node
EXPOSE 3001
ENTRYPOINT  ["node","dist/main-local.js"]