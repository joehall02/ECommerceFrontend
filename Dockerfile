# Frontend image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the production-ready static site
RUN npm run build

# Install lightweight static file server
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the built frontend with a simple static server
CMD ["serve", "-s", "build"]