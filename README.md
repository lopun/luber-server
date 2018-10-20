# luber-server

Server for the (L)Uber Clone Project. #GraphQL#Typescript #NodeJS

## Docker config

```
mv docker_run.example.sh docker_run.sh

docker volume create pgdata

/bin/bash ./docker_run.sh
```

## Environment variables

```
mv src/.env.example src/.env
```

## Commands

### Types extract from .graphql files

```
yarn types
```

### Run development mode

```
yarn dev
```

## Resolvers

### Public Resolvers :

- [x] Sign In / Sign Up with Facebook
- [x] Sign In with Email
- [x] Start Phone Number Verification
- [x] Complete Phone Number Verification
- [x] Sign Up with Email

---

### Authentication

- [x] Generate JWT
- [x] Verify JWT

---

### Private Resolvers :

- [x] Get my Profile with JWT
- [x] Request Email Verification
- [x] Verify Email
- [x] Update my Profile
- [x] Toggle Driving Mode
- [x] Report location / orientation
- [x] Add Place
- [x] Edit Place
- [x] Delete Place
- [x] Get My Places
- [x] See Nearby Drivers
- [x] Subscribe to Nearby Drivers
- [x] Request a Ride
- [x] Get Nearby Rides
- [x] Subscribe to Nearby Ride Requests
- [x] Get Ride
- [x] Update Ride Status
- [x] Subscribe to Ride Status
- [x] Create a Chat Room
- [ ] Get Chat Room Messages
- [ ] Subscribe to Chat Room Messages
- [ ] Send a Chat Message

## Code Challenge

- [ ] Get Ride History
- [ ] See Ride Detail
