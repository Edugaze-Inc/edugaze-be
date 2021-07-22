### Endpoints

- token should be included in ALL requests in header `Authorization = Bearer + token`
- **new**

  POST

  https://api.edugaze.me/meetings/v1/new

  ```
  {
      "title":"test",
      "course":"test",
      "startTime":"2021-06-10T18:30:35",
      "endTime":"2021-06-10T18:30:35"
  }

  ```

  - status is by default 'incoming'
  - returns all meetings details including id
  - Example response

    ```
    {
        "status": "incoming",
        "_id": "60c662da67acdd002d0e7087",
        "title": "test",
        "course": "test",
        "host": "60c662da67acdd002d0e7098",
        "startTime": "2021-06-10T18:30:35.000Z",
        "endTime": "2021-06-10T18:30:35.000Z",
        "sid": "",
        "__v": 0,
    }

    ```

  - Authorization error (if not instructor)

    400 - "User is not authorized"

- **subscribe**

  POST

  https://api.edugaze.me/meetings/v1/subscribe/{id}

  - Response

    - A meeting has been added before

      201 - meeting object

    - The meeting doesn't exist (wrong id)

      400 - "The meeting doesn't exist"

    - Any other error (e.g db connection)

      400 - error message

    - Authorization error

      400 - "User is not authorized"

  - **join**

  POST

  https://api.edugaze.me/meetings/v1/join/{id}

  - Response

    - A meeting scheduled for later (status=='incoming') or not part of student's meetings

      400

    - A meeting currently in progress (status=='current')

      201 - twilio access token with the meeting unique name(id)

    - The meeting doesn't exist (wrong id)

      400 - "The meeting doesn't exist"

    - Any other error (e.g db connection)

      400 - error message

    - Authorization error

      400 - "User is not authorized"

- **start**

  POST

  https://api.edugaze.me/meetings/v1/start/{id}

  - Response

    - Meeting started successfully

      201 - twilio access token with the meeting unique name(id)

    - The meeting doesn't exist (wrong id)

      400 - "Meeting is not found"

    - Any other error (eg. db connection)

      400 - error message

- **list**

  GET

  - list

  https://api.edugaze.me/meetings/v1/meetings/list?status='incoming'
  https://api.edugaze.me/meetings/v1/list?status='ended'

  - default all meetings
  - Example response

    ```
    [
        {
            "status": "incoming",
            "_id": "60c662da67acdd002d0e7087",
            "title": "test",
            "course": "test",
            "host": "60c662da67acdd002d0e7098",
            "startTime": "2021-06-10T18:30:35.000Z",
            "endTime": "2021-06-10T18:30:35.000Z",
            "sid": "RM1b7ecdd56a5f3b43d3b0bd18422e4548",
            "__v": 0
        },
        {
            "status": "incoming",
            "_id": "60c67a68f3e76b010b289c75",
            "title": "test2",
            "course": "test",
            "host": "60c662da67acdd002d0e7098",
            "startTime": "2021-06-10T18:30:35.000Z",
            "endTime": "2021-06-10T18:30:35.000Z",
            "sid": "RM1b7ecdd56a5f3b43d3b0bd18422e4548",
            "__v": 0
        },
        {
            "status": "incoming",
            "_id": "60c67aa5f3e76b010b289c76",
            "title": "test22",
            "course": "test",
            "host": "60c662da67acdd002d0e7098",
            "startTime": "2021-06-10T18:30:35.000Z",
            "endTime": "2021-06-10T18:30:35.000Z",
            "sid": "RM1b7ecdd56a5f3b43d3b0bd18422e4548",
            "__v": 0
        }
    ]

    ```

- **end**

  POST

  https://api.edugaze.me/meetings/v1/end/{id}

  - Response

    - Meeting ended successfully

      201 - "Meeting ended successfully"

    - The meeting doesn't exist (wrong id)

      400 - "Meeting is not found"

    - Any other error (e.g db connection)

      400 - error message
