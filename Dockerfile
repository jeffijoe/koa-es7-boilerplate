FROM node:lts-alpine
LABEL maintainer "Ray Ch<i@iraycd.com>"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock ./

RUN yarn

# Copy app sources
COPY . .
# Run linters and tests
RUN yarn lint && yarn test

# Expose application port
EXPOSE 5000
# In production environment
RUN yarn build
ENV NODE_ENV production
# Run
CMD ["yarn", "start"]
