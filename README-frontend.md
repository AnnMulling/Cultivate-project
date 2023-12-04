# Cultivate Project

## Database Schema Design

![db-schema]

[db-schema]: ./images/database.png


## Login
Modal displays a log in form
* `GET /login`
* `POST /login`


## Sign up page
Modal displays a signup form.
* `GET /signup`
* `POST /signup`


## Landing page / Home page
### `/home`
Initial page when the website is loaded
* `GET /home`
* `GET /home`

## Workspace
### `/workspace`
This page display all board owned by the current user.
* `GET /workspace`

## Board detail page
### `/boards/:id`
This page displays details of each board.
* `GET /workspace`

## Starred Board
### `/starred-board`
All the board that user has starred (prioritized)
* `GET /starred-board`

## Focus (set-time)
### `/focus`
Interactive set-time feature page
* `GET /focus`
