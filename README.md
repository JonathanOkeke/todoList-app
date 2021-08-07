# A Todo-List Web Application (React + NodeJs + PostgreSQL)
#### Checkout my Heroku hosted version of the application at -> https://notes-by-okeke.herokuapp.com/
## About
A Heroku hosted todo-list application with:
- A user registration and login system.
- A server side JWT authentication and authorization system to protect specific client side endpoints and database access
- User state management with conditional rendering on the frontend.
- Persisted user auth state on tab refresh.
### Frontend
- Built with React
### Backend
#### NodeJs REST Server
- Server runs as an ExpressJS application.
- Server will issue a JWT on user registration and/login login. This JWT is used to authorize logged-in users to access protected server endpoints.
#### Database
- PostgreSQL database
- Database contains a users and todos table.
## How to run on local computer
1. Clone the repo.
2. Run npm install in folder.
3. Cd into the client folder and run npm install.
4. Add your JWT secret and PostgreSQL database credentials in the .env folder.
5. Open the database.sql folder and use the code to create the users and todos tables within your PostgreSQL database.
6. Cd into project folder and run node index.
7. Cd into client folder and run npm start.
8. Enjoy.
