# ChangeLogAppAPI

This is a RESTful API for a Change Log App. This app allows a product manager or engineer to post projects/products updates for the team to see. This helps the team to keep track of the timelines of each one of them and show the stakeholders the progress made.<br />

Front-end: [change-log-app](https://github.com/Int-Angel/change-log-app)<br />

## Features

- User can sign up, sign in and sign out<br />
- The user can create, read, udate and delete:<br />
  - Projects<br />
  - Updates<br />
  - Points<br />
- The API supports filters for the projects:<br />
  - filter by creator<br />
  - filter by name of the project<br />
  - filter by publication date (you can filter by a range of dates or a specific date)<br />
- The API supports pagination for all get methods:<br />
  - Just need to specify limit and offset params in the query<br />
- All end-points are protected with jwt authentication token, user should sign in first to get a auth token to be able to use all end-points<br />
- An unauthenticated is not able to see projects or do modfications<br />
- Every user is able to create, read, update and delete projects<br />
- The API retursn data in JSON format<br />

## Database

This projects uses SQL database.<br />

### Diagram:

![DB diagram](https://i.imgur.com/eotSHjE.png)

## Installation

1. Clone this repo<br />
2. Create a .env file using as reference the .env-example file and put your own values<br />
3. Create your DB using the change_log_db.sql file inside /db-template<br />
4. run "npm install"<br />
5. run "npm start"<br />

You should be able to test the API<br />

## End-Points documentation

### Future Improvements

- Add roles to the users<br />
  - PM<br />
  - Engineer<br />
  - Designer<br />
  - Etc.<br />
- Add permisions to Users<br />
- Create Groups, users in that group can create, read, update and delete projects, and see the progress.<br />
- Add more filters to the projects end-point:<br />
  - Filter by description<br />
  - Filter by project status<br />
- Change project status int to enum<br />
- Allow users to add their own status<br />
