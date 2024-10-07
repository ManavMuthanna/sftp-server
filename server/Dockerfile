# Use a lightweight Node.js runtime (Alpine version)
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your Express API runs on (default is 3000)
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]
