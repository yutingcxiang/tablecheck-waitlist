# TableCheck SWE Fullstack Take-Home Assignment

## Specifications


## Built With
- Ruby on Rails
- React.js
- Postgres
- Docker

## Getting Started
To build the app locally, use:
```
docker-compose build
```

To run the app locally in the background, use:
```
docker-compose up -d
```

To stop the app, use:
```
docker-compose stop
```

To create, migrate, and seed the database, use:
```
docker exec tablecheck-waitlist-api-1 rake db:create db:migrate db:seed
```

To access the app, navigate to `http://localhost:3002/` for the api and `http://localhost:3000/` for the client.


## Running Tests
Client tests:

To run all the clients locally, navigate to the client folder and use:
```
npm run test
```

For running tests in watch mode use:
```
npm run test:watch
```

To run all the client tests in the docker container, use:
```
docker exec tablecheck-waitlist-client-1 npm run test
```

Api tests:
To run all the api tests in the docker container, use:
```
docker exec tablecheck-waitlist-api-1 bundle exec rspec
```

## Functional Requirements

The front-end application is a basic single page application that renders a form for users to join a waitlist. The application supports the following flows:
- A user is prompted to fill out a form with their name and party size to create a waitlist reservation. The form will validate the prescence of a name and will validate that the party size is a valid number (between 1 and 10 inclusive).
- Upon submission, the user will be shown a screen with their reservation details along with the option to leave the waitlist. If they chose to leave, they will be redirected to the waitlist form.
- If the user chooses to remain in the waitlist, they will see a "Check In" button that will be disabled until their position in the queue reaches 0. The user is given 10 seconds to check in. If they do not check in within that timeframe, they will be automatically removed from the queue.
- If the user does check in, they will be shown a confirmation screen along with the option to return to the waitlist form to make another reservation.
- Additionally, polling is used to fetch and display changes in the reservation and waitlist.


## Architecture
The WaitList Manager full-stack application is created using React, Ruby on Rails, and Postgres. The React files can be found under the `/client` directory while the Ruby on Rails files can be found under the `/api` directory.

The application uses concept of a reservation to refer to a party's position in the queue. The queuing logic is currently managed by a React hook while the individual reservation's positions in the queue are managed with the Reservation model's position field. Reservation data is persisted in the database to support multiple instances.


## Additional Improvements and Considerations
Suggestions for technical improvements include:
- Consider websocks or cron/sidekiq as an alternative to polling for better performance.
- Handling queue management on the backend for improved security.
- Using a store to better manage state on the frontend.
- Increased test coverage and use of factories or test data generators.
- Use of a style library for a more cohesive theme/layout and better styling.

Other suggestions for user experience improvements include:
- Adding an estimated wait time
- Allowing users to update their reservation info
- Displaying a notification with a checkin timer when ready for checkin


## Author
Christine (Yuting) Xiang | yutingcxiang@gmail.com
