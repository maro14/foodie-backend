# Use the official Node.js image with Yarn and Ubuntu as the base image
FROM node:14-slim

# Set the working directory inside the container
WORKDIR /usr/src/app


# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies using Yarn
RUN yarn install

# Copy all project files to the container
COPY . .

# Expose the port on which your Node.js application runs (change 3000 to your desired port)
EXPOSE 3000

# Command to start your Node.js application
CMD ["yarn", "start"]
