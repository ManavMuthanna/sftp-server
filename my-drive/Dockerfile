# Use a single base image for both build and runtime
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Define build arguments
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_SFTP_HOME_PATH="upload"

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy the rest of the application files
COPY . .

# Build the application, passing in the environment variables
RUN REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL} REACT_APP_SFTP_HOME_PATH=${REACT_APP_SFTP_HOME_PATH} npm run build

# Use the same image for serving the built application
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/build ./build

# Install serve globally to serve static files
RUN npm install -g serve

# Expose port 3000 for the application
EXPOSE 3000

# Start the application using serve
CMD ["serve", "-s", "build", "-l", "3000"]
