# Stage 1: Build
FROM node:16.20-slim AS builder
WORKDIR /usr/src/app

# Add package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source
COPY . .

# Build application
RUN yarn build

# Stage 2: Production
FROM node:16.20-slim
WORKDIR /usr/src/app

# Add labels
LABEL maintainer="Teheskhiel Fritz"
LABEL version="1.0"
LABEL description="Foodie Backend Service"

# Create non-root user
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodeuser \
    && chown -R nodeuser:nodejs /usr/src/app

# Copy only production files
COPY --from=builder --chown=nodeuser:nodejs /usr/src/app/dist ./dist
COPY --from=builder --chown=nodeuser:nodejs /usr/src/app/package.json ./
COPY --from=builder --chown=nodeuser:nodejs /usr/src/app/yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
    CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["yarn", "start"]
