var express = require("express");
var session = require("express-session");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var app = express();
const jwt = require("jsonwebtoken");
var auth = require("./routes/auth.js");
var myTrips = require("./routes/myTrips/myFlights")
var checkToken = require("./middleware/check-authToken");
var faq = require('./routes/faqRoute')
const port = process.env.PORT || 3000;

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "hbs");
app.use('/', faq)

var url = "mongodb+srv://ram:ram@cluster0.eztpg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.locals.db;

mongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    function(err, client) {
        if (err) throw err;
        db = client.db("TravelPlanner"); //will change db name, when it is created
    }
);

app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;

app.use(
    session({
        secret: "Hakumanata!! Timon and Pumba. Mogambo khush hua!!!"
    })
);

app.get("/", function(req, res) {
    var loginButton;
    if (req.session.token) {
        profileBtn = `<div class="button-properties button-3"><a href="/profile" id="heroprofileBtn" style="text-decoration: none; color: wheat">Profile</a></div>`;
        (signupBtn = ""),
        (loginButton = `<a href="/logout"><button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#logOutBtn">Log Out</button></a>`);
    } else {
        (loginButton = `<button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#loginModal">Login</button>`),
        (signupBtn = `<button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#signupModal">Sign Up</button>`),
        (profileBtn = "");
    }
    res.render("home.hbs", {
        title: "Travel",
        loginBtn: loginButton,
        signupBtn: signupBtn,
        profileBtn: profileBtn,
        //data: airlineName,
        script: "/script.js"
    });
});

// logout the user

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

//login authentication
app.use("/authentication", auth);
app.use('/flightBookings', checkToken, myTrips)

// protected Routes

app.get("/profile", checkToken, (req, res) => {
    res.render("profile.hbs", {
        title: "User Profile",
        data: req.userData._id,
        script: "/script.js"
    });
   
});





app.get("/myaccount", checkToken, (req, res) => {
    db.collection('users').findOne({
        _id: ObjectId(req.userData._id)
    }, (err, result) => {
        if (err) throw err;
        res.render("myAcc.hbs", {
            title: "Account Details",
            data: result,
            script: "/script.js"
        });
    })
});


//custum helper for radio input
hbs.registerHelper('checked', function(value, test) {
    if (value == undefined) return '';
    return value == test ? 'checked' : '';
});




//working
app.put('/myaccount/acc', checkToken, (req, res) => {
    var proId = req.userData._id
    var updProfile = req.body;
    var objectId = require('mongodb').ObjectId
    db.collection('users').update({
        "_id": new objectId(proId)
    }, {
        $set: updProfile
    }, function(error, result) {
        if (error)
            throw error;
        console.log(result);
        // res.json(result);

    })
})

//admin account
var adminLog = [{
        username: "admin",
        email: "admin@gmail.com",
        password: "admin"
    },

];
app.post("/login", function(req, res) {
    var flag = false;
    for (var i = 0; i < adminLog.length; i++) {
        if (
            adminLog[i].email == req.body.email &&
            adminLog[i].password == req.body.password
        ) {
            flag = true;
            break;
        }
    }
    if (flag) {
        req.session.username = adminLog.username;
        req.session.loggedIn = true;
        res.redirect("/listfaq");
    } else {
        res.json("Incorrect Credentials")
    }

    // if (req.body.email === adminLog.email && req.body.password === adminLog.password) {
    //     req.session.loggedIn = true;
    //     req.session.username = adminLog.username;
    //     res.redirect("/listfaq");
    // } else {
    //     res.json("Incorrect Credentials")
    // }
});
app.get("/admin", function(req, res) {
    if (req.session.loggedIn == true) {
        res.render('login');
    } else {
        res.redirect("/listfaq");
    }
});

app.get("/adminlog", function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
})

app.get("/adminlogout", function(req, res) {
    req.session.destroy();
    res.redirect("/faq");
})
app.listen(port, function() {
    console.log("Listening on port 3000");
});
