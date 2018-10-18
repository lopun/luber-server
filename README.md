# luber-server

Server for the (L)Uber Clone Project. #GraphQL#Typescript #NodeJS

# Docker config

## Please create volume named "pgdata"

```
mv docker_run.example.sh docker_run.sh

docker volume create pgdata

/bin/bash ./docker_run.sh
```

# Commands

### Types extract from .graphql files

```
yarn types
```

### Run development mode

```
yarn dev
```
