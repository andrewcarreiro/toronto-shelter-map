# ref: https://github.com/mookjp/rails-docker-example/blob/master/Dockerfile
FROM ruby:2.4.1

# Install Rails dependencies
RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y mysql-client postgresql-client sqlite3 --no-install-recommends && rm -rf /var/lib/apt/lists/*

RUN mkdir /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
WORKDIR /app
RUN bundle install
COPY . /app

# EXPOSE 3000/tcp

# ENTRYPOINT [ "rails", "s", "-p", "3000", "-b", "0.0.0.0" ]