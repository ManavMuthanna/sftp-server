# Step 1: Build the React app and serve in a single stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY package.json package-lock.json ./

# Install only production dependencies (avoiding devDependencies)
RUN npm install --omit=dev

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' to serve static files
RUN npm install -g serve

# Remove node_modules to reduce image size (since it's only needed during build)
RUN rm -rf node_modules

# Expose port 3000 (or any other port you choose)
EXPOSE 3000

# Serve the app using 'serve'
CMD ["serve", "-s", "build"]
