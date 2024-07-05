
# Thread Talk - Web Forum Project

Note: the website is currently down.

Hi everyone! This is my first full stack web development project using the following -
- React with Typescript for the frontend
- Ruby on Rails API using PostgreSQL for the backend
- Render for deployment

You can find the deployed application here: [ThreadTalk](https://threadtalk-t5y1.onrender.com/)

You can find the backend repository here: [threadtalk backend](https://github.com/lavanyagarg112/threadtalk-backend)

For more details, do read on!

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Resources](#resources)
6. [User Manual](#user-manual)

## Introduction

Welcome to the repository for Thread Talk - a web forum project, a user-friendly, React with Rails-based application designed for engaging discussions. This platform allows for dynamic interaction through posts, comments, and user profiles, enhancing the online discussion experience.

## Features

- **Landing Page:** Landing Page to improve user experience, displaying application name, tagline and features
- **User Authentication:** Secure sign-in with Devise.
- **CRUD Operations:** Intuitive interfaces for creating, reading, updating, and deleting posts and comments.
- **Nested Comments:** For richer user interactions.
- **User Profiles:** Display name management and user-specific post viewing.
- **Tags:** Personalise and categorise posts with reusable tags. Further, search posts through tags.
- **Favourites:** Bookmark and follow favourite posts.
- **Responsive Design:** Mobile-friendly interface.
- **Secure Tokens:** JWT tokens for authentication.
- **Custom Favicons**

## Technology Stack

- **Frontend:** React with Typescript
- **Backend:** Ruby on Rails
- **Database:** PostgreSQL hosted on Supabase
- **Authentication:** Devise
- **Deployment:** Render

## Getting Started

### Prerequisites

- Ruby
- Rails
- Node.js

### Installation

1. Fork this repository and the backend repository
2. Clone the forked frontend repository to run it on your system
3. Navigate to the frontend repository: `cd threadtalk`
4. Install dependencies: `npm install`
5. Navigate to backend repository: `cd react-web-forum`
6. Initialise a new repository: `git init`
7. Add remote repository: `git remote add origin <the url to the repo to clone forked repo>`
8. Fetch main: `git fetch origin main`
9. Checkout to main: `git checkout main`
10. Install dependencies: `bundle install`
11. Set the appropriate env variables (database name etc)
12. Set up the database: `rails db:migrate`
13. Start the server: `rails s`
14. Navigate back to frontend repository: `cd ..`
15. Run the react application: `npm start`

## Usage

For a detailed guide on how to use the Web Forum Project, refer to the [User Manual](#user-manual) section.

## Resources

Throughout this project, the following resources were quite helpful in teaching me the fundamentals needed for this project -

- [The Odin Project](https://www.theodinproject.com/dashboard)
- [React Documentation](https://react.dev/)
- [Ruby on Rails Documentation](https://guides.rubyonrails.org/)
- [Typescript Documentation](https://www.typescriptlang.org/)
- [ChatGPT](https://chat.openai.com/) for references such as how to get started with deployment. I also used it to get an idea of what are the resources available to me to start learning the necessary technologies. However, ChatGPT was only used for reference and not for the actual coding.


## User Manual

### Table of Contents
1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [Account Management](#3-account-management)
4. [Navigating the Interface](#4-navigating-the-interface)
5. [Features Guide](#5-features-guide)
   - [Log in Requirement](#login-requirement)
   - [Creating a post](#creating-a-post)
   - [Commenting on Posts and Managing comments](#commenting-on-posts-and-managing-comments)
   - [Using Tags](#using-tags)
   - [Managing Favourites](#managing-favourites)
   - [Managing User Profile](#managing-user-profile)
   - [Viewing Author Profile](#viewing-author-profile)
   - [Editing and Deleting Posts](#editing-and-deleting-posts)
6. [Troubleshooting](#6-troubleshooting)
7. [FAQs](#7-faqs)


### 1. Introduction
Welcome to Thread Talk, a dynamic platform for engaging discussions. This manual guides you through using all the features this forum offers.

### 2. Getting Started
#### System Requirements
- A modern web browser (Chrome, Firefox, Safari)
- Internet connection

#### Installation
Visit [ThreadTalk](https://threadtalk-t5y1.onrender.com/) and bookmark the page for easy access.

### 3. Account Management
#### Signing Up
- Click on “Sign Up”.
- Enter required details (username, email, password).
- Password must be atleast 6 characters long.
- Please remember your details, especially the email and the password, as you cannot retrieve it later.

#### Logging In
- Click on “Log In” under the sign up page.
- Enter your email and password.

### 4. Navigating the Interface
Explore the main navigation bar for accessing posts, your profile, and settings.

### 5. Features Guide

#### Log in Requirement
- Log in is required for creating a new post, commenting on posts, managing favourites, and creating profile.
- Log in is not required for viewing posts and comments, searching posts by tags, or viewing author profile.

#### Creating a Post
- Click “Add new Post”.
- Enter your post title, content and tags.
- Add tags and click “Add Post”.
- Log in is required to create a post.

#### Commenting on Posts and Managing comments
- Select a post.
- Scroll to the comment section.
- Type your comment and click “Add Comment”.
- You can even choose to reply to another user's comments by clicking on "Reply".
- You can also delete your comments anytime
- Log in is required to comment on posts.

#### Using Tags
- While creating a post, add tags for categorisation.
- Click on a tag in any post to view related discussions.
- Further, navigate to the Categories section and search by tags.
- Log in is not required to view posts based on tags

#### Managing Favourites
- Click the “Favourite” icon on a post to add it to your favourites.
- Access your favourites through the favourites section.
- Easily add/remove favourites
- Log in is required to view favourites

#### Managing User Profile
- Go to the My Profile Section after you have logged in.
- Add your own display name under which you can post.
- View your Posts
- Add bio to better express yourself!
- View your public profile
- Logout anytime
- Log in is required to manage your profile.

#### Viewing Author Profile
- Click on the author name under the post, whose author's profile you wish to view
- Log in is not required to view author profiles

#### Editing and Deleting Posts
- Navigate to the post you wish to edit
- Click on edit post to edit all contents including tags.
- Similarly, there will be an option to delete your post
- Log in is required for editing and deleting posts


### 6. Troubleshooting
If you encounter issues, try refreshing the page or logging out and back in. Clear your browser cache for persistent problems.

### 7. FAQs
**Q: Can I edit my posts?**
A: Yes, go to your post and select “Edit”.

**Q: Can I view author profile?**
A: Yes, click on the Author's name under the post to view the author profile.
