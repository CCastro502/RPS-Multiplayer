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

// Create shorthand to accessing FB DB
var database = firebase.database();

// Global variables
var user1 = "";
var user2 = "";
var user1Choice = "";
var user2Choice = "";
var count = 0;

// Here will be a (series of) function(s) dedicated to taking the users username, storing it in firebase, then displaying, from firebase, that username on the page

$("#username1").on("click", function () {
    if ($("#sign-in1").val().length >= 3) {
        user1 = $("#sign-in1").val();
        database.ref().set({
            username1: user1
        });
        $("#user-sign-in1").html("<h1>" + user1 + "</html>")
        count++;
        if (count === 2) {
            startGame();
        }
    } else {
        alert("username must be 3 characters or longer")
    }
})

$("#username2").on("click", function () {
    if ($("#sign-in2").val().length >= 3) {
        user2 = $("#sign-in2").val();
        database.ref().set({
            username2: user2
        });
        $("#user-sign-in2").html("<h1>" + user2 + "</html>")
        count++;
        if (count === 2) {
            startGame();
        }
    } else {
        alert("username must be 3 characters or longer")
    }
})

function startGame() {
    alert("Both users have logged in, commence the battling by choosing your weapon of choice.")
}