# README

## Introduction

Welcome to the repository for the Web Forum Project, a Rails-based application designed to provide a user-friendly platform for engaging discussions. This forum allows users to sign up, create posts, comment on discussions, and much more.

## Features

User Authentication: Secure sign-in functionality with Devise for enhanced security.

CRUD Operations: Users can create, read, update, and delete posts and comments, using intuitive interfaces for seamless navigation and content management. This forum also supports nested comments for enhanced user interaction.

User Profile: Manage display name and logout

Tags: Users can reuse or add new tags, as well as edit them later, to further personalise the posts

## Technology Stack

Backend: Ruby on Rails

Frontend: React with Typescript

Database: SQLite3

Authentication: Devise

## Viewing on local machine

Clone the repository

Open Terminal.

Type the following: 
- cd react-web-forum
- rails s

This opens the rails server on localhost:3000

Next:

- cd ..
- npm start

It will ask if you want to open the react app on another port. type y

This opens the app on localhost:3001

Interact with the app on localhost:3001 while keeping localhost:3000 open for backend.

## Deployment

When deployed, change the fetch link under Signup page accordingly, as well as the routes in routes.rb of rails if needed.
Even for logged in ig.

## To add

(In order: )

Add tags to categories to view by tags, and when we click on the tag also it redirects

Add Favourites

Forgot Password

Upvote/ Downvote post

Upvote/ Downvote comment

Edit Comment

Add User Profile for others to see someone's profile with bio and stuff

Make responsive

How to make tags more restrictive so that it isnt spammed?

Add Search Functionality for Posts

Add Search Functionality for Users

If we ask to login how to go back to the page we were asked to login from (for eg from favourites/ editpost etc)

Change styling
