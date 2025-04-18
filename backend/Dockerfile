# Use Node.js Alpine base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (inside container)
RUN npm install

# Copy rest of the source code
COPY . .

# Expose the backend port
EXPOSE 5555

# Run the server
CMD ["node", "server.js"]
