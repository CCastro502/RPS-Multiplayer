// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoM07PdA_2ntSLQGMrU3wD3dpqivifVlc",
    authDomain: "hhgjkvk.firebaseapp.com",
    databaseURL: "https://hhgjkvk.firebaseio.com",
    projectId: "hhgjkvk",
    storageBucket: "hhgjkvk.appspot.com",
    messagingSenderId: "993857542944"
};
firebase.initializeApp(config);



// Stores username and weapon choice
var emptyObject = {
    user1: ["",""],
    user2: ["",""]
}

var userObject = {
    user1: ["", ""],
    user2:["",""]
}
// function clearNames () {
//     database.ref().set({
//         username1: "",
//         username2: "",
//         userCount: 0
//     })
// }
// clearNames();
// Create shorthand to accessing FB DB
var database = firebase.database();
function resetValues() {
    database.ref().set({
        object: emptyObject
    });
}

resetValues();
// Global variables
// var user1 = "";
// var user2 = "";
// var user1Choice = "";
// var user2Choice = "";
var count = 0;

// Here will be a (series of) function(s) dedicated to taking the users username, storing it in firebase, then displaying, from firebase, that username on the page

$("#username1").on("click", function () {
    if ($("#sign-in1").val().length >= 3) {
        count++;
        userObject.user1[0] = $("#sign-in1").val();
        database.ref().set({
            object: userObject
        });
        // $("#user-sign-in1").html("<h1>" + user1 + "</html>")
        // count++;
        // if (count === 2) {
        //     startGame();
        // }
    } else {
        alert("username must be 3 characters or longer")
    }
})

$("#username2").on("click", function () {
    if ($("#sign-in2").val().length >= 3) {
        count++;
        userObject.user2[0] = $("#sign-in2").val();
        database.ref().set({
            object: userObject
        });
    } else {
        alert("username must be 3 characters or longer")
    }
})

database.ref().on("value", function (snapshot) {
    var newObj = snapshot.val();
    if (newObj.object.user1[0].length >= 3 && newObj.object.user2[0].length >= 3) {
        $("#user-sign-in1").html("<h1 class='username'>" + newObj.object.user1[0] + "</html>")
        $("#user-sign-in2").html("<h1 class='username'>" + newObj.object.user2[0] + "</html>")
        startGame();
    } else if (newObj.object.user1[0].length >= 3) {
        $("#user-sign-in1").html("<h1 class='username'>" + newObj.object.user1[0] + "</html>")
    } else if (newObj.object.user2[0].length >= 3) {
        $("#user-sign-in2").html("<h1 class=''username'>" + newObj.object.user2[0] + "</html>")
    }


    // clickCounter = snapshot.val().clickCount;

    // $("#click-value").text(snapshot.val().clickCount);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

function startGame() {
    alert("Both users have logged in, commence the battling by choosing your weapon of choice.")
}