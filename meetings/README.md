### Endpoints

- token should be included in ALL requests in header `Authorization = Bearer + token`
- **new**

  POST

  http://134.209.132.81:4000/api/v1/meetings/new

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

- **join**

  POST

  - for both cases(current, incoming), same endpoint is used, no additional param is needed

  http://134.209.132.81:4000/api/v1/meetings/join

  - Response

    - A meeting scheduled for later (status=='incoming') and has not been added before

      201 - "Meeting added successfully"

    - A meeting scheduled for later (status=='incoming') and has been added before

      201 - "Meeting already added before"

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

  http://134.209.132.81:4000/api/v1/meetings/start/{id}

  - Response

    - Meeting started successfully

      201 - twilio access token with the meeting unique name(id)

    - The meeting doesn't exist (wrong id)

      400 - "Meeting is not found"

    - Any other error (eg. db connection)

      400 - error message

- **list**

  GET

  - list for host

  http://134.209.132.81:4000/api/v1/meetings/listhost?status='incoming'
  http://134.209.132.81:4000/api/v1/meetings/listhost?status='ended'

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

  - list for students

  http://134.209.132.81:4000/api/v1/meetings/liststudent?status='incoming'
  http://134.209.132.81:4000/api/v1/meetings/liststudent?status='ended'

  - default all meetings

- **end**

  POST

  http://134.209.132.81:4000/api/v1/meetings/end/{id}

  - Response

    - Meeting ended successfully

      201 - "Meeting ended successfully"

    - The meeting doesn't exist (wrong id)

      400 - "Meeting is not found"

    - Any other error (e.g db connection)

      400 - error message
