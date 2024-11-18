# Frontend image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package.json .
RUN npm install

# Copy the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
# Devlopment mode
CMD ["npm", "start"]