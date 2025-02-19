# Stage 1: Build
FROM node:16-slim AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build  # Assuming you have a build script

# Stage 2: Run
FROM node:16-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
EXPOSE 3000
CMD ["yarn", "start"]
