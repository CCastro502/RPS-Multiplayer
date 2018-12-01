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
var count = 0;
var count2 = 0;
// Stores username and weapon choice
var user1Object = {
    name: "",
    win: 0,
    loss: 0
}

var user2Object = {
    name: "",
    win: 0,
    loss: 0
}

var chat = {
    chat: "Chat goes here"
}

var userCompare = {
    user1: "",
    user2: ""
}
// Create shorthand to accessing FB DB
var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectionsRef.on("value", function (snap) {
    console.log(snap.val());
});

connectedRef.on("value", function (snap) {
    console.log(snap.val())
    if (snap.val()) {
        var con = connectionsRef.push(true);
        $("#username1").on("click", function () {
            if ($("#sign-in1").val().length >= 3) {
                user1Object.name = $("#sign-in1").val();
                database.ref("/user1Object").set({
                    user1Object: user1Object
                });
                connectionsRef.push($("#sign-in1").val())
            } else {
                alert("username must be 3 characters or longer")
            }
        })
        $("#username2").on("click", function () {
            if ($("#sign-in2").val().length >= 3) {
                user2Object.name = $("#sign-in2").val();
                database.ref("/user2Object").set({
                    user2Object: user2Object
                });
            } else {
                alert("username must be 3 characters or longer")
            }
        })
        con.onDisconnect().remove();
    }
});

function resetValues() {
    database.ref("/chatDB").set({
        chat: chat
    });
    database.ref("/user1Object").set({
        user1Object: user1Object
    });
    database.ref("/user2Object").set({
        user2Object: user2Object
    });
    database.ref("/userCompare").set({
        userCompare: userCompare
    })
}

resetValues();

// Updates chat
$("#send-chat").on("click", function () {
    chat.chat = $("#text-area").val()
    database.ref("/chatDB").set({
        chat: chat
    });
    // database.ref().set({
    //     object: userObject
    // })
    $("#text-area").val("")
})

// Signs the first user into the page & database
// $("#username1").on("click", function () {
//     if ($("#sign-in1").val().length >= 3) {
//         user1Object.name = $("#sign-in1").val();
//         database.ref("/user1Object").set({
//             user1Object: user1Object
//         });
//     } else {
//         alert("username must be 3 characters or longer")
//     }
// })

// Signs the second user into the page & database
// $("#username2").on("click", function () {
//     if ($("#sign-in2").val().length >= 3) {
//         user2Object.name = $("#sign-in2").val();
//         database.ref("/user2Object").set({
//             user2Object: user2Object
//         });
//     } else {
//         alert("username must be 3 characters or longer")
//     }
// })

// Updates chat box
database.ref("/chatDB").on("value", function (snapshot) {
    var newObj = snapshot.val();
    $("#chat-val").attr("value", newObj.chat.chat);
})

database.ref("/user1Object").on("value", function (snapshot) {
    var newObj = snapshot.val();
    $("#user1-wins-updater").text(newObj.user1Object.win);
    $("#user1-losses-updater").text(newObj.user1Object.loss);
    if (newObj.user1Object.name.length >= 3) {
        count++
        $("#user-sign-in1").html("<h1 class='username'>" + newObj.user1Object.name + "</html>")
        if (count === 2) {
            startGame();
        }
    }


})

database.ref("/user2Object").on("value", function (snapshot) {
    var newObj = snapshot.val();
    $("#user2-wins-updater").text(newObj.user2Object.win);
    $("#user2-losses-updater").text(newObj.user2Object.loss)
    if (newObj.user2Object.name.length >= 3) {
        count++
        $("#user-sign-in2").html("<h1 class='username'>" + newObj.user2Object.name + "</html>")
        if (count === 2) {
            startGame();
        }
    }
})

