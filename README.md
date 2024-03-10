# Getting Started with DishPoll App

I have used localstorage as storage to support my app. and list of users I have stored inside users.json file. So only person from the json file can login inside the app others wont be able to login.

## Login Component

In the first page, we will have to put username and password which is present in the users.json then after login we will go inside the app means dashboard page.

## Dashboard & DishList Component

Here we will render all the list of dishes in a gridlist. when we will click on a particular dish from the list we will go into the individual dish page. 

## Dish Component

Here we will see individual dish and there is two buttons below the dish image and name. one button is for like and another for dislike. I have not added any alert for showing dish is liked or disliked but "like" will keep a record in the dishlist that who has liked this particular dish and "dislike" will remove the person from the list for a particular dish item. Also in this component I am maintaining votecount for individual dish and also for individual user. voteCount for individual dish will hold how many people like this dish. and voteCount for individual user will hold how many dishes liked by the an user.

## Poll List

In this Component I have calculated who has come first , second and third in terms of votecount and then sorted them based on their voteCount and then I have given them points based on their rank and finally displayed them in descending them based on their voteCount that means the dish which got highest vote or like, will be on the top and the second will be secondand so on.

## Logout

When we will click this, it will delete loggeduser details from the localstorage and will take us to login page.

## PrivateRoute

This will not let a person go to the dashboard if the user is not signed in.

