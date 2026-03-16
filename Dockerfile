# Use lightweight Node image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
