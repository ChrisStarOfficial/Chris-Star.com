# Use Node.js 20 (HF supports 18/20)
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 7860

# Start Next.js in production
CMD ["npm", "start", "-p", "7860"]
