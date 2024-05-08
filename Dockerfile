FROM node:alpine

WORKDIR /rentals-api 

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . ./

# Build the typeScript code
RUN npm run build

EXPOSE 2022

CMD [ "npm", "start" ]