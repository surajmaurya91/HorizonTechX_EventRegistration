# HorizonTechX Event Registration

A simple Node.js + Express + MongoDB API for managing events and event registrations. This project allows you to create events, view upcoming events, and register users for a specific event while preventing duplicate registrations for the same email.

## Features

- Create a new event
- View all events
- View event details by ID
- Register a user for an event
- Prevent duplicate registration for the same user email within the same event
- View all registrations for a specific user email

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## Project Structure

```text
HorizonTechX_EventRegistration/
├── index.js                 # App entry point and MongoDB connection setup
├── models/
│   ├── Event.js             # Event schema
│   └── Registration.js      # Registration schema
├── routes/
│   └── eventRoutes.js       # API routes
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
├── package-lock.json
└── README.md
```

## Prerequisites

- Node.js installed
- MongoDB Atlas or local MongoDB instance
- A valid `MONGO_URI` connection string

## Installation

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

Example:

```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/eventregistration?retryWrites=true&w=majority
```

## Run the Application

```bash
node index.js
```

The server will start on the port specified in `.env`.

## API Endpoints

### Create Event

- Method: `POST`
- URL: `/api/events`

Request body:

```json
{
  "title": "Tech Summit 2026",
  "description": "A technology conference",
  "date": "2026-12-15T10:00:00.000Z",
  "location": "Bangalore"
}
```

### Get All Events

- Method: `GET`
- URL: `/api/events`

### Get Event by ID

- Method: `GET`
- URL: `/api/events/:id`

### Register for an Event

- Method: `POST`
- URL: `/api/register`

Request body:

```json
{
  "eventId": "64d8b58d1bcf2c48f4d5c9f0",
  "userName": "John Doe",
  "userEmail": "john@example.com"
}
```

### Get User Registrations

- Method: `GET`
- URL: `/api/registrations/user/:email`

Example:

```bash
/api/registrations/user/john@example.com
```

## Notes

- Duplicate registrations are blocked when the same `userEmail` is used for the same `eventId`.
- The app uses `express.json()` to parse incoming JSON requests.
- CORS is enabled for frontend integration.

## License

This project is licensed under the ISC License.
