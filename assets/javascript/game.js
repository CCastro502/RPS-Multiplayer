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

var rockImg = $("<img>").addClass("choice").attr("src", "assets/images/rock.jpeg").attr("height", "150px").attr("width", "150px");
var paperImg = $("<img>").addClass("choice").attr("src", "assets/images/paper.jpeg").attr("height", "150px").attr("width", "150px");
var scissorsImg = $("<img>").addClass("choice").attr("src", "assets/images/scissors.jpeg").attr("height", "150px").attr("width", "150px");
var imgArray = [rockImg, paperImg, scissorsImg];
var responseArray = ["Ties with", "Cut Up", "Smashed", "Suffocated", "Is Suffocated By", "Is Smashed By", "Got Cut Up By"];

// Stores username and weapon choice
var emptyObject = {
    user1: ["", ""],
    user2: ["", ""],
    user1Tie: 0,
    user2Tie: 0,
    user1Win: 0,
    user2Win: 0,
    user1Loss: 0,
    user2Loss: 0,
    count2: 0
}

var userObject = {
    user1: ["", ""],
    user2: ["", ""],
    user1Tie: 0,
    user2Tie: 0,
    user1Win: 0,
    user2Win: 0,
    user1Loss: 0,
    user2Loss: 0,
    count2: 0
}
// Create shorthand to accessing FB DB
var database = firebase.database();
function resetValues() {
    database.ref().set({
        object: emptyObject
    });
}

resetValues();
// Global variables

// Here will be a (series of) function(s) dedicated to taking the users username, storing it in firebase, then displaying, from firebase, that username on the page

$("#send-chat").on("click", function () {
    $("#chat-val").attr("value", $("#text-area").val())
})

$("#username1").on("click", function () {
    if ($("#sign-in1").val().length >= 3) {
        userObject.user1[0] = $("#sign-in1").val();
        database.ref().set({
            object: userObject
        });
    } else {
        alert("username must be 3 characters or longer")
    }
})

$("#username2").on("click", function () {
    if ($("#sign-in2").val().length >= 3) {
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
    userObject.count2++;
    console.log(newObj.object.count2);
    // Signs in. Limits the startGame function starting everytime the data structure is updated
    if (newObj.object.user1[0].length >= 3 && newObj.object.user2[0].length >= 3 && newObj.object.count2 <= 2) {
        $("#user-sign-in1").html("<h1 class='username'>" + newObj.object.user1[0] + "</html>")
        $("#user-sign-in2").html("<h1 class='username'>" + newObj.object.user2[0] + "</html>")
        startGame();
    } else if (newObj.object.user1[0].length >= 3 && newObj.object.count2 <= 3) {
        $("#user-sign-in1").html("<h1 class='username'>" + newObj.object.user1[0] + "</html>")
    } else if (newObj.object.user2[0].length >= 3 && newObj.object.count2 <= 3) {
        $("#user-sign-in2").html("<h1 class=''username'>" + newObj.object.user2[0] + "</html>")
    }
    // Displays user-choice
    if (newObj.object.user1[1].length >= 3 && newObj.object.user2[1].length >= 3) {
        var user1Choice = newObj.object.user1[1];
        var user2Choice = newObj.object.user2[1];
        if (user1Choice === user2Choice && user1Choice === "rock") {
            $(".choice").html(rockImg);
            $(".who-wins").text(responseArray[0])
            setTimeout(restartGame, 5000);
            userObject.user1Tie++;
            userObject.user2Tie++;  
            console.log(userObject);
        } else if (user1Choice === user2Choice && user1Choice === "paper") {
            $(".choice").html(paperImg);
            $(".who-wins").text(responseArray[0])
            setTimeout(restartGame, 5000);
            user1Tie++;
            user2Tie++;
        } else if (user1Choice === user2Choice && user1Choice === "scissors") {
            $(".choice").html(scissorsImg);
            $(".who-wins").text(responseArray[0])
            setTimeout(restartGame, 5000);
            user1Tie++;
            user2Tie++;
        } else if (user1Choice === "rock" && user2Choice === "scissors") {
            $("#user1-choice").html(rockImg);
            $("#user2-choice").html(scissorsImg);
            $(".who-wins").text(responseArray[2])
            setTimeout(restartGame, 5000);
        } else if (user1Choice === "rock" && user2Choice === "paper") {
            $("#user1-choice").html(rockImg);
            $("#user2-choice").html(paperImg);
            $(".who-wins").text(responseArray[4])
            setTimeout(restartGame, 5000);
        } else if (user1Choice === "scissors" && user2Choice === "rock") {
            $("#user1-choice").html(scissorsImg);
            $("#user2-choice").html(rockImg);
            $(".who-wins").text(responseArray[5])
            setTimeout(restartGame, 5000);
        } else if (user1Choice === "scissors" && user2Choice === "paper") {
            $("#user1-choice").html(scissorsImg);
            $("#user2-choice").html(paperImg);
            $(".who-wins").text(responseArray[1])
            setTimeout(restartGame, 5000);
        } else if (user1Choice === "paper" && user2Choice === "rock") {
            $("#user1-choice").html(paperImg);
            $("#user2-choice").html(rockImg);
            $(".who-wins").text(responseArray[3])
            setTimeout(restartGame, 5000);
        } else if (user1Choice === "paper" && user2Choice === "scissors") {
            $("#user1-choice").html(paperImg);
            $("#user2-choice").html(scissorsImg);
            $(".who-wins").text(responseArray[6])
            setTimeout(restartGame, 5000);
        }
    } else if (newObj.object.user1[1].length >= 3) {
        $("#user1-choice").text("Ready");
    } else if (newObj.object.user2[1].length >= 3) {
        $("#user2-choice").text("Ready");
    }
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

function startGame() {
    alert("Both users have logged in, commence the battling by choosing your weapon of choice.")
    $("#user1-choice").html("");
    $("#user2-choice").html("");
    var hasPicked = 0;
    $(".rps").on("click", function (event) {
        var shortHand = event.currentTarget.id.split("-");

        if (shortHand[1] === "1") {
            userObject.user1[1] = shortHand[0];
            database.ref().set({
                object: userObject
            });
        } else if (shortHand[1] === "2") {
            userObject.user2[1] = shortHand[0];
            database.ref().set({
                object: userObject
            });
        }
    })
}

function restartGame() {
    userObject.user1[1] = "";
    userObject.user2[1] = "";
    $("#user1-choice").html("");
    $("#user2-choice").html("");
    $(".who-wins").text("Choose next Weapon")
    var hasPicked = 0;
    $(".rps").on("click", function (event) {
        var shortHand = event.currentTarget.id.split("-");
        if (shortHand[1] === "1") {
            userObject.user1[1] = shortHand[0];
            database.ref().set({
                object: userObject
            });
        } else if (shortHand[1] === "2") {
            userObject.user2[1] = shortHand[0];
            database.ref().set({
                object: userObject
            });
        }
    })
}