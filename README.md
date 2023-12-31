# GPay Mock Application

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/samhitha16/metapointer-assignment

   ```

2. Navigate to the project folder:

   ```bash
   cd metapointer-assignment
   ```

3. Start the application:

   ```bash
   docker compose up
   ```

## Routes Available

- POST `/api/user/(register|login)` to register/login a user

### PROTECTED ROUTES(set Authorization and x-refresh headers)

- GET `/api/balance` to fetch balance of an user
- GET `/api/transactions/` to fetch all the transactions of an user
- POST `/api/transactions/add` add balance
- POST `/api/transactions/send` send money to another user
- POST `/api/user/logout` logout an user session
