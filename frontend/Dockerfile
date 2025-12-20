FROM node:16-alpine
# Use an official Node.js runtime as a parent image

# Create and set app as working directory
WORKDIR /app

# Copy package files first before all code
COPY package.json package-lock.json yarn.lock* ./
# Install yarn globally with dependencies
RUN npm install -g yarn && yarn install --frozen-lockfile || yarn install

# Copy all source code into /app
COPY . .

# Global serve installation
RUN yarn global add serve

# Start React on 3000
CMD ["yarn", "start"]
