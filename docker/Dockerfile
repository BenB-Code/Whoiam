# Dockerfile
# Multi-stage build pour Angular

# Base
FROM node:22-alpine AS base
WORKDIR /app

# Copy app dependencies
COPY package*.json ./

# Development
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 4200
EXPOSE 9229
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

# Build production
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

# Copy built application
COPY --from=builder /app/dist/Whoiam/browser ./

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


