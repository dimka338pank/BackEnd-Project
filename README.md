#  API Documentation

This documentation describes the REST API endpoints for User Authentication, Profile Management, and Task Management.

---

## 🔒 Authentication API Documentation

**Base URL:** `/api/auth`

### 1. User Registration

Registers a new user and returns a **JWT access token** upon success.

* **URL:** `/registration`
* **Method:** `POST`
* **Content-Type:** `multipart/form-data` (Required for file upload)

#### Request Body Parameters

| Field | Type | Required | Validation Rules |
| :--- | :--- | :--- | :--- |
| `email` | String | Yes | Must match regex: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/` |
| `name` | String | Yes | Minimum 2 characters. |
| `password` | String | Yes | Minimum 8 characters; must include letters. |
| `avatar` | File | No | Allowed formats: `jpg`, `jpeg`, `png`, `gif`, `webp`. |

#### Responses

* **🟢 201 Created**
    User successfully registered.
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

* **🔴 400 Bad Request**
    Validation failed.
    ```json
    {
      "errors": [
        "Invalid email",
        "Invalid password: minimum 8 characters, must include letters",
        "Invalid username: minimum 2 characters",
        "Invalid avatar: allowed formats are jpg, jpeg, png, gif, webp"
      ]
    }
    ```

* **🔴 409 Conflict**
    Duplicate resource.
    ```json
    {
      "error": "A user with this email is already registered"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 2. User Login

Authenticates a user and returns a **JWT access token**.

* **URL:** `/login`
* **Method:** `POST`
* **Content-Type:** `application/json`

#### Request Body Parameters

| Field | Type | Required | Validation Rules |
| :--- | :--- | :--- | :--- |
| `email` | String | Yes | Must match regex: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/` |
| `password` | String | Yes | Minimum 8 characters; must include letters. |

#### Responses

* **🟢 200 OK**
    Login successful.
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

* **🔴 400 Bad Request**
    Validation failed.
    ```json
    {
      "errors": [
        "Invalid email",
        "Invalid password: minimum 8 characters, must include letters"
      ]
    }
    ```

* **🔴 401 Unauthorized**
    Invalid credentials.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

---

## Profile Management API

**Base URL:** `/api/users`

All endpoints in this section are **protected resources** and require a valid **JWT Bearer Token** in the `Authorization` header.

### 1. Get Profile API

Retrieves the currently authenticated user's profile data.

* **Endpoint:** `/api/users/me`
* **Method:** `GET`
* **protected resource:** `Yes`

#### Responses

* **🟢 200 OK**
    Successful retrieval of profile data.
    ```json
    {
      "email": "string",
      "name": "string",
      "avatar": "string (link)"
    }
    ```

* **🔴 401 Unauthorized**
    Invalid credentials or missing token.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 2. Update Profile API

Updates the currently authenticated user's profile data (name and optional avatar image).

* **Endpoint:** `/api/users/me`
* **Method:** `PUT`
* **protected resource:** `Yes`

#### Request Body Parameters

| Field | Type | Required | Validation Rules |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Minimum 2 characters. |
| `avatar` | File | No | Allowed formats: `jpg`, `jpeg`, `png`, `gif`, `webp`. |

#### Responses

* **🟢 200 OK**
    Successful profile data update.
    ```json
    {
      "email": "string",
      "name": "string",
      "avatar": "string (link)"
    }
    ```

* **🔴 400 Bad Request**
    Validation failed.
    ```json
    {
      "errors": [
        "Invalid username: minimum 2 characters",
        "Invalid avatar: allowed formats are jpg, jpeg, png, gif, webp"
      ]
    }
    ```

* **🔴 401 Unauthorized**
    Invalid credentials.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

### 3. Delete Avatar API

Allows the currently authenticated user to delete their avatar image.

* **URL:** `/api/users/me/avatar`
* **Method:** `DELETE`
* **protected resource:** `Yes`

#### Responses

* **🟢 200 OK**
    Avatar successfully deleted.
    ```json
    {
      "deleted": true
    }
    ```

* **🔴 401 Unauthorized**
    Invalid credentials.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

---

## Task Management API

### 1. 📋 Get My Tasks API

Retrieves the list of tasks for the currently authenticated user.

* **Endpoint:** `/api/tasks`
* **Method:** `GET`
* **Protected resource:** Yes

#### Responses

* **🟢 200 OK**
    Successful retrieval of the task list.
    ```json
    [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "done": "boolean",
        "files": [
          {"id": "string", "image": "string (link)"}
        ]
      }
    ]
    ```

* **🔴 401 Unauthorized**
    Invalid credentials or missing token.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

---

### 2.  Create Task

Creates a new task for the currently authenticated user.

* **Endpoint:** `/api/tasks`
* **Method:** `POST`
* **Protected resource:** Yes
* **Content-Type:** `multipart/form-data` (for files) or `application/json`

#### Request Body Parameters

| Field | Type | Required | Validation Rules |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Minimum 2 characters. |
| `description` | String | No | |
| `files` | File array | No | Allowed formats: `jpg`, `jpeg`, `png`, `gif`, `webp`. |

#### Responses

* **🟢 201 Created**
    Successful task creation.
    ```json
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "done": "boolean",
      "files": [
        {"id": "string", "image": "string (link)"}
      ]
    }
    ```

* **🔴 400 Bad Request**
    Validation failed.
    ```json
    {
      "errors": [
        "Invalid title: minimum 2 characters",
        "Invalid files: allowed formats are jpg, jpeg, png, gif, webp"
      ]
    }
    ```

* **🔴 401 Unauthorized**
    Invalid credentials or missing token.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```

---

### 3. Delete Task

Allows the currently authenticated user to delete their task.

* **Endpoint:** `/api/tasks/{taskId}`
* **Method:** `DELETE`
* **Protected resource:** Yes

#### Request Fields (Path Variables)

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `taskId` | String | Yes | The ID of the task to be deleted. |

#### Responses

* **🟢 200 OK**
    Task successfully deleted.
    ```json
    {
      "deleted": true
    }
    ```

* **🔴 400 Bad Request**
    Validation error for path variables (e.g., missing `taskId`).
    ```json
    {
      "errors": [
        "Invalid taskId: taskId is required"
      ]
    }
    ```

* **🔴 401 Unauthorized**
    Invalid credentials or missing token.
    ```json
    {
      "error": "User is not authorized"
    }
    ```

* **🔴 403 Forbidden**
    User attempting to delete a task they did not create.
    ```json
    {
      "error": "User does not have access to this resource"
    }
    ```

* **🔴 404 Not Found**
    Task with the specified ID was not found.
    ```json
    {
      "errors": [
        "Invalid taskId: no task found with this taskId"
      ]
    }
    ```

* **🔴 500 Internal Server Error**
    ```json
    {
      "error": "Internal server error"
    }
    ```
