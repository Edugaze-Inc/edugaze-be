### auth endpoints

- **signup**

    POST

    http://localhost:5000/api/v1/auth/signup

    - Example Request
        - role → "student" | "instructor"
        - password 4-16 letters

        ```json
        {
        "email":"test@test.com",
        "password":"12345678",
        "role":"student"
        }
        ```

    - Response
        - account created

            201 - token

            ```json
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhZ2VyQHRlc3QuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2MjMyOTYsImV4cCI6MTYyNDA1NTI5Nn0.0UmSsZCKkbs2zfcJJN6-1h3T1E6DKkAe9Hw5v7uT9zk"
            }
            ```

        - validation errors

            400 - "Email not Valid", "Password must be between 4 and 16 characters", "No role provided"

        - duplicate accound

            400 - "Account already exists"

        - Any other error (e.g db connection)

            400 - error message

- **login**

    POST

    http://localhost:5000/api/v1/auth/login

    - Example Request

        ```json
        {
        "email":"test@test.com",
        "password":"12345678"
        }
        ```

    - Response
        - logged in

            201 - token

            ```json
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhZ2VyQHRlc3QuY29tIiwicm9sZSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MjM2MjMyOTYsImV4cCI6MTYyNDA1NTI5Nn0.0UmSsZCKkbs2zfcJJN6-1h3T1E6DKkAe9Hw5v7uT9zk"
            }
            ```

        - validation errors

            400 - "Email not found", "Password is not correct"

        - Any other error (e.g db connection)

            400 - error message

- **verify**

    POST

    http://localhost:5000/api/v1/auth/verify

    - Example Request
        - Header → Authorization = Bearer token
        - optional body, for role verification

        ```json
        {
        "role":"instructor"
        }
        ```

    - Response
        - verified

            200 - verified

        - validation errors

            400 - "Invalid token", "No token provided"

        - unauthorized role

            400 - "Role not authorized"
