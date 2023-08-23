# Use the official Node.js image as the base image
FROM node:slim
# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
# COPY package*.json ./

# Install project dependencies
# RUN npm install

# Copy the rest of the application files to the container
COPY ../ .

# Expose the port your Express app listens on (replace 3000 with your port if needed)
EXPOSE 3000

# Command to run your application, assuming your entry point is index.js
CMD ["node", "app.js"]
