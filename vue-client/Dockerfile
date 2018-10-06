FROM mhart/alpine-node:8.0.0

RUN apk add --no-cache make gcc g++ python bash bzr git subversion openssh-client ca-certificates
ARG APP_DIR
ENV APP_DIR=$APP_DIR


# Install dependecies
COPY package.json $APP_DIR/package.json
WORKDIR $APP_DIR

RUN npm install
RUN npm rebuild node-sass

EXPOSE 8080

ADD . $APP_DIR/

CMD ["npm", "run", "dev:docker"]
