class UserModel{
    constructor(tripCurrent = null, trips = []){       
        this.observers = [];
        this.setTripCurrent(tripCurrent);
        this.setTrips(trips);
    }

    setTripCurrent(id){
        this.tripCurrent = id;
    }

    setTrips(trips){
        this.trips = [...trips];
    }

    addTrip(trip){
        if(!(this.trips.includes(trip))){
            this.trips = [...this.trips, trip]; 
        }   
    }

    removeFromTrip(tripID){
        /* TODO */
    }
}