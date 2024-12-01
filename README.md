# Health Connect App

## Overview

This is a full-stack Gym Booking application built with React.js, Node.js, Express.js, and PostgreSQL. The app allows users to browse nearby gyms, view available fitness classes, and book their spots in classes. It also enables gym owners and users to manage bookings, view gym information, and track available class schedules.

## Features

- **User Registration & Login**: Users can create accounts and log in to the platform.
- **Gym Information**: Users can view gym details including location, distance, and description.
- **Class Schedules**: Browse available fitness classes at gyms, including schedules and capacity.
- **Class Booking**: Users can book a spot in fitness classes available at gyms.
- **JWT Authentication**: User sessions are managed with JWT tokens for secure access to the app's features.
- **Responsive Design**: The frontend is designed using React.js and Bootstrap for a clean and responsive user interface.

## Tech Stack

- **Frontend**: React.js, Bootstrap CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Tools**: VS Code, Postman, npm/yarn

## Requirements

- Node.js (v16.x or higher)
- PostgreSQL (v13.x or higher)
- npm or yarn

## Setup and Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gym-booking-app.git
    ```
2.	Install dependencies:
   ```bash 
   cd backend
   npm install
   ```
3.	Create a .env file in the backend directory with the following variables:
  ```bash 
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=gym_booking_app
    JWT_SECRET=your_jwt_secret
   ```
4. Run database migrations (create tables and set up initial schema): 
  ```bash 
  npm run migrate
   ```
5. Start the backend server:
  ```bash 
   npm start
   ```
The server will run on http://localhost:5001.

Frontend Setup

1.	Navigate to the frontend directory:
```bash
  cd frontend
 ```
2. Install dependencies:
```bash
  npm install
 ```
3. Start the React development server:
```bash
  npm start
 ```
The React app will run on http://localhost:3000.

## API Endpoints

### Authentication

	•	POST /api/auth/register - Register a new user.
	•	POST /api/auth/login - Login a user and get a JWT token.

### Gym Data

	•	GET /api/gyms - Get a list of all gyms.
	•	GET /api/gyms/:gymId - Get detailed information about a gym (including classes).

### Bookings

	•	POST /api/bookings - Create a new booking for a class.
	•	GET /api/bookings - Get all bookings for the logged-in user.

## Database Schema

### Users Table

	•	id (Primary Key)
	•	name (VARCHAR)
	•	email (VARCHAR, Unique)
	•	password (VARCHAR)
	•	credits (INTEGER)

### Gyms Table

	•	id (Primary Key)
	•	name (VARCHAR)
	•	location (VARCHAR)
	•	distance (FLOAT)
	•	description (TEXT)

### Classes Table

	•	id (Primary Key)
	•	gym_id (Foreign Key: gyms.id)
	•	name (VARCHAR)
	•	schedule (TIMESTAMP)
	•	capacity (INTEGER)

### Bookings Table

	•	id (Primary Key)
	•	user_id (Foreign Key: users.id)
	•	gym_id (Foreign Key: gyms.id)
	•	class_id (Foreign Key: classes.id)

## Contributing

We welcome contributions to improve this project. If you’d like to contribute, please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix.
3.	Make your changes and commit them.
4.	Push your branch to your forked repository.
5.	Submit a pull request for review.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```
This `README.md` file gives an overview of the project, setup instructions, API endpoints, and information about the database schema, all tailored to your gym booking app.

Let me know if you would like to add or modify anything further!
```
