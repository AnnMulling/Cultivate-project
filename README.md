# Cultivate Project

## Database Schema Design

![db-schema]

[db-schema]: ./images/database.png

## API Documentation

## Boards

### Get all Boards

Returns all the Boards owned by current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/boards
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
  ``` json

  {
    "Boards": [
        {
            "id": 1,
            "name": "Christmas",
            "user_id": "4",
            "is-public": false,
            "created_at": "timestamp",
            "Lists" : [
              {
                "id": 1,
                "title": "Dinner Prep",
                "board_id": 2,
                "column": 1,
              }
            ]
        }
    ]
  }
  ```

### Get a board details owned by user

Returns the details of a board specified by its id.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/boards/:boardId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
``` json


    {
        "id": 1,
        "name": "Christmas",
        "user_id": "4",
        "is-public": false,
        "created_at": "timestamp",
        "Lists" : [
              {
                "id": 1,
                "title": "Dinner Prep",
                "board_id": 2,
                "column": 1,
              }
            ]
    }


```

  * Error response: Couldn't find a Board with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

```json
{
    "message": "Board couldn't be found"
}
```

### Create / Add a Board

creates and returns a new board.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/boards
  * Headers:
    * Content-Type: application/json
  * Body:

```json
    {
      "name": "My Board",
      "is_public": false
    }
```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

```json
    {
        "id": 1,
        "name": "My Board",
        "is_public": false,
        "created_at" : "timestamp"

    }
```
* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:
  ```json
    {
        "name" : "name is required",
        "is_public" : "required field"
    }
  ```

 ### Edit a board

 Updates and returns an existing board
 * Require Authentication: true
* Request
  * Method: PUT/PATCH
  * URL: /api/boards
  * Headers:
    * Content-Type: application/json
  * Body:

```json
 {
      "name": "Edited My Board",
      "is_public": true
}
```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:
``` json

    {
        "id": 1,
        "name": "Edited My Board",
        "user_id": "4",
        "is-public": true,
        "created_at": "timestamp"
    }

```

### Delete a Board

Deletes an existing board.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/boards/:boardId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

```json
    {
        "message": "Successfully deleted"
    }
```

### Get all Lists

Returns all the Lists that are associated with the current board.
* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/boards/:boardId/lists
  * Body: none

```json
    {
        "Lists" : [
                {
                    "id": 1,
                    "title": "Dinner Prep",
                    "board_id": 2,
                    "column": 1,
                    "User": {
                        "id": 1,
                        "firstName": "Ann"
                    }
                },
        ]
    }
```

### Get a specific list on the current board

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/lists/:listId ???
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

```json

    {
        "id": 1,
        "title": "My list",
        "board_id": 1,
        "column": 1
    }

```

  * Error response: Couldn't find a List with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

```json
{
    "message": "List couldn't be found"
}
```

### Create List

create and return a new list.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/boards/:boardId/lists
  * Headers:
    * Content-Type: application/json
  * Body:

```json

    {
      "title": "My List",
      "column": 1,
    }

```
 ### Edit a list

 Updates and returns an existing lists
* Require Authentication: true
* Request
  * Method: PUT/PATCH
  * URL: /api/lists/:listId
  * Headers:
    * Content-Type: application/json
  * Body:

```json

    {
        "title": "Edited My list",
        "column": 2
    }

```
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

```json

    {
        "id": 1,
        "title": "Edited My list",
        "board_id": 1,
        "column": 2
    }

```

### Delete a list

Deletes an existing list.

* Require Authentication: true
* Request
  * Method: DELETE
  * URL: /api/lists/:listId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

```json
    {
        "message": "Successfully deleted"
    }
```
