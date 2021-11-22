# Project Proposal

## RESAPP

### Short description

We want to make an app that helps you visualize all the places you want to visit when doing a travel so you can organize them easily. The user will be able to create different travels and inside each travel she/he can add places to visit. This places can be categorized with diferent topics like **Restaurants, Museums, Sight Seen, etc.** and they will have different colours. The user will be able to see marks representing each one of the elements she/he added, with its associated colour. The user will be able to aply filters, so only the desired elements are shown in the map. 

### Frameworks that will be used

We want to use **React** as a framework for the front end developement and **node.js** for the back end. In order to make the styling easier, we want to use **Material Design**. Our Data Base will be located at **Firebase** and our webb app deployed with **heroku**. For the navigation, we are going to use **routers** and for the model state, we first wanted to use **Redux**, however, since this project doesn't deal with a huge number of stateful components using it may not be worth it. 

### API that will be used

We are going to use the [Google Maps API](https://developers.google.com/maps/documentation/javascript/overview) in order to display the maps, find places and add marks. 

### Data that we are going to work with 

###### API DATA
- Map Images
- Place Details

###### MODEL DATA

- Travel names/id
- Place names
- Place coordinates
- Extra notes for each place
- Place type
- Users info

### Prototype

###### Login View
![Login Image](/Proposal_imgs/LoginView.png)
###### Trip Selector View
![Trip Selector Image](/Proposal_imgs/Trip_Selection_View.png)
###### Adding Trip View
![Adding Image](/Proposal_imgs/Adding_Trip_View.png)
###### Main View
![Main View Image](/Proposal_imgs/MainView.png)
###### Place Details View
![Details Image](/Proposal_imgs/Place_Details_View.png)

