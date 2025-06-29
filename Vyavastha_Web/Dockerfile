# Multi-stage build for Vyavastha Web (Vite + React + TypeScript)
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent

# Install dev dependencies for build
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage and install all dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets from builder stage
COPY --from=builder /app/dist .

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create nginx user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nginx -u 1001

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Expose port
EXPOSE 80

# Labels for better organization
LABEL org.opencontainers.image.title="Vyavastha Web"
LABEL org.opencontainers.image.description="Vyavastha Web Application - Vite + React + TypeScript"
LABEL org.opencontainers.image.version="1.0.0"

# Start nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
