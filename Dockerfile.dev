# Frontend image
FROM node:20-alpine

# Create a non-root user and group
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the application code
COPY . .

# Build the production-ready static site
RUN npm run build

# Install lightweight static file server
RUN npm install -g serve

# Change ownership of the application files to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose port 3000
EXPOSE 3000

# Serve the built frontend with a simple static server
CMD ["serve", "-s", "dist"]