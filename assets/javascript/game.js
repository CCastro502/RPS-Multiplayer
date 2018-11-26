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
    user1Win: 0,
    user2Win: 0,
    user1Loss: 0,
    user2Loss: 0,
    count: 0,
    count2: 0,
    chat: ""
}

var userObject = {
    user1: ["", ""],
    user2: ["", ""],
    user1Win: 0,
    user2Win: 0,
    user1Loss: 0,
    user2Loss: 0,
    count: 0,
    count2: 0,
    chat: ""
}
// Create shorthand to accessing FB DB
var database = firebase.database();
// Resets database values when page refreshed
function resetValues() {
    database.ref().set({
        object: emptyObject
    });
}

resetValues();

// Updates chat
$("#send-chat").on("click", function () {
    userObject.chat = $("#text-area").val()
    database.ref().set({
        object: userObject
    })
    $("#text-area").val("")
})

// Signs the first user into the page & database
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

// Signs the second user into the page & database
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

// Regurgitates database values onto page
database.ref().on("value", function (snapshot) {
    var newObj = snapshot.val();
    userObject.count2++;
    $("#user1-wins-updater").text(newObj.object.user1Win);
    $("#user2-wins-updater").text(newObj.object.user2Win);
    $("#user1-losses-updater").text(newObj.object.user1Loss);
    $("#user2-losses-updater").text(newObj.object.user2Loss);

    $("#chat-val").attr("value", newObj.object.chat);

    // Signs in. Count2 limits the startGame function starting everytime the database structure is updated
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
        checkGame(newObj.object.user1[1], newObj.object.user2[1])
    } else if (newObj.object.user1[1].length >= 3) {
        $("#user1-choice").text("Ready");
    } else if (newObj.object.user2[1].length >= 3) {
        $("#user2-choice").text("Ready");
    }
    // Updates whether each user won or lost according to database saved values
    $("#user1-wins-updater").text(newObj.object.user1Win);
    $("#user2-wins-updater").text(newObj.object.user2Win);
    $("#user1-losses-updater").text(newObj.object.user1Loss);
    $("#user2-losses-updater").text(newObj.object.user2Loss);
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Sets up the page for the first game between 2 users
function startGame() {
    $("#user1-choice").html("");
    $("#user2-choice").html("");
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

// Determines whether either user won or lost, sends results to database for it to update
function checkGame(choice1, choice2) {
    userObject.count++;
    if (choice1 === choice2 && choice1 === "rock" && userObject.count === 1) {
        $(".choice").html(rockImg);
        $(".who-wins").text(responseArray[0]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === choice2 && choice1 === "scissors" && userObject.count === 1) {
        $(".choice").html(scissorsImg);
        $(".who-wins").text(responseArray[0]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === choice2 && choice1 === "paper" && userObject.count === 1) {
        $(".choice").html(paperImg);
        $(".who-wins").text(responseArray[0]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === "rock" && choice2 === "paper" && userObject.count === 1) {
        userObject.user2Win++;
        userObject.user1Loss++;
        database.ref().set({
            object: userObject
        })
        $("#user1-choice").html(rockImg);
        $("#user2-choice").html(paperImg);
        $(".who-wins").text(responseArray[4]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === "rock" && choice2 === "scissors" && userObject.count === 1) {
        userObject.user1Win++;
        userObject.user2Loss++;
        database.ref().set({
            object: userObject
        })
        $("#user1-choice").html(rockImg);
        $("#user2-choice").html(scissorsImg);
        $(".who-wins").text(responseArray[2]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === "paper" && choice2 === "rock" && userObject.count === 1) {
        userObject.user1Win++;
        userObject.user2Loss++;
        database.ref().set({
            object: userObject
        })
        $("#user1-choice").html(paperImg);
        $("#user2-choice").html(rockImg);
        $(".who-wins").text(responseArray[3]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === "paper" && choice2 === "scissors" && userObject.count === 1) {
        userObject.user2Win++;
        userObject.user1Loss++;
        database.ref().set({
            object: userObject
        })
        $("#user1-choice").html(paperImg);
        $("#user2-choice").html(scissorsImg);
        $(".who-wins").text(responseArray[6]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === "scissors" && choice2 === "rock" && userObject.count === 1) {
        userObject.user2Win++;
        userObject.user1Loss++;
        database.ref().set({
            object: userObject
        })
        $("#user1-choice").html(scissorsImg);
        $("#user2-choice").html(rockImg);
        $(".who-wins").text(responseArray[5]);
        setTimeout(restartGame, 3500);
    } else if (choice1 === "scissors" && choice2 === "paper" && userObject.count === 1) {
        userObject.user1Win++;
        userObject.user2Loss++;
        database.ref().set({
            object: userObject
        })
        $("#user1-choice").html(scissorsImg);
        $("#user2-choice").html(paperImg);
        $(".who-wins").text(responseArray[1]);
        setTimeout(restartGame, 3500);
    }
}

// Resets the page for every game after the first match
function restartGame() {
    userObject.count = 0;
    userObject.user1[1] = "";
    userObject.user2[1] = "";
    $("#user1-choice").html("");
    $("#user2-choice").html("");
    $(".who-wins").text("Choose next Weapon")
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