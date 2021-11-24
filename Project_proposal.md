# Project Proposal

## RESAPP

### Short description

We want to make an app that helps you visualize all the places you want to visit when travelling so you can organize them easily. The user will be able to create different travel lists and inside each list they can add places to visit. These places can be categorized with diferent topics like **Restaurants, Museums, Sightseeing, etc.** and they will have different colours. The user will be able to see marks representing each one of the elements they added, with its associated colour. The user will be able to aply filters, so only the desired elements are shown in the map. 

### Frameworks that will be used

We want to use **React** as a framework for the front-end developement and **node.js** for the back-end. In order to make the styling easier, we want to use **Material UI** library. We will use **Firebase** to store our data and our web app will be deployed with **heroku**. For the navigation, we are going to use **routers** . For the model state, we first wanted to use **Redux**, however, since this project doesn't deal with a huge number of stateful components using it may not be worth it, we leave this option open if when starting to develop . 

### APIs that will be used

We are going to use the [OpenTripMap API](https://opentripmap.io/product) in order to search tourist sites around the world. The API provides a free plan for non-commercial uses consisting of a maximum of 5000 API requests/day and 10 requests/second. We will use a JS library called [Leaflet](https://leafletjs.com/). The [Leaflet API](https://leafletjs.com/reference.html) allows us to generate maps that we can be easily customized with marks and popups.

### Data that we are going to work with 

###### API DATA
- Place Details
- Maps
###### APP SPECIFIC DATA

- Travel names/id
- Place names
- Place coordinates
- Extra notes for each place
- Place type
- User's info

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

