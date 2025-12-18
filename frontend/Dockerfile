FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install yarn (keep using yarn as instructor requested) and install dependencies
# Copy package files first to leverage Docker cache
COPY package.json package-lock.json yarn.lock* ./
RUN npm install -g yarn && yarn install --frozen-lockfile || yarn install

# Copy app source
COPY . .

# Keep the global serve installation (if you need to serve a production build)
RUN yarn global add serve

# Start the CRA development server
CMD ["yarn", "start"]
