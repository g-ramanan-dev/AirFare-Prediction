const express = require("express");
const stripe = require("stripe")('sk_test_51ISMMqFG2ZRvxeN2JLYEG9vFqF6IifdMBBQbu2cZpr46ca8GeE21NBSVONQf0ORr9RSLBKIqRuGhS7hgEi0wwhd7002ENzvMtV');
const router = express.Router();
router.get("/", (req, res) => {
    res.render("myFlights.hbs", {
        title: "My Flight Bookings",
        script: "/script.js"
    });
});

router.get('/checkout-session/:flightID', async(req, res) => {
    //1) Get the currently booked flight
    const bookedFlight = db.collection("myTrips");
    const flight = await bookedFlight.findOne({
        _id: ObjectId(req.params.flightID)
    });
    console.log(flight);
     //2) Create the checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: 'https://travelgenie.herokuapp.com/flightBookings',
        cancel_url: 'https://travelgenie.herokuapp.com/',
       // customer_email: req.userData.username,
        client_reference_id: req.params.flightID,
        line_items: [
            {
                name: `${flight.flightData.airLine} Airline`,
                description: `From: ${flight.flightData.originCity} - To: ${flight.flightData.destinationCity}`,
                amount: flight.flightData.ticketPrice * 100,
                currency: 'inr',
                quantity: 1
                //images:
            }
        ]
    })
   // console.log(session);
    //console.log(flight);
  
    //3) Create session as response
    res.json(session);

});


router.post("/addMyFlights", (req, res) => {
    db.collection("myTrips").insertOne({
            userId: ObjectId(req.userData._id),
            type: "Flight",
            flightData: req.body
        },
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
});
router.get("/getMyBookings", (req, res) => {
    db.collection("users")
        .aggregate([{
                $match: {
                    _id: ObjectId(req.userData._id),
                }
            },
            {
                $lookup: {
                    from: "myTrips",
                    localField: "_id",
                    foreignField: "userId",
                    as: "flightData"
                }
            }
        ])
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
});
module.exports = router;