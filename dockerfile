# Stage 1: Build the application
FROM node:20-alpine as builder

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json, yarn.lock and .env file to the working directory
COPY package.json yarn.lock .env ./

# Install dependencies
RUN yarn install

# Copy the rest of your application's code
COPY . .

# Build your app
RUN yarn build

# Stage 2: Set up the production environment
FROM node:20-alpine

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy essential files from builder stage
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/.env ./

# Install production dependencies
RUN yarn install --production && \
    yarn cache clean

# Copy built assets from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main"]

