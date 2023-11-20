# Project Title

## Overview

PetPal is a platform designed for pet enthusiasts and owners to effortlessly share their cherished moments through pictures with a global audience. More than just a social media network, PetPal serves as a compassionate space dedicated to aiding pets in need of a loving home. We shine a spotlight on lovable pets looking for homes on our website, providing users with the opportunity to make a positive impact in the lives of these animals. Engage in meaningful interactions with fellow pet owners and participate in our monthly challenges, creating a vibrant and supportive community within the PetPal network. Embrace the joy of connecting with like-minded individuals while contributing to the well-being of pets in search of a forever home.

### Problem

Combining everything that we love in order to create a positive enviroment where people can go and not only enjoy the menaningful moments of others but where we can see what pets need help, in this case having a spotlight in the app where the world can see:

1. How many pets are in shelters and how alarming is this.
2. Help in any way these animals, either sharing, going visit, adopting and providing to the cause of why theres so many animals in shelters.

### User Profile

PetPal would not requiere to have an account? but in order to post you would need to create an account. My audience target is pet lovers but it can be use by anyone as long as they dont mean any harm to the community.

### Features

The navigation of this app would be pretty simple, we love that its not too much neither too simple but something that its clear and you can navigate on. I would divide my app initially in two sections.

1. Home, where you can see all pictures that other people have post, be able to like and comment.
2. Spotlight feature where pets in need of home would be shown.
3. Porfile section
   
## Implementation

### Tech Stack

Firebase, JavaScript, React Router Dom, HTML, CSS, Scss, React, Node.js, API

### APIs

https://www.petfinder.com/developers/v2/docs/

### Sitemap

Comments - where comments of post would go
Home - homepage where all pics of everybody is gonna be
Porfile - your porfile section
Spotlight - adoption spotlight
### Mockups
https://www.canva.com/design/DAF0WjuZXI4/S-ZVipQBV80jXL-kBenL4Q/edit

### Data

Users Table:
  Columns:
    - user_id (Primary Key)
    - full_name
    - email
    - username
    - password (hashed, not stored in plain text)

Posts Table:
  Columns:
    - post_id (Primary Key)
    - user_id (Foreign Key referencing Users table)
    - image_url 
    - caption
    - created_at
    
Likes Table:
  Columns:
    - like_id (Primary Key)
    - user_id (Foreign Key referencing Users table)
    - post_id (Foreign Key referencing Posts table)
    - created_at
    
Comments Table:
  Columns:
    - comment_id (Primary Key)
    - user_id (Foreign Key referencing Users table)
    - post_id (Foreign Key referencing Posts table)
    - comment_text
    
### Endpoints

/homepage
/profile
/spot-light
/comments

### Auth

FireBase auth

## Roadmap

Sprint 1 - Front-End 
Spint 2- Back-End
Sprint 3 - Adding everything together
Sprint 4 - testing and fixing bugs
Sprint 5 - Final product

## Nice-to-haves

Challenge section so the community can interact with each other
Messages section
