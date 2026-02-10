FROM node:22-alpine
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN npm run build
ENTRYPOINT ["npm", "start"]
