
# Thread Talk - Web Forum Project

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Acknowledgements](#acknowledgements)
6. [Contact Information](#contact-information)
7. [User Manual](#user-manual)

## Introduction

Welcome to the repository for Thread Talk - a web forum project, a user-friendly, Rails-based application designed for engaging discussions. Our platform allows for dynamic interaction through posts, comments, and user profiles, enhancing the online discussion experience.

## Features

- **User Authentication:** Secure sign-in with Devise.
- **CRUD Operations:** Intuitive interfaces for creating, reading, updating, and deleting posts and comments.
- **Nested Comments:** For richer user interactions.
- **User Profiles:** Display name management and user-specific post viewing.
- **Tags:** Personalise and categorise posts with reusable tags.
- **Favourites:** Bookmark and follow favourite posts.
- **Responsive Design:** Mobile-friendly interface.
- **Secure Tokens:** JWT tokens for authentication.

## Technology Stack

- **Backend:** Ruby on Rails
- **Frontend:** React with Typescript
- **Database:** SQLite3
- **Authentication:** Devise
- **Deployment:** Render

## Getting Started

### Prerequisites

- Ruby
- Rails
- Node.js

### Installation

1. Clone the repository: `git clone https://github.com/lavanyagarg112/threadtalk.git`
2. Install dependencies: `bundle install` and `npm install`
3. Set up the database: `rails db:migrate`
4. Start the server:  `cd react-web-forum`  then `rails s`

## Usage

For a detailed guide on how to use the Web Forum Project, refer to the [User Manual](#user-manual) section.

## Acknowledgements

Special thanks to all contributors and those who have provided valuable feedback.

## Contact Information

For any queries or collaborations, reach out to [Your Name] at [Your Email].

## User Manual

### Table of Contents
1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [Account Management](#3-account-management)
4. [Navigating the Interface](#4-navigating-the-interface)
5. [Features Guide](#5-features-guide)
6. [Troubleshooting](#6-troubleshooting)
7. [FAQs](#7-faqs)


### 1. Introduction
Welcome to Thread Talk, a dynamic platform for engaging discussions. This manual guides you through using all the features our forum offers.

### 2. Getting Started
### System Requirements
- A modern web browser (Chrome, Firefox, Safari)
- Internet connection

#### Installation
Visit [ThreadTalk](https://threadtalk-t5y1.onrender.com/) and bookmark the page for easy access.

### 3. Account Management
#### Signing Up
- Click on “Sign Up”.
- Enter required details (username, email, password).

#### Logging In
- Click on “Log In” under the sign up page.
- Enter your email and password.

### 4. Navigating the Interface
Explore the main navigation bar for accessing posts, your profile, and settings. The home page displays the latest discussions.

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

