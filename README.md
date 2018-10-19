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
- [ ] Request Email Verification
- [ ] Verify Email
- [ ] Update my Profile
- [ ] Toggle Driving Mode
- [ ] Report location / orientation
- [ ] Add Place
- [ ] Edit Place
- [ ] Delete Place
- [ ] See Nearby Drivers
- [ ] Subscribe to Nearby Drivers
- [ ] Request a Ride
- [ ] Get Nearby Rides
- [ ] Subscribe to Nearby Ride Requests
- [ ] Subscribe to Ride Status
- [ ] Get Chat Room Messages
- [ ] Subscribe to Chat Room Messages
- [ ] Send a Chat Message

## Code Challenge

- [ ] Get Ride History
- [ ] See Ride Detail
