###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:20-alpine3.20 AS development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install --legacy-peer-deps
COPY --chown=node:node . .
USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:20-alpine3.20 AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
RUN npm install --only=production --legacy-peer-deps && npm cache clean --force
USER node

###################
# PRODUCTION
###################
FROM node:20-alpine3.20 AS production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
