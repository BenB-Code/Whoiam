# Dockerfile
# Multi-stage build pour Angular

# Base
FROM node:22-alpine AS base
WORKDIR /app

# Sys dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Copy app dependencies
COPY package*.json ./

# Development
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 4200
EXPOSE 9229
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll","2000"]

# Build production
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# Production
FROM node:22-alpine AS production
WORKDIR /app
COPY package*.json .

# Install only dependencies, not devs
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

# Get files from last building stage
COPY --from=builder /app/dist ./dist

# Non-root user
RUN addgroup -g 1001 -S nodejs &&\
    adduser -S angular -u 1001

# Change files property with new user
RUN chown -R angular:nodejs /app

# Switch to right user
USER angular

# Expose SSR port
EXPOSE 4000

# Set env
ENV NODE_ENV=production

# Start SSR server
CMD ["node", "dist/Whoiam/server/server.mjs"]


