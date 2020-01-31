# Booknook
# BookNook: A Description

This application lets users join a bookclub, create books within a bookclub that they can comment on and have discussions with other users about the book they are reading. A user can create, delete, show, and update their books, as well as comments. I was inspired to make this app after my mom joined multiple bookclubs and wanted the option to discus the books she was reading remotely with her differe book groups.

## Setup Steps

1. [Fork and clone] this repository.
2.  Run `npm install` to install all dependencies
3.  Use `npm start` to spin up the server.

## Important Links
<a href="https://github.com/caleybennett/project-4-api" target="_blank">  Front Rnd Repo </a>
<a href="https://caleybennett.github.io/project-4-client/#/bookclubs/1" target="_blank"> Deployed Client </a>
<a href="https://young-coast-99750.herokuapp.com/bookclubs" target="_blank"> Deployed API </a>

## Planning Story
I wanted to create an app where users could discuss books they were reading in different bookgroups. I started the first day by creating my backend, which consisted of four resources: users, bookclubs, books, and comments. A user has many bookclubs and bookclubs have many users. I did this by creating a joined table of bookclub_members which had two fields: a user_id and a bookclub_id. This allowed users to join a bookclub. I created the books resource which had a user_id, a bookclub_id, a title and an author field. I then created the comments resource which had a user_id, book_id, and text field.

The second day I removed the bookclub resource to make sure I hit mvp, so a user could just create books and comments. I used react in the front end to make sure users could CRUD on the resource. After a few hiccups getting used to using React, I completed these two resources on the second day. The third day I then encorperated my many to many relationship. I decided that a user should only be able to create a bookclub, not be able to update or edit it. I did this by creating a post request to `/bookclubs`. I also made it so users can join the bookclub by clicking a join bookclub button.

On the forth day I created a 'my bookclubs' feature which shows the user what bookclubs they have joined. To do this I had to filter twice through the bookclubs array, since I was iterating through an array of an array. This took most of the morning. The afternoon of the forth day was spent bug hunting and styling.

## Technologies used
  - React
  - JavaScript
  - Bootstrap

## User Stories

As a user, I would like to sign up and sign in.
As a user, I would like to be able to change password and sign out once I'm signed in.
As a signed in user, I would like to be able to create a book club.
As a signed in user, I would like to be able to delete a book club.
As a signed in user, I would like to be able to update a book club.
As a not signed in user, I would like to be able to browse book clubs and their comments.
As a signed in user, I would like to join a book club.
As a signed in user, I would like to comment on a book club forum.
As a signed in user, I would like to update/ delete my comments.

## Wireframes
![img_6398 1](https://media.git.generalassemb.ly/user/24039/files/fed13280-40e6-11ea-9426-81230331d6b8)
![img_6397 1](https://media.git.generalassemb.ly/user/24039/files/01cc2300-40e7-11ea-95ed-952589e81d1a)
![img_6396 1](https://media.git.generalassemb.ly/user/24039/files/042e7d00-40e7-11ea-819d-8de1adfc62f8)
![img_6394 1](https://media.git.generalassemb.ly/user/24039/files/0690d700-40e7-11ea-8867-073a883b0dff)
![img_6399 1](https://media.git.generalassemb.ly/user/24039/files/16102000-40e7-11ea-9e9b-baa09cc12083)
![img_6400 1](https://media.git.generalassemb.ly/user/24039/files/190b1080-40e7-11ea-853d-42b5fe965ba1)
![img_6401 1](https://media.git.generalassemb.ly/user/24039/files/1b6d6a80-40e7-11ea-996a-74817ed373bb)
![img_6402 1](https://media.git.generalassemb.ly/user/24039/files/1f00f180-40e7-11ea-8a0a-15c075d6dbc6)

## Image screenshot
<img src="https://raw.githubusercontent.com/caleybennett/project-4-client/master/screenshot.png">

## Future Plans
Ideally I would like to encorerate a third party api where users can browse books to add to their bookclubs.
