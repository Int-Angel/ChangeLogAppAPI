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

### Project status:

- 0: To-Do
- 1: In progress
- 2: Done

This is currenlty a int, but shoud be a enum in the future.

## Installation

1. Clone this repo<br />
2. Create a .env file using as reference the .env-example file and put your own values<br />
3. Create your DB using the change_log_db.sql file inside /db-template<br />
4. run "npm install"<br />
5. run "npm start"<br />

You should be able to test the API<br />

# End-Points documentation

## **SignIn**

Returns JSON data about signed in user, contains the auth token necesary for all other end-points

- **URL**

  /auth/signin

- **Method:**

  `POST`

- **Body**

  **Required:**

  `username=[string]`<br/>
  `pass=[string]`<br/>

  Pass is the password.

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ app_user_id : 12, username : "Jhon8000", email : "Jhon@gmail.com", token: "TOKEN"}`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

- **Sample Call:**

  ```javascript
  axios
    .post("http://localhost:8080/auth/signin", {
      username: username,
      pass: password,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **SignUp**

Creates a new user. Returns success message.

- **URL**

  /auth/signup

- **Method:**

  `POST`

- **Body**

  **Required:**

  `username=[string]`<br/>
  `email=[string]`<br/>
  `pass=[string]`<br/>

  Pass is the password, this end-points uses bcryptjs to encrypt the password.

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "User registered successfully!"}`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

- **Sample Call:**

  ```javascript
  axios
    .post("http://localhost:8080/auth/signup", {
      username: username,
      email: email,
      pass: password,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **SignOut**

Signs out user, removes auth token from session. Returns success message.

- **URL**

  /auth/signout

- **Method:**

  `POST`

- **Body**

  **Required:**

  - Include Auth token in header

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "You've been signed out!"}`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

- **Sample Call:**

  ```javascript
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  axios
    .post("http://localhost:8080/auth/signout", config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **Create Project**

Creates new project. Returns success message.

- **URL**

  /project/create

- **Method:**

  `POST`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `name=[string]`<br/>
    `description=[string]`<br/>
    `creator_id=[int]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Project created successfully!"}`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 USER DOESN'T EXIST <br />
    **Content:** `{ message: "User doesn't exist!" }`

- **Sample Call:**

  ```javascript
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const projectPayload = {
    name: name,
    description: description,
    creator_id: creator_id,
  };
  axios
    .post("http://localhost:8080/project/create", projectPayload, config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **Update Project**

Updates existing project. Returns success message.

- **URL**

  /project/update

- **Method:**

  `PUT`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `project_id=[int]`<br/>

  **Optional:**
  `name=[string]`<br/>
  `description=[string]`<br/>
  `project_status=[int]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Project updated successfully!" }`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 PROJECT DOESN'T EXIST <br />
    **Content:** `{ message: "Project doesn't exist!" }`

- **Sample Call:**

  ```javascript
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const projectPayload = {
    project_status: newProgress,
    project_id: project_id,
  };
  axios
    .put("http://localhost:8080/project/update", projectPayload, config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **Delete Project**

Deletes existing project. Returns success message.

- **URL**

  /project/delete

- **Method:**

  `DELETE`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `project_id=[int]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Project deleted successfully!" }`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 PROJECT DOESN'T EXIST <br />
    **Content:** `{ message: "Project doesn't exist!" }`

- **Sample Call:**

  ```javascript
  axios.delete("http://localhost:8080/project/delete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      project_id: project_id,
    },
  });
  ```

## **Get Projects**

Get a list of existing project. Returns JSON array that includes all projects.

- **URL**

  /project/get

- **Method:**

  `GET`

- **Body**

  **Required:**

  - Include Auth token in header <br />

  **Optional:**
  Pagination: <br/>
  `limit=[int]`<br/>
  `offset=[int]`<br/>
  Filters:<br/>
  `creator=[string]`<br/>
  `name=[string]`<br/>
  `date=[Date]`<br/>
  `todate=[Date]`<br/>

  If you only specifies `date `, you will get all projects from that date, but you can specify `date ` and `todate ` and you would get the projects from the range of that date.

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `{ Projects: [
  {
    "project_id": 3,
    "name": "OSID",
    "description": "AI insuline machine",
    "publication_date": "2022-12-01",
    "creator_id": 2,
    "project_status": 0,
    "creator": {
      "app_user_id": 2,
      "username": "Jhon8000",
      "email": "Jhon@gmail.com"
    },
    "project_updates": [
      {
        "project_update_id": 15,
        "description": "Create App",
        "project_id": 3,
        "points": []
      }
    ]
  }
] }`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 PROJECT DOESN'T EXIST <br />
    **Content:** `{ message: "Project doesn't exist!" }`

- **Sample Call:**

  ```javascript
  const params = {};
  params.name = projectName;
  params.creator = creator;
  params.date = startDate;
  params.todate = endDate;
  params.limit = limit;
  params.offset = offset;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: params,
  };

  axios.get("http://localhost:8080/project/get", config).then((response) => {
    console.log(response);
  });
  ```

## **Create Update**

Creates new update for a project. Returns success message.

- **URL**

  /update/create

- **Method:**

  `POST`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `description=[string]`<br/>
    `project_id=[int]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Project Update created successfully!"}`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 PROJECT DOESN'T EXIST <br />
    **Content:** `{ message: "Project doesn't exist!" }`

- **Sample Call:**

  ```javascript
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const updatePayload = {
    description: description,
    project_id: project_id,
  };
  axios
    .post("http://localhost:8080/update/create", updatePayload, config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **Update Update**

Updates existing Update. Returns success message.

- **URL**

  /update/update

- **Method:**

  `PUT`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `project_update_id=[int]`<br/>
    `description=[string]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Project Update updated successfully!" }`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 UPDATE DOESN'T EXIST <br />
    **Content:** `{ message: "Update doesn't exist!" }`

- **Sample Call:**

  ```javascript
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const updatePayload = {
    description: description,
    project_update_id: project_update_id,
  };
  axios
    .put("http://localhost:8080/update/update", updatePayload, config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  ```

## **Delete Update**

Deletes existing update. Returns success message.

- **URL**

  /update/delete

- **Method:**

  `DELETE`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `project_update_id=[int]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ message: "Project Update deleted successfully!" }`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 UPDATE DOESN'T EXIST <br />
    **Content:** `{ message: "Update doesn't exist!" }`

- **Sample Call:**

  ```javascript
  axios.delete("http://localhost:8080/update/delete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      project_update_id: project_update_id,
    },
  });
  ```

## **Get Updates**

Get a list of existing updates from a project. Returns JSON array that includes all updates.

- **URL**

  /update/get

- **Method:**

  `GET`

- **Body**

  **Required:**

  - Include Auth token in header <br />
    `project_id=[int]`<br/>

  **Optional:**
  Pagination: <br/>
  `limit=[int]`<br/>
  `offset=[int]`<br/>

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    `{ updates: [
  {
    "project_update_id": 5,
    "description": "Level design",
    "project_id": 5,
    "points": [
      {
        "point_id": 9,
        "description": "Level 1: Becky's house",
        "project_update_id": 5
      },
      {
        "point_id": 10,
        "description": "Level 2",
        "project_update_id": 5
      }
    ]
  }
] }`

- **Error Response:**

  - **Code:** 500 DB ERROR <br />
    **Content:** `{ message : message.error }`

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Unauthorized!" }`

    OR

  - **Code:** 403 NO TOKEN PROVIDED <br />
    **Content:** `{ message : "No token provided!" }`

    OR

  - **Code:** 400 PROJECT DOESN'T EXIST <br />
    **Content:** `{ message: "Project doesn't exist!" }`

- **Sample Call:**

  ```javascript
  const params = {};
  params.limit = limit;
  params.offset = offset;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
    params: params,
  };

  axios.get("http://localhost:8080/update/get", config).then((response) => {
    console.log(response);
  });
  ```

## Future Improvements

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

  OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`