database.ref("/userCompare").on("value", function (snapshot) {
    var newObj = snapshot.val();
    if (newObj.userCompare.user1.length >= 3 && newObj.userCompare.user2.length >= 3) {
        console.log("run");
        var choice1 = newObj.userCompare.user1;
        var choice2 = newObj.userCompare.user2;
        if (choice1 === choice2 && choice1 === "rock") {
            $(".choice").html(rockImg);
            $(".who-wins").text(responseArray[0]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === choice2 && choice1 === "scissors") {
            $(".choice").html(scissorsImg);
            $(".who-wins").text(responseArray[0]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === choice2 && choice1 === "paper") {
            $(".choice").html(paperImg);
            $(".who-wins").text(responseArray[0]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === "rock" && choice2 === "paper") {
            user2Object.win++;
            user1Object.loss++;
            database.ref("/user1Object").set({
                user1Object: user1Object,
            })
            database.ref("/user2Object").set({
                user2Object: user2Object,
            })
            $("#user1-choice").html(rockImg);
            $("#user2-choice").html(paperImg);
            $(".who-wins").text(responseArray[4]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === "rock" && choice2 === "scissors") {
            user1Object.win++;
            user2Object.loss++;
            database.ref("/user1Object").set({
                user1Object: user1Object,
            })
            database.ref("/user2Object").set({
                user2Object: user2Object,
            })
            $("#user1-choice").html(rockImg);
            $("#user2-choice").html(scissorsImg);
            $(".who-wins").text(responseArray[2]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === "paper" && choice2 === "rock") {
            user1Object.win++;
            user2Object.loss++;
            database.ref("/user1Object").set({
                user1Object: user1Object,
            })
            database.ref("/user2Object").set({
                user2Object: user2Object,
            })
            $("#user1-choice").html(paperImg);
            $("#user2-choice").html(rockImg);
            $(".who-wins").text(responseArray[3]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === "paper" && choice2 === "scissors") {
            user1Object.win++;
            user2Object.loss++;
            database.ref("/user1Object").set({
                user1Object: user1Object,
            })
            database.ref("/user2Object").set({
                user2Object: user2Object,
            })
            $("#user1-choice").html(paperImg);
            $("#user2-choice").html(scissorsImg);
            $(".who-wins").text(responseArray[6]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === "scissors" && choice2 === "rock") {
            user2Object.win++;
            user1Object.loss++;
            database.ref("/user1Object").set({
                user1Object: user1Object,
            })
            database.ref("/user2Object").set({
                user2Object: user2Object,
            })
            $("#user1-choice").html(scissorsImg);
            $("#user2-choice").html(rockImg);
            $(".who-wins").text(responseArray[5]);
            setTimeout(restartGame, 3500);
        } else if (choice1 === "scissors" && choice2 === "paper") {
            user1Object.win++;
            user2Object.loss++;
            database.ref("/user1Object").set({
                user1Object: user1Object,
            })
            database.ref("/user2Object").set({
                user2Object: user2Object,
            })
            $("#user1-choice").html(scissorsImg);
            $("#user2-choice").html(paperImg);
            $(".who-wins").text(responseArray[1]);
            setTimeout(restartGame, 3500);
        }
        // checkGame(newObj.userCompare.user1, newObj.userCompare.user2);
    } else if (newObj.userCompare.user1.length >= 3) {
        $("#user1-choice").text("Ready");
    } else if (newObj.userCompare.user2.length >= 3) {
        $("#user2-choice").text("Ready");
    }
})

// Sets up the page for the first game between 2 users
function startGame() {
    $("#user1-choice").html("");
    $("#user2-choice").html("");
    $(".rps").on("click", function (event) {
        var shortHand = event.currentTarget.id.split("-");

        if (shortHand[1] === "1") {
            userCompare.user1 = shortHand[0];
            database.ref("/userCompare").set({
                userCompare: userCompare
            });
        } else if (shortHand[1] === "2") {
            userCompare.user2 = shortHand[0];
            database.ref("/userCompare").set({
                userCompare: userCompare
            });
        }
    })
}

// Resets the page for every game after the first match
function restartGame() {
    count = 0;
    userCompare.user1 = "";
    userCompare.user2 = "";
    database.ref("/userCompare").set({
        userCompare: userCompare,
    })
    $("#user1-choice").html("");
    $("#user2-choice").html("");
    $(".who-wins").text("Choose next Weapon")
    $(".rps").on("click", function (event) {
        var shortHand = event.currentTarget.id.split("-");
        if (shortHand[1] === "1") {
            userCompare.user1 = shortHand[0];
            database.ref("/userCompare").set({
                userCompare: userCompare
            });
        } else if (shortHand[1] === "2") {
            userCompare.user2 = shortHand[0];
            database.ref("/userCompare").set({
                userCompare: userCompare
            });
        }
    })
}