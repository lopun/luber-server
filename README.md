# luber-server

Server for the (L)Uber Clone Project. #GraphQL#Typescript #NodeJS

# Docker config

```
mv docker_run.example.sh docker_run.sh

docker volume create pgdata

/bin/bash ./docker_run.sh
```

# Environment variables

```
mv src/.env.example src/.env
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
